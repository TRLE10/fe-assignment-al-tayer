import { ChakraProvider } from '@chakra-ui/react';
import './i18n.ts';
import Router from './routes/Router';
import theme from './style/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
