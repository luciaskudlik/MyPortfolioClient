import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";
import AddProject from "./../components/AddProject/AddProject";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import PopUp from "../components/PopUp/PopUp";

class Private extends Component {
  state = {
    portfolio: [],
    showForm: false,
    showFollowersPopUp: false,
    showFollowingPopUp: false,
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
                  <h2>{this.props.user.username}</h2>
                  <h4>{this.props.user.occupation}</h4>
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
            <p>Welcome back {this.props.user.username}</p>
          </div>
        ) : null}
        
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
