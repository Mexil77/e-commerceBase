import React, { Component } from "react";
import Cookies from "universal-cookie";

import LogIn from "./LogIn";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";

import "./LogInPage.css";

const cookies = new Cookies();

export default class LogInPage extends Component {
  state = {
    form: "logIn",
  };

  componentDidUpdate(prevProps, prevState) {
    /* if (prevState.form !== "logIn") {
      this.setState({
        form: "logIn",
      });
    } */
  }

  changeForm = (form) => {
    this.setState({
      form,
    });
  };

  createCookie = (user) => {
    cookies.set("id", user._id, { path: "/" });
    cookies.set("name", user.name.name, { path: "/" });
    cookies.set("lastName", user.name.lastName, { path: "/" });
    cookies.set("email", user.email, { path: "/" });
  };

  render() {
    return (
      <div id="logInPage-div">
        {this.state.form === "logIn" ? (
          <LogIn
            changeForm={this.changeForm}
            createCookie={(user) => this.createCookie(user)}
          />
        ) : this.state.form === "signIn" ? (
          <SignIn
            changeForm={this.changeForm}
            createCookie={(user) => this.createCookie(user)}
          />
        ) : (
          <ForgotPassword changeForm={this.changeForm} />
        )}
      </div>
    );
  }
}
