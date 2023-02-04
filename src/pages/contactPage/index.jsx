import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { pictures } from '../../constants';
import { selectActualImg } from '../../store/globalSlice';
import { Description, ProfilePic, Section } from '../aboutpage';
import ContactForm from './components/ContactForm';
import SuccessMsg from './components/SuccessMsg';
import { selectContactLoading, selectMsgSent } from './redux/contactSlice';

const ImageWrapper = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5%;

  img {
    width: 25vw;
    height: 25vw;
    object-fit: cover;
    cursor: pointer;
    margin: 0;
    margin-bottom: 1vw;
    @media ${({ theme }) => theme.sizes.tablet} {
      min-width: 50vw;
      min-height: 50vw;
    }
  }
  p,
  span {
    margin: 0;
  }
  @media ${({ theme }) => theme.sizes.tablet} {
    width: 100%;
  }
`;
const loaderAnimation = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
  height: 100%;
  min-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: ' ';
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: ${loaderAnimation} 1.5s ease-in-out infinite;
  }
`;

function Contact() {
  const actualImg = useSelector(selectActualImg);
  const loading = useSelector(selectContactLoading);
  const msgSent = useSelector(selectMsgSent);

  const [img, setImg] = useState(null);

  useEffect(() => {
    if (actualImg) setImg(actualImg);
    else setImg(pictures[Math.round(Math.random() * pictures.length - 1)]);
  }, [window.location.pathname]);

  const contactContent = useMemo(() => {
    if (loading) return <Loader />;
    if (msgSent) return <SuccessMsg />;
    return <ContactForm />;
  }, [loading]);

  return (
    <Section>
      <ImageWrapper>
        <ProfilePic>
          <img src={img && img.path} />
          {img && img.available && (
            <>
              <p>{img.name}</p>
              <span>
                {img.dimensions} - {img.available && 'Available'}
              </span>
              <span>{img.price} NZ$</span>
            </>
          )}
        </ProfilePic>
      </ImageWrapper>
      <Description>{contactContent}</Description>
    </Section>
  );
}

export default Contact;
