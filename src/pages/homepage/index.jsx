import styled from 'styled-components';
import Header from '../../components/Header';
import Quote from '../../components/Quote';
import { availablePictures, notAvailablePictures } from '../../constants';

const Pictures = styled.section``;
const PicturesLine = styled.div``;
const Button = styled.button``;
const ButtonWrapper = styled.div``;
const Image = styled.img``;

function Home() {
  const randomFolder =
    Math.random() > 0.5 ? notAvailablePictures : availablePictures;
  const randomPictures = [randomFolder[Math.abs(Math.round(Math.random() * randomFolder.length))].id];

  while (randomPictures.length < 4) {
    const fold = Math.random() > 0.5 ? notAvailablePictures : availablePictures;
    const num = fold[Math.abs(Math.round(Math.random() * fold.length - 1))].id;
    if (!randomPictures.includes(num)) randomPictures.push(fold[num].id);
  }

  console.log(randomPictures);

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
        <PicturesLine></PicturesLine>
        <ButtonWrapper>
          <Button outlined>discover</Button>
        </ButtonWrapper>
        <PicturesLine>{/* 4 random pictures */}</PicturesLine>
      </Pictures>
    </>
  );
}

export default Home;
