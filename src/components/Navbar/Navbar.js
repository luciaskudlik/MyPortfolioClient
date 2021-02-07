import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../context/auth-context";
import "./Navbar.css";
import axios from "axios";

class Navbar extends Component {
  state = {
    newUnreadMessages: 0,
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((response) => {
        response.data.chats.forEach((chat) => {
          axios
            .get(`http://localhost:5000/api/chat/${chat._id}`)
            .then((response) => {
              console.log(response.data.messages);

              const unreadMessages = response.data.messages.filter(
                (message) => {
                  return (
                    !message.seen && message.sentBy !== this.props.user._id
                  );
                }
              );

              this.setState({
                newUnreadMessages:
                  this.state.newUnreadMessages + unreadMessages.length,
              });
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyPortfolio
          </Link>

          <div id="chat-notification-icon">
            {this.state.newUnreadMessages === 0 ? null : (
              <p className="notification-num">{this.state.newUnreadMessages}</p>
            )}
            {this.props.isLoggedIn ? (
              <Link to="/chat">
                <i class="fas fa-comment-dots"></i>
              </Link>
            ) : null}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {this.props.isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/chat" className="nav-link">
                      Chat
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/myprofile" className="nav-link">
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <p
                      className="nav-link logout-btn"
                      onClick={this.props.logout}
                    >
                      Logout
                    </p>
                    {/* <Link
                      to="/login"
                      className="nav-link"
                      onClick={this.props.logout}
                    >
                      Logout
                    </Link> */}
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
