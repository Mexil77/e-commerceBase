import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./BagItem.css";
import Images from "../../assets/images";

const cookies = new Cookies();

const BagItem = (props) => {
  const [product, setProduct] = useState({});
  const [mainPhoto, setMainPhoto] = useState("");
  useEffect(() => {
    findProduct(props.idProduct);
    setMainPhotoToState(props.idProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findProduct = async (idProduct) => {
    const queryProduct = { idProduct };
    const product = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}products/findProduct`,
      queryProduct
    );
    props.addTotalAmount(product.data.price * props.cuantity);
    setProduct(product.data);
  };

  const setMainPhotoToState = (idProduct) => {
    const mainPhoto = Images.find((product) => product.id === idProduct)
      .photos[0];
    setMainPhoto(mainPhoto);
  };

  const deleteBagItem = async (idProduct) => {
    props.substractTotalAmount(product.price * props.cuantity);
    const deleteProduct = { idUser: cookies.get("id"), idProduct };
    await axios.delete(`${process.env.REACT_APP_URI_PREFIX_USE}users/bag`, {
      params: deleteProduct,
    });
    props.getUserBag();
  };

  const modifyCuantity = async (typeModify, product) => {
    await props.modifyCuantity(typeModify, product);
    await props.updateBagUser();
  };

  return (
    <li id="bagItem-li">
      <ul id="dataItem-ul">
        <li id="dataItem-li">
          <img src={mainPhoto} alt="" />
        </li>
        <li id="dataItem-li">{product.description}</li>
        <li id="dataItem-li">
          <div id="gridNumberItems-div">
            <div id="numberAndButons-div">
              <label className="labelCuantify" htmlFor="cantidad">
                {props.cuantity}
              </label>
              <div id="buttonsPlusMinius-div">
                <button onClick={() => modifyCuantity("add", product)}>
                  +
                </button>
                <button onClick={() => modifyCuantity("substraction", product)}>
                  -
                </button>
              </div>
            </div>

            <button onClick={() => deleteBagItem(product._id)}>Eliminar</button>
          </div>
        </li>
        <li id="dataItem-li">
          <label className="labelTotal" htmlFor="labelTotal">
            {`$${product.price * props.cuantity}`}
          </label>
        </li>
      </ul>
    </li>
  );
};

export default BagItem;
