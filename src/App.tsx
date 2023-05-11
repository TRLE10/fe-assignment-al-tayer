import { ChakraProvider } from '@chakra-ui/react';
import './i18n.ts';
import registerServiceWorker from './registerServiceWorker';
import Router from './routes/Router';
import theme from './style/theme';

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}

Notification.requestPermission();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
