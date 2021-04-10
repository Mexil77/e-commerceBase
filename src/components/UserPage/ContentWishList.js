import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./ContentWishList.css";

import ItemWishList from "./ItemWishList";

const cookies = new Cookies();

const ContentWishList = (props) => {
  const [newListClicked, setNewListClicked] = useState(false);
  const [data, setData] = useState({ name: "" });
  const [wishListSelected, setWishListSelected] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    setStartValues();
  });

  const setStartValues = () => {
    setIdProduct(props.idProduct);
    setWishLists(props.wishLists);
  };

  const clickNewList = () => {
    setWishListSelected("");
    setNewListClicked(!newListClicked);
  };

  const onChange = (e) => {
    setData({
      [e.target.name]: e.target.value,
    });
  };

  const handleNewList = async (e) => {
    e.preventDefault();
    const idWishList = await createWishList();
    await addWishListToUser(idWishList);
    if (idProduct === "") {
      clickNewList();
      setData({ name: "" });
      props.getUser();
    } else {
      addProductToWishList(idWishList);
    }
  };

  const createWishList = async () => {
    const queryWishList = { name: data.name };
    const idWishList = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}wishLists/`,
      queryWishList
    );
    return idWishList.data.idWishList;
  };

  const addWishListToUser = async (idWishList) => {
    const queryAddWishList = {
      idUser: cookies.get("id"),
      idWishList: idWishList,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/wishList`,
      queryAddWishList
    );
  };

  const addProductToWishList = async (idWishList) => {
    const queryAddProduct = {
      idWishList: idWishList,
      idProduct: idProduct,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}wishLists/product`,
      queryAddProduct
    );
    props.getUser();
  };

  const clickSelectWishList = (idWishList) => {
    setWishListSelected(wishListSelected === idWishList ? "" : idWishList);
  };

  const alertHaveProduct = () => {
    alert("Ya tienes este producto en esta wishList");
  };

  const dropWishList = async (idWishList) => {
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
    props.getUser();
  };

  return (
    <div id="contentWishList-div">
      <div className="list-div">
        {newListClicked ? (
          <div id="formNewList-div">
            <form action="" onSubmit={handleNewList}>
              <input
                type="text"
                name="name"
                value={data.name}
                placeholder="Nombre de la nueva lista"
                onChange={onChange}
              />
              <button type="submit">Crear y Agregar</button>
            </form>
            <button onClick={clickNewList}>X</button>
          </div>
        ) : (
          <h1 onClick={clickNewList}>Nueva Lista</h1>
        )}
      </div>
      {wishLists.map((wishList) => {
        return (
          <div
            key={wishList._id}
            className="list-div"
            style={
              wishList.productList.find((product) => product._id === idProduct)
                ? { backgroundColor: "red" }
                : {}
            }
          >
            <div className="listHeder-div">
              <h1
                onClick={
                  idProduct === ""
                    ? () => clickSelectWishList(wishList._id)
                    : wishList.productList.find(
                        (product) => product._id === idProduct
                      )
                    ? alertHaveProduct
                    : () => addProductToWishList(wishList._id)
                }
              >
                {wishList.name}
              </h1>
              {idProduct === "" ? (
                <button
                  className="btn btn-red"
                  onClick={() => dropWishList(wishList._id)}
                >
                  Eliminar
                </button>
              ) : (
                ""
              )}
            </div>
            {wishListSelected === wishList._id ? (
              <div className="listItems-div">
                {wishList.productList.map((product) => {
                  return (
                    <ItemWishList
                      key={product._id}
                      product={product}
                      idWishList={wishList._id}
                      getUser={props.getUser}
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
};

export default ContentWishList;
