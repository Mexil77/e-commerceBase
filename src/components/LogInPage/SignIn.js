import React, { Component } from "react";
import axios from "axios";

import "./SignIn.css";

export default class SignIn extends Component {
  state = {
    emailCreate: "",
    passwordCreate: "",
    passwordConfirmCreate: "",
  };

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitCreate = async (e) => {
    e.preventDefault();
    const newUser = {
      email: this.state.emailCreate,
      password: this.state.passwordCreate,
    };
    const user = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/`,
      newUser
    );
    if (!user.data.signIn) {
    } else {
      this.props.createCookie(user.data.signIn);
      window.location.href = `/`;
    }
  };

  render() {
    return (
      <div id="signIn-card-div">
        <h1 className="title">Crea una cuenta</h1>
        <form onSubmit={this.onSubmitCreate} id="signIn-form">
          <label className="form-label" htmlFor="email-input">
            Correo
          </label>
          <input
            className="form-input"
            type="email"
            name="emailCreate"
            value={this.state.emailCreate}
            onChange={this.onChangeField}
          />
          <label className="form-label" htmlFor="password-input">
            Contraseña
          </label>
          <input
            className="form-input"
            type="password"
            name="passwordCreate"
            value={this.state.passwordCreate}
            onChange={this.onChangeField}
          />
          <label className="form-label" htmlFor="second-password-input">
            Contraseña
          </label>
          <input
            className="form-input"
            type="password"
            name="passwordConfirmCreate"
            value={this.state.passwordConfirmCreate}
            onChange={this.onChangeField}
          />
          <button id="submitform-button" type="submit">
            Crear cuenta
          </button>
        </form>
        <div className="links-div">
          <button
            className="button-item"
            onClick={() => this.props.changeForm("logIn")}
          >
            Inicia Sesion
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
