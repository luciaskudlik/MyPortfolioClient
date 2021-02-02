import React, { Component } from "react";
import "./Conversation.css";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import axios from "axios";

class Conversation extends Component {
  state = {
    messages: [],
  };

  componentDidMount = () => {
    console.log(this.props.chat._id);
    axios
      .get(`http://localhost:5000/api/chat/${this.props.chat._id}`)
      .then((response) => {
        console.log("MESSAGES");
        this.setState({ messages: response.data.messages });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <p>open chat: {this.props.chat._id}</p>
        <div>
          <h2>your messages here:</h2>

          {this.state.messages.map((message) => {
            return (
              <div key={message._id}>
                <p>{message.text}</p>
              </div>
            );
          })}
        </div>
        <input />
      </div>
    );
  }
}

export default withAuth(Conversation);
