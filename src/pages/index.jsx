import Home from "./homepage";
import About from "./aboutpage";

export const routes = [
    {
      path: "/",
      name: 'Home',
      element: <Home />,
      errorElement: <div>Error page</div>
    },
    {
      path: '/about',
      name: 'About',
      element: <About />
    }
  ]