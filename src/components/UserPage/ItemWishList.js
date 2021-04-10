import React, { useState, useEffect } from "react";
import axios from "axios";

import Images from "../../assets/images";
import "./ItemWishList.css";

const ItemWishList = (props) => {
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
    props.getUser();
  };

  return (
    <div key={props.product._id} className="itemWishList-div">
      <div className="mainPhoto-div">
        <img src={mainPhoto} alt="" />
      </div>
      <div className="dataProduct-div">
        <h6 className="productName-h6">{props.product.name}</h6>
        <p className="productDescription-p">{props.product.description}</p>
        <h6 className="productPrice-h6">{`$${props.product.price}`}</h6>
      </div>
      <div className="productDropButton-div">
        <button
          className="productDrop-button"
          onClick={() => dropListItem(props.product._id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemWishList;
