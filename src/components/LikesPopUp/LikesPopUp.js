import React, { Component } from "react";
import "./LikesPopUp.css";
import UserCard from "./../../components/UserCard/UserCard";

class LikesPopUp extends Component {
  state = {};

  test = () => {
    console.log("user with name was clicked");
  };

  render() {
    console.log("LIKED BXY", this.props.likedBy);
    return (
      <div className="likes-pop-up">
        <p onClick={this.props.toggleLikesPopUp}>x</p>
        {this.props.likedBy.map((user) => {
          return <UserCard userOnCard={user} onClick={this.test} />;
        })}
      </div>
    );
  }
}

export default LikesPopUp;
