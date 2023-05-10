import { ChakraProvider } from '@chakra-ui/react';
import Router from './routes/Router';
import theme from './style/theme';
import registerServiceWorker from './registerServiceWorker';

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
