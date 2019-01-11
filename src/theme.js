const colors = {
  whiteBase: '#fff',
  whiteLight: '#f0f0f0',
  whiteGrey: '#cecece',
  whiteDark: '#a0afd7',

  blackBase: '#333438',
  blackLight: '#4b4e57',
  blackBlue: '#2e3246',

  background: '#FFFFFF',
  backgroundDark: '#619686',

  primary: '#FDBB0A',
  primaryLight: '#619686',
  primaryDark: '#1F2A40',

  secondary: '#09A144',
  secondaryLight: '#FAEAC8',
  secondaryDark: '#84CAA3',

  ternary: '#FDBB0A'
};

// const shadow = {
//   card: '0 20px 30px rgba(0, 0, 0, 0.1)',
//   image: '0 15px 25px rgba(0, 0, 0, 0.1)',
//   suggestion: '0 -5px 30px rgba(0,0,0,0.2)',
//   footer: '0 -3px 26px rgba(0,0,0,0.5)',
//   feature: {
//     big: {
//       default: '0 40px 40px rgba(0, 0, 0, 0.2)',
//       hover: '0 50px 50px rgba(0, 0, 0, 0.1)',
//     },
//     small: {
//       default: '0 15px 25px rgba(0, 0, 0, 0.2)',
//       hover: '0 40px 45px rgba(0, 0, 0, 0.1)',
//     },
//   },
//   text: {
//     small: '0 5px 10px rgba(0, 0, 0, 0.25)',
//     big: '0 15px 20px rgba(0, 0, 0, 0.13)',
//   },
// };

const gradient = {
  // eslint-disable-next-line
  leftToRight: `linear-gradient(-45deg, ${colors.secondaryDark} 0%, ${colors.backgroundDark} 100%)`,
  // eslint-disable-next-line
  rightToLeft: `linear-gradient(45deg, ${colors.secondaryDark} 0%, ${colors.backgroundDark} 100%)`,
};

const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
};
const breakpoints = {
  xs: '400px',
  s: '600px',
  m: '900px',
  l: '1200px',
};

const theme = {
  colors,
  // fontSizes: [
  //   12, 14, 16, 20, 24, 32, 48, 64
  // ],
};

 

module.exports = {
  colors,
  theme,
  breakpoints,
  gradient,
  transition
};
