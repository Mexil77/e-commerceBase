import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./PayReview.css";

import Bag from "../BagPage/Bag";
import PayForm from "./PayForm";

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
              history={this.props.history}
            />
          </div>
        </div>
      </div>
    );
  }
}
