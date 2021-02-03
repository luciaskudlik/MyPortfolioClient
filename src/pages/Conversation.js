import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";

class Conversation extends Component {
  state = {
    text: "",
    chat: {},
    messages: [],
    otherUser: {},
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { text } = this.state;

    const userId = this.props.user._id;

    axios
      .post(
        "http://localhost:5000/api/message",
        {
          chat: this.state.chat._id,
          sentBy: userId,
          text: this.state.text,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.componentDidMount();
      })
      .catch((err) => console.log(err));

    this.setState({
      text: "",
    });
  };

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount = () => {
    // this.scrollToBottom();

    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/chat/${id}`)
      .then((response) => {
        const otherParticipants = response.data.participants.filter((user) => {
          return user._id !== this.props.user._id;
        });

        this.setState({
          chat: response.data,
          messages: response.data.messages,
          otherUser: otherParticipants[0],
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="chat-info-bar">
          <div className="chat-info">
            <Link to={"/chat"}>
              <i class="fas fa-angle-left"></i>
            </Link>
            <img src={this.state.otherUser.image} className="chat-user-img" />
            <p>{this.state.otherUser.username}</p>
          </div>
          <hr />
        </div>
        <div className="conversation">
          {this.state.messages.map((message) => {
            if (message.sentBy === this.props.user._id) {
              return (
                <div key={message._id} className="message-container right">
                  <p className="message right-blue">{message.text}</p>
                </div>
              );
            } else {
              return (
                <div key={message._id} className="message-container left">
                  <p className="message left-red">{message.text}</p>
                </div>
              );
            }
          })}
        </div>

        <form onSubmit={this.handleSubmit} className="send-message-form">
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleInput}
            placeholder="type something here..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
          <div
            ref={(el) => {
              this.el = el;
            }}
          ></div>
        </form>
      </div>
    );
  }
}

export default withAuth(Conversation);
