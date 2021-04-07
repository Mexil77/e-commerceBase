import React, { Component } from "react";

import "./Bag.css";

import BagListItems from "./BagListItems";

export default class Bag extends Component {
  render() {
    return (
      <div id="bag-div">
        <h1>Bag</h1>
        <BagListItems
          bagList={this.props.bagList}
          addTotalAmount={this.props.addTotalAmount}
          substractTotalAmount={this.props.substractTotalAmount}
          modifyCuantity={this.props.modifyCuantity}
        />
      </div>
    );
  }
}
