import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "./../../context/auth-context";
import "./EditProject.css";

class EditProject extends Component {
  state = {
    title: this.props.project.title,
    image: this.props.project.image,
    about: this.props.project.about,
    description: this.props.project.description,
    technologies: this.props.project.technologies,
    deployedLink: this.props.project.deployedLink,
    githubLink: this.props.project.githubLink,
    comments: this.props.commentIds,
    likedBy: this.props.project.likedBy,
    showLoadingMessage: false,
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    console.log(value);
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
      comments,
      likedBy,
    } = this.state;

    const userId = this.props.user._id;
    const id = this.props.project._id;
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/projects/${id}`,
        {
          title,
          image,
          about,
          description,
          technologies,
          deployedLink,
          githubLink,
          userId,
          comments,
          likedBy,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.toggleForm();
        this.props.displayProjects();
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
    this.setState({
      showLoadingMessage: true,
    });
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("image", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({
          image: response.data.secure_url,
          showLoadingMessage: false,
        });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="project-form"
        id="edit-form"
      >
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInput}
          className="add-project-input"
          placeholder="name of your project"
          maxlength="40"
          required
        />
        <div id="project-image-upload" className="add-project-input">
          <input
            name="image"
            type="file"
            onChange={this.handleFileUpload}
            className="add-project-input project-image-input"
          ></input>
          {this.state.showLoadingMessage ? (
            <p id="loading-message-project">loading</p>
          ) : null}
          <span>
            <img
              style={{ width: "30px", height: "auto", borderRadius: "10px" }}
              src={this.state.image}
              alt=""
            ></img>
          </span>
        </div>
        <input
          type="text"
          name="about"
          value={this.state.about}
          onChange={this.handleInput}
          placeholder="what kind of app / e.g 'e-commerce site'"
          className="add-project-input"
          maxlength="30"
          required
        />
        <textarea
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleInput}
          className="add-project-input"
          placeholder="description of the project"
          maxlength="300"
          required
        />
        <input
          type="text"
          name="technologies"
          value={this.state.technologies}
          onChange={this.handleInput}
          className="add-project-input"
          placeholder="technolgies used"
          maxlength="150"
          required
        />
        <input
          type="text"
          name="deployedLink"
          value={this.state.deployedLink}
          onChange={this.handleInput}
          placeholder="link to the deployed website"
          className="add-project-input"
          required
        />
        <input
          type="text"
          name="githubLink"
          value={this.state.githubLink}
          onChange={this.handleInput}
          placeholder="link to the github repository"
          className="add-project-input"
          required
        />
        <button type="submit">Update changes</button>
      </form>
    );
  }
}

export default withAuth(EditProject);
