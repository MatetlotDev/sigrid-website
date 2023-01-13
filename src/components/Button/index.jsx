import styled from 'styled-components';

const StyledButton = styled.button`
  display: block;
  border-radius: 0;
  border: ${({ theme, border }) =>
    border ? `1px solid ${theme.colors.black}` : 'none'};
  text-transform: uppercase;
  padding: clamp(15px, 20px, 25px);
  font-size: ${({ size }) => `clamp(${size}rem, ${size}rem, ${size}rem + 2vw)`};
  font-family: 'Cinzel', serif;
  background: ${({ outlined, theme }) => (outlined ? 'none' : theme.colors.black)};
  color: ${({ outlined, theme }) =>
    outlined ? theme.colors.black : theme.colors.white};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    ${({ outlined, theme }) =>
      outlined
        ? `
        background: ${theme.colors.black};
        color: ${theme.colors.white}
    `
        : `
        background: ${theme.colors.white};
        color: ${theme.colors.black}
    `}
  }
`;

const Button = ({ outlined, size, label, onClick, style, border }) => {
  return (
    <StyledButton
      style={style && style}
      onClick={() => onClick && onClick()}
      outlined={outlined}
      size={size}
      border={border}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
