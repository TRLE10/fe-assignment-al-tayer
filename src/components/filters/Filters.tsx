import { Flex, SkeletonCircle, Text } from '@chakra-ui/react';
import { useProducts } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductType, ProductsType } from 'types/products';
import CheckboxFilter from './checkboxFilter/CheckboxFilter';
import SliderFilter from './sliderFilter/SliderFilter';
import styles from './styles';

type FiltersProps = {
  products?: ProductsType;
  onChange: (filteredProducts: ProductType[]) => void;
  currency: string;
};

const Filters = ({ products, onChange, currency }: FiltersProps) => {
  const { t } = useTranslation();
  const { isLoading } = useProducts();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]);
  const min = products?.filters?.price?.min[currency];
  const max = products?.filters?.price?.max[currency];

  useEffect(() => {
    const filteredProducts = products?.data?.filter((product) => {
      const matchedSizes = selectedSizes.length === 0 || selectedSizes.some((size) => product.size.includes(size));
      const matchedColors =
        selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color));
      const matchedPrices =
        selectedPrice.length === 0 ||
        (product.price[currency] >= selectedPrice[0] && product.price[currency] <= selectedPrice[1]);

      return matchedSizes && matchedColors && matchedPrices;
    });
    filteredProducts && onChange(filteredProducts);
  }, [selectedColors, selectedPrice, selectedSizes, onChange, currency, products?.data]);

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
    <Flex {...styles.wrapper} aria-labelledby={'filters'}>
      {isLoading ? (
        <>
          <SkeletonCircle size={'12'} />
          <SkeletonCircle size={'12'} />
          <SkeletonCircle size={'12'} />
        </>
      ) : (
        <>
          <Text {...styles.heading}>{t('Filters')}</Text>
          {products?.filters?.sizes && (
            <Flex {...styles.singleFilterWrapper}>
              <Text>{t('Sizes')}</Text>
              <CheckboxFilter filters={products?.filters?.sizes} onChange={handleChangeSizes} />
            </Flex>
          )}
          {products?.filters?.colors && (
            <Flex {...styles.singleFilterWrapper}>
              <Text>{t('Colors')}</Text>
              <CheckboxFilter filters={products?.filters?.colors} onChange={handleChangeColors} />
            </Flex>
          )}
          {products?.filters?.price && (
            <Flex {...styles.singleFilterWrapper}>
              <Text>{t('Price')}</Text>
              <SliderFilter min={min} max={max} onChange={handleChangePrice} />
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default Filters;
