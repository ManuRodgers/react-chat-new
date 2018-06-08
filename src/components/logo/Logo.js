import React, { Component } from "react";
class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={require("./logo.jpg")} alt="logoIMG" />
      </div>
    );
  }
}

export default Logo;
