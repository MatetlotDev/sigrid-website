import { v4 as uuid } from 'uuid';

export const notAvailablePictures = [
  {
    id: uuid(),
    name: 'Stillness',
    dimensions: '1520x1210',
    path: '/images/not_available/not_available000.webp',
    price: 3500,
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available001.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available002.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available003.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available004.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available005.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available006.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available007.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available008.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available009.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available010.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available011.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available012.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available013.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available014.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available15.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available015.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available016.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available017.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available018.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available022.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available023.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available043.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available066.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available075.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available0123.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available0129.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available0156.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available173.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available0198.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available0231.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available0234.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available238.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available0983.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available01382.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available02312.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available02342.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available2384.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available2736.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available2912.webp',
  },
  {
    id: uuid(),
    path: '/images/not_available/not_available2983.webp',
  },
];

export const availablePictures = [
  {
    id: uuid(),
    path: '/images/available/available2329.webp',
    name: 'Earth',
    dimensions: '760x760',
    price: 1600,
  },
  {
    id: uuid(),
    name: 'Flax',
    dimensions: '550x550',
    path: '/images/available/available003.webp',
    price: 650,
  },
  {
    id: uuid(),
    name: 'Deep ocean',
    dimensions: '760x760',
    path: '/images/available/available001.webp',
    price: 950,
  },
  {
    id: uuid(),
    name: 'Eucalyptus',
    dimensions: '760x1020',
    path: '/images/available/available009.webp',
    price: 1100,
  },
  {
    id: uuid(),
    name: 'Deep mountain',
    dimensions: '450x450',
    path: '/images/available/available014.webp',
    price: 550,
  },
  {
    id: uuid(),
    name: 'Pīwakawaka',
    dimensions: '355x455',
    path: '/images/available/available007.webp',
    price: 550,
  },
  {
    id: uuid(),
    path: '/images/available/available012.webp',
  },
  {
    id: uuid(),
    path: '/images/available/available0129.webp',
  },
  {
    id: uuid(),
    path: '/images/available/available923.webp',
  },
  {
    id: uuid(),
    path: '/images/available/available9873.webp',
  },
];

export const allPictures = availablePictures.concat(notAvailablePictures);

// contact form errors
const nameError = 'Your first name should be entered so I know who you are.';
const msgError =
  "Your message is either too small or missing, what's your question ?";
const emailError = 'It seems that your email is not valid.';
const timestampError =
  "You've probably already sent me a email less than 24 hours ago, wait a little bit more.";
const captchaError =
  "I need to verify that you're not a robot, Captcha is not checked.";
export const contactFormErrors = {
  nameError,
  msgError,
  emailError,
  timestampError,
  captchaError,
};

// localstorage
export const emailTimestamp = 'email_timestamp';

// sizes
export const tabletSize = 1350;
export const tabletSmallSize = 750;
export const mobileSize = 550;

export const tabletWidth = window.innerWidth <= tabletSize;
export const tabletSmallWidth = window.innerWidth <= tabletSmallSize;
export const mobileWidth = window.innerWidth <= mobileSize;
