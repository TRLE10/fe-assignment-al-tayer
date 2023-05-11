import { useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ProductsType } from 'types/products';

const useProducts = () => {
  const [products, setProducts] = useState<ProductsType | undefined>();
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, [products]);

  const getProducts = async () => {
    setIsLoading.on();
    try {
      const response = await fetch('products.json');
      const data = await response.json();
      setProducts(data);
      setIsLoading.off();
    } catch (error) {
      console.error('There was an error', error);
    }
  };

  return { getProducts, products, isLoading };
};

export default useProducts;
