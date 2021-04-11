import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./ContentDirections.css";

import FormAddDirection from "./FormAddDirection";
import CardDirection from "./CardDirection";

const cookies = new Cookies();

const ContentDirections = (props) => {
  const [data, setData] = useState({
    fullName: "",
    streetNumber: "",
    CP: 0,
    state: "",
    city: "",
    suburb: "",
    phoneNumber: 0,
    instructions: "",
  });
  const [directions, setDirections] = useState([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [addDirection, setAddDirection] = useState(true);
  const [idDirectionEdith, setIdDirectionEdith] = useState("");

  useEffect(() => {
    setDirectionsToState();
  });

  const setDirectionsToState = () => {
    setDirections(props.directions);
  };

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const formDisplay = (direction) => {
    if (Object.keys(direction).length === 0) {
      setFormIsOpen(!formIsOpen);
      setAddDirection(true);
    } else {
      setFormIsOpen(!formIsOpen);
      setData({
        fullName: direction.fullName,
        streetNumber: direction.streetNumber,
        CP: direction.CP,
        state: direction.state,
        city: direction.city,
        suburb: direction.suburb,
        phoneNumber: direction.phoneNumber,
        instructions: direction.instructions,
      });
      setAddDirection(false);
      setIdDirectionEdith(direction._id);
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const idDirection = await addDirectionToState();
    await addDirectionToUser(idDirection);
    setFormIsOpen(false);
    setData({
      fullName: "",
      streetNumber: "",
      CP: 0,
      state: "",
      city: "",
      suburb: "",
      phoneNumber: 0,
      instructions: "",
    });
    props.getUser();
  };

  const addDirectionToState = async () => {
    const directionToAdd = {
      fullName: data.fullName,
      streetNumber: data.streetNumber,
      CP: data.CP,
      state: data.state,
      city: data.city,
      suburb: data.suburb,
      phoneNumber: data.phoneNumber,
      instructions: data.instructions,
    };
    const idDirection = await axios.post(
      `${process.env.REACT_APP_URI_PREFIX_USE}directions/`,
      directionToAdd
    );
    return idDirection.data.idDirection;
  };

  const addDirectionToUser = async (idDirection) => {
    const queryToAdd = { idUser: cookies.get("id"), idDirection: idDirection };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/direction`,
      queryToAdd
    );
  };

  const handleSubmitEdith = async (e) => {
    e.preventDefault();
    const queryToEdit = {
      idDirection: idDirectionEdith,
      fullName: data.fullName,
      streetNumber: data.streetNumber,
      CP: data.CP,
      state: data.state,
      city: data.city,
      suburb: data.suburb,
      phoneNumber: data.phoneNumber,
      instructions: data.instructions,
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}directions/`,
      queryToEdit
    );
    setFormIsOpen(false);
    setData({
      fullName: "",
      streetNumber: "",
      CP: 0,
      state: "",
      city: "",
      suburb: "",
      phoneNumber: 0,
      instructions: "",
    });
    props.getUser();
  };

  return formIsOpen ? (
    <FormAddDirection
      formDisplay={() => formDisplay({})}
      state={data}
      addDirection={addDirection}
      onChange={onChange}
      handleSubmitAdd={handleSubmitAdd}
      handleSubmitEdith={handleSubmitEdith}
    />
  ) : (
    <div id="contentOptionDirections-div">
      <div
        id="cardAddDirection"
        className="cardDirection-div"
        onClick={() => formDisplay({})}
      >
        <h3 id="cardAddDirection-title">Agrega Direccion</h3>
        <h1 id="cardAddDirection-icon">+</h1>
      </div>
      {directions.map((direction) => {
        return (
          <CardDirection
            key={direction._id}
            direction={direction}
            formDisplay={formDisplay}
            from={props.from}
            selectDirection={props.selectDirection}
            getUser={props.getUser}
          />
        );
      })}
    </div>
  );
};

export default ContentDirections;
