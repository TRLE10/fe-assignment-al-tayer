import { Grid, GridItem } from '@chakra-ui/react';
import { Filters, ProductCard } from 'components';
import Pagination from 'components/pagination/Pagination';
import { useProducts } from 'hooks';
import { useCallback, useMemo, useState } from 'react';
import { ProductType } from 'types/products';

const ProductListPage = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const minProductToDisplay = useMemo(() => {
    if (products?.pagination) {
      const {
        pagination: { per_page },
      } = products;
      return currentPage === 1 ? currentPage - 1 : currentPage * per_page - 10;
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
    <Grid
      minH={'100vh'}
      gridTemplateRows={{
        lg: 'auto repeat(5 1fr) auto',
        md: 'auto repeat(7 1fr) auto',
        sm: 'auto repeat(12 1fr) auto',
      }}
      templateColumns={{ lg: 'repeat(4, 1fr)', md: 'repeat(2, 1fr)', sm: '1fr' }}
    >
      <GridItem rowSpan={1} colSpan={{ lg: 4, md: 2, sm: 1 }} bg={'grey'}>
        Header
      </GridItem>
      <GridItem rowSpan={{ lg: 5, md: 1, sm: 1 }} colSpan={{ lg: 1, md: 2, sm: 1 }} bg={'gray.600'}>
        {products && <Filters products={products} onChange={handleChange} />}
      </GridItem>
      {filteredProducts.map((product, index) => {
        const { id, name, description, img } = product;
        if (index >= minProductToDisplay && index <= maxProductToDisplay) {
          return (
            <GridItem key={id} rowSpan={1} colSpan={1} m={2}>
              <ProductCard title={name} description={description} imgSrc={img} />
            </GridItem>
          );
        }
      })}
      <GridItem rowSpan={1} colSpan={{ lg: 3, md: 2, sm: 1 }} justifyContent={'center'}>
        {products?.pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.round(filteredProducts.length / products.pagination.per_page)}
            onPageChange={onPageChange}
          />
        )}
      </GridItem>
      <GridItem rowSpan={1} colSpan={{ lg: 4, md: 2, sm: 1 }} bg={'gray.500'}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default ProductListPage;
