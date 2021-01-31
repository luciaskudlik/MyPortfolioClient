import React, { Component } from "react";
import "./PopUp.css";
import UserCard from "../UserCard/UserCard";

class PopUp extends Component {
  state = {};

  render() {
    return (
      <div className="likes-pop-up">
        <i
          class="fas fa-times-circle search-icon"
          onClick={this.props.togglePopUp}
        ></i>
        {this.props.userArray.map((user) => {
          return (
            <div key={user._id}>
              <UserCard userOnCard={user} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default PopUp;
