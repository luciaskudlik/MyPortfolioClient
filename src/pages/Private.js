import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";
import AddProject from "./../components/AddProject/AddProject";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import PopUp from "../components/PopUp/PopUp";
import EditUserName from "../components/EditUser/EditUserName";
import EditOccupation from "../components/EditUser/EditOccupation";

class Private extends Component {
  state = {
    user: {},
    username: "",
    portfolio: [],
    showForm: false,
    showFollowersPopUp: false,
    showFollowingPopUp: false,
    showUserNameInput: false,
    showOccupationInput: false,
    followers: [],
    following: [],
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  displayProjects = () => {
    axios
      .get(`http://localhost:5000/api/user`, { withCredentials: true })
      .then((response) => {
        console.log("rendered");
        this.setState({
          user: response.data,
          username: response.data.username,
          occupation: response.data.occupation,
          portfolio: response.data.portfolio,
          followers: response.data.followers,
          following: response.data.following,
        });
      });
  };

  toggleFollowersPopup = () => {
    this.setState({ showFollowersPopUp: !this.state.showFollowersPopUp });
  };

  toggleFollowingPopup = () => {
    this.setState({ showFollowingPopUp: !this.state.showFollowingPopUp });
  };

  editUsername = () => {
    this.setState({ showUserNameInput: !this.state.showUserNameInput });
  };

  editOccupation = () => {
    this.setState({ showOccupationInput: !this.state.showOccupationInput });
  };

  componentDidMount = () => {
    this.displayProjects();
  };

  render() {
    console.log(this.state.following);

    return (
      <div className="user-profile">
        <Navbar />
        {this.props.user ? (
          <div>
            <div className="user-details private-user-details">
              <img src={this.props.user.image} className="user-image" />
              <div>
                <div>
                  {this.state.showUserNameInput ? (
                    <EditUserName
                      editUserName={this.editUsername}
                      displayProjects={this.displayProjects}
                      userToEdit={this.state.user}
                    />
                  ) : (
                    <div className="edit-user">
                      <h2>{this.state.username}</h2>
                      <i class="fas fa-pen" onClick={this.editUsername}></i>
                    </div>
                  )}

                  {this.state.showOccupationInput ? (
                    <EditOccupation
                      editOccupation={this.editOccupation}
                      displayProjects={this.displayProjects}
                      userToEdit={this.state.user}
                    />
                  ) : (
                    <div className="edit-user">
                      <h4>{this.state.occupation}</h4>
                      <i class="fas fa-pen" onClick={this.editOccupation}></i>
                    </div>
                  )}
                </div>
                <div className="followers-following">
                  <p onClick={this.toggleFollowersPopup}>
                    {this.state.followers.length} followers
                  </p>

                  {this.state.showFollowersPopUp &&
                  this.state.followers.length > 0 ? (
                    <PopUp
                      userArray={this.state.followers}
                      togglePopUp={this.toggleFollowersPopup}
                    />
                  ) : null}

                  <p onClick={this.toggleFollowingPopup}>
                    {this.state.following.length} following
                  </p>

                  {this.state.showFollowingPopUp &&
                  this.state.following.length > 0 ? (
                    <PopUp
                      userArray={this.state.following}
                      togglePopUp={this.toggleFollowingPopup}
                    />
                  ) : null}
                </div>
                <Link to={"/chat"}>
                  <button className="follow-button">Chat</button>
                </Link>
              </div>
            </div>

            <p id="welcome-message">Welcome back {this.props.user.username}!</p>
            <p>You have ... new messages.</p>
          </div>
        ) : null}

        <div id="add-project">
          <button onClick={this.toggleForm}>Add a new project</button>
        </div>

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
                showEditOptions={true}
                showCommentInput={true}
                enableLikes={true}
                updateLikes={this.displayProjects}
              />
            );
          })
          .reverse()}
      </div>
    );
  }
}

export default withAuth(Private);
