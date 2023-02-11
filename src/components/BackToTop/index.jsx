import { SlArrowUp } from 'react-icons/sl';
import styled from 'styled-components';

const Wrapper = styled.button`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  border: 0.5px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 50%;
  position: fixed;
  bottom: 100px;
  right: 40px;
  z-index: 11;
  cursor: pointer;
`;

const BackToTop = ({ visible, onClick }) => {
  return (
    <Wrapper visible={visible} onClick={() => onClick('smooth')}>
      <SlArrowUp />
    </Wrapper>
  );
};

export default BackToTop;
