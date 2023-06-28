import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";
import {RouteType} from './components/navigators/Navigator'
import Home from "./components/pages/Home";
import Customers from "./components/pages/Customers";
import Products from "./components/pages/Products";
import Orders from "./components/pages/Orders";
import ShoppingCart from "./components/pages/ShoppingCart";
import SignIn from "./components/pages/SignIn";
import SignOut from "./components/pages/SignOut";
import './App.css'
import { useSelectorAuth } from "./redux/store";
import { useMemo } from "react";
import routesConfig from './config/routes-config.json';
import NotFound from "./components/pages/NotFound";
import UserData from "./model/UserData";
const {always, authenticated, admin, noadmin, noauthenticated} = routesConfig;

function getRoutes(user: UserData | null): RouteType[] {
  const res: RouteType[] = [...always];
  res.push(...(user ? authenticated : noauthenticated));
  user && res.push(...(user.role === 'admin' ? admin : noadmin));
  return res;
}


const App: React.FC = () => {
  const user = useSelectorAuth();
  const routes = useMemo(() => getRoutes(user), [user])
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<NavigatorDispatcher routes={routes}/>}>
        <Route index element={<Home/>}/>
        <Route path="customers" element={<Customers/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="shoppingcart" element={<ShoppingCart/>}/>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signout" element={<SignOut/>}/>
        <Route path="/*" element={<NotFound/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
}
export default App;