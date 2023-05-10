import { Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { ProductType, ProductsType } from 'types/products';
import CheckboxFilter from './checkboxFilter/CheckboxFilter';
import SliderFilter from './sliderFilter/SliderFilter';
import styles from './styles';

type FiltersProps = {
  products: ProductsType;
  onChange: (filteredProducts: ProductType[]) => void;
};

const Filters = ({ products, onChange }: FiltersProps) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]);
  const {
    data,
    filters: { price, sizes, colors },
  } = products;
  const min = price.min['EUR'];
  const max = price.max['EUR'];

  useEffect(() => {
    const filteredProducts = data.filter((product) => {
      const matchedSizes = selectedSizes.length === 0 || selectedSizes.some((size) => product.size.includes(size));
      const matchedColors =
        selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color));
      const matchedPrices =
        selectedPrice.length === 0 ||
        (product.price['EUR'] >= selectedPrice[0] && product.price['EUR'] <= selectedPrice[1]);

      return matchedSizes && matchedColors && matchedPrices;
    });
    onChange(filteredProducts);
  }, [selectedColors, selectedPrice, selectedSizes, data, onChange]);

  const handleChangeSizes = useCallback((selectedSizes: string[]) => {
    setSelectedSizes(selectedSizes);
  }, []);

  const handleChangeColors = useCallback((selecedColors: string[]) => {
    setSelectedColors(selecedColors);
  }, []);

  const handleChangePrice = useCallback((selectedPrice: number[]) => {
    setSelectedPrice(selectedPrice);
  }, []);

  return (
    <Flex {...styles.wrapper}>
      <Text {...styles.heading}>{'Filters'}</Text>
      {sizes && (
        <Flex {...styles.singleFilterWrapper}>
          <Text>{'Sizes'}</Text>
          <CheckboxFilter filters={sizes} onChange={handleChangeSizes} />
        </Flex>
      )}
      {colors && (
        <Flex {...styles.singleFilterWrapper}>
          <Text>{'Colors'}</Text>
          <CheckboxFilter filters={colors} onChange={handleChangeColors} />
        </Flex>
      )}
      {price && (
        <Flex {...styles.singleFilterWrapper}>
          <Text>{'Price'}</Text>
          <SliderFilter min={min} max={max} onChange={handleChangePrice} />
        </Flex>
      )}
    </Flex>
  );
};

export default Filters;
