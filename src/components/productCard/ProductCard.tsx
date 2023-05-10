import { Button, Center, Flex, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles';

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
        <Image src={imgSrc} boxSize={{ lg: '250px', md: '160px', sm: '120px' }} aspectRatio={'inherit'} />
      </Center>
      <Flex {...styles.infoWrapper}>
        <Text textStyle={['Heading/Mobile/SemiBold', 'Heading/Tablet/SemiBold', 'Heading/Desktop/SemiBold']}>
          {title}
        </Text>
        <Text textStyle={['Large/Mobile/Regular', 'Large/Tablet/Regular', 'Large/Desktop/Regular']}>{description}</Text>
        <Text
          textStyle={['Large/Mobile/Regular', 'Large/Tablet/Regular', 'Large/Desktop/Regular']}
        >{`${getSymbolForCurrency(currency)} ${price}`}</Text>
        <Button>{t('Buy Now')}</Button>
      </Flex>
    </Flex>
  );
};

export default memo(ProductCard);
