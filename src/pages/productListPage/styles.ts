import { ChakraProps, GridItemProps, GridProps } from '@chakra-ui/react';

const gridLayout: GridProps = {
  minH: '100vh',
  gridTemplateRows: {
    lg: '1fr',
    md: 'auto repeat(7 1fr) auto',
    sm: 'auto repeat(12 1fr) auto',
  },
  templateColumns: { lg: 'auto 1fr', md: '1fr', sm: 'auto' },
};

const headerWrapper: GridItemProps = {
  bg: 'primary.600',
  boxShadow: '0 0 20px grey',
  w: 'full',
  py: 2,
};

const filtersWrapper: GridItemProps = {
  rowSpan: { lg: 3, md: 1, sm: 1 },
  colSpan: { lg: 1, md: 2, sm: 1 },
  bgGradient: 'linear(to-b, neutrals.500, neutrals.400)',
  boxShadow: '0 0 20px grey',
};

const productsWrapper: GridProps = {
  p: [5, 10, 10],
  gridTemplateRows: { sm: 'repeat(10 1fr)', md: 'repeat(10 1fr)', lg: 'repeat(5 1fr)' },
  gridTemplateColumns: { sm: '1fr', md: '1fr', lg: '1fr 1fr' },
};

const productCardWrapper: GridItemProps = {
  rowSpan: 1,
  colSpan: 1,
  p: [1, 2, 2],
};

const paginationWrapper: GridItemProps = {
  rowSpan: 1,
  colSpan: { lg: 3, md: 2, sm: 1 },
  pb: 10,
};

const footerWrapper: GridItemProps = {
  bg: 'primary.600',
  boxShadow: '0 0 20px grey',
  w: 'full',
  justifyContent: 'center',
  p: 2,
};

const noProductsHeading: ChakraProps = {
  textStyle: { lg: 'Heading/Desktop/Bold', md: 'Heading/Tablet/Bold', sm: 'Heading/Mobile/Bold' },
};

export default {
  gridLayout,
  headerWrapper,
  filtersWrapper,
  productCardWrapper,
  paginationWrapper,
  footerWrapper,
  productsWrapper,
  noProductsHeading,
};
