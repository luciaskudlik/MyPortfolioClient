import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";

class Signup extends Component {
  state = {
    username: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU",
    occupation: "",
    email: "",
    password: "",
    showLoadingMessage: false,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, image, occupation, email, password } = this.state;

    this.props.signup(username, image, occupation, email, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
      .post("http://localhost:5000/auth/upload", uploadData, {
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
    const { username, occupation, email, password } = this.state;
    return (
      <div>
        <Navbar />
        <h1 className="signup-heading">
          Create an account to use all our features
        </h1>

        <form onSubmit={this.handleFormSubmit} className="project-form">
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            maxlength="20"
            className="add-project-input"
            placeholder="username"
            required
          />

          <div id="signup-image-upload">
            {this.state.showLoadingMessage ? (
              <p id="loading-message-signup">loading ...</p>
            ) : (
              <input
                name="image"
                type="file"
                onChange={this.handleFileUpload}
              ></input>
            )}

            <span>
              <img
                // style={{ width: "100px", height: "auto" }}
                src={this.state.image && this.state.image}
                alt=""
              ></img>
            </span>
          </div>

          <input
            type="text"
            name="occupation"
            value={occupation}
            onChange={this.handleChange}
            className="add-project-input"
            maxlength="25"
            placeholder="occupation"
            required
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className="add-project-input"
            placeholder="email"
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            className="add-project-input"
            placeholder="password"
            required
          />

          <input
            type="submit"
            value="Signup"
            className="add-project-input"
            id="signup-button"
          />
        </form>

        {/* <p>Already have account?</p>
        <Link to={"/login"}> Login</Link> */}
      </div>
    );
  }
}

export default withAuth(Signup);

// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;
