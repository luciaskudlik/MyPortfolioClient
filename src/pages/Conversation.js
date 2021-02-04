import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";

/**SOCKET****/
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
let socket = io(ENDPOINT);
/********/

class Conversation extends Component {
  state = {
    text: "",
    chat: {},
    messages: [],
    otherUser: {},
  };

  /**********************SOCKET ********/
  startSocket = () => {
    socket.emit(
      "join",
      { room: this.state.chat._id, user: this.props.user._id },
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );

    socket.on("message", (message) => {
      this.componentDidMount();
    });

    socket.on("online", (user) => {
      console.log("online");
    });
  };

  /******************************/

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

        this.scrollToBottom();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div id="conversation-page">
        <div id="chat-navbar">
          <Navbar />
        </div>
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
          {this.state.messages.map((message, index) => {
            if (message.sentBy === this.props.user._id) {
              return (
                <div key={message._id} className="message-container right">
                  <p className="message right-blue">{message.text}</p>
                  {index === this.state.messages.length - 1 && message.seen ? (
                    <p className="seen">Seen</p>
                  ) : null}
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
          <div
            ref={(el) => {
              this.el = el;
            }}
            id="bottom-of-scroll"
          ></div>
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
        </form>
      </div>
    );
  }
}

export default withAuth(Conversation);
