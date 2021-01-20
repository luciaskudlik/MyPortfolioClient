import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";
import AddProject from "./../components/AddProject/AddProject";
import ProjectCard from "../components/ProjectCard/ProjectCard";

class Private extends Component {
  state = {
    portfolio: [],
    showForm: false,
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  displayProjects = () => {
    axios
      .get(`http://localhost:5000/api/user`, { withCredentials: true })
      .then((response) => {
        console.log("rendered");
        this.setState({ portfolio: response.data.portfolio });
      });
  };

  componentDidMount = () => {
    this.displayProjects();
  };

  render() {
    return (
      <div className="user-profile">
        <Navbar />
        <p>Welcome {this.props.user && this.props.user.username}</p>
        <img src={this.props.user.image} className="user-image" />
        <h2>{this.props.user.username}</h2>
        <h4>{this.props.user.occupation}</h4>
        <button onClick={this.toggleForm}>
          Add a new project to your portfolio
        </button>
        {this.state.showForm ? (
          <AddProject
            displayProjects={this.displayProjects}
            toggleForm={this.toggleForm}
          />
        ) : null}

        {this.state.portfolio
          .map((project) => {
            return (
              <ProjectCard
                project={project}
                displayProjects={this.displayProjects}
              />
            );
          })
          .reverse()}
      </div>
    );
  }
}

export default withAuth(Private);
