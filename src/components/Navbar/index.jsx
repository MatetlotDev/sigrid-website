import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../pages';

const NavBarWrapper = styled.nav`
  display: flex;
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
      font-size: ${({ large }) => (large ? 17 : 13)}px;

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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: max-content;
    ${({ large }) =>
      large
        ? `
        font-size: clamp(25px, 25px + 1.2vw, 41rem);
    `
        : `
        font-size: clamp(16px, 16px + 1.2vw, 32rem);
    `}
  }

  @media ${({ theme }) => theme.sizes.mobile} {
    justify-content: space-between;
    position: static;
    .desktop-ul {
      display: none;
    }
    span {
      position: ${({ large }) => (large ? 'static' : 'absolute')};
    }
  }
`;

const NavBar = ({ large }) => {
  const active = (path) =>
    window.location.pathname === path ? 'active' : 'not-active';

  return (
    <NavBarWrapper large={large}>
      <ul className="desktop-ul">
        {routes.map(
          (route) =>
            route.inHeader && (
              <Link key={route.path} to={route.path}>
                <li className={active(route.path)}>{route.name}</li>
              </Link>
            )
        )}
      </ul>
      <Link to="/">
        <span>Sigrid Freyens</span>
      </Link>
    </NavBarWrapper>
  );
};

export default NavBar;
