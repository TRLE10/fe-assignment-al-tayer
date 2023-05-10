import { useEffect, useState } from 'react';
import { ProductsType } from 'types/products';

const useProducts = () => {
  const [products, setProducts] = useState<ProductsType | undefined>();

  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, [products]);

  const getProducts = () => {
    try {
      fetch('products.json')
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } catch (error) {
      console.error('There was an error', error);
    }
  };

  return { getProducts, products };
};

export default useProducts;
