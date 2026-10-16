import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from '../../../motion/core';
import { TransitionLink } from '../../../motion/transition';
import { routes } from '../../../pages';

const Toggle = styled.button`
  display: none;
  position: fixed;
  top: clamp(18px, 2.4vw, 34px);
  right: clamp(20px, 3vw, 48px);
  z-index: 860;
  background: none;
  border: none;
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ivory};
  mix-blend-mode: difference;
  cursor: pointer;

  @media ${({ theme }) => theme.sizes.tabletS} {
    display: block;
  }
`;

const Panel = styled.div`
  position: fixed;
  inset: 0;
  z-index: 850;
  background: ${({ theme }) => theme.colors.anthracite};
  color: ${({ theme }) => theme.colors.ivory};
  clip-path: inset(0 0 100% 0);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 24px 15vh;
  visibility: hidden;

  ul {
    list-style: none;
  }
  li {
    overflow: hidden;
  }
  a {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(3rem, 14vw, 5rem);
    line-height: 1.1;
  }
  p {
    margin-top: 40px;
    font-family: 'Cormorant', serif;
    font-style: italic;
    font-size: 1.3rem;
    opacity: 0.6;
  }
`;

const MobileMenu = ({ open, setOpen }) => {
  const panel = useRef(null);

  useEffect(() => {
    const q = gsap.utils.selector(panel);
    if (open) {
      gsap
        .timeline()
        .set(panel.current, { visibility: 'visible' })
        .to(panel.current, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'expo.inOut',
        })
        .fromTo(
          q('a'),
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.07, ease: 'expo.out' },
          '-=0.4'
        )
        .fromTo(q('p'), { opacity: 0 }, { opacity: 0.6, duration: 0.6 }, '-=0.6');
    } else {
      gsap
        .timeline()
        .to(panel.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.8,
          ease: 'expo.inOut',
        })
        .set(panel.current, { visibility: 'hidden' });
    }
  }, [open]);

  return (
    <>
      <Toggle onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Close' : 'Menu'}
      </Toggle>
      <Panel ref={panel}>
        <ul>
          <li>
            <TransitionLink to="/" onClick={() => setOpen(false)}>
              Home
            </TransitionLink>
          </li>
          {routes
            .filter((route) => route.inHeader)
            .map((route) => (
              <li key={route.path}>
                <TransitionLink to={route.path} onClick={() => setOpen(false)}>
                  {route.name}
                </TransitionLink>
              </li>
            ))}
        </ul>
        <p>&ldquo;Painting is energy made visible&rdquo;</p>
      </Panel>
    </>
  );
};

export default MobileMenu;
