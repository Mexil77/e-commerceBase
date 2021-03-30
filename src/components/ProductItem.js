import React, { Component } from "react";
import axios from "axios";

import "../CssComponents/ProductItem.css";
import Images from "../assets/images";

export default class ProductItem extends Component {
  state = {
    mainPhoto: "",
    product: {},
  };

  componentDidMount() {
    this.findProduct(this.props.idProduct);
    this.setImage(this.props.idProduct);
  }

  findProduct = async (idProduct) => {
    const queryProduct = { idProduct };
    const product = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}products/findProduct`,
      queryProduct
    );
    this.setState({
      product: product.data,
    });
  };

  setImage = (id) => {
    const mainPhoto = Images.find((product) => product.id === id).photos[0];
    this.setState({
      mainPhoto,
    });
  };

  render() {
    return (
      <div id="productItem-div">
        <img id="productItem-img" src={this.state.mainPhoto} alt="" />
        <h5 id="productItem-title">{this.state.product.name}</h5>
        <p id="productItem-price">{`$${this.state.product.price}`}</p>
      </div>
    );
  }
}
