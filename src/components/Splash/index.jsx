import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap, lockScroll, openGate, prefersReducedMotion } from '../../motion/core';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 950;
  background: ${({ theme }) => theme.colors.anthracite};
  color: ${({ theme }) => theme.colors.ivory};
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: clamp(20px, 3vw, 40px);
  overflow: hidden;

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-family: 'Cormorant', serif;
    font-size: clamp(1rem, 1.2vw, 1.25rem);
    letter-spacing: 0.04em;
  }

  .frame {
    position: absolute;
    top: 50%;
    left: 50%;
    width: clamp(160px, 18vw, 280px);
    aspect-ratio: 4 / 5;
    transform: translate(-50%, -50%);
    overflow: hidden;
    clip-path: inset(100% 0 0 0);

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
    }
  }

  .title {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.6rem, 9.5vw, 11rem);
    line-height: 0.9;
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
    padding-bottom: 0.05em;

    span {
      display: inline-block;
      transform: translateY(110%);
    }
  }

  .count {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.5rem, 6vw, 6rem);
    line-height: 0.8;
    font-variant-numeric: tabular-nums;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    .bottom {
      flex-direction: column-reverse;
      align-items: flex-start;
      gap: 24px;
    }
  }
`;

const TITLE = 'Sigrid Freyens';

// First-visit loader: counts up while the given images preload, flicks
// through them in a small frame, then lifts away to reveal the site.
export default function Splash({ images = [] }) {
  const root = useRef(null);
  const count = useRef(null);
  const [done, setDone] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      openGate();
      return undefined;
    }

    lockScroll(true);
    const q = gsap.utils.selector(root);
    const frames = q('.frame img');
    const progress = { value: 0 };
    let loaded = 0;
    let flick = 0;

    const intro = gsap
      .timeline()
      .to(q('.title span'), {
        y: 0,
        duration: 1.4,
        stagger: 0.04,
        ease: 'expo.out',
      })
      .to(
        q('.frame'),
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut' },
        0.2
      )
      .from(
        q('.top > *, .count'),
        { opacity: 0, y: 12, duration: 1, stagger: 0.08 },
        0.4
      );

    const flicker = setInterval(() => {
      frames.forEach((frame, index) =>
        gsap.set(frame, { opacity: index === flick % frames.length ? 1 : 0 })
      );
      flick += 1;
    }, 180);

    const advance = () => {
      loaded += 1;
      gsap.to(progress, {
        value: (loaded / images.length) * 100,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => {
          count.current.textContent = String(Math.round(progress.value)).padStart(
            3,
            '0'
          );
        },
        onComplete: () => {
          if (progress.value >= 100) leave();
        },
      });
    };

    const leave = () => {
      clearInterval(flicker);
      gsap
        .timeline({
          delay: 0.3,
          onComplete: () => {
            lockScroll(false);
            setDone(true);
          },
        })
        .to(q('.top > *, .count'), { opacity: 0, duration: 0.5 })
        .to(
          q('.title span'),
          { yPercent: -110, duration: 1, stagger: 0.03, ease: 'expo.in' },
          0
        )
        .to(
          q('.frame'),
          { width: '100vw', height: '100vh', duration: 1.3, ease: 'expo.inOut' },
          0.4
        )
        .to(
          root.current,
          { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.inOut' },
          '-=0.35'
        )
        .add(openGate, '-=0.7');
    };

    const preloaders = images.map((src) => {
      const image = new Image();
      image.onload = advance;
      image.onerror = advance;
      image.src = src;
      return image;
    });
    if (!images.length) leave();

    return () => {
      clearInterval(flicker);
      intro.kill();
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      gsap.killTweensOf(progress);
    };
    // The splash plays once, on first mount.
  }, []);

  if (done) return null;

  return (
    <Wrapper ref={root} style={{ clipPath: 'inset(0 0 0% 0)' }} aria-hidden="true">
      <div className="top">
        <span>Contemporary painter</span>
        <span>Taranaki — New Zealand</span>
      </div>
      <div className="frame">
        {images.slice(0, 8).map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
      <div className="bottom">
        <div className="title">
          {TITLE.split('').map((letter, index) => (
            <span key={index}>{letter === ' ' ? ' ' : letter}</span>
          ))}
        </div>
        <p className="count" ref={count}>
          000
        </p>
      </div>
    </Wrapper>
  );
}
