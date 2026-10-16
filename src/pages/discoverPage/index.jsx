import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Artwork from '../../components/Artwork';
import { FadeUp, SplitReveal } from '../../components/Reveal';
import { allPictures } from '../../constants';
import { Flip, prefersReducedMotion, ScrollTrigger } from '../../motion/core';
import { setImg } from '../../store/globalSlice';

const Section = styled.section`
  padding: clamp(130px, 16vw, 220px) clamp(20px, 3vw, 48px) clamp(80px, 10vw, 160px);
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: clamp(50px, 7vw, 110px);

  h1 {
    font-family: 'Cinzel', serif;
    font-weight: 400;
    font-size: clamp(3rem, 10vw, 11rem);
    line-height: 0.85;

    sup {
      font-size: 0.22em;
      vertical-align: top;
      letter-spacing: 0.1em;
      margin-left: 0.3em;
    }
  }

  blockquote {
    font-style: italic;
    font-size: clamp(1.2rem, 1.6vw, 1.6rem);
    max-width: 22ch;
  }

  .modes {
    display: flex;
    gap: 20px;

    button {
      background: none;
      border: none;
      color: inherit;
      font-family: 'Cinzel', serif;
      font-size: 0.9rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      opacity: 0.4;
      transition: opacity 0.4s;

      &[aria-pressed='true'],
      &:hover {
        opacity: 1;
      }
    }
  }
`;

const Pictures = styled.div`
  &.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(28px, 4vw, 64px) clamp(16px, 2.4vw, 40px);

    @media ${({ theme }) => theme.sizes.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
    @media ${({ theme }) => theme.sizes.tabletS} {
      grid-template-columns: repeat(2, 1fr);
    }

    img {
      width: 100%;
      aspect-ratio: 4 / 5;
      object-fit: cover;
    }
  }

  &.full {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(80px, 14vw, 200px);

    figure {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: end;
      gap: clamp(16px, 3vw, 48px);
      width: 100%;
    }
    img {
      grid-column: 2;
      aspect-ratio: var(--ratio, 1);
      width: min(70vw, calc(78svh * var(--ratio, 1)));
      height: auto;
    }
    figcaption {
      grid-column: 3;
      grid-row: 1;
      flex-direction: column;
    }

    @media ${({ theme }) => theme.sizes.tabletS} {
      figure {
        grid-template-columns: 1fr;
      }
      img {
        grid-column: 1;
        width: 100%;
      }
      figcaption {
        grid-column: 1;
        grid-row: 2;
      }
    }
  }

  figure {
    cursor: pointer;
  }

  figcaption {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 12px;

    p {
      font-family: 'Cinzel', serif;
      font-size: 1rem;
      letter-spacing: 0.04em;
    }
    span {
      font-size: 1.05rem;
      opacity: 0.6;
    }
  }
`;

function Discover() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('grid');
  const container = useRef(null);
  const flipState = useRef(null);

  const changeMode = (next) => {
    if (next === mode) return;
    if (!prefersReducedMotion) {
      flipState.current = Flip.getState(container.current.querySelectorAll('img'));
    }
    setMode(next);
  };

  // Animate each painting from its old box to its new one.
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 1.2,
      ease: 'expo.inOut',
      stagger: { amount: 0.2 },
      scale: true,
      onComplete: () => ScrollTrigger.refresh(),
    });
    flipState.current = null;
  }, [mode]);

  return (
    <Section>
      <Head>
        <SplitReveal as="h1" by="chars">
          Works<sup>({allPictures.length})</sup>
        </SplitReveal>
        <SplitReveal as="blockquote" delay={0.2}>
          &ldquo;Art is for me a living process.&rdquo;
        </SplitReveal>
        <FadeUp className="modes" delay={0.3}>
          <button aria-pressed={mode === 'grid'} onClick={() => changeMode('grid')}>
            Grid
          </button>
          <button aria-pressed={mode === 'full'} onClick={() => changeMode('full')}>
            Full
          </button>
        </FadeUp>
      </Head>
      <Pictures ref={container} className={mode}>
        {allPictures.map((picture) => (
          <figure
            key={picture.id}
            onClick={() => dispatch(setImg({ imgId: picture.id }))}
          >
            <Artwork src={picture.path} cursor="View" />
            {(picture.name || picture.dimensions) && (
              <figcaption>
                <p>{picture.name}</p>
                <span>{picture.dimensions}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </Pictures>
    </Section>
  );
}

export default Discover;
