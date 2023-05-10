import { Text } from '@chakra-ui/react';
import styles from './styles';

const Footer = () => {
  const date = new Date();

  return <Text {...styles.textStyle}>{`All rights reserved ${date.getFullYear()}`}</Text>;
};

export default Footer;
