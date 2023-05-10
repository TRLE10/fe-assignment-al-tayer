import { ChakraProvider } from '@chakra-ui/react';
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
