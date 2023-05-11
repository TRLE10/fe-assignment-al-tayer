import { Global } from '@emotion/react';

const Fonts = (): JSX.Element => {
  return (
    <Global
      styles={`@font-face {
        font-family: 'Roboto-regular';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://bshc.b-cdn.net/fonts/Roboto-Regular.woff2') format('woff2'), 
        url('https://bshc.b-cdn.net/fonts/Roboto-Regular.woff') format('woff');
      }`}
    />
  );
};

export default Fonts;
