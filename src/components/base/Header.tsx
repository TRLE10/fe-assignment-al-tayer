import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routeConstants from 'routes/routeConstants';
import styles from './styles';

type HeaderProps = {
  onChangeCurrency?: (currency: string) => void;
};

const Header = ({ onChangeCurrency }: HeaderProps) => {
  const { i18n, t } = useTranslation();
  const [currency, setCurrency] = useState<string>('EUR');
  const locales = ['en', 'ar'];
  const currencies = ['EUR', 'USD', 'AED'];

  useEffect(() => {
    onChangeCurrency && onChangeCurrency(currency);
  }, [currency, onChangeCurrency]);

  const handleChangeLocale = (locale: string) => {
    i18n.changeLanguage(locale);
    if (locale === 'ar') {
      setCurrency('AED');
    } else if (locale === 'en') {
      setCurrency('USD');
    }
  };

  const handleChangeCurrency = useCallback((currency: string) => {
    setCurrency(currency);
  }, []);

  return (
    <Flex {...styles.wrapper} aria-labelledby={'navigation'}>
      <Link to={routeConstants.HOME}>
        <Text {...styles.textStyle} borderBottom={'2px solid white'}>
          {t('Home')}
        </Text>
      </Link>
      <Flex justifyContent={'flex-end'} gap={2}>
        {locales.map((locale) => {
          return (
            <Box onClick={() => handleChangeLocale(locale)} key={locale} _hover={{ cursor: 'pointer' }}>
              <Text {...styles.textStyle}>{locale}</Text>
            </Box>
          );
        })}
        <Divider orientation={'vertical'} />
        {currencies.map((currency) => {
          return (
            <Box key={currency} onClick={() => handleChangeCurrency(currency)} _hover={{ cursor: 'pointer' }}>
              <Text {...styles.textStyle}>{currency}</Text>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Header;
