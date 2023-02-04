import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Reaptcha from 'reaptcha';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { contactFormErrors, emailTimestamp } from '../../../constants';
import { selectActualImg } from '../../../store/globalSlice';
import { isEmail, loadState, saveState } from '../../../utils';
import { setLoading, setMsgSent } from '../redux/contactSlice';

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

const ContactForm = () => {
  const formRef = useRef();
  const captchaRef = useRef(null);

  const dispatch = useDispatch();

  const actualImg = useSelector(selectActualImg);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [paintName, setPaintName] = useState(actualImg ? actualImg.name : '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [captchaVerif, setCaptchaVerif] = useState(false);

  const verifyInputsAreCorrect = () => {
    const nameVerif = !!firstName;
    const msgVerif = message.length > 10;
    const validEmail = isEmail(email);
    let validTimestamp = false;
    const timestampStorage = loadState(emailTimestamp);
    if (timestampStorage) {
      if (new Date().getTime() + 1 * 24 * 60 * 60 * 1000 > timestampStorage)
        validTimestamp = true;
    } else {
      saveState(emailTimestamp, new Date().getTime());
      validTimestamp = true;
    }

    if (nameVerif && msgVerif && captchaVerif && validEmail && validTimestamp) {
      return true;
    } else if (!nameVerif) setError(contactFormErrors.nameError);
    else if (!msgVerif) setError(contactFormErrors.msgError);
    else if (!validEmail) setError(contactFormErrors.emailError);
    else if (!validTimestamp) setError(contactFormErrors.timestampError);
    else if (!captchaVerif) setError(contactFormErrors.captchaError);
    return false;
  };

  const sendMail = () => {
    if (verifyInputsAreCorrect()) {
      dispatch(setLoading(true));
      emailjs
        .sendForm(
          import.meta.env.EMAIL_SERVICE_ID,
          import.meta.env.EMAIL_TEMPLATE_ID,
          formRef.current,
          import.meta.env.EMAIL_PUBLIC_KEY
        )
        .then(() => {
          dispatch(setLoading(false));
          setMsgSent(true);
        })
        .catch((err) => {
          dispatch(setLoading(false));
          setError(err);
        });
    } else setError('Something went wrong...');
  };

  return (
    <>
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
            captchaRef.current.getResponse().then(() => {
              setCaptchaVerif(true);
            });
          }}
          ref={captchaRef}
          sitekey={import.meta.env.G_RECAPTCHA_SITE_KEY}
        ></StyledCaptcha>
        <FlexComp>
          <Button color="#FFF" size={1.35} label="send" type="submit" />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FlexComp>
      </form>
    </>
  );
};

export default ContactForm;
