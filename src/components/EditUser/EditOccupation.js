import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import axios from "axios";

class EditOccupation extends Component {
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
        this.props.editOccupation();
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
          name="occupation"
          value={this.state.occupation}
          onChange={this.handleInput}
          placeholder="occupation"
          required
        />
        <button type="submit">Update changes</button>
      </form>
    );
  }
}

export default withAuth(EditOccupation);
