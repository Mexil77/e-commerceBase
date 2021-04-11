import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./ContentPayForms.css";

import CardCard from "./CardCard";
import FormAddCard from "./FormAddCard";

const cookies = new Cookies();
const stripePromise = loadStripe(
  "pk_test_51IHjX1G4gFQJRsYlKakeyyoBeDCnCmdQCq3VIrB2LdZ9DUEZZNLZ1AwnEDkr5P6VHO2tPbAE7PmRsWu3Y9ZWkKsj00VV5yPDj7"
);

const ContentPayForms = (props) => {
  const [cards, setCards] = useState([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  //const [addCard, setAddCard] = useState(true);
  //const [idCardEdith, setIdCardEdith] = useState("");
  const [data, setData] = useState({ name: "" });

  useEffect(() => {
    setCardstoState();
  });

  const setCardstoState = async () => {
    setCards(props.cards);
  };

  const onChange = (e) => {
    setData({
      [e.target.name]: e.target.value,
    });
  };

  const formDisplay = (card) => {
    if (Object.keys(card).length === 0) {
      setFormIsOpen(!formIsOpen);
      //setAddCard(true);
    } else {
      setFormIsOpen(!formIsOpen);
      setData({ name: card.name });
      //setAddCard(false);
      //setIdCardEdith(card._id);
    }
  };

  const addStripeCard = async (token) => {
    const cardToAdd = {
      stripeId: props.stripeId,
      token: token,
    };
    const idStripeCard = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}stripes/`,
      cardToAdd
    );
    return idStripeCard.data.idStripeCard;
  };

  const addCardToDB = async (stripeIdCard) => {
    const cardToAdd = {
      name: data.name,
      stripeIdCard: stripeIdCard,
    };
    const idCard = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}cards/`,
      cardToAdd
    );
    return idCard.data.idCard;
  };

  const addCardToUser = async (idCard) => {
    const queryToAdd = { idUser: cookies.get("id"), idCard: idCard };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/card`,
      queryToAdd
    );
    setFormIsOpen(false);
    setData({ name: "" });
    props.getUser();
  };

  const handleSubmitEdith = async (e) => {
    /* e.preventDefault();
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
    setFormIsOpen(false);
    setData({ name: "" });
    props.getUser(); */
  };

  return formIsOpen ? (
    <Elements stripe={stripePromise}>
      <FormAddCard
        formDisplay={() => formDisplay({})}
        name={data.name}
        onChange={onChange}
        addStripeCard={addStripeCard}
        addCardToDB={addCardToDB}
        addCardToUser={addCardToUser}
        handleSubmitEdith={handleSubmitEdith}
      />
    </Elements>
  ) : (
    <div id="contentOptionCards-div">
      <div
        id="cardAddCard"
        className="cardCard-div"
        onClick={() => formDisplay({})}
      >
        <h3 id="contentOptionCards-title">Agrega Tarjeta</h3>
        <h1 id="contentOptionCards-icon">+</h1>
      </div>
      {cards.map((card) => {
        return (
          <CardCard
            key={card._id}
            card={card}
            formDisplay={formDisplay}
            from={props.from}
            selectCard={props.selectCard}
            stripeId={props.stripeId}
            getUser={props.getUser}
          />
        );
      })}
    </div>
  );
};

export default ContentPayForms;
