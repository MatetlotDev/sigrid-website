import { mobileSize, tabletSize, tabletSmallSize } from '../../constants';

export const theme = {
  colors: {
    white: '#EFEBE3',
    black: '#262826',
    ivory: '#EFEBE3',
    ivoryDark: '#E2DDD2',
    anthracite: '#262826',
    muted: '#8C8A83',
  },
  fonts: ['Cinzel', 'Cormorant'],
  ease: {
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOut: 'cubic-bezier(0.76, 0, 0.24, 1)',
  },
  sizes: {
    mobile: `(max-width: ${mobileSize}px)`,
    tabletS: `(max-width: ${tabletSmallSize}px)`,
    tablet: `(max-width: ${tabletSize}px)`,
  },
};
