import About from './aboutpage';
import Home from './homepage';

export const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
    errorElement: <div>Error page</div>,
  },
  {
    path: '/about',
    name: 'About',
    element: <About />,
  },
];
