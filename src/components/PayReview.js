import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "../CssComponents/PayReview.css";

import Bag from "./Bag";

const cookies = new Cookies();

export default class PayReview extends Component {
  state = {
    bagList: [],
    totalAmount: 0,
  };

  componentDidMount() {
    this.getUserBag();
  }

  getUserBag = async () => {
    const bagQuery = { idUser: cookies.get("id") };
    const bagList = await axios.get(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/bag`,
      {
        params: bagQuery,
      }
    );
    this.setState({
      bagList: bagList.data.bagList,
    });
  };

  addTotalAmount = (amount) => {
    this.setState((state) => ({
      totalAmount: state.totalAmount + amount,
    }));
  };

  render() {
    return (
      <div id="payReview-div">
        <div id="mainBag-div">
          <div id="bag-div">
            <Bag
              bagList={this.state.bagList}
              addTotalAmount={this.addTotalAmount}
            />
          </div>
          <div id="payForm-div">
            <PayForm
              totalAmount={this.state.totalAmount}
              bagList={this.state.bagList}
              card={this.props.card}
              direction={this.props.direction}
              stripeId={this.props.stripeId}
            />
          </div>
        </div>
      </div>
    );
  }
}

const PayForm = (props) => {
  const handleSubmite = async (e) => {
    e.preventDefault();
    const stripeIdPaymentIntent = await makePaymentIntent();
    const idOrder = await addOrder(stripeIdPaymentIntent);
    addOrderToUser(idOrder);
    discountStocks();
    emptyBag();
    window.location.href = "/success";
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
