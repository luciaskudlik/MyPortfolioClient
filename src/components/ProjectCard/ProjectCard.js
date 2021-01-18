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

  render() {
    return (
      <div>
        {this.state.showFront ? (
          <div className="project-card front" onClick={this.toggleCard}>
            <img src={this.props.project.image} />
            <p>{this.props.project.title}</p>
          </div>
        ) : (
          <div className="project-card back" onClick={this.toggleCard}>
            <a href="https://github.com/" target="_blank">
              <i
                class="fab fa-github"
                style={{ color: "black", fontSize: "30px" }}
              ></i>
            </a>
            <i
              class="fas fa-globe"
              style={{ color: "black", fontSize: "30px" }}
            ></i>
            <p>{this.props.project.description} </p>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectCard;
