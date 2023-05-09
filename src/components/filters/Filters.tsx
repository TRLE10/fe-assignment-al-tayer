import { Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { ProductType, ProductsType } from 'types/products';
import CheckboxFilter from './checkboxFilter/CheckboxFilter';
import SliderFilter from './sliderFilter/SliderFilter';

type FiltersProps = {
  products: ProductsType;
  onChange: (filteredProducts: ProductType[]) => void;
};

const Filters = ({ products, onChange }: FiltersProps) => {
  const [selectedColors, setSelectedColors] = useState<ProductType[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<ProductType[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const {
    data,
    filters: { price, sizes, colors },
  } = products;
  const min = price.min['EUR'];
  const max = price.max['EUR'];

  useEffect(() => {
    if (!selectedColors.length && !selectedSizes.length) {
      setFilteredProducts(data);
      onChange(filteredProducts);
      return;
    }
    const allFilteredProducts = selectedColors.concat(selectedSizes).concat(selectedPrice);
    setFilteredProducts(allFilteredProducts.filter((item, index) => allFilteredProducts.indexOf(item) === index));
    onChange(filteredProducts);
  }, [selectedColors, selectedPrice, selectedSizes, onChange, data, filteredProducts]);

  const handleChangeSizes = useCallback(
    (selectedSizes: string[]) => {
      for (const selectedSize of selectedSizes) {
        const asd = data.filter((product) => product.size.includes(selectedSize));
        setSelectedSizes((prev) => prev.concat(asd));
      }
    },
    [data]
  );

  const handleChangeColors = useCallback(
    (selectedColors: string[]) => {
      for (const selectedColor of selectedColors) {
        const asd = data.filter((product) => product.colors.includes(selectedColor));
        setSelectedColors((prev) => prev.concat(asd));
      }
    },
    [data]
  );

  const handleChangePrice = useCallback(
    (values: number[]) => {
      const filteredByPrice = data.filter((product) => {
        return product.price['EUR'] >= values[0] && product.price['EUR'] <= values[1];
      });
      setSelectedPrice(filteredByPrice);
    },
    [data]
  );

  return (
    <Flex flexDir={'column'} gap={4} p={4}>
      <Text textAlign={'center'}>{'Filters'}</Text>
      {sizes && (
        <Flex flexDir={'column'} gap={2}>
          <Text>{'Sizes'}</Text>
          <CheckboxFilter filters={sizes} onChange={handleChangeSizes} />
        </Flex>
      )}
      {colors && (
        <Flex flexDir={'column'} gap={2}>
          <Text>{'Colors'}</Text>
          <CheckboxFilter filters={colors} onChange={handleChangeColors} />
        </Flex>
      )}
      {price && (
        <Flex flexDir={'column'} gap={2}>
          <Text>{'Price'}</Text>
          <SliderFilter min={min} max={max} onChange={handleChangePrice} />
        </Flex>
      )}
    </Flex>
  );
};

export default Filters;
