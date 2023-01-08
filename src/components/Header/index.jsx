import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../pages';
import MobileMenu from './components/MobileMenu';

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.black};
  padding: 30px;
  font-family: 'Cinzel', serif;
  width: 100vw;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  position: relative;
  min-height: 12vh;
  max-height: 12vh;
  align-items: center;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
  }

  .desktop-ul {
    list-style: none;
    display: flex;

    li {
      padding: 10px;
      margin-right: 30px;
      position: relative;
      font-size: 17px;

      &::after {
        content: '';
        height: 1px;
        background: ${({ theme }) => theme.colors.white};
        position: absolute;
        width: 0;
        bottom: 0;
        left: 0;
        transition: width 0.4s;
      }
      &:hover {
        &::after {
          width: 100%;
        }
      }

      &.active {
        font-weight: 600;

        &::after {
          width: 100%;
        }
      }
    }
  }

  span {
    font-size: clamp(25px, 25px + 1.2vw, 41rem);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: max-content;
  }

  @media ${({ theme }) => theme.sizes.mobile} {
    justify-content: space-between;
    position: static;
    .desktop-ul {
      display: none;
    }
    span {
      position: static;
    }
  }
`;

function Header() {
  const active = (path) => window.location.pathname === path && 'active';

  return (
    <HeaderWrapper>
      <ul className="desktop-ul">
        {routes.map(
          (route) =>
            route.inHeader && (
              <Link to={route.path}>
                <li className={active(route.path)}>{route.name}</li>
              </Link>
            )
        )}
      </ul>
      <Link to="/">
        <span>Sigrid Freyens</span>
      </Link>
      <MobileMenu />
    </HeaderWrapper>
  );
}

export default Header;
