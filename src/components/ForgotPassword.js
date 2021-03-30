import React, { Component } from "react";

import "../CssComponents/ForgotPassword.css";

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
        <h1 id="title">Crea cuenta</h1>
        <form onSubmit={this.onSubmitCreate} id="forgotPassword-form">
          <label htmlFor="email-input">Correo</label>
          <input
            id="email-input"
            type="email"
            name="emailPetition"
            value={this.state.emailCreate}
            onChange={this.onChangeField}
          />

          <button type="submit">Enviar correo</button>
        </form>
      </div>
    );
  }
}
