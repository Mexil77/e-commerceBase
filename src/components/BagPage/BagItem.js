import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./BagItem.css";
import Images from "../../assets/images";

const cookies = new Cookies();

export default class BagItem extends Component {
  state = {
    cuantity: 1,
    product: {},
    mainPhoto: "",
  };

  componentDidMount() {
    this.findProduct(this.props.idProduct);
    this.setMainPhoto(this.props.idProduct);
  }

  findProduct = async (idProduct) => {
    const queryProduct = { idProduct };
    const product = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}products/findProduct`,
      queryProduct
    );
    this.props.addTotalAmount(product.data.price * this.props.cuantity);
    this.setState({
      cuantity: this.props.cuantity,
      product: product.data,
    });
  };

  setMainPhoto = (idProduct) => {
    const mainPhoto = Images.find((product) => product.id === idProduct)
      .photos[0];
    this.setState({
      mainPhoto,
    });
  };

  deleteBagItem = async (idProduct) => {
    const deleteProduct = { idUser: cookies.get("id"), idProduct };
    await axios.delete(`${process.env.REACT_APP_URI_PREFIX_USE}users/bag`, {
      params: deleteProduct,
    });
    window.location.href = "/bag";
  };

  render() {
    return (
      <li id="bagItem-li">
        <ul id="dataItem-ul">
          <li id="dataItem-li">
            <img src={this.state.mainPhoto} alt="" />
          </li>
          <li id="dataItem-li">{this.state.product.description}</li>
          <li id="dataItem-li">
            <div id="gridNumberItems-div">
              <div id="numberAndButons-div">
                <label className="labelCuantify" htmlFor="cantidad">
                  {this.props.cuantity}
                </label>
                <div id="buttonsPlusMinius-div">
                  <button
                    onClick={() =>
                      this.props.modifyCuantity("add", this.state.product)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      this.props.modifyCuantity(
                        "substraction",
                        this.state.product
                      )
                    }
                  >
                    -
                  </button>
                </div>
              </div>

              <button
                onClick={() => this.deleteBagItem(this.state.product._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
          <li id="dataItem-li">
            <label className="labelTotal" htmlFor="labelTotal">
              {`$${this.state.product.price * this.props.cuantity}`}
            </label>
          </li>
        </ul>
      </li>
    );
  }
}
