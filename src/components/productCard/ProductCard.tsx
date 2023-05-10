import { Button, Center, Flex, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles';

type ProductCardProps = {
  title: string;
  description: string;
  imgSrc: string;
};

const ProductCard = ({ title, description, imgSrc }: ProductCardProps) => {
  const { t } = useTranslation();

  return (
    <Flex {...styles.wrapper}>
      <Center flex={1}>
        <Image src={imgSrc} boxSize={{ lg: '250px', md: '160px', sm: '120px' }} aspectRatio={'inherit'} />
      </Center>
      <Flex {...styles.infoWrapper}>
        <Text textStyle={['Heading/Mobile/SemiBold', 'Heading/Tablet/SemiBold', 'Heading/Desktop/SemiBold']}>
          {title}
        </Text>
        <Text textStyle={['Large/Mobile/Regular', 'Large/Tablet/Regular', 'Large/Desktop/Regular']}>{description}</Text>
        <Button>{t('Buy Now')}</Button>
      </Flex>
    </Flex>
  );
};

export default memo(ProductCard);
