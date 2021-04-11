import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./FormAddCard.css";

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
      const idCard = await props.addCardToDB(idStripeCard);
      props.addCardToUser(idCard);
    }
  };

  return (
    <div id="formAddCard-div">
      <h1 id="formAddCard-title">Form</h1>
      <form id="formAddCard-form" action="" onSubmit={handleSubmite}>
        <label className="formAddCard-label" htmlFor="name">
          Nombre:{" "}
        </label>
        <input
          className="formAddCard-input"
          type="text"
          name="name"
          value={props.name}
          onChange={props.onChange}
          placeholder="Ej. Luis Perez Vaesa"
        />
        <label className="formAddCard-label" htmlFor="cardData">
          Catos de la tarjeta:{" "}
        </label>
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
        <button id="formAddCard-submit" type="submit" disabled={!stripe}>
          Add
        </button>
      </form>
    </div>
  );
};

export default FormAddCard;
