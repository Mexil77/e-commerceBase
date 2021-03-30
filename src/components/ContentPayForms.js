import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "../CssComponents/ContentPayForms.css";

const cookies = new Cookies();
const stripePromise = loadStripe(
  "pk_test_51IHjX1G4gFQJRsYlKakeyyoBeDCnCmdQCq3VIrB2LdZ9DUEZZNLZ1AwnEDkr5P6VHO2tPbAE7PmRsWu3Y9ZWkKsj00VV5yPDj7"
);

export default class ContentPayForms extends Component {
  state = {
    cards: [],
    formIsOpen: false,
    addCard: true,
    idCardEdith: "",
    name: "",
  };

  componentDidMount() {
    this.setCards();
  }

  setCards = async () => {
    this.setState({
      cards: this.props.cards,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  formDisplay = (card) => {
    if (Object.keys(card).length === 0) {
      this.setState((state) => ({
        formIsOpen: !state.formIsOpen,
        addCard: true,
      }));
    } else {
      this.setState((state) => ({
        formIsOpen: !state.formIsOpen,
        name: card.name,
        addCard: false,
        idCardEdith: card._id,
      }));
    }
  };

  addStripeCard = async (token) => {
    const cardToAdd = {
      stripeId: this.props.stripeId,
      token: token,
    };
    const idStripeCard = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}stripes/`,
      cardToAdd
    );
    return idStripeCard.data.idStripeCard;
  };

  addCard = async (stripeIdCard) => {
    const cardToAdd = {
      name: this.state.name,
      stripeIdCard: stripeIdCard,
    };
    const idCard = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}cards/`,
      cardToAdd
    );
    return idCard.data.idCard;
  };

  addCardToUser = async (idCard) => {
    const queryToAdd = { idUser: cookies.get("id"), idCard: idCard };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/card`,
      queryToAdd
    );
    window.location.reload();
  };

  handleSubmitEdith = async (e) => {
    e.preventDefault();
    const queryToEdit = {
      idCard: this.state.idCardEdith,
      name: this.state.name,
      month: this.state.month,
      year: this.state.year,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}cards/`,
      queryToEdit
    );
    window.location.reload();
  };

  render() {
    return this.state.formIsOpen ? (
      <Elements stripe={stripePromise}>
        <FormAddCard
          formDisplay={() => this.formDisplay({})}
          state={this.state}
          onChange={this.onChange}
          addStripeCard={this.addStripeCard}
          addCard={this.addCard}
          addCardToUser={this.addCardToUser}
          handleSubmitEdith={this.handleSubmitEdith}
        />
      </Elements>
    ) : (
      <div id="contentOptionCards-div">
        <div
          id="cardAddCard"
          className="cardCard-div"
          onClick={() => this.formDisplay({})}
        >
          <h3>Agrega Tarjeta</h3>
          <h1>+</h1>
        </div>
        {this.state.cards.map((card) => {
          return (
            <CardCard
              key={card._id}
              card={card}
              formDisplay={this.formDisplay}
              from={this.props.from}
              selectCard={this.props.selectCard}
              stripeId={this.props.stripeId}
            />
          );
        })}
      </div>
    );
  }
}

const FormAddCard = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmite = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.log("[error]", result.error);
    } else {
      const idStripeCard = await props.addStripeCard(result.token.id);
      const idCard = await props.addCard(idStripeCard);
      props.addCardToUser(idCard);
    }
  };

  return (
    <div id="formAddCard-div">
      <h1>Form</h1>
      <form id="formAddCard-form" action="" onSubmit={handleSubmite}>
        <label htmlFor="name">Nombre: </label>
        <input
          type="text"
          name="name"
          value={props.state.name}
          onChange={props.onChange}
          placeholder="Ej. Luis Perez Vaesa"
        />
        <label htmlFor="cardData">Catos de la tarjeta: </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe}>
          Add
        </button>
      </form>
    </div>
  );
};

const CardCard = (props) => {
  const [lastNumbers, setLastNumbers] = useState("");
  const [stripeIdCard, setStripeIdCard] = useState("");

  useEffect(() => {
    cardLastNumbers();
  });

  const cardLastNumbers = async () => {
    const queryCard = {
      stripeId: props.stripeId,
      stripeIdCard: props.card.stripeIdCard,
    };
    const card = await axios.get(
      `${process.env.REACT_APP_URI_PREFIX_USE}stripes/`,
      {
        params: queryCard,
      }
    );
    setLastNumbers(card.data.card.last4);
    setStripeIdCard(card.data.card.id);
  };

  const dropCard = async (idCard) => {
    const queryStripeToDelete = {
      stripeId: props.stripeId,
      stripeIdCard: stripeIdCard,
    };
    const queryToDelete = { idCard: idCard };
    const queryToDrop = { idUser: cookies.get("id"), idCard: idCard };
    await axios.delete(`${process.env.REACT_APP_URI_PREFIX_USE}stripes/`, {
      params: queryStripeToDelete,
    });
    await axios.delete(`${process.env.REACT_APP_URI_PREFIX_USE}cards/`, {
      params: queryToDelete,
    });
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/dropCard`,
      queryToDrop
    );
    window.location.reload();
  };

  return (
    <div className="cardCard-div">
      <h6>{props.card.name}</h6>
      <h6>{`****${lastNumbers}`}</h6>
      {props.from === "UserInfo" ? (
        <div id="cardCardButtons-div">
          {/* This functionality will be add in the fututre */}
          {/* <button onClick={() => props.formDisplay(props.card)}>Editar</button> */}
          <button onClick={() => dropCard(props.card._id)}>Eliminar</button>
        </div>
      ) : (
        <button onClick={() => props.selectCard(props.card)}>
          Elegir esta
        </button>
      )}
    </div>
  );
};
