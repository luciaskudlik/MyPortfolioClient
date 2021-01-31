import React, { Component } from "react";
import "./PopUp.css";
import UserCard from "../UserCard/UserCard";
import { Link } from "react-router-dom";

class PopUp extends Component {
  state = {};

  render() {
    return (
      <div className="likes-pop-up">
        <p onClick={this.props.togglePopUp}>x</p>
        {this.props.userArray.map((user) => {
          console.log(user._id);
          return (
            <Link to={`/user/${user._id}`} className="link">
              <UserCard userOnCard={user} />
            </Link>
          );
        })}
      </div>
    );
  }
}

export default PopUp;
