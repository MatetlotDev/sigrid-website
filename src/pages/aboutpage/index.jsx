import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  padding: 3vw;
  width: 100vw;
  max-width: 100vw;
  height: 78vh;
  max-height: 78vh;

  @media ${({ theme }) => theme.sizes.tabletS} {
    display: block;
    height: fit-content;
    max-height: fit-content;
    padding: 8vw;
  }
`;
const ProfilePic = styled.div`
  width: 50%;
  img {
    min-width: 300px;
    width: 25vw;
    margin: 2vw 5vw 1vw 5vw;
  }
  span {
    display: block;
    margin-left: 5vw;
    font-family: 'Cormorant', serif;
    font-size: 1.4rem;
    min-width: max-content;
  }
  @media ${({ theme }) => theme.sizes.tabletS} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10vw;
    img {
      width: 60vw;
    }
  }
`;
const Description = styled.article`
  max-width: 800px;
  margin-right: 2vw;
  overflow: scroll;
  min-height: max-content;
  blockquote {
    font-family: 'Cinzel', serif;
    font-size: 2rem;
  }
  p {
    font-family: 'Cormorant', serif;
    font-size: 1.5rem;
    text-align: justify;
  }
`;

function About() {
  return (
    <Section>
      <ProfilePic>
        <img src="/images/profile-pic.jpeg" alt="picture of sigrid" />
        <span>Sigrid Freyens, 2022</span>
      </ProfilePic>
      <Description>
        <blockquote>&ldquo;Painting is energy made visible&rdquo;</blockquote>
        <br />
        <p>
          Sigrid Freyens is an African-born, Belgian artist who lives in Taranaki and
          whose paintings have been featured in solo and group exhibitions in
          Belgium.
        </p>
        <br />
        <p>
          She describes her artistic expression as &ldquo;a living process.&rdquo;
        </p>
        <br />
        <p>
          &ldquo;I believe that art is not only a way to express ourselves, but also
          a unique key to unlock the knowledge of the hidden world.&rdquo;
        </p>
        <br />
        <p>
          From a very young age , Sigrid has been driven by an unconscious search to
          connect with her environment through painting and drawing.
        </p>
        <br />
        <p>
          &ldquo;I see life as vibrant energy in constant motion. I feel colours and
          energy and give them shape, building a bridge between the inner and outer
          world. A process inspired by the moment, led by intuition and curiosity,
          highly inspired by nature.&rdquo;
        </p>
        <br />
        <p>
          Although her artistic expression has evolved over time, her love for
          creation remains constant.
        </p>
        <br />
        <p>
          &ldquo;Beauty is everywhere, I love to play with organic forms and earthy
          textures, layering colours... I have a constant thirst for exploration. Art
          is an adventure full of mystery, frustration and great happiness !&rdquo;
        </p>
      </Description>
    </Section>
  );
}

export default About;
