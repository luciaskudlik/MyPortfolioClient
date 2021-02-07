import React, { Component } from "react";
import axios from "axios";
import "./ProjectCard.css";
import { Link } from "react-router-dom";
import EditProject from "./../EditProject/EditProject";
import Comment from "./../Comment/Comment";
import AddComment from "./../AddComment/AddComment";
import { withAuth } from "./../../context/auth-context";
import PopUp from "../PopUp/PopUp";
import { Redirect } from "react-router-dom";

class ProjectCard extends Component {
  state = {
    showFront: true,
    showEditForm: false,
    showCommentSection: false,
    comments: [],
    likedBy: [],
    showLikesPopUp: false,
    chatId: "",
    redirect: false,
  };

  createChat = () => {
    if (this.props.user) {
      const madeBy = this.props.madeBy;
      const currentUserId = this.props.user._id;

      if (
        this.props.madeBy.chats.some((chat) => {
          return chat.participants.includes(this.props.user._id);
        })
      ) {
        console.log("chat already exists");

        const filteredChat = this.props.madeBy.chats.filter((chat) => {
          return chat.participants.includes(this.props.user._id);
        });

        this.setState({ chatId: filteredChat[0]._id, redirect: true });
      } else {
        axios
          .post(
            `http://localhost:5000/api/chat/${madeBy._id}`,
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
    } else {
      alert("Please log in to contact " + this.props.madeBy.username);
    }
  };

  toggleCard = () => {
    this.setState({
      showFront: !this.state.showFront,
    });
  };

  deleteProject = () => {
    axios
      .post(`http://localhost:5000/api/projects/${this.props.project._id}`)
      .then(() => this.props.displayProjects())
      .catch((err) => console.log(err));
  };

  toggleEditForm = () => {
    this.setState({ showEditForm: !this.state.showEditForm });
  };

  toggleComments = () => {
    this.setState({ showCommentSection: !this.state.showCommentSection });
  };

  displayComments = () => {
    axios
      .get(`http://localhost:5000/api/projects/${this.props.project._id}`)
      .then((response) => {
        this.setState({
          comments: response.data.comments,
          likedBy: response.data.likedBy,
        });
      })
      .catch((err) => console.log(err));
  };

  showAlert = () => {
    alert("you must log in to write a comment");
  };

  toggleLikesPopUp = () => {
    this.setState({ showLikesPopUp: !this.state.showLikesPopUp });
  };

  like = () => {
    const userId = this.props.user._id;
    axios
      .post(
        `http://localhost:5000/api/projects/like/${this.props.project._id}`,
        { userId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.displayComments();
        this.props.updateLikes();
      })
      .catch((err) => console.log(err));
  };

  dislike = () => {
    const userId = this.props.user._id;
    axios
      .post(
        `http://localhost:5000/api/projects/dislike/${this.props.project._id}`,
        { userId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.displayComments();
        this.props.updateLikes();
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.displayComments();
  };

  render() {
    // const alreadyLiked = this.props.project.likedBy.includes(
    //   this.props.user._id
    // );
    // console.log(alreadyLiked);
    return (
      <div>
        {this.state.showLikesPopUp ? (
          <div>
            <PopUp
              togglePopUp={this.toggleLikesPopUp}
              userArray={this.state.likedBy}
            />
          </div>
        ) : null}

        {this.state.showFront ? (
          <div className="project-card front">
            <img src={this.props.project.image} onClick={this.toggleCard} />
            <div className="bottom-card">
              <div>
                <div className="card-icons">
                  <div className="like-icons">
                    {this.props.enableLikes &&
                    this.state.likedBy.every((user) => {
                      return user._id !== this.props.user._id;
                    }) ? (
                      <i className="far fa-heart" onClick={this.like}></i>
                    ) : this.props.enableLikes &&
                      this.state.likedBy.some((user) => {
                        return user._id === this.props.user._id;
                      }) ? (
                      <i
                        className="fas fa-heart liked-heart"
                        onClick={this.dislike}
                      ></i>
                    ) : null}
                    <i
                      className="far fa-comment"
                      onClick={this.toggleComments}
                    ></i>
                    {!this.props.showEditOptions ? (
                      <i
                        class="far fa-paper-plane"
                        onClick={this.createChat}
                      ></i>
                    ) : null}
                  </div>
                  {this.state.redirect ? (
                    <Redirect to={`/conversation/${this.state.chatId}`} />
                  ) : null}
                  <div className="edit-icons">
                    {this.props.showEditOptions ? (
                      <div>
                        <i
                          className="fas fa-pen"
                          onClick={this.toggleEditForm}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={this.deleteProject}
                        ></i>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="project-name">
                  <p id="colored-p">{this.props.project.title}</p>
                  <p id="small-p">{this.props.project.about}</p>
                </div>

                <div className="likes-comments">
                  <div className="like-comment-calculator">
                    {this.state.comments.length > 0 ? (
                      <p onClick={this.toggleComments} className="comment-line">
                        {this.state.comments.length} comments
                      </p>
                    ) : null}
                    {this.state.likedBy.length > 0 ? (
                      <div
                        className="likedBy-line"
                        onClick={this.toggleLikesPopUp}
                      >
                        {this.state.likedBy.map((user, index) => {
                          if (index <= 2) {
                            return (
                              <div key={user._id} id="mini-img-container">
                                <img src={user.image} id="mini-img" />
                              </div>
                            );
                          }
                        })}

                        <div className="likedBy-line-written">
                          <p>
                            {`liked by ${this.state.likedBy[0].username} `}{" "}
                          </p>
                          {this.state.likedBy.length >= 2 ? (
                            <p>
                              {` and ${this.state.likedBy.length - 1} others`}{" "}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="project-card back" onClick={this.toggleCard}>
            <div className="link-icons">
              <a href={this.props.project.githubLink} target="_blank">
                <i className="fab fa-github"></i>
              </a>
              <a href={this.props.project.deployedLink} target="_blank">
                <i className="fas fa-globe"></i>
              </a>
            </div>
            <div className="description">
              <p>{this.props.project.description} </p>
              <p>technologies used: {this.props.project.technologies} </p>
            </div>
          </div>
        )}
        {this.state.showEditForm ? (
          <EditProject
            project={this.props.project}
            toggleForm={this.toggleEditForm}
            displayProjects={this.props.displayProjects}
          />
        ) : null}
        {this.state.showCommentSection ? (
          <div className="comment-section">
            {this.props.showCommentInput ? (
              <AddComment
                project={this.props.project}
                displayComments={this.displayComments}
                toggleComments={this.toggleComments}
              />
            ) : (
              <form className="comment-input">
                <input placeholder="log in to write a comment" />
                <button onClick={this.showAlert}>Post</button>
              </form>
            )}
            <div>
              {this.state.comments
                .map((comment) => {
                  return (
                    <div key={comment._id}>
                      <Comment
                        comment={comment}
                        displayComments={this.displayComments}
                      />
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withAuth(ProjectCard);
