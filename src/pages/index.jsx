import { Analytics } from '@vercel/analytics/react';
import { Outlet } from 'react-router-dom';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PictureVisual from '../components/PictureVisual';
import Splash from '../components/Splash';
import { allPictures } from '../constants';
import { TransitionProvider } from '../motion/transition';
import About from './aboutpage';
// import Contact from './contactPage';
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
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   element: <Contact />,
  //   errorElement: <div>Error page contact</div>,
  //   inHeader: true,
  // },
];

const transitionLabels = Object.fromEntries(
  routes.map((route) => [route.path, route.name])
);

const splashImages = [
  ...allPictures.filter((picture) => picture.name).map((picture) => picture.path),
  '/images/profile-pic.jpg',
];

const Root = () => (
  <TransitionProvider labels={transitionLabels}>
    <Analytics />
    <Splash images={splashImages} />
    <Header />
    <main>
      <Outlet />
    </main>
    <PictureVisual />
    <Footer />
    <Cursor />
  </TransitionProvider>
);

export default Root;
