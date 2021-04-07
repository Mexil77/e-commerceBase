import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./ContentDirections.css";

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
        <h3>Agrega Direccion</h3>
        <h1>+</h1>
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

const FormAddDirection = (props) => {
  return (
    <div id="formAddDirection-div">
      <h1>Form</h1>
      <form
        id="formAddDirection-form"
        action=""
        onSubmit={
          props.addDirection ? props.handleSubmitAdd : props.handleSubmitEdith
        }
      >
        <div className="formAddDirection-colum">
          <label htmlFor="fullName">Nombre:</label>
          <input
            type="text"
            name="fullName"
            value={props.state.fullName}
            placeholder="Juan Paredes Rios"
            onChange={props.onChange}
          />
          <label htmlFor="streetNumber">Calle y Numero:</label>
          <input
            type="text"
            name="streetNumber"
            value={props.state.streetNumber}
            placeholder="Ej. San Martin #35 int 3"
            onChange={props.onChange}
          />
          <label htmlFor="CP">Codigo Postal:</label>
          <input
            type="number"
            name="CP"
            value={props.state.CP !== 0 ? props.state.CP : ""}
            placeholder="Ej. 24536"
            onChange={props.onChange}
          />
          <label htmlFor="state">Estado:</label>
          <input
            type="text"
            name="state"
            value={props.state.state}
            placeholder="Ej. Michoacan"
            onChange={props.onChange}
          />
        </div>
        <div className="formAddDirection-colum">
          <label htmlFor="city">Ciudad/Municipio:</label>
          <input
            type="text"
            name="city"
            value={props.state.city}
            placeholder="Ej. Morelia"
            onChange={props.onChange}
          />
          <label htmlFor="suburb">Colonia:</label>
          <input
            type="text"
            name="suburb"
            value={props.state.suburb}
            placeholder="Ej. Chapultepec Norte"
            onChange={props.onChange}
          />
          <label htmlFor="phoneNumber">Telefono:</label>
          <input
            type="number"
            name="phoneNumber"
            value={props.state.phoneNumber !== 0 ? props.state.phoneNumber : ""}
            placeholder="4433568421"
            onChange={props.onChange}
          />
          <label htmlFor="instructions">Instrucciones:</label>
          <input
            type="text"
            name="instructions"
            value={props.state.instructions}
            placeholder="Entre las Calles avasolo y Av. Solidaridad"
            onChange={props.onChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const CardDirection = (props) => {
  const dropDirection = async (idDirection) => {
    const queryToDelete = { idDirection: idDirection };
    const queryToDrop = { idUser: cookies.get("id"), idDirection: idDirection };
    await axios.delete(`${process.env.REACT_APP_URI_PREFIX_USE}directions/`, {
      params: queryToDelete,
    });
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/dropDirection`,
      queryToDrop
    );
    props.getUser();
  };

  return (
    <div className="cardDirection-div">
      <h6>{props.direction.fullName}</h6>
      <h6>{props.direction.phoneNumber}</h6>
      <p>{`${props.direction.streetNumber} Col. ${props.direction.suburb} C.P.${props.direction.CP}`}</p>
      {props.from === "UserInfo" ? (
        <div id="cardDirectionButtons-div">
          <button onClick={() => props.formDisplay(props.direction)}>
            Editar
          </button>
          <button onClick={() => dropDirection(props.direction._id)}>
            Eliminar
          </button>
        </div>
      ) : (
        <button onClick={() => props.selectDirection(props.direction)}>
          A esta Direccion
        </button>
      )}
    </div>
  );
};

export default ContentDirections;
