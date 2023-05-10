import { Box, Center, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { Filters, Footer, Header, Pagination, ProductCard } from 'components';
import { useProducts } from 'hooks';
import { useCallback, useMemo, useState } from 'react';
import { ProductType } from 'types/products';
import styles from './styles';

const ProductListPage = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  return (
    <>
      <Flex {...styles.headerWrapper}>
        <Header />
      </Flex>
      <Grid {...styles.gridLayout}>
        <GridItem {...styles.filtersWrapper}>
          {products && <Filters products={products} onChange={handleChange} />}
        </GridItem>
        <Box>
          {filteredProducts.length ? (
            <Grid {...styles.productsWrapper}>
              {filteredProducts.map((product, index) => {
                const { id, name, description, img } = product;
                if (index >= minProductToDisplay && index <= maxProductToDisplay) {
                  return (
                    <GridItem key={id} {...styles.productCardWrapper}>
                      <ProductCard title={name} description={description} imgSrc={img} />
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
        </Box>
      </Grid>
      <Flex {...styles.footerWrapper}>
        <Footer />
      </Flex>
    </>
  );
};

export default ProductListPage;
