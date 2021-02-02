import React, { Component } from "react";
import "./ChatUserCard.css";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import axios from "axios";

class ChatUserCard extends Component {
  state = {
    chat: {},
    otherUser: [],
  };

  componentDidMount = () => {
    
    axios
      .get(`http://localhost:5000/api/chat/${this.props.chat._id}`)
      .then((response) => {
        console.log(response.data.participants);
        this.setState({ chat: response.data });

        const otherParticipants = response.data.participants.filter((user) => {
          return user._id !== this.props.user._id;
        });

        console.log(otherParticipants);

        this.setState({ otherUser: otherParticipants[0] });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div id="user-in-chat">
          <img src={this.state.otherUser.image} />
          <p>{this.state.otherUser.username}</p>
        </div>
      </div>
    );
  }
}

export default withAuth(ChatUserCard);
