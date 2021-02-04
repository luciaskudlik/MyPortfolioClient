import React, { Component } from "react";
import queryString from "query-string";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import ChatUserCard from "../components/ChatUserCard/ChatUserCard";
import Navbar from "../components/Navbar/Navbar";
import moment from "moment";
import { Link } from "react-router-dom";

/**SOCKET****/
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
let socket = io(ENDPOINT);
/********/

class Chat extends Component {
  state = {
    chats: [],
    sortedChats: [],
    online: [],
    openChat: {},
  };

  componentDidMount = () => {
    this.getAllChats();

    /*******SOCKET******/
    window.scrollTo(0, 0);
    socket.emit("join-main", { user: this.props.user._id }, (error) => {
      if (error) {
        console.log(error);
      }
    });
    socket.on("online", (users) => {
      // console.log("online");
      // console.log(users);
      const userIdArr = Object.values(users.users);

      this.setState({ online: userIdArr });
    });
    /*************/
  };

  getAllChats = () => {
    const userId = this.props.user._id;
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((response) => {
        //convert updated_at into timestamp

        const convertedArray = response.data.chats.map((chat) => {
          chat.updated_at = Date.parse(chat.updated_at);
          return chat;
        });

        console.log(convertedArray);

        //sort the chats by the time they were last updated

        const sortedByTime = convertedArray.sort((chat1, chat2) => {
          return chat2.updated_at - chat1.updated_at;
        });

        this.setState({
          chats: response.data.chats,
          sortedChats: sortedByTime,
        });
      })
      .catch((err) => console.log(err));
  };

  readChat = (chat) => {
    console.log(`chat with id ${chat._id} is now open`);
    console.log(chat.messages);
    // const messagesOfOtherUser = chat.messages.filter((message) => {
    //   return message.sentBy !== this.props.user._id;
    // });

    // console.log("OTHER MESSAGES", messagesOfOtherUser);

    this.setState({ openChat: chat });
  };

  render() {
    return (
      <div>
        <Navbar />
        {this.state.sortedChats.length === 0 ? (
          <p id="empty-chat">
            You don't have any chats yet. <Link to={"/home"}>Search</Link> for a
            user you want to connect with and start a conversation through their
            profile page.
          </p>
        ) : (
          <div id="chatlist-scroll-bar">
            {this.state.sortedChats.map((chat) => {
              return (
                <div
                  key={chat._id}
                  onClick={() => {
                    this.readChat(chat);
                  }}
                >
                  <ChatUserCard chat={chat} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Chat);
