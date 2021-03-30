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
        <Route path="/" exact component={Home}></Route>
        <Route path="/logIn" component={LogInPage}></Route>
        <Route path="/productFilter" component={ProductFilterPage}></Route>
        <Route path="/product/:id" component={ProductPage}></Route>
        <Route path="/bag" component={BagPage}></Route>
        <Route path="/paySteps" component={PayStepsPage}></Route>
        <Route path="/success" component={SuccessPage}></Route>
        <Route path="/user" component={UserPage}></Route>
      </Router>
    </div>
  );
}

export default App;
