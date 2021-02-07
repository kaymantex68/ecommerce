import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from "./pages/Home";
import Header from "./components/nav/Header";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
    </>
  );
};

export default App;
