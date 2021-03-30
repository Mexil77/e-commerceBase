import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import Logo from "../assets/Img/logo_prueba.png";

import "../CssComponents/Navbar.css";

const cookies = new Cookies();

export default class Navbar extends Component {
  state = {
    user: false,
  };

  componentDidMount() {
    if (cookies.get("id")) {
      this.setState({
        user: true,
      });
    } else {
      this.setState({
        user: false,
      });
    }
  }

  closeSession = () => {
    this.destroyCookie();
    window.location.href = "/";
  };

  destroyCookie = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("lastName", { path: "/" });
    cookies.remove("email", { path: "/" });
  };

  render() {
    return (
      <div id="nav-div">
        <img id="navbar-logo" src={Logo} alt="" />
        <form action="">
          <input type="search" />
          <input type="submit" value="Buscar" />
        </form>
        <nav id="nav">
          <ul>
            <li className="navbar-item">
              <Link className="navbar-link" to="/">
                Home
              </Link>
            </li>
            {this.state.user ? (
              <li className="navbar-item">
                <Link
                  className="navbar-link"
                  to="/"
                  onClick={this.closeSession}
                >
                  LogOut
                </Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link className="navbar-link" to="/logIn">
                  LogIn
                </Link>
              </li>
            )}
            <li className="navbar-item">
              <Link className="navbar-link" to="/productFilter">
                Filter
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/bag">
                Bag
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/user">
                User
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
