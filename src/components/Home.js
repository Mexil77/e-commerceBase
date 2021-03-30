import React, { Component } from "react";

import "../CssComponents/Home.css";

import CarouselProducts from "./CarouselProducts";

export default class Home extends Component {
  render() {
    return (
      <div id="home-div">
        <h1>Baner Carousel</h1>
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
