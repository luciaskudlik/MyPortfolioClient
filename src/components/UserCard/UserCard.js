import React, { Component } from "react";
import axios from "axios";
import "./UserCard.css";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";

class UserCard extends Component {
  render() {
    return (
      <div>
        {this.props.user &&
        this.props.userOnCard._id === this.props.user._id ? (
          <Link to={"/myprofile"}>
            <div className="user-card">
              <img src={this.props.userOnCard.image} />
              <p>{this.props.userOnCard.username}</p>
            </div>
          </Link>
        ) : (
          <Link to={`/user/${this.props.userOnCard._id}`}>
            <div className="user-card">
              <img src={this.props.userOnCard.image} />
              <p>{this.props.userOnCard.username}</p>
            </div>
          </Link>
        )}{" "}
      </div>
    );
  }
}

export default withAuth(UserCard);
