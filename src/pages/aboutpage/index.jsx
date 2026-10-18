import styled from 'styled-components';
import Artwork from '../../components/Artwork';
import { FadeUp, Parallax, SplitReveal } from '../../components/Reveal';

const Section = styled.section`
  padding: clamp(130px, 16vw, 220px) clamp(20px, 3vw, 48px) clamp(80px, 12vw, 180px);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(16px, 2vw, 32px);

  h1 {
    grid-column: 1 / -1;
    font-family: 'Cinzel', serif;
    font-weight: 400;
    font-size: clamp(3rem, 10vw, 11rem);
    line-height: 0.85;
    margin-bottom: clamp(50px, 8vw, 130px);
  }

  .portrait {
    grid-column: 1 / 6;
    position: sticky;
    top: 120px;
    align-self: start;

    .frame {
      aspect-ratio: 4 / 5;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    span {
      display: block;
      margin-top: 12px;
      font-size: 1.05rem;
      opacity: 0.6;
    }
  }

  article {
    grid-column: 7 / 13;

    blockquote {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.8rem, 3vw, 3rem);
      line-height: 1.15;
      margin-bottom: clamp(40px, 5vw, 80px);
    }
    p {
      font-size: clamp(1.2rem, 1.5vw, 1.6rem);
      line-height: 1.45;
      margin-bottom: 1.2em;
    }
    p.lead {
      font-size: clamp(1.6rem, 2.4vw, 2.4rem);
      font-weight: 300;
      line-height: 1.2;
    }
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    display: block;
    padding: 112px 20px 96px;

    h1 {
      font-size: clamp(3.4rem, 19vw, 5rem);
      margin-bottom: 40px;
    }
    .portrait {
      position: static;
      width: 86%;
    }
    article {
      margin-top: 64px;

      blockquote {
        font-size: clamp(1.6rem, 7.4vw, 2.1rem);
        margin-bottom: 40px;
      }
      p {
        font-size: 1.22rem;
        line-height: 1.5;
      }
      p.lead {
        font-size: clamp(1.45rem, 6vw, 1.8rem);
        line-height: 1.25;
      }
    }
  }
`;

const paragraphs = [
  'From a very young age, Sigrid has been driven by an unconscious search to connect with her environment through painting and drawing.',
  '“I see life as vibrant energy in constant motion. I feel colours and energy and give them shape, building a bridge between the inner and outer world. A process inspired by the moment, led by intuition and curiosity, highly inspired by nature.”',
  'Although her artistic expression has evolved over time, her love for creation remains constant.',
  '“Beauty is everywhere, I love to play with organic forms and earthy textures, layering colours... I have a constant thirst for exploration. Art is an adventure full of mystery, frustration and great happiness!”',
];

function About() {
  return (
    <Section>
      <SplitReveal as="h1" by="chars">
        About
      </SplitReveal>
      <div className="portrait">
        <Parallax className="frame" speed={4}>
          <Artwork src="/images/profile-pic.jpg" alt="Portrait of Sigrid Freyens" />
        </Parallax>
        <FadeUp as="span">Sigrid Freyens, 2024</FadeUp>
      </div>
      <article>
        <SplitReveal as="blockquote">
          &ldquo;Painting is energy made visible&rdquo;
        </SplitReveal>
        <SplitReveal as="p" className="lead">
          Sigrid Freyens is an African-born, Belgian artist who lives in Taranaki and
          whose paintings have been featured in solo and group exhibitions in Belgium
          and in New Zealand.
        </SplitReveal>
        <SplitReveal as="p">
          She describes her artistic expression as &ldquo;a living process.&rdquo;
          &ldquo;I believe that art is not only a way to express ourselves, but also
          a unique key to unlock the knowledge of the hidden world.&rdquo;
        </SplitReveal>
        {paragraphs.map((text) => (
          <SplitReveal as="p" key={text}>
            {text}
          </SplitReveal>
        ))}
      </article>
    </Section>
  );
}

export default About;
