import styled from 'styled-components';
import NavBar from '../Navbar';
import MobileMenu from './components/MobileMenu';

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.black};
  padding: 30px;
  font-family: 'Cinzel', serif;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  position: relative;
  min-height: 12vh;
  max-height: 12vh;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return (
    <HeaderWrapper>
      <NavBar large />
      <MobileMenu />
    </HeaderWrapper>
  );
}

export default Header;
