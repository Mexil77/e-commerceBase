import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./CardCard.css";

const cookies = new Cookies();

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
    props.getUser();
  };

  return (
    <div className="cardCard-div">
      <h6 className="cardCard-name">{props.card.name}</h6>
      <h6 className="cardCard-lastfour">{`****${lastNumbers}`}</h6>
      {props.from === "UserInfo" ? (
        <div id="cardCardButtons-div">
          {/* This functionality will be add in the fututre */}
          {/* <button onClick={() => props.formDisplay(props.card)}>Editar</button> */}
          <button
            className="cardCard-dropButton"
            onClick={() => dropCard(props.card._id)}
          >
            Eliminar
          </button>
        </div>
      ) : (
        <button
          className="cardCard-selectButton"
          onClick={() => props.selectCard(props.card)}
        >
          Elegir esta
        </button>
      )}
    </div>
  );
};

export default CardCard;
