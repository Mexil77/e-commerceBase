import React, { Component } from "react";

import "./Home.css";

import CarouselProducts from "../Extras/CarouselProducts";

export default class Home extends Component {
  render() {
    return (
      <div id="home-div">
        <h1>Bienvenido a esta e-Commerce</h1>
        <h3>Aqui te explicare como Que funciones tiene mi pagina.</h3>
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
    );
  }
}
