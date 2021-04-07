import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./UserPage.css";
import DefaultImage from "../../assets/Img/defaultUserImage.png";

import ContentInfo from "./ContentInfo";
import ContentOrders from "./ContentOrders";
import ContentDirections from "./ContentDirections";
import ContentPayForms from "./ContentPayForms";
import ContentWishList from "./ContentWishList";

const cookies = new Cookies();

export default class UserPage extends Component {
  state = {
    user: "",
    constentComponent: -1,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const queryUser = { idUser: cookies.get("id") };
    const user = await axios.get(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/user`,
      { params: queryUser }
    );
    this.setState({
      user: [user.data],
    });
  };

  imprimeState = () => {
    console.log(this.state);
  };

  chageContentComponent = (component) => {
    this.setState({
      constentComponent: component,
    });
  };

  render() {
    return (
      <div id="userPage-div">
        <div id="userPageLeft-div">
          <div id="userCardInfo-div">
            <img src={DefaultImage} alt="" />
            <h4>{this.state.user.email}</h4>
            <h4>
              {this.state.user !== "" ? this.state.user[0].name.name : ""}
            </h4>
          </div>
          <div id="menuOptionsInfo-div">
            <ul id="menuOptionsInfo-ul">
              <li
                className="menuOptionsInfo-li"
                onClick={() => this.chageContentComponent(0)}
              >
                <h5>Info</h5>
              </li>
              <li
                className="menuOptionsInfo-li"
                onClick={() => this.chageContentComponent(1)}
              >
                <h5>Pedidos</h5>
              </li>
              <li
                className="menuOptionsInfo-li"
                onClick={() => this.chageContentComponent(2)}
              >
                <h5>Direcciones</h5>
              </li>
              <li
                className="menuOptionsInfo-li"
                onClick={() => this.chageContentComponent(3)}
              >
                <h5>Formas de pago</h5>
              </li>
              <li
                className="menuOptionsInfo-li"
                onClick={() => this.chageContentComponent(4)}
              >
                <h5>Wish List</h5>
              </li>
            </ul>
          </div>
        </div>
        <div id="userPageRight-div">
          {this.state.constentComponent === 0 ? (
            <ContentInfo user={this.state.user[0]} getUser={this.getUser} />
          ) : this.state.constentComponent === 1 ? (
            <ContentOrders orders={this.state.user[0].orders} />
          ) : this.state.constentComponent === 2 ? (
            <ContentDirections
              directions={this.state.user[0].directions}
              from={"UserInfo"}
            />
          ) : this.state.constentComponent === 3 ? (
            <ContentPayForms
              cards={this.state.user[0].cards}
              stripeId={this.state.user[0].stripeId}
              from={"UserInfo"}
            />
          ) : this.state.constentComponent === 4 ? (
            <ContentWishList
              idProduct={""}
              wishLists={this.state.user[0].wishLists}
              getUser={this.getUser}
            />
          ) : (
            <h1>Bienvenido a tu perfil</h1>
          )}
        </div>
      </div>
    );
  }
}
