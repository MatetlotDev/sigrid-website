import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Quote from '../../components/Quote';
import { pictures } from '../../constants';

const Pictures = styled.section`
  margin: 10vw 0 15vw 0;
`;
const PicturesLine = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  justify-content: space-around;

  @media ${({ theme }) => theme.sizes.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;
const Image = styled.img`
  width: 35vmin;
  height: 35vmin;
  object-fit: cover;
  margin: 0 15px;

  @media ${({ theme }) => theme.sizes.mobile} {
    width: 80vmin;
    height: 80vmin;
    margin: 45px 0;
  }
`;

function Home() {
  const navigate = useNavigate();

  const picturesLine = () => {
    const randomPicturesIds = [
      pictures[Math.abs(Math.round(Math.random() * pictures.length))].id,
    ];

    while (randomPicturesIds.length < 4) {
      const num =
        pictures[Math.abs(Math.round(Math.random() * pictures.length - 1))].id;
      if (!randomPicturesIds.includes(num)) randomPicturesIds.push(num);
    }

    return (
      <PicturesLine>
        {randomPicturesIds.map((picId) => {
          return (
            <Image
              key={picId}
              src={pictures.filter((picture) => picture.id === picId)[0].path}
              alt="painting"
            />
          );
        })}
      </PicturesLine>
    );
  };

  return (
    <>
      <Header />
      <Quote>
        <blockquote>&ldquo;Painting is energy made visible&rdquo;</blockquote>
        <p>
          I believe that art is not only a way to express ourselves, but also a
          unique key to unlock the knowledge of the hidden world.
        </p>
      </Quote>
      <Pictures>
        {picturesLine()}
        <Button
          outlined
          label="Discover"
          onClick={() => navigate('/discover')}
          size={2}
        />
        {picturesLine()}
      </Pictures>
      <Footer />
    </>
  );
}

export default Home;
