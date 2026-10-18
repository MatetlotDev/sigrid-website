import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { tabletSmallSize } from '../constants';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch =
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

// Phones get shorter, gentler motion.
export const isSmallScreen = () =>
  window.matchMedia(`(max-width: ${tabletSmallSize}px)`).matches;

if (!prefersReducedMotion) document.documentElement.classList.add('is-motion');

// Smooth scroll, driven by the GSAP ticker so Lenis, ScrollTrigger and the
// WebGL layer all update in the same frame.
let lenis = null;

export function getLenis() {
  if (lenis || prefersReducedMotion) return lenis;

  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function scrollToTop({ immediate = false } = {}) {
  const instance = getLenis();
  if (instance) instance.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function lockScroll(locked) {
  const instance = getLenis();
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.body.style.overflowY = locked ? 'hidden' : '';
}

// The "page gate" is closed while the splash screen or a page transition
// covers the screen. Entrance animations wait for it so they play in view.
let gateOpen = false;
let waiters = [];

export function whenPageVisible(callback) {
  if (gateOpen) {
    callback();
    return () => {};
  }
  waiters.push(callback);
  return () => {
    waiters = waiters.filter((waiter) => waiter !== callback);
  };
}

export function openGate() {
  gateOpen = true;
  const pending = waiters;
  waiters = [];
  pending.forEach((callback) => callback());
  ScrollTrigger.refresh();
}

export function closeGate() {
  gateOpen = false;
}

export { Flip, gsap, ScrollTrigger, SplitText };
