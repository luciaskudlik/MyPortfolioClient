import React, { Component } from "react";
import "./ChatUserCard.css";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import axios from "axios";

class ChatUserCard extends Component {
  state = {
    chat: {},
    otherUser: [],
    hasUnreadMessages: false,
    unreadMessages: [],
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/api/chat/${this.props.chat._id}`)
      .then((response) => {
        this.setState({ chat: response.data });

        const otherParticipants = response.data.participants.filter((user) => {
          return user._id !== this.props.user._id;
        });

        this.setState({ otherUser: otherParticipants[0] });

        if (
          response.data.messages.some((message) => {
            return !message.seen && message.sentBy !== this.props.user._id;
          })
        ) {
          const filtered = response.data.messages.filter((message) => {
            return !message.seen && message.sentBy !== this.props.user._id;
          });

          this.setState({ hasUnreadMessages: true, unreadMessages: filtered });
        }
      })
      .catch((err) => console.log(err));
  };

  readChat = () => {
    const messagesOfOtherUser = this.state.chat.messages.filter((message) => {
      return message.sentBy !== this.props.user._id;
    });

    console.log("OTHER MESSAGES", messagesOfOtherUser);

    messagesOfOtherUser.forEach((message) => {
      axios
        .put(`http://localhost:5000/api/message/read/${message._id}`)
        .then(() => {
          console.log("message was read");
          this.setState({ hasUnreadMessages: false });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  render() {
    return (
      <div>
        <Link to={`/conversation/${this.state.chat._id}`} className="link">
          <div className="user-in-chat" onClick={this.readChat}>
            <div id="user-chat-info-card">
              <img src={this.state.otherUser.image} />
              <p>{this.state.otherUser.username}</p>
            </div>

            {this.state.hasUnreadMessages ? (
              <div className="new-message-alert">
                <p>{this.state.unreadMessages.length}</p>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    );
  }
}

export default withAuth(ChatUserCard);
