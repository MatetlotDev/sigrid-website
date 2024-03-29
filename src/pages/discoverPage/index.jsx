import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import ProgressiveImg from '../../components/ProgressiveImg';
import Quote from '../../components/Quote';
import { availablePictures, notAvailablePictures } from '../../constants';
import { setImg } from '../../store/globalSlice';

const Section = styled.section`
  padding: 5vw 10vw;
  width: 100vw;
  max-width: 100vw;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
`;
const PInfos = styled.p`
  font-family: 'Cormorant', serif;
  font-size: 1.4rem;
  margin: 2vw 0;

  a {
    color: black;
  }
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
  const [sortPictures, setSortPictures] = useState(true);

  return (
    <>
      <Quote>
        <blockquote>&ldquo;Art is for me a living process.&rdquo;</blockquote>
      </Quote>
      <Section>
        <Buttons>
          <Button
            label="Available"
            outlined
            size={1.35}
            onClick={() => setSortPictures(true)}
            border={sortPictures}
          />
          <Button
            label="Not Available"
            outlined
            size={1.35}
            onClick={() => setSortPictures(false)}
            border={!sortPictures}
          />
        </Buttons>
        <PInfos>
          {sortPictures && (
            <span>
              All these paints are available for purchase, contact me if you are
              interested.
            </span>
          )}
        </PInfos>
        <Pictures>
          {sortPictures
            ? availablePictures.map((pic, idx) => (
                <ImageWrapper idx={idx} key={pic.id}>
                  <ProgressiveImg
                    onClick={() => dispatch(setImg({ imgId: pic.id }))}
                    src={pic.path}
                    alt="painting"
                  />
                  <p>{pic?.name}</p>
                  <span>{pic.dimensions && `${pic?.dimensions} -`} Available</span>
                </ImageWrapper>
              ))
            : notAvailablePictures.map((pic, idx) => (
                <ImageWrapper idx={idx} key={pic.id}>
                  <ProgressiveImg
                    onClick={() => dispatch(setImg({ imgId: pic.id }))}
                    src={pic.path}
                    alt="paint"
                  />
                </ImageWrapper>
              ))}
        </Pictures>
      </Section>
    </>
  );
}

export default Discover;
