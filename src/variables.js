// eslint-disable-next-line
export const COLORS = {
  orange: '#FD681E',
  lightOrange: 'rgba(253,104,30,0.9)',
  extraLightOrange: 'rgba(253,104,30,0.6)',
  grey: {
    100: '#223042',
    90: 'rgba(34,48,66,0.9)',
    80: 'rgba(34,48,66,0.8)',
    70: 'rgba(34,48,66,0.7)',
    60: 'rgba(34,48,66,0.6)',
    50: 'rgba(34,48,66,0.5)',
    40: 'rgba(34,48,66,0.4)',
    30: 'rgba(34,48,66,0.3)',
    20: 'rgba(34,48,66,0.2)',
    10: 'rgba(34,48,66,0.1)',
  },
  red: '#FF5151',
  lightRed: '#F17070',
  green: '#47CF76',
  lightGreen: '#66DFB3',
  blue: '#3994DF',
  lightBlue: '#54D0E4',
  violet: '#6B6BE8',
  lightViolet: '#8989F5',
  RATING_COLORS: ['#ff6666', '#ff9366', '#ffbc64', '#bee586', '#66dfb3'],
};

const baseSize = 14;

const variables = {
  baseSize,
  sizes: {
    relative8: `${8 / baseSize}rem`,
    relative9: `${9 / baseSize}rem`,
    relative10: `${10 / baseSize}rem`,
    relative11: `${11 / baseSize}rem`,
    relative12: `${12 / baseSize}rem`,
    relative13: `${13 / baseSize}rem`,
    relative14: `${14 / baseSize}rem`,
    relative15: `${15 / baseSize}rem`,
    relative16: `${16 / baseSize}rem`,
    relative17: `${17 / baseSize}rem`,
    relative18: `${18 / baseSize}rem`,
    relative19: `${19 / baseSize}rem`,
    relative20: `${20 / baseSize}rem`,
  },
  borderRadius: 4,
  grid: {
    columns: 12,
    gutter: 1,
  },
  colors: {
    primary: COLORS.orange,
    lightPrimary: COLORS.lightOrange,
    extraLightPrimary: COLORS.extraLightOrange,
    separator: '#F5F5F5',
    pageBackground: '#f7f9fc',
    background: '#fcfcfc',
    hghlBackground: '#FFFAF7',
    success: COLORS.green,
    textColor: COLORS.grey[100],
    secondTextColor: COLORS.grey[60],
    lightTextColor: COLORS.grey[90],
    placeholderColor: COLORS.grey[40],
    borderColor: COLORS.grey[10],
    focusedBorderColor: COLORS.grey[20],
  },
  shadows: {
    primary: '0 2px 20px 0 rgba(255,132,73,0.4)',
    secondary: '0 0 18px 0 rgba(174,174,174,0.13)',
  },
  gradients: {
    primary: 'linear-gradient(270deg, #FF7A49 0%, #FF9248 97.2%)',
  },
};

export default variables;
