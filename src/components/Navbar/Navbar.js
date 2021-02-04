import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../context/auth-context";
import "./Navbar.css";
import axios from "axios";

class Navbar extends Component {
  state = {
    newUnreadMessages: [],
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

              console.log("ALL UNREAD MESSAGES:", unreadMessages);

              this.setState({
                newUnreadMessages: [
                  ...this.state.newUnreadMessages,
                  unreadMessages,
                ],
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
          {this.props.isLoggedIn ? (
            <Link to="/chat">
              <i class="far fa-paper-plane"></i>
            </Link>
          ) : null}

          {this.state.newUnreadMessages.length === 0 ? null : (
            <p>{this.state.newUnreadMessages.length}</p>
          )}

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
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={this.props.logout}
                    >
                      Logout
                    </Link>
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

    {
      /* <nav className="navbar">
         <Link to={'/'} id='home-btn'>
           <h4>Home</h4>
         </Link>
         {this.props.isLoggedIn ? (
           <>
             <p>username: {this.props.user && this.props.user.username}</p>
             <button onClick={this.props.logout}>Logout</button>
           </>
         ) : (
           <>
             <Link to="/login">
               <button className="navbar-button">Login</button>{' '}
             </Link>
             <br />
             <Link to="/signup">
               <button className="navbar-button">Sign Up</button>{' '}
             </Link>
           </>
         )}
       </nav> */
    }
  }
}

export default withAuth(Navbar);
