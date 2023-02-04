export const pictures = [
  {
    id: 0,
    name: 'Earth',
    dimensions: '760x760',
    path: '/images/available/available011.jpeg',
    price: 1600,
    available: true,
  },
  {
    id: 1,
    name: 'Stillness',
    dimensions: '1520x1210',
    path: '/images/available/available000.jpeg',
    price: 3500,
    available: true,
  },
  {
    id: 2,
    name: 'Misty day',
    dimensions: '300x910',
    path: '/images/available/available004.jpeg',
    price: 600,
    available: true,
  },
  {
    id: 3,
    name: 'Flax',
    dimensions: '550x550',
    path: '/images/available/available003.jpeg',
    price: 650,
    available: true,
  },
  {
    id: 4,
    name: 'Deep ocean',
    dimensions: '760x760',
    path: '/images/available/available001.jpeg',
    price: 950,
    available: true,
  },
  {
    id: 5,
    name: 'Eucalyptus',
    dimensions: '760x1020',
    path: '/images/available/available009.jpeg',
    price: 1100,
    available: true,
  },
  {
    id: 6,
    name: 'Voyage',
    dimensions: '500x500',
    path: '/images/available/available005.jpeg',
    price: 750,
    available: true,
  },
  {
    id: 7,
    name: 'Forest',
    dimensions: '355x455',
    path: '/images/available/available008.jpeg',
    price: 650,
    available: true,
  },
  {
    id: 8,
    name: 'NZ rock wren',
    dimensions: '500x500',
    path: '/images/available/available006.jpeg',
    price: 850,
    available: true,
  },
  {
    id: 9,
    name: 'Organic light',
    dimensions: '760x760',
    path: '/images/available/available002.jpeg',
    price: 1200,
    available: true,
  },
  {
    id: 10,
    name: 'Deep mountain',
    dimensions: '450x450',
    path: '/images/available/available014.jpeg',
    price: 550,
    available: true,
  },
  {
    id: 11,
    name: 'Vibrancy',
    dimensions: '350x400',
    path: '/images/available/available015.jpg',
    price: 850,
    available: true,
  },
  {
    id: 12,
    name: 'Beginnings',
    dimensions: '760x1020',
    path: '/images/available/available010.jpeg',
    price: 1800,
    available: true,
  },
  {
    id: 13,
    name: 'Pīwakawaka',
    dimensions: '355x455',
    path: '/images/available/available007.jpeg',
    price: 550,
    available: true,
  },
  {
    id: 14,
    path: '/images/not-available/not-available019.jpeg',
    available: false,
  },
  {
    id: 15,
    path: '/images/not-available/not-available000.jpeg',
    available: false,
  },
  {
    id: 16,
    path: '/images/not-available/not-available001.jpeg',
    available: false,
  },
  {
    id: 17,
    path: '/images/not-available/not-available002.jpeg',
    available: false,
  },
  {
    id: 18,
    path: '/images/not-available/not-available003.jpeg',
    available: false,
  },
  {
    id: 19,
    path: '/images/not-available/not-available004.jpeg',
    available: false,
  },
  {
    id: 20,
    path: '/images/not-available/not-available005.jpeg',
    available: false,
  },
  {
    id: 21,
    path: '/images/not-available/not-available006.jpeg',
    available: false,
  },
  {
    id: 22,
    path: '/images/not-available/not-available007.jpeg',
    available: false,
  },
  {
    id: 23,
    path: '/images/not-available/not-available008.jpeg',
    available: false,
  },
  {
    id: 24,
    path: '/images/not-available/not-available009.jpeg',
    available: false,
  },
  {
    id: 25,
    path: '/images/not-available/not-available010.jpeg',
    available: false,
  },
  {
    id: 26,
    path: '/images/not-available/not-available011.jpeg',
    available: false,
  },
  {
    id: 27,
    path: '/images/not-available/not-available012.jpeg',
    available: false,
  },
  {
    id: 28,
    path: '/images/not-available/not-available013.jpeg',
    available: false,
  },
  {
    id: 29,
    path: '/images/not-available/not-available014.jpeg',
    available: false,
  },
  {
    id: 30,
    path: '/images/not-available/not-available015.jpg',
    available: false,
  },
  {
    id: 31,
    path: '/images/not-available/not-available016.jpg',
    available: false,
  },
  {
    id: 32,
    path: '/images/not-available/not-available017.jpg',
    available: false,
  },
  {
    id: 33,
    path: '/images/not-available/not-available018.jpg',
    available: false,
  },
];

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
