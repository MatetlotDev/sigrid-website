import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PictureVisual from '../components/PictureVisual';
import About from './aboutpage';
import Contact from './contactPage';
import Discover from './discoverPage';
import Home from './homepage';

export const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
    errorElement: <div>Error page home</div>,
    inHeader: false,
  },
  {
    path: '/discover',
    name: 'Discover',
    element: <Discover />,
    errorElement: <div>Error page discover</div>,
    inHeader: true,
  },
  {
    path: '/about',
    name: 'About',
    element: <About />,
    errorElement: <div>Error page about</div>,
    inHeader: true,
  },
  {
    path: '/contact',
    name: 'Contact',
    element: <Contact />,
    errorElement: <div>Error page contact</div>,
    inHeader: true,
  },
];

const Root = () => (
  <main>
    <Header />
    <Outlet />
    <PictureVisual />
    <Footer />
  </main>
);

export default Root;
