import React, { Component } from "react";
import "./ChatSearchUserCard.css";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import axios from "axios";

class ChatSearchUserCard extends Component {
  render() {
    return (
      <div>
        <div className="user-in-chat">
          <div id="user-chat-info-card" className="search-user-card">
            <img src={this.props.userOnCard.image} />
            <div>
              <p id="chat-card-username">{this.props.userOnCard.username}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(ChatSearchUserCard);
