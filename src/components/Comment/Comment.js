import React, { Component } from "react";
import axios from "axios";
import "./Comment.css";
import moment from "moment";
import { withAuth } from "./../../context/auth-context";

class Comment extends Component {
  state = {
    writtenBy: {},
  };

  deleteComment = () => {
    axios
      .post(`http://localhost:5000/api/comments/${this.props.comment._id}`)
      .then((response) => {
        this.props.displayComments();
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/api/comments/${this.props.comment._id}`)
      .then((response) => {
        this.setState({ writtenBy: response.data.writtenBy });
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.props.comment.created_at);
    const commentedAt = moment(this.props.comment.created_at)
      .startOf("hour")
      .fromNow();
    //console.log(commentedAt);

    return (
      <div className="comment">
        <div className="comment-left">
          <img src={this.state.writtenBy.image} />
          <div className="comment-center">
            <div>{this.props.comment.text}</div>
            <p>commented {commentedAt}</p>
          </div>
        </div>
        {this.props.user && this.state.writtenBy._id === this.props.user._id ? (
          <p onClick={this.deleteComment} className="delete-x">
            x
          </p>
        ) : null}
      </div>
    );
  }
}

export default withAuth(Comment);
