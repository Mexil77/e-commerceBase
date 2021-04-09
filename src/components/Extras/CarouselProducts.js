import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./CarouselProducts.css";

import ProductItem from "./ProductItem";

export default class CarouselProducts extends Component {
  render() {
    return (
      <div id="carouselProducts-div">
        {this.props.idProducts.map((id) => {
          return (
            <Link
              key={id}
              className="linkCarouselProduct-Link"
              to={`/product/${id}`}
              style={{ textDecoration: "none" }}
            >
              <ProductItem idProduct={id} />
            </Link>
          );
        })}
      </div>
    );
  }
}
