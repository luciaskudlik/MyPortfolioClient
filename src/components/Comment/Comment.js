import React, { Component } from "react";
import axios from "axios";
import "./Comment.css";

class Comment extends Component {
  state = {
    writtenBy: {},
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/api/comments/${this.props.comment._id}`)
      .then((response) => {
        this.setState({ writtenBy: response.data.writtenBy });
        console.log(("Data", response.data));
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <img src={this.state.writtenBy.image} width="30px" height="auto" />
        <div>{this.props.comment.text}</div>
      </div>
    );
  }
}

export default Comment;
