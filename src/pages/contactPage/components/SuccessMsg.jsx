import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/Button';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p:nth-child(3) {
    margin-bottom: 30px;
  }

  a {
    font-family: 'Cormorant';
    color: ${({ theme }) => theme.colors.black};
    font-size: 1.1rem;
  }
`;

const SuccessMsg = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Success !</h1>
      <p>Your message was successfully sent to my email.</p>
      <p>I will come back to you as soon as possible.</p>
      <Button
        color="#FFF"
        size={1}
        label="See paintings"
        onClick={() => navigate('/discover')}
      />
    </Container>
  );
};

export default SuccessMsg;
