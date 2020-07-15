const theme = {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#000',
    muted: '#f6f6f6',
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
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
  modes: {
    dark: {
      text: '#fff',
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
    }
  }
}

export default {
  theme
}
