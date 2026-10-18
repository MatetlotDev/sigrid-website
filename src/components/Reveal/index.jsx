import { useLayoutEffect, useRef } from 'react';
import {
  gsap,
  isSmallScreen,
  prefersReducedMotion,
  ScrollTrigger,
  SplitText,
  whenPageVisible,
} from '../../motion/core';

// Splits its text into masked lines (or characters) that rise into place
// when scrolled into view.
export function SplitReveal({
  as: Tag = 'div',
  by = 'lines',
  delay = 0,
  stagger,
  duration = 1.3,
  start = 'top 88%',
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return undefined;

    let split;
    const cancel = whenPageVisible(() => {
      split = SplitText.create(element, {
        type: by === 'chars' ? 'lines,chars' : 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          gsap.set(element, { visibility: 'visible' });
          const targets = by === 'chars' ? self.chars : self.lines;
          const small = isSmallScreen();
          return gsap.from(targets, {
            yPercent: 110,
            rotate: by === 'chars' || small ? 0 : 2,
            duration: small ? duration * 0.8 : duration,
            delay,
            stagger:
              (stagger ?? (by === 'chars' ? 0.035 : 0.09)) * (small ? 0.7 : 1),
            ease: 'expo.out',
            scrollTrigger: {
              trigger: element,
              start: small ? 'top 94%' : start,
              once: true,
            },
          });
        },
      });
    });

    return () => {
      cancel();
      split?.revert();
    };
  }, [by, delay, duration, stagger, start]);

  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}

// Fades and lifts a block when scrolled into view.
export function FadeUp({
  as: Tag = 'div',
  delay = 0,
  y = 40,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return undefined;

    let tween;
    const cancel = whenPageVisible(() => {
      gsap.set(element, { visibility: 'visible' });
      const small = isSmallScreen();
      tween = gsap.from(element, {
        y: small ? y * 0.6 : y,
        autoAlpha: 0,
        duration: small ? 1.1 : 1.4,
        delay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: element,
          start: small ? 'top 96%' : 'top 92%',
          once: true,
        },
      });
    });

    return () => {
      cancel();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gsap.set(element, { clearProps: 'all' });
    };
  }, [delay, y]);

  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}

// Moves its content at a different speed than the scroll.
export function Parallax({ speed = 12, className, children, ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return undefined;

    const amount = isSmallScreen() ? speed * 0.5 : speed;
    const tween = gsap.fromTo(
      element,
      { yPercent: amount },
      {
        yPercent: -amount,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
