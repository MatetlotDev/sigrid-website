import styled from 'styled-components';

const StyledButton = styled.button`
  display: block;
  border-radius: 0;
  border: ${({ theme, border, color }) =>
    border ? `1px solid ${color || theme.colors.black}` : 'none'};
  text-transform: uppercase;
  padding: ${({ size }) => `clamp(${size * 12}px, ${size * 17}px, ${size * 23}px)`};
  font-size: ${({ size }) => `clamp(${size}rem, ${size}rem, ${size}rem + 2vw)`};
  font-family: 'Cinzel', serif;
  background: ${({ outlined, theme }) => (outlined ? 'none' : theme.colors.black)};
  color: ${({ theme, color }) => color || theme.colors.black};
  cursor: pointer;
  transition: all 0.5s;
  height: fit-content;

  &:hover {
    ${({ outlined, theme, color, border }) => {
      if (outlined && color && border)
        return `
        background: ${color};
        color: ${theme.colors.black};
        border-color: ${theme.colors.black};
      `;
      else if (outlined)
        return `
        background: ${theme.colors.black};
        color: ${theme.colors.white}
        border-color: ${theme.colors.black};
      `;
      return `
        background: ${theme.colors.white};
        color: ${theme.colors.black}
      `;
    }}
  }
`;

const Button = ({
  className,
  outlined,
  size,
  label,
  onClick,
  style,
  border,
  type,
  color,
}) => {
  return (
    <StyledButton
      style={style && style}
      onClick={() => onClick && onClick()}
      outlined={outlined}
      size={size}
      border={border}
      type={type && type}
      color={color}
      className={className}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
