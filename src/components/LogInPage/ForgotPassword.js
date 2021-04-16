import React, { Component } from "react";

import "./ForgotPassword.css";

export default class ForgotPassword extends Component {
  state = {
    emailPetition: "",
  };

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div id="forgotPassword-card-div">
        <h1 className="title">Crea cuenta</h1>
        <form onSubmit={this.onSubmitCreate} id="forgotPassword-form">
          <label className="form-label" htmlFor="email-input">
            Correo
          </label>
          <input
            className="form-input"
            type="email"
            name="emailPetition"
            value={this.state.emailCreate}
            onChange={this.onChangeField}
          />

          <button id="sendEmail-button" type="submit">
            Enviar correo
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
            onClick={() => this.props.changeForm("signIn")}
          >
            No tienes cuenta? crea una
          </button>
        </div>
      </div>
    );
  }
}
