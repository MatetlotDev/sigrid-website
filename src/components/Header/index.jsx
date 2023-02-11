import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectOpen } from '../../store/globalSlice';
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
  const [open, setOpen] = useState(false);
  const pictureOpen = useSelector(selectOpen);

  useEffect(() => {
    if (open || pictureOpen) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'unset';
    }
  }, [open, pictureOpen]);

  return (
    <HeaderWrapper open={open}>
      <NavBar large setOpen={setOpen} />
      <MobileMenu open={open} setOpen={setOpen} />
    </HeaderWrapper>
  );
}

export default Header;
