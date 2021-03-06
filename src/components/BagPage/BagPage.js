import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

import "react-dropdown/style.css";
import "./BagPage.css";

import Bag from "./Bag";
import CarouselProducts from "../Extras/CarouselProducts";

const cookies = new Cookies();

export default class BagPage extends Component {
  state = {
    bagList: [],
    totalAmount: 0,
  };

  componentDidMount() {
    this.getUserBag();
  }

  getUserBag = async () => {
    if (cookies.get("id")) {
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
    } else {
      this.props.history.push("logIn");
    }
  };

  addTotalAmount = (amount) => {
    this.setState((state) => ({
      totalAmount: state.totalAmount + amount,
    }));
  };
  substractTotalAmount = (amount) => {
    this.setState((state) => ({
      totalAmount: state.totalAmount - amount,
    }));
  };

  updateBagUser = async () => {
    const queryBagList = {
      idUser: cookies.get("id"),
      bagList: this.state.bagList,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/bagUpdate`,
      queryBagList
    );
    console.log("update");
    //this.props.history.push("paySteps");
  };

  modifyCuantity = (operation, product) => {
    const currentProduct = this.state.bagList.find(
      (item) => item.idProduct === product._id
    );
    if (operation === "add") {
      if (currentProduct.cuantity < product.stock) {
        this.addTotalAmount(product.price);
        this.setState((state) => {
          const bagList = state.bagList.map((item) => {
            if (item.idProduct === product._id) {
              return { idProduct: item.idProduct, cuantity: item.cuantity + 1 };
            } else {
              return item;
            }
          });
          return {
            bagList,
          };
        });
      }
    } else {
      if (currentProduct.cuantity > 1) {
        this.substractTotalAmount(product.price);
        this.setState((state) => {
          const bagList = state.bagList.map((item) => {
            if (item.idProduct === product._id) {
              return { idProduct: item.idProduct, cuantity: item.cuantity - 1 };
            } else {
              return item;
            }
          });
          return {
            bagList,
          };
        });
      }
    }
  };

  render() {
    return (
      <div id="bagPage-div">
        <div id="mainBag-div">
          <Bag
            bagList={this.state.bagList}
            addTotalAmount={this.addTotalAmount}
            substractTotalAmount={this.substractTotalAmount}
            modifyCuantity={this.modifyCuantity}
            getUserBag={this.getUserBag}
            updateBagUser={this.updateBagUser}
          />
          <div id="pay-div">
            <div id="pay-card">
              <h1 id="pay-title">Total</h1>
              <h2 id="pay-totalAmount">{`$${this.state.totalAmount}`}</h2>
              <Link to="/paySteps">
                <button id="pay-button">Proceder al pago</button>
              </Link>
            </div>
          </div>
        </div>
        <CarouselProducts
          idProducts={[
            "603fc3b714d9fc49b0f2ab79",
            "603fc3b714d9fc49b0f2ab7a",
            "603fc3b714d9fc49b0f2ab7b",
            "603fc3b714d9fc49b0f2ab7c",
            "603fc3b714d9fc49b0f2ab7d",
          ]}
        />
      </div>
    );
  }
}
