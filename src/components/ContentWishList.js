import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "../CssComponents/ContentWishList.css";
import Images from "../assets/images";

const cookies = new Cookies();

export default class ContentWishList extends Component {
  state = {
    newListCliced: false,
    name: "",
    wishListSelected: "",
    idProduct: "",
    wishLists: [],
  };

  componentDidMount() {
    this.setStartValues();
  }

  setStartValues = () => {
    this.setState({
      idProduct: this.props.idProduct,
      wishLists: this.props.wishLists,
    });
  };

  imprimeState = () => {
    console.log(this.state);
  };

  clickNewList = () => {
    this.setState((state) => ({
      newListCliced: !state.newListCliced,
      wishListSelected: "",
    }));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleNewList = async (e) => {
    e.preventDefault();
    const idWishList = await this.createWishList();
    this.addWishListToUser(idWishList);
    if (this.state.idProduct === "") {
      window.location.reload();
    } else {
      this.addProductToWishList(idWishList);
    }
  };

  createWishList = async () => {
    const queryWishList = { name: this.state.name };
    const idWishList = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}wishLists/`,
      queryWishList
    );
    return idWishList.data.idWishList;
  };

  addWishListToUser = async (idWishList) => {
    const queryAddWishList = {
      idUser: cookies.get("id"),
      idWishList: idWishList,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/wishList`,
      queryAddWishList
    );
    window.location.reload();
  };

  addProductToWishList = async (idWishList) => {
    const queryAddProduct = {
      idWishList: idWishList,
      idProduct: this.state.idProduct,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}wishLists/product`,
      queryAddProduct
    );
    window.location.reload();
  };

  clickSelectWishList = (idWishList) => {
    this.setState((state) => ({
      wishListSelected: state.wishListSelected === idWishList ? "" : idWishList,
    }));
  };

  idProductExistInList = async (idWishList) => {
    const queryToFind = {
      idWishList: idWishList,
      idProduct: this.state.idProduct,
    };
    const finded = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}wishLists/product`,
      queryToFind
    );
    console.log(finded.data.finded);
    return finded.data.finded;
  };

  alertHaveProduct = () => {
    alert("Ya tienes este producto en esta wishList");
  };

  dropWishList = async (idWishList) => {
    const queryDropWishList = {
      idUser: cookies.get("id"),
      idWishList: idWishList,
    };
    const queryDeletewishList = { idWishList: idWishList };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/dropWishList`,
      queryDropWishList
    );
    await axios.delete(`${process.env.REACT_APP_URI_PREFIX_USE}wishLists/`, {
      params: queryDeletewishList,
    });
    window.location.reload();
  };

  render() {
    return (
      <div id="contentWishList-div">
        <div className="list-div">
          {this.state.newListCliced ? (
            <div id="formNewList-div">
              <form action="" onSubmit={this.handleNewList}>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="Nombre de la nueva lista"
                  onChange={this.onChange}
                />
                <button type="submit">Crear y Agregar</button>
              </form>
              <button onClick={this.clickNewList}>X</button>
            </div>
          ) : (
            <h1 onClick={this.clickNewList}>Nueva Lista</h1>
          )}
        </div>
        {this.state.wishLists.map((wishList) => {
          return (
            <div
              key={wishList._id}
              className="list-div"
              style={
                wishList.productList.find(
                  (product) => product._id === this.state.idProduct
                )
                  ? { backgroundColor: "red" }
                  : {}
              }
            >
              <div className="listHeder-div">
                <h1
                  onClick={
                    this.state.idProduct === ""
                      ? () => this.clickSelectWishList(wishList._id)
                      : wishList.productList.find(
                          (product) => product._id === this.state.idProduct
                        )
                      ? this.alertHaveProduct
                      : () => this.addProductToWishList(wishList._id)
                  }
                >
                  {wishList.name}
                </h1>
                {this.state.idProduct === "" ? (
                  <button
                    className="listHeder-button"
                    onClick={() => this.dropWishList(wishList._id)}
                  >
                    Eliminar
                  </button>
                ) : (
                  ""
                )}
              </div>
              {this.state.wishListSelected === wishList._id ? (
                <div className="listItems-div">
                  {wishList.productList.map((product) => {
                    return (
                      <ItemList
                        key={product._id}
                        product={product}
                        idWishList={wishList._id}
                      />
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const ItemList = (props) => {
  const [mainPhoto, setMainPhoto] = useState("");

  useEffect(() => {
    setStateMainPhoto(props.product._id);
  });

  const setStateMainPhoto = (idProduct) => {
    const mainPhoto = Images.find((product) => product.id === idProduct)
      .photos[0];
    setMainPhoto(mainPhoto);
  };

  const dropListItem = async (idProduct) => {
    const queryToDrop = { idWishList: props.idWishList, idProduct: idProduct };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}wishLists/dropProduct`,
      queryToDrop
    );
    window.location.reload();
  };

  return (
    <div key={props.product._id} className="listItem-div">
      <div className="mainPhoto-div">
        <img src={mainPhoto} alt="" />
      </div>
      <h6 className="productName-h6">{props.product.name}</h6>
      <p className="productDescription-p">{props.product.description}</p>
      <h6 className="productPrice-h6">{`$${props.product.price}`}</h6>
      <button
        className="productDrop-button"
        onClick={() => dropListItem(props.product._id)}
      >
        Eliminar
      </button>
    </div>
  );
};
