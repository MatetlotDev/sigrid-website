import styled from 'styled-components';

const QuoteWrapper = styled.section`
  height: 70vh;
  width: 100%;
  text-align: center;
  padding: 130px;

  blockquote {
    font-family: 'Cinzel', serif;
    font-size: clamp(30px, 30px + 1.2vw, 55px);
    margin: 80px auto;
  }
  p {
    font-family: 'Cormorant', serif;
    font-size: 31px;
    margin: auto;
    max-width: 50vw;
  }

  @media ${({ theme }) => theme.sizes.mobile} {
    padding: 13vw;

    blockquote {
      margin: 0 auto 8vw auto;
    }
    p {
      max-width: 100vw;
    }
  }
`;

const Quote = ({ children }) => {
  return <QuoteWrapper>{children}</QuoteWrapper>;
};

export default Quote;
