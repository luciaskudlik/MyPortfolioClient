import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";

class Private extends Component {
  // state = {
  //   user: {},
  // };

  // componentDidMount = () => {
  //   axios
  //     .get("http://localhost:5000/api/user")
  //     .then((response) => {
  //       this.setState({ user: response.data });
  //     })
  //     .catch((err) => console.log(err));
  // };

  render() {
    return (
      <div  className="user-profile">
        <Navbar />
        <h1>User Profile</h1>
        <p>Welcome {this.props.user && this.props.user.username}</p>
        <img src={this.props.user.image} className="user-image" />
        <h2>{this.props.user.username}</h2>
        <h4>{this.props.user.occupation}</h4>
      </div>
    );
  }
}

export default withAuth(Private);
