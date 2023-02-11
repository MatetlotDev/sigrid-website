import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Quote from '../../components/Quote';
import { mobileWidth, pictures, tabletSmallWidth } from '../../constants';
import { setImg } from '../../store/globalSlice';
import AboutText from './components/AboutText';

const Pictures = styled.section`
  margin: 6vw 0 7vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PicturesGrid = styled.div`
  display: grid;
  margin-bottom: 30px;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 25px;

  @media ${({ theme }) => theme.sizes.tabletS} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${({ theme }) => theme.sizes.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }

`;
const Image = styled.img`
  width: 35vmin;
  height: 35vmin;
  object-fit: cover;
  margin: 0 15px;
  cursor: pointer;

  @media ${({ theme }) => theme.sizes.tablet} {
    width: 25vmin;
    height: 25vmin;
  }
  @media ${({ theme }) => theme.sizes.tabletS} {
    width: 35vmin;
    height: 35vmin;
  }
  @media ${({ theme }) => theme.sizes.mobile} {
    width: 70vmin;
    height: 70vmin;
  }
`;
const About = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vw;

  .flex {
    align-items: center;
    display: flex;
  }

  .text {
    margin-left: 40px;
    max-width: 600px;
    text-align: justify;
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  img {
    width: 40vmin;
    height: 40vmin;
    object-fit: cover;
  }

  p {
    font-family: 'Cormorant', serif;
    font-size: 1.5rem;
  }

  @media ${({ theme }) => theme.sizes.tablet} {
    .text {
      width: 350px;
    }
  }
  @media ${({ theme }) => theme.sizes.tabletS} {
    .flex {
      flex-direction: column;
    }
    h2 {
      text-align: center;
    }
    .text {
      margin-left: 0;
      margin-top: 40px;
    }
  }
  @media ${({ theme }) => theme.sizes.mobile} {
    img {
      width: 70vmin;
      height: 70vmin;
    }
    .text {
      width: 70vmin;
    }
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.25rem;
    }
  }
`;

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const picturesGrid = () => {
    let numOfPictures = 9;
    if (tabletSmallWidth) numOfPictures = 6;
    if (mobileWidth) numOfPictures = 3;
    const randomPicturesIds = [
      pictures[Math.abs(Math.round(Math.random() * pictures.length))].id,
    ];

    while (randomPicturesIds.length < numOfPictures) {
      const num =
        pictures[Math.abs(Math.round(Math.random() * pictures.length - 1))].id;
      if (!randomPicturesIds.includes(num)) randomPicturesIds.push(num);
    }

    return (
      <PicturesGrid>
        {randomPicturesIds.map((picId) => {
          return (
            <Image
              onClick={() => dispatch(setImg({ imgId: picId }))}
              key={picId}
              src={pictures.filter((picture) => picture.id === picId)[0].path}
              alt="painting"
            />
          );
        })}
      </PicturesGrid>
    );
  };

  return (
    <>
      <Quote>
        <blockquote>&ldquo;Painting is energy made visible&rdquo;</blockquote>
        <p>
          I believe that art is not only a way to express ourselves, but also a
          unique key to unlock the knowledge of the hidden world.
        </p>
      </Quote>
      <Pictures>
        <Button
          outlined
          label="Discover"
          onClick={() => navigate('/discover')}
          size={2}
          style={{ margin: '4vw auto' }}
          border
        />
        {picturesGrid()}
      </Pictures>
      <About>
        <Button
          outlined
          label="about"
          onClick={() => navigate('/about')}
          size={2}
          style={{ margin: '4vw auto' }}
          border
        />
        <div className="flex">
          <img src="/images/profile-pic.jpeg" alt="Picture of sigrid" />
          <div className="text">
            <h2>Sigrid Freyens</h2>
            <AboutText />
          </div>
        </div>
      </About>
    </>
  );
}

export default Home;
