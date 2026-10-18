import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TransitionLink } from '../../motion/transition';
import { routes } from '../../pages';

// Link whose label rolls up to reveal a copy of itself on hover.
export const RollLink = styled(TransitionLink)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1.2;

  span {
    display: block;
    transition: transform 0.7s ${({ theme }) => theme.ease.out};
  }
  span + span {
    position: absolute;
    top: 100%;
    left: 0;
  }
  @media (hover: hover) {
    &:hover span {
      transform: translateY(-100%);
    }
  }

  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: currentColor;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  gap: clamp(20px, 3vw, 48px);
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const NavBar = ({ className }) => {
  const { pathname } = useLocation();

  return (
    <nav className={className}>
      <List>
        {routes
          .filter((route) => route.inHeader)
          .map((route) => (
            <li key={route.path}>
              <RollLink
                to={route.path}
                className={pathname === route.path ? 'active' : undefined}
              >
                <span>{route.name}</span>
                <span aria-hidden="true">{route.name}</span>
              </RollLink>
            </li>
          ))}
      </List>
    </nav>
  );
};

export default NavBar;
