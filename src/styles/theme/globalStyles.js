import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        background: ${({ theme }) => theme.colors.ivory};
    }

    html.lenis, html.lenis body {
        height: auto;
    }
    .lenis.lenis-smooth {
        scroll-behavior: auto !important;
    }
    .lenis.lenis-stopped {
        overflow: hidden;
    }

    body {
        overflow-x: hidden;
        background: ${({ theme }) => theme.colors.ivory};
        color: ${({ theme }) => theme.colors.anthracite};
        font-family: 'Cormorant', serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ::selection {
        background: ${({ theme }) => theme.colors.anthracite};
        color: ${({ theme }) => theme.colors.ivory};
    }

    /* Images handed over to the WebGL layer stay in the layout but are hidden. */
    .is-webgl [data-gl] {
        opacity: 0;
    }

    /* Hidden until their entrance animation takes over. */
    .is-motion [data-reveal] {
        visibility: hidden;
    }

    /* Lines produced by SplitText are masked so they can slide up from below. */
    .split-line {
        overflow: hidden;
        padding-bottom: 0.08em;
        margin-bottom: -0.08em;
    }

    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
        }
    }
`;

export default GlobalStyles;
