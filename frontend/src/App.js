import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React, {useState,useEffect} from 'react';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  },[])
  const stripePromise = loadStripe(stripeApiKey);
  
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
      <Route exact path="/process/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>}/>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/product/:id" element={<ProductDetails/>}/>
      <Route exact path="/products" element={<Products/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route exact path="/search" element={<Search/>}/>
      <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/about" element={<About/>} />
      <Route path='/account' element={isAuthenticated ? <Profile /> : <LoginSignUp />} />
      {/* <Route exact path="/account" element={<ProtectedRoute element={<Profile />} />} /> */}
      <Route path='/me/update' element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />} />
      <Route path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />} />

      <Route path='/password/forgot' element={<ForgotPassword />} />
      <Route path='/password/reset/:token' element={<ResetPassword />} />
      <Route exact path="/login" element={<LoginSignUp/>}/>
      <Route exact path="/cart" element={<Cart/>}/>

      <Route exact path="/shipping" element={isAuthenticated ? <Shipping /> : <LoginSignUp />}/>
      <Route exact path="/success" element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />} />
      <Route exact path="/orders" element={isAuthenticated ? <MyOrders/> : <LoginSignUp />}/>
      {/* <Route exact path="/admin/dashboard" element={<Dashboard/>}/> */}
      </Routes>
      <Routes>
      <Route exact path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}/>
      <Route exact path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />} />
      </Routes>
      <Routes>
      <Route exact isAdmin={true} path="/admin/dashboard" element={isAuthenticated ? <Dashboard /> : <LoginSignUp />}/>
      <Route exact isAdmin={true} path="/admin/products" element={isAuthenticated ? <ProductList /> : <LoginSignUp />}/>
      <Route exact path="/admin/product" isAdmin={true} element={isAuthenticated ? <NewProduct /> : <LoginSignUp />} />
      <Route exact path="/admin/product/:id" isAdmin={true} element={isAuthenticated ? <UpdateProduct /> : <LoginSignUp />} />
      <Route exact path="/admin/orders" isAdmin={true} element={isAuthenticated ? <OrderList /> : <LoginSignUp />} />
      <Route exact path="/admin/order/:id" isAdmin={true} element={isAuthenticated ? <ProcessOrder /> : <LoginSignUp />} />
      <Route exact path="/admin/users" isAdmin={true} element={isAuthenticated ? <UsersList /> : <LoginSignUp />} />
      <Route exact path="/admin/user/:id" isAdmin={true} element={isAuthenticated ? <UpdateUser /> : <LoginSignUp />} />
      <Route exact path="/admin/reviews" isAdmin={true} element={isAuthenticated ? <ProductReviews /> : <LoginSignUp />} />
      <Route
          element={
            window.location.pathname === "/process/payment" ? null : <NotFound/>
          }
        />
      </Routes>
      <Footer/>
    </Router>

    );
}

export default App;
