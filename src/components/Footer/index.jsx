import styled from 'styled-components';
import { scrollToTop } from '../../motion/core';
import NavBar from '../Navbar';
import { SplitReveal } from '../Reveal';

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.colors.anthracite};
  color: ${({ theme }) => theme.colors.ivory};
  padding: clamp(60px, 10vw, 140px) clamp(20px, 3vw, 48px) clamp(20px, 2vw, 32px);

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;
  }

  .tagline {
    font-family: 'Cormorant', serif;
    font-style: italic;
    font-size: clamp(1.4rem, 2.4vw, 2.2rem);
    max-width: 22ch;
    line-height: 1.2;
  }

  .name {
    margin: clamp(48px, 8vw, 120px) 0 clamp(20px, 2vw, 32px);
    font-family: 'Cinzel', serif;
    font-size: clamp(2.2rem, 11.2vw, 13rem);
    line-height: 0.9;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .meta {
    font-family: 'Cormorant', serif;
    font-size: 1.05rem;
    opacity: 0.6;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 8px 0;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    padding: 80px 20px max(20px, env(safe-area-inset-bottom));

    .row {
      flex-direction: column;
      align-items: flex-start;
      gap: 32px;
    }
    .tagline {
      font-size: 1.5rem;
    }
    .name {
      margin: 64px 0 24px;
      font-size: 10.6vw;
    }
    .meta {
      flex-direction: row;
      align-items: center;
      font-size: 0.95rem;
    }
  }
`;

const Footer = () => (
  <FooterWrapper>
    <div className="row">
      <SplitReveal as="p" className="tagline">
        &ldquo;Art is an adventure full of mystery, frustration and great
        happiness.&rdquo;
      </SplitReveal>
      <NavBar />
    </div>
    <SplitReveal as="p" by="chars" className="name" start="top 95%">
      Sigrid Freyens
    </SplitReveal>
    <div className="row meta">
      <span>Taranaki, New Zealand — © {new Date().getFullYear()}</span>
      <button onClick={() => scrollToTop()}>Back to top ↑</button>
    </div>
  </FooterWrapper>
);

export default Footer;
