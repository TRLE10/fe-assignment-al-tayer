import { Box, Center, Flex, Grid, GridItem, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react';
import { Filters, Footer, Header, Pagination, ProductCard } from 'components';
import { useProducts } from 'hooks';
import { useCallback, useMemo, useState } from 'react';
import { ProductType } from 'types/products';
import styles from './styles';

const ProductListPage = () => {
  const { products, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currency, setCurrency] = useState<string>('');
  const numberOfSkeletons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const minProductToDisplay = useMemo(() => {
    if (products?.pagination) {
      const {
        pagination: { per_page },
      } = products;
      const pageLimit = currentPage * per_page - 10;
      return currentPage === 1 ? currentPage - 1 : pageLimit;
    }
    return 0;
  }, [currentPage, products]);
  const maxProductToDisplay = useMemo(() => {
    if (products?.pagination) {
      const {
        pagination: { per_page },
      } = products;
      return currentPage * per_page - 1;
    }
    return 0;
  }, [currentPage, products]);

  const handleChange = useCallback((products: ProductType[]) => {
    setFilteredProducts(products);
  }, []);

  const onPageChange = useCallback((changedPage: number) => {
    setCurrentPage(changedPage);
  }, []);

  const handleChangeCurrency = useCallback((currency: string) => {
    setCurrency(currency);
  }, []);

  return (
    <>
      <Flex {...styles.headerWrapper}>
        <Header onChangeCurrency={handleChangeCurrency} />
      </Flex>
      <Grid {...styles.gridLayout}>
        <GridItem {...styles.filtersWrapper}>
          <Filters products={products} onChange={handleChange} currency={currency} />
        </GridItem>
        <Box>
          {isLoading ? (
            <Grid {...styles.productsWrapper}>
              {numberOfSkeletons.map((index) => {
                return (
                  <GridItem key={index} {...styles.productCardWrapper}>
                    <Box padding="6" boxShadow="lg">
                      <SkeletonCircle size="10" />
                      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                    </Box>
                  </GridItem>
                );
              })}
            </Grid>
          ) : (
            <>
              {filteredProducts.length ? (
                <Grid {...styles.productsWrapper}>
                  {filteredProducts.map((product, index) => {
                    const { id, name, description, img, price } = product;
                    if (index >= minProductToDisplay && index <= maxProductToDisplay) {
                      return (
                        <GridItem key={id} {...styles.productCardWrapper}>
                          <ProductCard
                            title={name}
                            description={description}
                            imgSrc={img}
                            price={price[currency]}
                            currency={currency}
                          />
                        </GridItem>
                      );
                    }
                  })}
                </Grid>
              ) : (
                <Center h={'full'}>
                  <Text {...styles.noProductsHeading}>{'There is no products that match given criteria'}</Text>
                </Center>
              )}
              <GridItem {...styles.paginationWrapper}>
                {products?.pagination && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.round(filteredProducts.length / products.pagination.per_page)}
                    onPageChange={onPageChange}
                  />
                )}
              </GridItem>
            </>
          )}
        </Box>
      </Grid>
      <Flex {...styles.footerWrapper}>
        <Footer />
      </Flex>
    </>
  );
};

export default ProductListPage;
