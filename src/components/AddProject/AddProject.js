import React, { Component } from "react";
import axios from "axios";
import "./AddProject.css";

class AddProject extends Component {
  state = {
    title: "",
    description: "",
    deployedLink: "",
    githubLink: "",
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInput}
          placeholder="name of your project"
          required
        />

        <textarea
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleInput}
          placeholder="e.g. technologies used"
          required
        />
        <input
          type="text"
          name="deployedLink"
          value={this.state.deployedLink}
          onChange={this.handleInput}
          placeholder="link to the deployed website"
          required
        />
        <input
          type="text"
          name="githubLink"
          value={this.state.githubLink}
          onChange={this.handleInput}
          placeholder="link to your github repository"
          required
        />
        <button type="submit">Share your project</button>
      </form>
    );
  }
}

export default AddProject;
