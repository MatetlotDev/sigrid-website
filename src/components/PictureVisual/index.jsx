import { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { allPictures } from '../../constants';
import { gsap } from '../../motion/core';
import {
  nextImg,
  prevImg,
  selectActualImg,
  selectOpen,
  setImg,
} from '../../store/globalSlice';
import ProgressiveImg from '../ProgressiveImg';

const Section = styled.section`
  position: fixed;
  inset: 0;
  z-index: 870;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: clamp(16px, 2.4vw, 32px);
  height: 100svh;
  padding: clamp(18px, 2.4vw, 34px) clamp(20px, 3vw, 48px);
  color: ${({ theme }) => theme.colors.anthracite};
  visibility: hidden;

  .backdrop {
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.ivory};
    transform-origin: bottom;
  }

  .top,
  .bottom {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    min-width: 0;
  }

  .top {
    align-items: center;
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .stage {
    position: relative;
    min-height: 0;
    touch-action: pan-y;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .caption {
    min-width: 0;

    p {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.05rem, 1.6vw, 1.3rem);
      overflow-wrap: anywhere;
    }
    span {
      font-size: 1.05rem;
      opacity: 0.6;
    }
  }

  .nav {
    display: flex;
    gap: 28px;
    flex-shrink: 0;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 8px 0;
    -webkit-tap-highlight-color: transparent;
  }

  .count {
    font-variant-numeric: tabular-nums;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    padding: 16px 16px max(20px, env(safe-area-inset-bottom));
    gap: 16px;

    .bottom {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }
    .caption {
      text-align: center;
    }
    .nav {
      justify-content: space-between;
      border-top: 1px solid rgba(38, 40, 38, 0.2);
      padding-top: 8px;
    }
  }
`;

const SWIPE_DISTANCE = 50;

function PictureVisual() {
  const dispatch = useDispatch();
  const open = useSelector(selectOpen);
  const actualImg = useSelector(selectActualImg);
  const root = useRef(null);
  const touchStart = useRef(null);
  const index = actualImg ? allPictures.findIndex((p) => p.id === actualImg.id) : -1;

  const close = () => dispatch(setImg(null));

  // Open / close.
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root);
    if (open) {
      gsap
        .timeline()
        .set(root.current, { visibility: 'visible' })
        .fromTo(
          q('.backdrop'),
          { scaleY: 0 },
          { scaleY: 1, duration: 0.9, ease: 'expo.inOut' }
        )
        .fromTo(
          q('.top, .stage, .bottom'),
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: 'expo.out' },
          '-=0.35'
        );
    } else {
      gsap
        .timeline()
        .to(q('.top, .stage, .bottom'), { autoAlpha: 0, duration: 0.35 })
        .to(q('.backdrop'), {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.8,
          ease: 'expo.inOut',
        })
        .set(q('.backdrop'), { transformOrigin: 'bottom' })
        .set(root.current, { visibility: 'hidden' });
    }
  }, [open]);

  // Wipe in each new painting.
  useLayoutEffect(() => {
    if (!open) return;
    gsap.fromTo(
      root.current.querySelector('.stage img'),
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.out' }
    );
  }, [actualImg?.id, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') dispatch(setImg(null));
      if (event.key === 'ArrowRight') dispatch(nextImg());
      if (event.key === 'ArrowLeft') dispatch(prevImg());
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch, open]);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;
    dispatch(dx < 0 ? nextImg() : prevImg());
  };

  return (
    <Section ref={root} aria-hidden={!open} role="dialog" aria-modal="true">
      <div className="backdrop" onClick={close} />
      <div className="top">
        <span className="count">
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(allPictures.length).padStart(2, '0')}
        </span>
        <button onClick={close}>Close</button>
      </div>
      <div
        className="stage"
        onClick={(event) => event.target === event.currentTarget && close()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {actualImg && (
          <ProgressiveImg
            key={actualImg.id}
            src={actualImg.path}
            alt={actualImg.name || 'Painting by Sigrid Freyens'}
          />
        )}
      </div>
      <div className="bottom">
        <div className="caption">
          <p>{actualImg?.name || 'Untitled'}</p>
          {actualImg?.dimensions && <span>{actualImg.dimensions}</span>}
        </div>
        <div className="nav">
          <button onClick={() => dispatch(prevImg())}>← Prev</button>
          <button onClick={() => dispatch(nextImg())}>Next →</button>
        </div>
      </div>
    </Section>
  );
}

export default PictureVisual;
