import { createContext, useCallback, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  closeGate,
  gsap,
  openGate,
  prefersReducedMotion,
  scrollToTop,
} from './core';

const Curtain = styled.div`
  position: fixed;
  inset: 0;
  z-index: 900;
  pointer-events: none;
  background: ${({ theme }) => theme.colors.anthracite};
  color: ${({ theme }) => theme.colors.ivory};
  transform: scaleY(0);
  transform-origin: bottom;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(2rem, 6vw, 6rem);
    letter-spacing: 0.08em;
    opacity: 0;
  }
`;

const TransitionContext = createContext(null);

export function TransitionProvider({ labels = {}, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const curtain = useRef(null);
  const label = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (to) => {
      if (busy.current || to === pathname) return;

      if (prefersReducedMotion) {
        navigate(to);
        scrollToTop({ immediate: true });
        return;
      }

      busy.current = true;
      closeGate();
      label.current.textContent = labels[to] || '';

      gsap
        .timeline({
          onComplete: () => {
            busy.current = false;
          },
        })
        .set(curtain.current, { transformOrigin: 'bottom', pointerEvents: 'all' })
        .to(curtain.current, { scaleY: 1, duration: 0.8, ease: 'expo.inOut' })
        .fromTo(
          label.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
          '-=0.3'
        )
        .add(() => {
          navigate(to);
          scrollToTop({ immediate: true });
        })
        .set(curtain.current, { transformOrigin: 'top' }, '+=0.25')
        .to(label.current, { opacity: 0, y: -30, duration: 0.5, ease: 'expo.in' })
        .to(
          curtain.current,
          { scaleY: 0, duration: 0.9, ease: 'expo.inOut' },
          '-=0.2'
        )
        .add(openGate, '-=0.55')
        .set(curtain.current, { pointerEvents: 'none' });
    },
    [labels, navigate, pathname]
  );

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <Curtain ref={curtain} aria-hidden="true">
        <span ref={label} />
      </Curtain>
    </TransitionContext.Provider>
  );
}

export const useTransitionNavigate = () => useContext(TransitionContext);

// A router link that plays the curtain transition before changing page.
export function TransitionLink({ to, onClick, children, ...rest }) {
  const go = useTransitionNavigate();

  return (
    <Link
      to={to}
      onClick={(event) => {
        onClick?.(event);
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
          return;
        event.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
