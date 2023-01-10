import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 4vw auto;
  display: block;
  border-radius: 0;
  border: 1px solid ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  padding: 25px;
  font-size: ${({ size }) => size}rem;
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

const Button = ({ outlined, size, label }) => {
  return (
    <StyledButton outlined={outlined} size={size}>
      {label}
    </StyledButton>
  );
};

export default Button;
