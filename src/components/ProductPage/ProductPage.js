import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./ProductPage.css";
import Images from "../../assets/images";

import CarouselProducts from "../Extras/CarouselProducts";
import ContentWishList from "../UserPage/ContentWishList";

const cookies = new Cookies();

export default class ProductPage extends Component {
  state = {
    product: {},
    mainPhoto: "",
    photosProduct: [],
    showModal: false,
    wishLists: [],
  };

  componentDidMount() {
    this.findProduct(this.props.match.params.id);
    this.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.product._id !== this.props.match.params.id &&
      prevState.product._id !== undefined
    ) {
      this.findProduct(this.props.match.params.id);
    }
  }

  getUser = async () => {
    const queryUser = { idUser: cookies.get("id") };
    const user = await axios.get(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/user`,
      { params: queryUser }
    );
    this.setState({
      wishLists: user.data.wishLists,
    });
  };

  showModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  findProduct = async (idProduct) => {
    const queryProduct = { idProduct };
    const product = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}products/findProduct`,
      queryProduct
    );
    const photosProduct = this.setProductImages(idProduct);
    this.setState({
      product: product.data,
      mainPhoto: photosProduct[0],
      photosProduct,
    });
  };

  setProductImages = (idProduct) => {
    return Images.find((product) => product.id === idProduct).photos;
  };

  changeMainPhoto = (photo) => {
    this.setState({
      mainPhoto: photo,
    });
  };

  addToBag = async (idProduct) => {
    if (cookies.get("id")) {
      const addBagData = { idUser: cookies.get("id"), idProduct };
      const res = await axios.put(
        `${process.env.REACT_APP_URI_PREFIX_USE}users/bag`,
        addBagData
      );
      alert(res.data.message);
    } else {
      window.location.href = "/logIn";
    }
  };

  render() {
    return (
      <div id="productPage-div">
        {this.state.showModal ? (
          <div id="modalWishList-div">
            <div id="headerModalWishList-div">
              <h1>Tus WishList</h1>
              <button onClick={this.showModal}>X</button>
            </div>
            <div id="bodyModalWishList-div">
              <ContentWishList
                idProduct={this.state.product._id}
                wishLists={this.state.wishLists}
                getUser={this.getUser}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div id="productPrincipalView-div">
          <div id="imagesList-div">
            <ul className="miniImage-ul">
              {this.state.photosProduct.map((photo) => {
                return (
                  <li
                    key={photo}
                    onMouseEnter={() => this.changeMainPhoto(photo)}
                    className="miniImage-li"
                  >
                    <img src={photo} alt="" />
                  </li>
                );
              })}
            </ul>
          </div>
          <div id="principalImage-div">
            <img id="principalImage" src={this.state.mainPhoto} alt="" />
          </div>
          <div id="panelProduct-div">
            <h1>{this.state.product.name}</h1>
            <p>{this.state.product.description}</p>
            <h2>{`$${this.state.product.price}`}</h2>
            <button
              className="btn btn-blue"
              onClick={() => this.addToBag(this.state.product._id)}
            >
              Agregar al carrito
            </button>
            <button className="btn btn-blue" onClick={this.showModal}>
              Agregar a wishList
            </button>
          </div>
        </div>
        <div id="longDescriptionProduct-div">
          <h1>Longer Description</h1>
        </div>
        {
          <div id="recomendedProducts-div">
            <CarouselProducts
              idProducts={[
                "603fc3b714d9fc49b0f2ab79",
                "603fc3b714d9fc49b0f2ab7a",
                "603fc3b714d9fc49b0f2ab7b",
                "603fc3b714d9fc49b0f2ab7c",
                "603fc3b714d9fc49b0f2ab7d",
              ]}
            />
          </div>
        }
        <div id="questionsProduct-div">
          <h1>Questions</h1>
        </div>
        <div id="comentsProduct-div">
          <h1>Coments</h1>
        </div>
      </div>
    );
  }
}
