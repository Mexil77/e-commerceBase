import axios from "axios";
import Cookies from "universal-cookie";

import "./PayForm.css";

const cookies = new Cookies();

const PayForm = (props) => {
  const handleSubmite = async (e) => {
    e.preventDefault();
    const stripeIdPaymentIntent = await makePaymentIntent();
    const idOrder = await addOrder(stripeIdPaymentIntent);
    addOrderToUser(idOrder);
    discountStocks();
    emptyBag();
    props.history.push("success");
    //window.location.href = "/success";
  };

  const makePaymentIntent = async () => {
    const queryPaymentIntent = {
      stripeId: props.stripeId,
      stripeIdCard: props.card.stripeIdCard,
      amount: props.totalAmount * 100,
    };
    const stripeIdPaymentIntent = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}stripes/payCard`,
      queryPaymentIntent
    );
    return stripeIdPaymentIntent.data.stripeIdPaymentIntent;
  };

  const addOrder = async (stripeIdPaymentIntent) => {
    const orderToAdd = {
      bagList: props.bagList,
      totalAmount: props.totalAmount,
      payForm: props.card._id,
      direction: props.direction._id,
      stripeIdPaymentIntent: stripeIdPaymentIntent,
    };
    const order = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}orders/`,
      orderToAdd
    );
    return order.data.idOrder;
  };

  const addOrderToUser = async (idOrder) => {
    const queryOrder = { idUser: cookies.get("id"), idOrder: idOrder };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/order`,
      queryOrder
    );
  };

  const discountStocks = async () => {
    const queryList = {
      bagList: props.bagList,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}products/productStock`,
      queryList
    );
  };

  const emptyBag = async () => {
    const queryDelete = { idUser: cookies.get("id") };
    await axios.delete(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/bagDeleted`,
      {
        params: queryDelete,
      }
    );
  };

  return (
    <form id="payForm-form" onSubmit={handleSubmite}>
      <h1>{`$${props.totalAmount}`}</h1>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PayForm;
