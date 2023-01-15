import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { pictures } from '../../constants';
import { Description, ProfilePic, Section } from '../aboutpage';

const FlexInput = styled.div`
  display: flex;
  @media ${({ theme }) => theme.sizes.tabletS} {
    display: block;
  }
`;
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Cormorant', serif;
  font-size: 1.3rem;
  margin: 0 2vw 1vw 0;

  input {
    width: ${({ small }) => small && '47%'};
    font-size: 1.6rem;
    padding: 0.6rem;
    font-family: 'Cormorant', serif;
  }
  @media ${({ theme }) => theme.sizes.tablet} {
    width: 97%;
  }
`;
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

function Contact() {
  const [img, setImg] = useState(null);

  useEffect(() => {
    setImg(pictures[Math.round(Math.random() * pictures.length - 1)]);
  }, [window.location.pathname]);

  const sendMail = () => {};

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
      <Description>
        <h1>A question ?</h1>
        <form>
          <FlexInput>
            <FormControl>
              <label htmlFor="first-name">First Name*</label>
              <input required id="first-name" type="text" />
            </FormControl>
            <FormControl>
              <label htmlFor="last-name">Last Name</label>
              <input id="last-name" type="text" />
            </FormControl>
          </FlexInput>
          <FormControl>
            <label htmlFor="email">Email*</label>
            <input required id="email" type="text" />
          </FormControl>
          <FormControl small>
            <label htmlFor="paint-name">
              Paint Name (if it's a question about one)
            </label>
            <input id="paint-name" type="text" />
          </FormControl>
          <FormControl>
            <label htmlFor="Message">Message*</label>
            <textarea required rows="9" maxlength="10" id="Message" />
          </FormControl>
          <Button color="#FFF" size={1.35} label="send" type="submit" onClick={sendMail} />
        </form>
      </Description>
    </Section>
  );
}

export default Contact;
