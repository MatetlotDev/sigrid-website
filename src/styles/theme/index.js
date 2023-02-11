import { mobileSize, tabletSize, tabletSmallSize } from '../../constants';

export const theme = {
  colors: {
    white: '#FFFFFF',
    black: '#0E0E0E',
  },
  fonts: ['Cinzel', 'Cormorant'],
  sizes: {
    mobile: `(max-width: ${mobileSize}px)`,
    tabletS: `(max-width: ${tabletSmallSize}px)`,
    tablet: `(max-width: ${tabletSize}px)`,
  },
};
