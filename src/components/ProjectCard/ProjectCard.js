import React, { Component } from "react";
import axios from "axios";
import "./ProjectCard.css";
import { Link } from "react-router-dom";

class ProjectCard extends Component {
  state = {
    showFront: true,
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

  render() {
    return (
      <div>
        {this.state.showFront ? (
          <div className="project-card front" onClick={this.toggleCard}>
            <img src={this.props.project.image} />
            <div className="bottom-card">
              <p>{this.props.project.title}</p>
              <p>{this.props.project.about}</p>
              <div>
                <i className="fas fa-pen"></i>
                <i className="fas fa-trash" onClick={this.deleteProject}></i>
                <i className="far fa-comment"></i>
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
      </div>
    );
  }
}

export default ProjectCard;
