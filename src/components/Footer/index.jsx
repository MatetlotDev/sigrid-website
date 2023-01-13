import styled from 'styled-components';
import NavBar from '../Navbar';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.black};
  padding: 15px;
  font-family: 'Cinzel', serif;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  position: relative;
  min-height: 10vh;
  max-height: 10vh;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <NavBar />
    </FooterWrapper>
  );
};

export default Footer;
