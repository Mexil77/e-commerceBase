import React, { Component } from "react";
import axios from "axios";

import "./LogIn.css";

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
        <h1 className="title">Inicia Sesion</h1>
        <form onSubmit={this.onSubmitSignIn} id="logIn-form">
          <label className="form-label" htmlFor="email-input">
            Correo
          </label>
          <input
            className="form-input"
            type="email"
            name="emailSignIn"
            value={this.state.emailSignIn}
            onChange={this.onChangeField}
          />
          <label className="form-label" htmlFor="password-input">
            Contraseña
          </label>
          <input
            className="form-input"
            type="password"
            name="passwordSignIn"
            value={this.state.passwordSignIn}
            onChange={this.onChangeField}
          />
          <button id="button-submit" type="submit">
            Inicia Sesion
          </button>
        </form>
        <div className="links-div">
          <button
            className="button-item"
            onClick={() => this.props.changeForm("signIn")}
          >
            No tienes cuenta? crea una
          </button>
          <button
            className="button-item"
            onClick={() => this.props.changeForm("forgotPassword")}
          >
            Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    );
  }
}
