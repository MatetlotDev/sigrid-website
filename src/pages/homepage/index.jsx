import { routes } from '../index';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <ul>
      {routes.map(route => <Link to={route.path}><li>{route.name}</li></Link>)}
    </ul>
  )
}

export default Home
