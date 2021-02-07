import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import axios from "axios";
import "./AddComment.css";

class AddComment extends Component {
  state = {
    text: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { text } = this.state;

    const userId = this.props.user._id;
    const projectId = this.props.project._id;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/comments`,
        {
          text,
          projectId,
          userId,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.displayComments();
      })
      .catch((err) => console.log(err));

    this.setState({
      text: "",
    });
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="comment-input">
        <input
          placeholder="write a comment"
          type="text"
          name="text"
          value={this.state.text}
          onChange={this.handleInput}
          required
        />{" "}
        <button>Post</button>
      </form>
    );
  }
}

export default withAuth(AddComment);
