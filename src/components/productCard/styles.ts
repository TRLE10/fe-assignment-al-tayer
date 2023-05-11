import { ChakraProps } from '@chakra-ui/react';

const wrapper: ChakraProps = {
  p: 4,
  gap: 4,
  bg: 'neutrals.100',
  h: 'full',
  _hover: {
    boxShadow: '0 0 5px grey',
  },
};

const infoWrapper: ChakraProps = {
  flexDir: 'column',
  gap: 4,
  flex: 1,
  h: 'full',
};

export default {
  wrapper,
  infoWrapper,
};
