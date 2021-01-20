import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "./../../context/auth-context";
import "./AddProject.css";

class AddProject extends Component {
  state = {
    title: "",
    image: "",
    about: "",
    description: "",
    technologies: "",
    deployedLink: "",
    githubLink: "",
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      image,
      about,
      description,
      technologies,
      deployedLink,
      githubLink,
    } = this.state;

    const userId = this.props.user._id;

    axios
      .post(
        "http://localhost:5000/api/projects",
        {
          title,
          image,
          about,
          description,
          technologies,
          deployedLink,
          githubLink,
          userId,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.displayProjects();
        this.props.toggleForm();
      })
      .catch((err) => console.log(err));

    this.setState({
      title: "",
      image: "",
      about: "",
      description: "",
      technologies: "",
      deployedLink: "",
      githubLink: "",
    });
  };

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("image", file);

    axios
      .post("http://localhost:5000/api/upload", uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ image: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
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

        <input
          name="image"
          type="file"
          onChange={this.handleFileUpload}
        ></input>
        <span>
          <img
            style={{ width: "100px" }}
            src={this.state.image && this.state.image}
            alt=""
          ></img>
        </span>
        <input
          type="text"
          name="about"
          value={this.state.about}
          onChange={this.handleInput}
          placeholder="e.g restaurant finder"
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
          name="technologies"
          value={this.state.technologies}
          onChange={this.handleInput}
          placeholder="technolgies"
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

export default withAuth(AddProject);
