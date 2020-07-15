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

  ternary: '#FDBB0A',
  color: 'black'

};


// eslint-disable-next-line camelcase
const night_mode_colors = {
  whiteBase: '#fff',
  whiteLight: '#bab9b9',
  whiteGrey: '#FF5D6462',
  whiteDark: '#a0afd7',

  blackBase: '#333438',
  blackLight: '#4b4e57',
  blackBlue: '#2e3246',

  background: '#363537',
  backgroundDark: '#6B8096',

  primary: '#e43f5a',
  primaryLight: '#ffbd69',
  primaryDark: '#1F2A40',

  secondary: '#1f4068',
  secondaryLight: '#1f4068',
  secondaryDark:  '#bab9b9' ,

  color: '#bab9b9',
  ternary: '#647589',
  toggleBorder: '#6B8096',

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


const lightModeTheme = {
  colors,
  // fontSizes: [
  //   12, 14, 16, 20, 24, 32, 48, 64
  // ],
};

const darkModeTheme = {
  colors: night_mode_colors,
  // fontSizes: [
  //   12, 14, 16, 20, 24, 32, 48, 64
  // ],
};


const techColors = {
  'VUEJS':'#42b883',
  'REACT':'#00d8ff',
  'FLASK':'#990303',
  'POSTGIS':'#336791',
  'POSTGRES':'#336791',
  'GATSBY':'#542c85',
  'GRIDSOME': '#00835c',
  'NETLIFY': '#146396',
  'DRUPAL':'#0678be',
  'OAUTH2.0':'#eb5424',
  'BOOTSTRAP':'#7952b3',
  'PHP':'#8892bf'
}

module.exports = {
  colors,
  lightModeTheme,
  gradient,
  darkModeTheme,
  techColors
};
