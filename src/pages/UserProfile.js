import React from "react";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";

class UserProfile extends React.Component {
  state = {
    user: {},
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Navbar />
        <h1>User Profile</h1>
        <h2>{this.state.user.username}</h2>
        <h4>{this.state.user.occupation}</h4>
      </div>
    );
  }
}

export default UserProfile;
