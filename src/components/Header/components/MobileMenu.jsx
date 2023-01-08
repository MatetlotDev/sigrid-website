import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../../pages';

const HeaderIcon = styled.div`
  position: relative;
  display: none;

  div {
    width: 50px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.white};
    margin: 13px 0;
    transition: all 0.5s ease-out;
    ${({ open }) => {
      if (open)
        return `
            transform: rotate(45deg);
            
            &:nth-child(1) {
                position: absolute;
                transform: rotate(-45deg);
            }
        `;
      return null;
    }}
  }

  @media ${({ theme }) => theme.sizes.mobile} {
    display: block;
  }
`;
const MenuWrapper = styled.menu`
  display: flex;
  position: absolute;
  background: ${({ theme }) => theme.colors.black};
  top: 11.8vh;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  color: ${({ theme }) => theme.colors.white};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.5s;
  pointer-events: none;
  ${({ open }) =>
    open &&
    `
    opacity: 1;
    z-index: 1234;
    pointer-events: all;
  `}

  ul {
    list-style: none;
    font-size: 55px;

    li {
      margin: 90px;
    }
    a:active {
      font-weight: 600;
    }
  }
`;

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <HeaderIcon onClick={() => setOpen(!open)} open={open}>
        <div />
        <div />
      </HeaderIcon>
      <MenuWrapper open={open}>
        <ul>
          {routes.map(
            (route) =>
              route.inHeader && (
                <Link to={route.path} onClick={() => setOpen(false)}>
                  <li>{route.name}</li>
                </Link>
              )
          )}
        </ul>
      </MenuWrapper>
    </>
  );
};

export default MobileMenu;
