import { createBrowserRouter } from 'react-router-dom';
import Products from './pages/Products';
import ProductCreate from './pages/ProductCreate';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/details/:id",
        element: <ProductCreate />,
      },

    ]
  },
]);

export default router;