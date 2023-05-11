import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type ProductCardProps = {
  title: string;
  description: string;
  imgSrc: string;
  currency: string;
  price: number;
};

const ProductCard = ({ title, description, imgSrc, price, currency }: ProductCardProps) => {
  const { t } = useTranslation();
  const getSymbolForCurrency = (currency: string) => {
    if (currency === 'EUR') {
      return '€';
    } else if (currency === 'USD') {
      return '$';
    } else {
      return 'د.إ';
    }
  };

  return (
    <Flex {...styles.wrapper} aria-labelledby={title}>
      <Center flex={1}>
        <LazyLoadImage src={imgSrc} alt="Description of the image" width={200} height={200} effect="blur" />
      </Center>
      <Flex {...styles.infoWrapper}>
        <Text textStyle={['Large/Mobile/SemiBold', 'Large/Tablet/SemiBold', 'Large/Desktop/SemiBold']}>{title}</Text>
        <Text textStyle={['Medium/Mobile/Regular', 'Medium/Tablet/Regular', 'Medium/Desktop/Regular']}>
          {description}
        </Text>
        <Text
          textStyle={['Large/Mobile/Regular', 'Large/Tablet/Regular', 'Large/Desktop/Regular']}
        >{`${getSymbolForCurrency(currency)} ${price}`}</Text>
        <Button>{t('Buy Now')}</Button>
      </Flex>
    </Flex>
  );
};

export default memo(ProductCard);
