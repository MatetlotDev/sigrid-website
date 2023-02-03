import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Reaptcha from 'reaptcha';
import styled, { keyframes } from 'styled-components';
import Button from '../../components/Button';
import { selectActualImg } from '../../components/PictureVisual/redux/PictureVisualSlice';
import { pictures } from '../../constants';
import { isEmail, loadState, saveState } from '../../utils';
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

  input,
  textarea {
    width: ${({ small }) => small && '47%'};
    font-size: 1.6rem;
    padding: 0.6rem;
    font-family: 'Cormorant', serif;
  }
  textarea {
    resize: none;
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
const loaderAnimation = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
  &::after {
    content: ' ';
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${loaderAnimation} 1.5s ease-in-out infinite;
  }
`;
const FlexComp = styled.div`
  display: flex;
  align-items: center;
`;
const ErrorMessage = styled.p`
  color: #ce2b2b;
  font-size: 1.25rem !important;
  margin-left: 20px;
`;
const StyledCaptcha = styled(Reaptcha)`
  margin-bottom: 20px;
`;

function Contact() {
  const actualImg = useSelector(selectActualImg);
  const formRef = useRef();
  const [img, setImg] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [paintName, setPaintName] = useState(actualImg ? actualImg.name : '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    "You've probably already sent me a email less than 24 hours ago, wait a little bit more."
  );
  const [captchaVerif, setCaptchaVerif] = useState(false);
  const captchaRef = useRef(null);

  useEffect(() => {
    if (actualImg) setImg(actualImg);
    else setImg(pictures[Math.round(Math.random() * pictures.length - 1)]);
  }, [window.location.pathname]);

  const verifyInputsAreCorrect = () => {
    const nameVerif = !!firstName;
    const msgVerif = message.length > 10;
    const validEmail = isEmail(email);
    let validTimestamp = false;
    const timestampStorage = loadState('email_timestamp');

    if (timestampStorage) {
      if (new Date().getTime() + 1 * 24 * 60 * 60 * 1000 > timestampStorage)
        validTimestamp = true;
    } else {
      saveState('email_timestamp', new Date());
      validTimestamp = true;
    }

    if (nameVerif && msgVerif && captchaVerif && validEmail && validTimestamp)
      return true;
    else if (!nameVerif)
      setError('Your first name should be entered so I know who you are.');
    else if (!msgVerif)
      setError(
        "Your message is either too small or missing, what's your question ?"
      );
    else if (!validEmail) setError('It seems that your email is not valid.');
    else if (!validTimestamp)
      setError(
        "You've probably already sent me a email less than 24 hours ago, wait a little bit more."
      );
    else if (!captchaVerif) setError("I need to verify that you're not a robot.");
    return false;
  };

  const sendMail = () => {
    if (verifyInputsAreCorrect()) {
      setLoading(true);
      emailjs
        .sendForm(
          import.meta.env.EMAIL_SERVICE_ID,
          import.meta.env.EMAIL_TEMPLATE_ID,
          formRef.current,
          import.meta.env.EMAIL_PUBLIC_KEY
        )
        .then(() => {
          setLoading(false);
          // show success message
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  };

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
        <form ref={formRef} onSubmit={sendMail}>
          <FlexInput>
            <FormControl>
              <label htmlFor="first-name">First Name*</label>
              <input
                onChange={({ target }) => setFirstName(target.value)}
                value={firstName}
                name="first-name"
                required
                id="first-name"
                type="text"
              />
            </FormControl>
            <FormControl>
              <label htmlFor="last-name">Last Name</label>
              <input name="last-name" id="last-name" type="text" />
            </FormControl>
          </FlexInput>
          <FormControl>
            <label htmlFor="email">Email*</label>
            <input
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              name="email"
              required
              id="email"
              type="text"
            />
          </FormControl>
          <FormControl small>
            <label htmlFor="paint-name">
              Paint Name (if it's a question about one)
            </label>
            <input
              name="paint-name"
              onChange={({ target }) => setPaintName(target.value)}
              value={paintName}
              id="paint-name"
              type="text"
            />
          </FormControl>
          <FormControl>
            <label htmlFor="Message">Message*</label>
            <textarea
              onChange={({ target }) => setMessage(target.value)}
              value={message}
              name="message"
              required
              rows="4"
              id="Message"
            />
          </FormControl>
          <StyledCaptcha
            onVerify={() => {
              captchaRef.current.getResponse().then((res) => {
                setCaptchaVerif(true);
              });
            }}
            ref={captchaRef}
            sitekey={import.meta.env.G_RECAPTCHA_SITE_KEY}
          ></StyledCaptcha>
          <FlexComp>
            <Button
              color="#FFF"
              size={1.35}
              label={loading ? <Loader /> : 'send'}
              type="submit"
              onClick={sendMail}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FlexComp>
        </form>
      </Description>
    </Section>
  );
}

export default Contact;
