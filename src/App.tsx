import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigator from './components/navigators/Navigators';
import Home from './components/pages/Home';
import Customers from './components/pages/Customers';
import Products from './components/pages/Products';
import Orders from './components/pages/Orders';
import ShoppingCart from './components/pages/ShoppingCart';
import SignIn from './components/pages/SignIn';
import SignOut from './components/pages/SignOut';
import './App.css'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigator/>}>
                    <Route path="home" index element={<Home/>}/>
                    <Route path="customers" element = {<Customers/>}/>
                    <Route path="products" element = {<Products/>}/>
                    <Route path="orders" element = {<Orders/>}/>
                    <Route path="shoppingCart" element = {<ShoppingCart/>}/>
                    <Route path="signin" element = {<SignIn/>}/>
                    <Route path="signout" element = {<SignOut/>}/>                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;
