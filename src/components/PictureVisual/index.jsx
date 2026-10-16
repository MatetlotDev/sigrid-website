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
  z-index: 700;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: clamp(80px, 8vw, 110px) clamp(20px, 3vw, 48px) clamp(20px, 3vw, 40px);
  color: ${({ theme }) => theme.colors.anthracite};
  visibility: hidden;

  .backdrop {
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.ivory};
    transform-origin: bottom;
  }

  .stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    grid-row: 2;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      box-shadow: 0 30px 80px -40px rgba(38, 40, 38, 0.6);
    }
  }

  .bar {
    position: relative;
    grid-row: 3;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    padding-top: 20px;

    p {
      font-family: 'Cinzel', serif;
      font-size: 1.2rem;
    }
    span {
      font-size: 1.05rem;
      opacity: 0.6;
    }
  }

  .controls {
    display: flex;
    gap: 28px;
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    button {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      letter-spacing: inherit;
      text-transform: inherit;
      cursor: pointer;
    }
  }

  .count {
    font-variant-numeric: tabular-nums;
  }
`;

function PictureVisual() {
  const dispatch = useDispatch();
  const open = useSelector(selectOpen);
  const actualImg = useSelector(selectActualImg);
  const root = useRef(null);
  const index = actualImg ? allPictures.findIndex((p) => p.id === actualImg.id) : -1;

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
          q('.stage, .bar'),
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: 'expo.out' },
          '-=0.35'
        );
    } else {
      gsap
        .timeline()
        .to(q('.stage, .bar'), { autoAlpha: 0, duration: 0.35 })
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

  // Slide in each new painting.
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

  return (
    <Section ref={root} aria-hidden={!open} role="dialog" aria-modal="true">
      <div className="backdrop" onClick={() => dispatch(setImg(null))} />
      <div className="stage" onClick={() => dispatch(setImg(null))}>
        {actualImg && (
          <ProgressiveImg
            key={actualImg.id}
            src={actualImg.path}
            alt={actualImg.name || 'Painting by Sigrid Freyens'}
          />
        )}
      </div>
      <div className="bar">
        <div>
          <p>{actualImg?.name || 'Untitled'}</p>
          <span>{actualImg?.dimensions}</span>
        </div>
        <div className="controls">
          <button onClick={() => dispatch(prevImg())}>Prev</button>
          <span className="count">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(allPictures.length).padStart(2, '0')}
          </span>
          <button onClick={() => dispatch(nextImg())}>Next</button>
          <button onClick={() => dispatch(setImg(null))}>Close</button>
        </div>
      </div>
    </Section>
  );
}

export default PictureVisual;
