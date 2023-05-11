import { ChakraProvider } from '@chakra-ui/react';
import './i18n.ts';
import Router from './routes/Router';
import theme from './style/theme';
import Fonts from './style/Fonts.tsx';
import registerServiceWorker from './registerServiceWorker';

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
      <Fonts />
    </ChakraProvider>
  );
}

export default App;
