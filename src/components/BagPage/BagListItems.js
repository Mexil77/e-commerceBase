import React, { Component } from "react";

import "./BagListItems.css";

import BagItem from "./BagItem";

export default class BagListItems extends Component {
  render() {
    return (
      <ul id="bagListItems-ul">
        {this.props.bagList.map((item) => {
          return (
            <BagItem
              key={item.idProduct}
              idProduct={item.idProduct}
              cuantity={item.cuantity}
              addTotalAmount={this.props.addTotalAmount}
              substractTotalAmount={this.props.substractTotalAmount}
              modifyCuantity={this.props.modifyCuantity}
            />
          );
        })}
      </ul>
    );
  }
}
