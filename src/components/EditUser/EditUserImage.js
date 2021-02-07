import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import axios from "axios";

class EditUserImage extends Component {
  state = {
    username: this.props.userToEdit.username,
    occupation: this.props.userToEdit.occupation,
    image: this.props.userToEdit.image,
    showLoadingMessage: false,
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    console.log(value);
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, occupation, image } = this.state;

    const userId = this.props.user._id;

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
        {
          username,
          occupation,
          image,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.editUserImage();
        this.props.displayProjects();
      })
      .catch((err) => console.log(err));

    this.setState({
      username: "",
      occupation: "",
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
      <form onSubmit={this.handleSubmit} className="image-upload-form">
        <span>
          <img
            className="user-image"
            src={this.state.image && this.state.image}
            alt="uploading"
          ></img>
        </span>

        {this.state.showLoadingMessage ? (
          <p id="loading-message">loading</p>
        ) : null}
        <div>
          <input
            className="image-upload"
            name="image"
            type="file"
            onChange={this.handleFileUpload}
          ></input>
          <button type="submit">
            <i class="fas fa-upload" type="submit"></i>
          </button>
        </div>
      </form>
    );
  }
}

export default withAuth(EditUserImage);
