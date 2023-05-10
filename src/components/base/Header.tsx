import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import routeConstants from 'routes/routeConstants';
import styles from './styles';

const Header = () => {
  return (
    <Box borderBottom={'2px solid white'}>
      <Link to={routeConstants.HOME}>
        <Text {...styles.textStyle}>{'Home'}</Text>
      </Link>
    </Box>
  );
};

export default Header;
