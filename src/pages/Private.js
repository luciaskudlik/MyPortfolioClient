import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";
import AddProject from "./../components/AddProject/AddProject";
import ProjectCard from "../components/ProjectCard/ProjectCard";

class Private extends Component {
  state = {
    portfolio: [],
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
        <h1>User Profile</h1>
        <p>Welcome {this.props.user && this.props.user.username}</p>
        <img src={this.props.user.image} className="user-image" />
        <h2>{this.props.user.username}</h2>
        <h4>{this.props.user.occupation}</h4>
        <AddProject displayProjects={this.displayProjects} />

        {this.state.portfolio
          .map((project) => {
            return <ProjectCard project={project} />;
          })
          .reverse()}
      </div>
    );
  }
}

export default withAuth(Private);
