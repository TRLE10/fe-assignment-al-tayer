import { ProductListPage } from 'pages';
import { Route, Routes } from 'react-router-dom';
import routeConstants from './routeConstants';

const Router = () => {
  return (
    <Routes>
      <Route path={routeConstants.HOME} element={<ProductListPage />} />
    </Routes>
  );
};

export default Router;
