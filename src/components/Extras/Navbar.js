import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import Logo from "../../assets/Img/logo_prueba.png";

import "./Navbar.css";

const cookies = new Cookies();

export default class Navbar extends Component {
  state = {
    user: false,
    statHidden: "",
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
    this.changeStatHiden();
    this.destroyCookie();
    window.location.href = "/";
  };

  destroyCookie = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("lastName", { path: "/" });
    cookies.remove("email", { path: "/" });
  };

  changeStatHiden = () => {
    this.setState((state) => ({
      statHidden: state.statHidden === "" ? "visible" : "",
    }));
  };

  render() {
    return (
      <div id="nav-div">
        <div id="logo-div">
          <Link to={"/"}>
            <img id="navbar-logo" src={Logo} alt="" />
          </Link>
        </div>
        <div id="formSearch-div">
          <form action="" id="navbarSerch-form">
            <input id="navbarSerch-bar" type="search" />
            <input id="navbarSerch-button" type="submit" value="Buscar" />
          </form>
        </div>
        <div id="navItems-div">
          <ul className={`navItems-ul ${this.state.statHidden}`}>
            <li className="navbar-item">
              <Link
                onClick={this.changeStatHiden}
                className="navbar-link"
                to={`/`}
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            {this.state.user ? (
              <li className="navbar-item">
                <Link
                  className="navbar-link"
                  to={`/`}
                  onClick={this.closeSession}
                  style={{ textDecoration: "none" }}
                >
                  LogOut
                </Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link
                  onClick={this.changeStatHiden}
                  className="navbar-link"
                  to={`/logIn`}
                  style={{ textDecoration: "none" }}
                >
                  LogIn
                </Link>
              </li>
            )}
            <li className="navbar-item">
              <Link
                onClick={this.changeStatHiden}
                className="navbar-link"
                to={`/productFilter`}
                style={{ textDecoration: "none" }}
              >
                Filter
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                onClick={this.changeStatHiden}
                className="navbar-link"
                to={`/bag`}
                style={{ textDecoration: "none" }}
              >
                Bag
              </Link>
            </li>
            {this.state.user ? (
              <li className="navbar-item">
                <Link
                  onClick={this.changeStatHiden}
                  className="navbar-link"
                  to={`/user`}
                  style={{ textDecoration: "none" }}
                >
                  User
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <div className="block h-full lg:hidden">
            <button
              onClick={this.changeStatHiden}
              className="flex bg-blue-800 items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
