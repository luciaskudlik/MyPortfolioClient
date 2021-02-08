import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <i className="fab fa-instagram"></i>
        <i className="far fa-envelope"></i>
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
      </div>
    );
  }
}

export default Footer;
