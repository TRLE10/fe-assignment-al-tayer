import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from './App.tsx';
import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Helmet>
      {/* Include all necessary tags for SEO and PWA */}
      <meta
        name="description"
        content="Discover the latest trends in fashion with our wide range of clothing. From casual wear to formal attire, our collection promises high-quality fabrics and timeless designs. Start your style journey with us today. sticky, sweet treat with just a hint of salt that you'll keep coming back for."
      />
      <meta name="theme-color" content="#317EFB" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <link rel="https://bshc.b-cdn.net/icons/apple-touch-icon.png" href="icon-192x192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
    <App />
  </BrowserRouter>
);
