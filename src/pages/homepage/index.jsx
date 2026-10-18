import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Artwork from '../../components/Artwork';
import { FadeUp, Parallax, SplitReveal } from '../../components/Reveal';
import { allPictures } from '../../constants';
import { TransitionLink } from '../../motion/transition';
import { setImg } from '../../store/globalSlice';

const Hero = styled.section`
  position: relative;
  min-height: 100svh;
  padding: clamp(110px, 14vw, 180px) clamp(20px, 3vw, 48px) clamp(24px, 3vw, 48px);
  display: grid;
  grid-template-columns: 1fr minmax(0, 38vw) 1fr;
  grid-template-rows: 1fr auto;
  align-items: end;
  gap: clamp(16px, 2vw, 32px);

  .visual {
    grid-column: 2;
    grid-row: 1 / 3;
    align-self: center;
    height: min(72svh, 60vw);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .intro {
    grid-column: 1;
    grid-row: 1;
    align-self: start;
    max-width: 24ch;
    font-size: clamp(1.15rem, 1.4vw, 1.45rem);
    line-height: 1.35;
  }

  .meta {
    grid-column: 3;
    grid-row: 1;
    align-self: start;
    justify-self: end;
    text-align: right;
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.8;
  }

  h1 {
    grid-column: 1 / -1;
    grid-row: 2;
    position: relative;
    z-index: 2;
    font-family: 'Cinzel', serif;
    font-weight: 400;
    font-size: clamp(2.4rem, 10.6vw, 14rem);
    line-height: 0.85;
    letter-spacing: 0.01em;
    white-space: nowrap;
    text-align: center;
    color: ${({ theme }) => theme.colors.ivory};
    mix-blend-mode: difference;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    align-items: start;

    .visual {
      grid-column: 1;
      grid-row: 2;
      height: 62svh;
    }
    .intro {
      grid-row: 1;
    }
    .meta {
      display: none;
    }
    h1 {
      grid-row: 3;
      margin-top: -0.5em;
    }
  }
`;

const Statement = styled.section`
  padding: clamp(100px, 16vw, 240px) clamp(20px, 3vw, 48px);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;

  .label {
    grid-column: 1 / 4;
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding-top: 1.2em;
  }

  blockquote {
    grid-column: 4 / 13;
    font-family: 'Cormorant', serif;
    font-weight: 300;
    font-size: clamp(2rem, 4.6vw, 5rem);
    line-height: 1.08;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    display: block;
    padding: 96px 16px;

    .label {
      padding-top: 0;
      margin-bottom: 24px;
      font-size: 0.75rem;
    }
    blockquote {
      font-size: clamp(1.45rem, 6.4vw, 2rem);
      line-height: 1.18;
    }
  }
`;

const Works = styled.section`
  padding: 0 clamp(20px, 3vw, 48px) clamp(80px, 12vw, 180px);

  .head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid currentColor;
    padding-bottom: 16px;
    margin-bottom: clamp(60px, 8vw, 120px);

    h2 {
      font-family: 'Cinzel', serif;
      font-weight: 400;
      font-size: clamp(2rem, 4vw, 4rem);
    }
    span {
      font-family: 'Cinzel', serif;
      letter-spacing: 0.1em;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: clamp(12px, 2vw, 32px);
    row-gap: clamp(60px, 10vw, 160px);
    align-items: start;
  }

  figure {
    cursor: pointer;

    .frame {
      overflow: hidden;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    figcaption {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      font-family: 'Cormorant', serif;
      font-size: 1.1rem;
    }
    .index {
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
    }
  }

  /* An irregular, editorial rhythm for the six selected works. */
  figure:nth-child(1) {
    grid-column: 1 / 6;
    aspect-ratio: 4 / 5;
  }
  figure:nth-child(2) {
    grid-column: 8 / 12;
    aspect-ratio: 1;
    margin-top: 30vh;
  }
  figure:nth-child(3) {
    grid-column: 3 / 7;
    aspect-ratio: 1;
  }
  figure:nth-child(4) {
    grid-column: 8 / 13;
    aspect-ratio: 5 / 6;
    margin-top: 12vh;
  }
  figure:nth-child(5) {
    grid-column: 1 / 5;
    aspect-ratio: 3 / 4;
    margin-top: 8vh;
  }
  figure:nth-child(6) {
    grid-column: 6 / 11;
    aspect-ratio: 1;
    margin-top: 26vh;
  }

  figure .frame {
    height: 100%;
  }

  .cta {
    margin-top: clamp(80px, 10vw, 160px);
    display: flex;
    justify-content: center;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    padding-bottom: 96px;

    .head {
      margin-bottom: 48px;
    }
    .grid {
      row-gap: 72px;
    }
    .grid figure:nth-child(n) {
      grid-column: 1 / -1;
      margin-top: 0;
    }
    /* Alternate inset frames keep an editorial rhythm on a single column. */
    .grid figure:nth-child(even) {
      grid-column: 4 / -1;
    }
    .grid figure:nth-child(4n + 3) {
      grid-column: 1 / 11;
    }
    .cta {
      margin-top: 80px;
    }
  }
`;

export const CircleLink = styled(TransitionLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(150px, 14vw, 210px);
  aspect-ratio: 1;
  border: 1px solid currentColor;
  border-radius: 50%;
  overflow: hidden;
  font-family: 'Cinzel', serif;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  isolation: isolate;
  transition: color 0.6s ${({ theme }) => theme.ease.out};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.anthracite};
    transform: translateY(101%);
    transition: transform 0.7s ${({ theme }) => theme.ease.out};
  }
  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.ivory};
    }
    &:hover::before {
      transform: translateY(0);
    }
  }
  &:active {
    color: ${({ theme }) => theme.colors.ivory};
  }
  &:active::before {
    transform: translateY(0);
    transition-duration: 0.3s;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    width: 136px;
    font-size: 0.8rem;
  }
`;

const AboutTeaser = styled.section`
  padding: clamp(80px, 10vw, 160px) clamp(20px, 3vw, 48px);
  background: ${({ theme }) => theme.colors.ivoryDark};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(16px, 2vw, 32px);
  align-items: center;

  .portrait {
    grid-column: 2 / 6;
    aspect-ratio: 4 / 5;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text {
    grid-column: 7 / 12;

    h2 {
      font-family: 'Cinzel', serif;
      font-weight: 400;
      font-size: clamp(2.2rem, 4.5vw, 4.5rem);
      line-height: 1;
      margin-bottom: 32px;
    }
    p {
      font-size: clamp(1.2rem, 1.5vw, 1.55rem);
      line-height: 1.4;
      margin-bottom: 1em;
    }
    a {
      margin-top: 32px;
    }
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    display: block;
    padding: 80px 20px 96px;

    .portrait {
      width: 78%;
      margin: 0 auto 56px;
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: center;

      h2 {
        margin-bottom: 24px;
      }
      a {
        align-self: center;
        margin-top: 40px;
      }
    }
  }
`;

const pickRandom = (list, count) => {
  const pool = [...list];
  const picked = [];
  while (picked.length < count && pool.length) {
    picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return picked;
};

function Home() {
  const dispatch = useDispatch();
  const [heroPicture, ...selection] = useMemo(() => pickRandom(allPictures, 7), []);

  return (
    <>
      <Hero>
        <SplitReveal as="p" className="intro" delay={0.2}>
          African-born, Belgian painter of organic forms, earthy textures and layered
          colour.
        </SplitReveal>
        <SplitReveal as="p" className="meta" delay={0.3}>
          Taranaki
          <br />
          New Zealand
        </SplitReveal>
        <Parallax className="visual" speed={8}>
          <Artwork
            src={heroPicture.path}
            cursor="View"
            onClick={() => dispatch(setImg({ imgId: heroPicture.id }))}
          />
        </Parallax>
        <SplitReveal as="h1" by="chars" delay={0.1}>
          Sigrid Freyens
        </SplitReveal>
      </Hero>

      <Statement>
        <FadeUp className="label">(Statement)</FadeUp>
        <SplitReveal as="blockquote">
          &ldquo;I believe that art is not only a way to express ourselves, but also
          a unique key to unlock the knowledge of the hidden world.&rdquo;
        </SplitReveal>
      </Statement>

      <Works>
        <div className="head">
          <SplitReveal as="h2">Selected works</SplitReveal>
          <FadeUp as="span">({String(allPictures.length).padStart(2, '0')})</FadeUp>
        </div>
        <div className="grid">
          {selection.map((picture, index) => (
            <figure
              key={picture.id}
              onClick={() => dispatch(setImg({ imgId: picture.id }))}
            >
              <Parallax className="frame" speed={index % 2 ? 6 : 3}>
                <Artwork src={picture.path} cursor="View" />
              </Parallax>
              <FadeUp as="figcaption">
                <span className="index">{String(index + 1).padStart(2, '0')}</span>
                <span>{picture.name || 'Untitled'}</span>
              </FadeUp>
            </figure>
          ))}
        </div>
        <div className="cta">
          <CircleLink to="/discover">All works</CircleLink>
        </div>
      </Works>

      <AboutTeaser>
        <Parallax className="portrait" speed={6}>
          <Artwork src="/images/profile-pic.jpg" alt="Portrait of Sigrid Freyens" />
        </Parallax>
        <div className="text">
          <SplitReveal as="h2">A living process</SplitReveal>
          <SplitReveal as="p">
            Sigrid Freyens is an African-born, Belgian artist who lives in Taranaki
            and whose paintings have been featured in solo and group exhibitions in
            Belgium and in New Zealand.
          </SplitReveal>
          <SplitReveal as="p">
            &ldquo;I see life as vibrant energy in constant motion. I feel colours
            and energy and give them shape.&rdquo;
          </SplitReveal>
          <CircleLink to="/about">About</CircleLink>
        </div>
      </AboutTeaser>
    </>
  );
}

export default Home;
