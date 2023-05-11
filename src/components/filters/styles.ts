import { ChakraProps } from '@chakra-ui/react';

const wrapper: ChakraProps = {
  flexDir: 'column',
  flex: 1,
  gap: 4,
  px: 10,
  py: [4, 12, 12],
};

const singleFilterWrapper: ChakraProps = {
  flexDir: 'column',
  flexWrap: 'wrap',
  color: 'whiteAlpha.800',
  gap: 2,
  textStyle: ['Large/Mobile/Regular', 'Large/Tablet/Regular', 'Large/Desktop/Regular'],
};

const heading: ChakraProps = {
  color: 'whiteAlpha.800',
  textAlign: 'center',
  textStyle: ['Large/Mobile/Bold', 'Large/Tablet/Bold', 'Large/Desktop/Bold'],
};

export default { wrapper, singleFilterWrapper, heading };
