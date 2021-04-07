import React, { Component } from "react";

import "./ContentOrders.css";

export default class ContentOrders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.setOrders();
  }

  setOrders = () => {
    this.setState({
      orders: this.props.orders,
    });
  };

  makeDate = (dateProduct) => {
    const dateObj = new Date(dateProduct);
    const day = dateObj.getDay();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  render() {
    return (
      <div id="contentOptionOrders-div">
        {this.state.orders.map((order) => {
          return (
            <div key={order._id} className="rowOrder-div">
              <div className="idProduct-div">
                <h3>No.</h3>
                <div className="idProduct-box">
                  <h6 className="idProduct-text">{order._id}</h6>
                </div>
              </div>
              <div className="listProducts-div">
                {order.bagList.map((product) => {
                  return (
                    <div key={product._id} className="listProductItem-div">
                      <h5 className="listProductItemName">
                        {product.product.name}
                      </h5>
                      <h6 className="listProductItemCuantity">
                        {product.cuantity}
                      </h6>
                      <h6 className="listProductItemPrice">{`${
                        product.cuantity * product.product.price
                      }`}</h6>
                    </div>
                  );
                })}
              </div>
              <div className="generalInfo-div">
                <h3 className="titleOrder">Hecho el:</h3>
                <h3 className="dateOrder">{this.makeDate(order.createdAt)}</h3>
                <h3 className="totalPayOrder">{`$${order.totalAmount}`}</h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
