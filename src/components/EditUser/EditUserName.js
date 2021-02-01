import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import axios from "axios";

class EditUserName extends Component {
  state = {
    username: this.props.userToEdit.username,
    occupation: this.props.userToEdit.occupation,
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    console.log(value);
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, occupation } = this.state;

    const userId = this.props.user._id;

    axios
      .put(
        `http://localhost:5000/api/user/${userId}`,
        {
          username,
          occupation,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.editUserName();
        this.props.displayProjects();
      })
      .catch((err) => console.log(err));

    this.setState({
      username: "",
      occupation: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleInput}
          placeholder="username"
          required
        />

        <button type="submit">
          <i class="fas fa-pen" type="submit"></i>
        </button>
      </form>
    );
  }
}

export default withAuth(EditUserName);
