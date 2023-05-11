import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import { Button } from './components';
import { textStyles } from './textStyles';

const components = {
  Button,
};

const fonts = {
  body: `'Roboto-Regular'`,
};

const theme = extendTheme({ components, textStyles, colors, fonts });

export default theme;
