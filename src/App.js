import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

/* Components */
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LogInPage from "./components/LogInPage";
import ProductFilterPage from "./components/ProductFilterPage";
import ProductPage from "./components/ProductPage";
import BagPage from "./components/BagPage";
import SuccessPage from "./components/SuccessPage";
import UserPage from "./components/UserPage";
import PayStepsPage from "./components/PayStepsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          exact
          component={Home}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/logIn`}
          component={LogInPage}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/productFilter`}
          component={ProductFilterPage}
        ></Route>
        <Route
          path={`${process.env.REACT_APP_WEB_URI}/product/:id`}
          component={ProductPage}
        ></Route>
        <Route
          path={`${process.env.REACT_APP_WEB_URI}/bag`}
          component={BagPage}
        ></Route>
        <Route
          path={`${process.env.REACT_APP_WEB_URI}/paySteps`}
          component={PayStepsPage}
        ></Route>
        <Route
          path={`${process.env.REACT_APP_WEB_URI}/success`}
          component={SuccessPage}
        ></Route>
        <Route
          path={`${process.env.REACT_APP_WEB_URI}/user`}
          component={UserPage}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
