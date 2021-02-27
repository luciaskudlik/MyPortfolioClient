import React, { Component } from "react";
import queryString from "query-string";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import ChatUserCard from "../components/ChatUserCard/ChatUserCard";
import Navbar from "../components/Navbar/Navbar";
import moment from "moment";
import { Link } from "react-router-dom";
import Searchbar from "./../components/Searchbar/Searchbar";
import UserCard from "../components/UserCard/UserCard";
import { Redirect } from "react-router-dom";
import ChatSearchUserCard from "./../components/ChatSearchUserCard/ChatSearchUserCard";
import userService from "./../lib/user-service";
import chatService from "./../lib/chat-service";

// /**SOCKET****/
// import io from "socket.io-client";
// const ENDPOINT = "http://localhost:5000";
// let socket = io(ENDPOINT);
// /********/

class Chat extends Component {
  state = {
    allUser: [],
    chats: [],
    sortedChats: [],
    online: [],
    openChat: {},
    filteredUsers: [],
    showErrorMessage: false,
    hidePageContent: false,
    redirect: false,
    chatId: "",
  };

  // startSocket = () => {
  //   socket.emit("join-main", { user: this.props.user._id }, (error) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //   });

  //   socket.on("message", (message) => {
  //     console.log("New message received in one of the chats");
  //     this.getAllChats();
  //   });
  // };

  componentDidMount = () => {
    this.getAllChats();
    this.getAllUser();
    // this.startSocket();
  };

  getAllUser = () => {
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/api/users`)
    //   .then((response) => {
    //     this.setState({ allUsers: response.data });
    //   })
    //   .catch((err) => console.log(err));

    userService.getAllUsers().then((data) => {
      this.setState({ allUsers: data });
    });
  };

  getAllChats = () => {
    const userId = this.props.user._id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, {
        withCredentials: true,
      })
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

        console.log("CHATS:", response.data.chats);

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

  filterUsers = (input) => {
    const filtered = this.state.allUsers.filter((user) => {
      const userName = user.username.toLowerCase();
      const searchInput = input.toLowerCase();
      return userName.includes(searchInput);
    });

    this.setState({
      filteredUsers: filtered,
      showErrorMessage: false,
      hidePageContent: true,
    });

    if (filtered.length === 0) {
      this.setState({ showErrorMessage: true, hidePageContent: true });
    }

    if (input === "") {
      this.setState({
        filteredUsers: [],
        showErrorMessage: false,
        hidePageContent: false,
      });
    }
  };

  openChat = (userId) => {
    console.log("chat with " + userId + "was openend");

    const currentUserId = this.props.user._id;

    if (
      this.state.chats.some((chat) => {
        return chat.participants.includes(userId);
      })
    ) {
      console.log("chat already exists");

      const filteredChat = this.state.chats.filter((chat) => {
        return chat.participants.includes(userId);
      });

      this.setState({ chatId: filteredChat[0]._id, redirect: true });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/chat/${userId}`,
          { currentUserId },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("new chat created", response.data);
          this.setState({ chatId: response.data, redirect: true });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div id="chat-list">
        <Navbar />

        {this.state.sortedChats.length === 0 ? (
          <p id="empty-chat">
            You don't have any chats yet.{" "}
            <Link to={"/home"} className="link">
              Search
            </Link>{" "}
            for a user you want to connect with and start a conversation through
            their profile page.
          </p>
        ) : (
          <div id="chatlist-scroll-bar">
            <div id="chat-searchbar">
              <Searchbar filterUsers={this.filterUsers} />
            </div>
            {this.state.filteredUsers.map((user) => {
              if (user._id !== this.props.user._id) {
                return (
                  <div
                    onClick={() => {
                      this.openChat(user._id);
                    }}
                  >
                    <ChatSearchUserCard userOnCard={user} />
                  </div>
                );
              }
            })}
            {this.state.redirect ? (
              <Redirect to={`/conversation/${this.state.chatId}`} />
            ) : null}
            {this.state.showErrorMessage ? (
              <p id="search-error">we couldn't match any results.</p>
            ) : null}

            {!this.state.hidePageContent
              ? this.state.sortedChats.map((chat) => {
                  if (chat.messages.length > 0) {
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
                  }
                })
              : null}
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Chat);
