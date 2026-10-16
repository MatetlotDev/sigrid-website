import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap, isTouch, prefersReducedMotion } from '../../motion/core';

const Dot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 84px;
  height: 84px;
  margin: -42px 0 0 -42px;
  border-radius: 50%;
  pointer-events: none;
  background: ${({ theme }) => theme.colors.ivory};
  mix-blend-mode: difference;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.12);

  span {
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.anthracite};
    opacity: 0;
  }
`;

// A small dot trailing the pointer that grows into a label over elements
// carrying data-cursor="…".
export default function Cursor() {
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return undefined;

    const moveX = gsap.quickTo(dot.current, 'x', { duration: 0.45, ease: 'power3' });
    const moveY = gsap.quickTo(dot.current, 'y', { duration: 0.45, ease: 'power3' });
    let current = null;

    const onMove = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);

      const target = event.target.closest?.('[data-cursor], a, button');
      const text = target?.dataset?.cursor || '';
      const key = target ? text || 'link' : null;
      if (key === current) return;
      current = key;

      label.current.textContent = text;
      gsap.to(dot.current, {
        scale: text ? 1 : target ? 0.32 : 0.12,
        duration: 0.6,
        ease: 'expo.out',
      });
      gsap.to(label.current, { opacity: text ? 1 : 0, duration: 0.3 });
    };

    const onLeave = () => gsap.to(dot.current, { scale: 0, duration: 0.4 });
    const onEnter = () => gsap.to(dot.current, { scale: 0.12, duration: 0.4 });

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  if (isTouch || prefersReducedMotion) return null;

  return (
    <Dot ref={dot} aria-hidden="true">
      <span ref={label} />
    </Dot>
  );
}
