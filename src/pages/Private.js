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
import EditUserImage from "../components/EditUser/EditUserImage";
import Footer from "../components/Footer/Footer";

class Private extends Component {
  state = {
    user: {},
    username: "",
    image: "",
    portfolio: [],
    showForm: false,
    showFollowersPopUp: false,
    showFollowingPopUp: false,
    showUserNameInput: false,
    showOccupationInput: false,
    showImageUpload: false,
    followers: [],
    following: [],
    unreadMessages: 0,
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  displayProjects = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("rendered");
        this.setState({
          user: response.data,
          username: response.data.username,
          occupation: response.data.occupation,
          portfolio: response.data.portfolio,
          followers: response.data.followers,
          following: response.data.following,
          image: response.data.image,
        });

        response.data.chats.forEach((chat) => {
          axios
            .get(`${process.env.REACT_APP_API_URL}/api/chat/${chat._id}`)
            .then((response) => {
              const filtered = response.data.messages.filter((message) => {
                return (
                  message.seen === false &&
                  message.sentBy !== this.props.user._id
                );
              });

              this.setState({
                unreadMessages: this.state.unreadMessages + filtered.length,
              });
              console.log(filtered.length);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })

      .catch((err) => console.log(err));
  };

  toggleFollowersPopup = () => {
    this.setState({ showFollowersPopUp: !this.state.showFollowersPopUp });
  };

  toggleFollowingPopup = () => {
    this.setState({ showFollowingPopUp: !this.state.showFollowingPopUp });
  };

  editUserImage = () => {
    this.setState({ showImageUpload: !this.state.showImageUpload });
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
        <div className="page-content">
          {this.props.user ? (
            <div>
              <div className="user-details private-user-details">
                {this.state.showImageUpload ? (
                  <div>
                    <EditUserImage
                      editUserImage={this.editUserImage}
                      displayProjects={this.displayProjects}
                      userToEdit={this.state.user}
                    />
                  </div>
                ) : (
                  <div className="edit-user-image">
                    <img src={this.state.image} className="user-image" />
                    <i
                      class="fas fa-plus-circle"
                      onClick={this.editUserImage}
                    ></i>
                    {/* <i class="fas fa-pen" onClick={this.editUserImage}></i> */}
                  </div>
                )}
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
                </div>
              </div>

              <p id="welcome-message">Welcome back {this.state.username}!</p>

              {this.state.unreadMessages === 0 ? (
                <Link to="/chat" className="link">
                  <p id="no-new-message">
                    <i class="fas fa-comment-dots" id="black-comment-dots"></i>
                    You have no new messages.
                  </p>
                </Link>
              ) : this.state.unreadMessages === 1 ? (
                <Link to="/chat" className="link">
                  <p id="notification-message">
                    <i class="fas fa-comment-dots" id="black-comment-dots"></i>
                    You have {this.state.unreadMessages} new message.
                  </p>
                </Link>
              ) : (
                <Link to="/chat" className="link">
                  <p id="notification-message">
                    <i class="fas fa-comment-dots" id="black-comment-dots"></i>
                    You have {this.state.unreadMessages} new messages.
                  </p>
                </Link>
              )}
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

          <div id="projects-scroll-bar">
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default withAuth(Private);
