import { NavLink, Outlet } from 'react-router-dom';
const Navigator: React.FC = () => {
    return (
        <div>
            <nav>
                <ul className="navigator-list">
                <li className="navigator-item">
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li className="navigator-item">
                        <NavLink to="/customers">Customers</NavLink>
                    </li>
                    <li className="navigator-item">
                        <NavLink to="/products">Products</NavLink>
                    </li>
                    <li className="navigator-item">
                        <NavLink to="/orders">Orders</NavLink>
                    </li>
                    <li className="navigator-item">
                        <NavLink to="/shoppingCart">Shopping Cart</NavLink>
                    </li>
                    <li className="navigator-item">
                        <NavLink to="/signin">Sign In</NavLink>
                    </li>
                    <li className="navigator-item">
                        <NavLink to="/signout">Sign Out</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};
export default Navigator;
