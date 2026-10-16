import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { lockScroll } from '../../motion/core';
import { TransitionLink } from '../../motion/transition';
import { selectOpen } from '../../store/globalSlice';
import NavBar from '../Navbar';
import MobileMenu from './components/MobileMenu';

// Ivory with difference blending reads dark over the page and light over
// the paintings it passes above.
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 800;
  padding: clamp(18px, 2.4vw, 34px) clamp(20px, 3vw, 48px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.ivory};
  mix-blend-mode: difference;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  .logo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.1rem, 1.5vw, 1.45rem);
    letter-spacing: 0.06em;
  }

  .desktop-nav {
    @media ${({ theme }) => theme.sizes.tabletS} {
      display: none;
    }
  }
`;

function Header() {
  const [open, setOpen] = useState(false);
  const pictureOpen = useSelector(selectOpen);

  useEffect(() => {
    lockScroll(open || pictureOpen);
  }, [open, pictureOpen]);

  return (
    <>
      <HeaderWrapper>
        <TransitionLink to="/" className="logo" onClick={() => setOpen(false)}>
          Sigrid Freyens
        </TransitionLink>
        <NavBar className="desktop-nav" />
      </HeaderWrapper>
      <MobileMenu open={open} setOpen={setOpen} />
    </>
  );
}

export default Header;
