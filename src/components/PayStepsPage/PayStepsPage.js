import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./PayStepsPage.css";

import ContentDirections from "../UserPage/ContentDirections";
import ContentPayforms from "../UserPage/ContentPayForms";
import PayReview from "./PayReview";

const cookies = new Cookies();

export default class PayStepsPage extends Component {
  state = {
    user: "",
    directions: [],
    cards: [],
    directionSelected: "",
    cardSelected: "",
    stripeId: "",
    stepPay: 1,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const queryUser = { idUser: cookies.get("id") };
    const user = await axios.get(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/user`,
      { params: queryUser }
    );
    this.setState({
      user: [user.data],
      directions: user.data.directions,
      cards: user.data.cards,
      stripeId: user.data.stripeId,
    });
  };

  selectDirection = (direction) => {
    this.setState({
      directionSelected: direction,
      stepPay: 2,
    });
  };

  selectCard = (card) => {
    this.setState({
      cardSelected: card,
      stepPay: 3,
    });
  };

  imprimeState = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div id="asignDirectionPage-div">
        <h1>
          {this.state.stepPay === 1
            ? "A que direccion devemos mandar tu pedido?"
            : this.state.stepPay === 2
            ? "Que tarjeta debemos usar?"
            : "Por favor Revisa que tus datos sean correctos."}
        </h1>
        {this.state.stepPay === 1 ? (
          this.state.user !== "" ? (
            <ContentDirections
              directions={this.state.directions}
              from={"PayPage"}
              selectDirection={this.selectDirection}
            />
          ) : (
            ""
          )
        ) : this.state.stepPay === 2 ? (
          <ContentPayforms
            cards={this.state.cards}
            stripeId={this.state.stripeId}
            from={"PayPage"}
            selectCard={this.selectCard}
          />
        ) : (
          <PayReview
            card={this.state.cardSelected}
            direction={this.state.directionSelected}
            stripeId={this.state.stripeId}
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}
