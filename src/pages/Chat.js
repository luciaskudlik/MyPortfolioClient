import React, { Component } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import ChatUserCard from "../components/ChatUserCard/ChatUserCard";
import Navbar from "../components/Navbar/Navbar";
import Conversation from "./../components/Conversation/Conversation";

// const ENDPOINT = "localhost:5000";
// let socket = io(ENDPOINT);

class Chat extends Component {
  state = {
    chats: [],
    online: [],
    openChat: {},
  };

  componentDidMount = () => {
    // window.scrollTo(0, 0);
    this.getAllChats();
    // socket.emit("join", { user: this.props.user._id }, (error) => {
    //   if (error) {
    //     console.log(error);
    //   }
    // });
    // socket.on("online", (users) => {
    //   // console.log("online");
    //   // console.log(users);
    //   const userIdArr = Object.values(users.users);

    //   this.setState({ online: userIdArr });
    // });
  };

  getAllChats = () => {
    const userId = this.props.user._id;
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        this.setState({ chats: response.data.chats });
      })
      .catch((err) => console.log(err));
  };

  openChat = (chat) => {
    console.log(`chat with id ${chat._id} is now open`);
    this.setState({ openChat: chat });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div id="chatlist-scroll-bar">
          {this.state.chats.map((chat) => {
            return (
              <div
                key={chat._id}
                onClick={() => {
                  this.openChat(chat);
                }}
              >
                <ChatUserCard chat={chat} />
              </div>
            );
          })}
        </div>
        <Conversation chat={this.state.openChat} />
      </div>
    );
  }
}

export default withAuth(Chat);
