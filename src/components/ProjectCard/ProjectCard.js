import React, { Component } from "react";
import axios from "axios";
import "./ProjectCard.css";
import { Link } from "react-router-dom";
import EditProject from "./../EditProject/EditProject";
import Comment from "./../Comment/Comment";
import AddComment from "./../AddComment/AddComment";
import { withAuth } from "./../../context/auth-context";

class ProjectCard extends Component {
  state = {
    showFront: true,
    showEditForm: false,
    showCommentSection: false,
    comments: [],
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
        this.setState({ comments: response.data.comments });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.displayComments();
  };

  render() {
    return (
      <div>
        {this.state.showFront ? (
          <div className="project-card front">
            <img src={this.props.project.image} onClick={this.toggleCard} />
            <div className="bottom-card">
              <p>{this.props.project.title}</p>
              <p>{this.props.project.about}</p>
              <div>
                {this.props.showEditOptions ? (
                  <div>
                    <i className="fas fa-pen" onClick={this.toggleEditForm}></i>
                    <i
                      className="fas fa-trash"
                      onClick={this.deleteProject}
                    ></i>
                  </div>
                ) : null}

                <i className="far fa-comment" onClick={this.toggleComments}></i>
                <i className="far fa-thumbs-up"></i>
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
              <p>technologies used:{this.props.project.technologies} </p>
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
          <div>
            {this.props.showCommentInput ? (
              <AddComment
                project={this.props.project}
                displayComments={this.displayComments}
                toggleComments={this.toggleComments}
              />
            ) : <p>You must log in to comment on projects</p>}

            {this.state.comments
              .map((comment) => {
                return (
                  <div key={comment._id}>
                    <Comment comment={comment} />
                  </div>
                );
              })
              .reverse()}
          </div>
        ) : null}
      </div>
    );
  }
}

export default withAuth(ProjectCard);
