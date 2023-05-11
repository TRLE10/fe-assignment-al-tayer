import { ChakraProps } from '@chakra-ui/react';

const wrapper: ChakraProps = {
  w: 'full',
  justifyContent: 'space-between',
  px: 10,
};

const textStyle: ChakraProps = {
  color: 'whiteAlpha.800',
  textStyle: { sm: 'Large/Mobile/SemiBold', md: 'Large/Tablet/SemiBold', lg: 'Large/Desktop/SemiBold' },
};

export default { textStyle, wrapper };
