import React, { Component } from "react";

import "./ProductFilter.css";

export default class ProductFilter extends Component {
  render() {
    return (
      <div id="productFilter">
        <h1>Aqui ira el filtro</h1>
        <p>Precio</p>
        <ul>
          <li>3500 o mas</li>
          <li>2500 - 3499</li>
          <li>1500 - 2499</li>
          <li>500 - 1499</li>
          <li>500 o menos</li>
        </ul>
      </div>
    );
  }
}
