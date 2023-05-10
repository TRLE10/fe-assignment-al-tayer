import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const Footer = () => {
  const { t } = useTranslation();
  const date = new Date();

  return <Text {...styles.textStyle}>{t('All rights reserved') + ` ${date.getFullYear()}`}</Text>;
};

export default Footer;
