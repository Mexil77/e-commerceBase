import React, { Component } from "react";
import axios from "axios";

import "../CssComponents/SignIn.css";

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
      window.location.href = `${process.env.REACT_APP_WEB_URI}/`;
    }
  };

  render() {
    return (
      <div id="signIn-card-div">
        <h1 id="title">Crea cuenta</h1>
        <form onSubmit={this.onSubmitCreate} id="signIn-form">
          <label htmlFor="email-input">Correo</label>
          <input
            id="email-input"
            type="email"
            name="emailCreate"
            value={this.state.emailCreate}
            onChange={this.onChangeField}
          />
          <label htmlFor="password-input">Contraseña</label>
          <input
            id="password-input"
            type="password"
            name="passwordCreate"
            value={this.state.passwordCreate}
            onChange={this.onChangeField}
          />
          <label htmlFor="second-password-input">Contraseña</label>
          <input
            id="second-password-input"
            type="password"
            name="passwordConfirmCreate"
            value={this.state.passwordConfirmCreate}
            onChange={this.onChangeField}
          />
          <button type="submit">Crear</button>
        </form>
      </div>
    );
  }
}
