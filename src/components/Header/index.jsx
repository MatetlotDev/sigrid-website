import { useState } from 'react';
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
  position: ${({ open }) => (open ? 'fixed' : 'relative')};
  min-height: 12vh;
  max-height: 12vh;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderWrapper open={open}>
      <NavBar large setOpen={setOpen} />
      <MobileMenu open={open} setOpen={setOpen} />
    </HeaderWrapper>
  );
}

export default Header;
