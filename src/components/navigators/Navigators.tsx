// src/components/navigators/Navigators.tsx
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import navigationConfig from '../../config/navigationConfig.json';

const Navigator: React.FC = () => {
  const { isLoggedIn, username } = useSelector((state: RootState) => state.auth);

  let userType:'admin' | 'user' | 'guest' = 'guest';
  if (isLoggedIn) {
    userType = username.startsWith('admin') ? 'admin' : 'user';
  }

  const userRoutes = navigationConfig[userType];

  return (
    <div>
      <nav>
        <ul className="navigator-list">
          {userRoutes.map((route) => (
            <li key={route} className="navigator-item">
              <NavLink to={`/${route}`}>{route.charAt(0).toUpperCase() + route.slice(1)}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Navigator;
