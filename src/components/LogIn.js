import React, { Component } from "react";
import axios from "axios";

import "../CssComponents/LogIn.css";

export default class LogIn extends Component {
  state = {
    emailSignIn: "",
    passwordSignIn: "",
    firstFalueTry: false,
  };

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitSignIn = async (e) => {
    e.preventDefault();
    const findUser = {
      email: this.state.emailSignIn,
      password: this.state.passwordSignIn,
    };
    const user = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/findUser`,
      findUser
    );
    if (!user.data.signIn) {
      this.setState({
        firstFalueTry: true,
      });
    } else {
      this.props.createCookie(user.data.signIn);
      window.location.href = "/";
    }
  };

  render() {
    return (
      <div id="logIn-card-div">
        {this.state.firstFalueTry ? (
          <h1 style={{ color: "red" }}>Falue Try</h1>
        ) : (
          ""
        )}
        <h1 id="title">Inicia Sesion</h1>
        <form onSubmit={this.onSubmitSignIn} id="logIn-form">
          <label htmlFor="email-input">Correo</label>
          <input
            id="email-inpud"
            type="email"
            name="emailSignIn"
            value={this.state.emailSignIn}
            onChange={this.onChangeField}
          />
          <label htmlFor="password-input">Contraseña</label>
          <input
            id="password-inpud"
            type="password"
            name="passwordSignIn"
            value={this.state.passwordSignIn}
            onChange={this.onChangeField}
          />
          <button type="submit">Inicia Sesion</button>
        </form>
        <div id="links-div">
          <button
            className="button-item"
            onClick={(form) => this.props.changeForm("signIn")}
          >
            No tienes cuenta? crea una
          </button>
          <button
            className="button-item"
            onClick={(form) => this.props.changeForm("forgotPassword")}
          >
            Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    );
  }
}
