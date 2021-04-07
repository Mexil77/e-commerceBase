import React, { Component } from "react";

import "./ProductFilterPage.css";

import GridProductResult from "./GridProductResult";
import ProductFilter from "./ProductFilter";

export default class ProductFilterPage extends Component {
  render() {
    return (
      <div id="productFilterPage-div">
        <ProductFilter />
        <GridProductResult />
      </div>
    );
  }
}
