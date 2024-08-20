import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProgressiveImg from '../../components/ProgressiveImg';
import Quote from '../../components/Quote';
import { allPictures } from '../../constants';
import { setImg } from '../../store/globalSlice';

const Section = styled.section`
  padding: 0 10vw 5vw 10vw;
  width: 100vw;
  max-width: 100vw;
`;
const Pictures = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5.75vw;
  max-width: 100%;

  @media ${({ theme }) => theme.sizes.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${({ theme }) => theme.sizes.tabletS} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${({ theme }) => theme.sizes.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ImageWrapper = styled.div`
  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    cursor: pointer;
  }
  p {
    font-family: 'Cinzel', serif;
    font-size: 1.6rem;
  }
  span {
    font-family: 'Cormorant', serif;
    font-size: 1.2rem;
    display: block;
    margin: 0.2vw;
  }
`;

function Discover() {
  const dispatch = useDispatch();

  return (
    <>
      <Quote>
        <blockquote>&ldquo;Art is for me a living process.&rdquo;</blockquote>
      </Quote>
      <Section>
        <Pictures>
          {allPictures.map((pic, idx) => (
            <ImageWrapper idx={idx} key={pic.id}>
              <ProgressiveImg
                onClick={() => dispatch(setImg({ imgId: pic.id }))}
                src={pic.path}
                alt="painting"
              />
              <p>{pic?.name}</p>
              <span>{pic.dimensions}</span>
            </ImageWrapper>
          ))}
        </Pictures>
      </Section>
    </>
  );
}

export default Discover;
