import { css, injectGlobal } from 'styled-components';

const sizes = {
  desktop: [992, 100000],
  tablet: [768, 991],
  phone: [0, 767],
};

// Iterate through the sizes and create a media template
const Media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label][0]}px) and (max-width: ${sizes[label][1]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

injectGlobal`
  .hiddenPhone {
    ${Media.phone`display: none`}
  }
  .hiddenTablet {
    ${Media.tablet`display: none`}
  }
  .hiddenDesktop {
    ${Media.desktop`display: none`}
  }
`;

export default Media;
