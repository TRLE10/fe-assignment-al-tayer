import { Flex } from '@chakra-ui/react';
import { ProductCard } from 'components';

const ProductListPage = () => {
  return (
    <Flex gap={4}>
      <ProductCard
        title={'Lorem ipsum'}
        description={
          'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum '
        }
        imgSrc=""
      />
      <ProductCard
        title={'Lorem ipsum'}
        description={
          'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum '
        }
        imgSrc=""
      />
      <ProductCard
        title={'Lorem ipsum'}
        description={
          'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum '
        }
        imgSrc=""
      />
    </Flex>
  );
};

export default ProductListPage;
