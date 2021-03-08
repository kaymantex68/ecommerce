import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import History from "./pages/user/History";
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import UserRoute from "./components/routes/UserRoute";
import AdminRouter from "./components/routes/AdminRoute";
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreateCategory'
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import SubHome from './pages/sub/SubHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import SideDrawer from './components/drawer/SideDrawer'
import Checkout from './pages/Checkout'
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage'

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { currentUser } from "./functions/auth";


const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        currentUser(idTokenResult.token)
          .then((response) => {
            // send email and token to reducer
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: response.data.name,
                email: response.data.email,
                token: idTokenResult.token,
                role: response.data.role,
                _id: response.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Header />
      <SideDrawer/>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        
        <AdminRouter exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRouter exact path="/admin/category" component={CategoryCreate} />
        <AdminRouter exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRouter exact path="/admin/sub" component={SubCreate} />
        <AdminRouter exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRouter exact path="/admin/product" component={ProductCreate} />
        <AdminRouter exact path="/admin/products" component={AllProducts} />
        <AdminRouter exact path="/admin/product/:slug" component={ProductUpdate} />

        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />

        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRouter exact path="/admin/coupon" component={CreateCouponPage} />
      </Switch>
    </>
  );
};

export default App;
