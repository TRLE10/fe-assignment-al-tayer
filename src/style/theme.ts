import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import { Button } from './components';
import { textStyles } from './textStyles';

const components = {
  Button,
};

const theme = extendTheme({ components, textStyles, colors });

export default theme;
