import React from "react";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";
import ProjectCard from "./../components/ProjectCard/ProjectCard";
import { withAuth } from "./../context/auth-context";
import PopUp from "./../components/PopUp/PopUp";

class UserProfile extends React.Component {
  state = {
    user: {},
    currentUser: {},
    followers: [],
    userIsFollowing: [],
    following: false,
    portfolio: [],
    loggedInUser: false,
    showFollowersPopUp: false,
    showFollowingPopUp: false,
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((response) => {
        this.setState({
          user: response.data,
          portfolio: response.data.portfolio,
          followers: response.data.followers,
          userIsFollowing: response.data.following,
        });

        if (this.props.user) {
          this.setState({ loggedInUser: true });

          if (
            response.data.followers.some(
              (follower) => follower._id === this.props.user._id
            )
          ) {
            console.log("YES IT INCLUDES");
            this.setState({ following: true });
          }

          // axios
          //   .get(`http://localhost:5000/api/user`, { withCredentials: true })
          //   .then((response) => {
          //     const isFollowing = response.data.following.includes(
          //       this.state.user._id
          //     );

          //     console.log("FOLLOWING?!", isFollowing);

          //     this.setState({
          //       currentUser: response.data,
          //       following: isFollowing,
          //     });
          //     console.log(this.state.currentUser);
          //   })
          //   .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  toggleFollowersPopup = () => {
    this.setState({ showFollowersPopUp: !this.state.showFollowersPopUp });
  };

  toggleFollowingPopup = () => {
    this.setState({ showFollowingPopUp: !this.state.showFollowingPopUp });
  };

  followUser = () => {
    const { id } = this.props.match.params;
    const currentUserId = this.props.user._id;
    axios
      .post(
        `http://localhost:5000/api/user/follow/${id}`,
        { currentUserId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("followed succesfully");
        this.setState({
          following: true,
        });
        this.componentDidMount();
      })
      .catch((err) => console.log(err));
  };

  unfollowUser = () => {
    const { id } = this.props.match.params;
    const currentUserId = this.props.user._id;
    axios
      .post(
        `http://localhost:5000/api/user/unfollow/${id}`,
        { currentUserId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("unfollowed succesfully");
        const newFollowers = this.state.followers.filter(
          (follower) => follower._id !== currentUserId
        );
        this.setState({ following: false, followers: newFollowers });
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.userIsFollowing);
    return (
      <div className="user-profile">
        <Navbar />
        <div className="user-details">
          <div className="top-left">
            <img src={this.state.user.image} className="user-image" />
            <div>
              <h2>{this.state.user.username}</h2>
              <h4>{this.state.user.occupation}</h4>
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
                  {this.state.userIsFollowing.length} following
                </p>

                {this.state.showFollowingPopUp &&
                this.state.userIsFollowing.length > 0 ? (
                  <PopUp
                    userArray={this.state.userIsFollowing}
                    togglePopUp={this.toggleFollowingPopup}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="user-details-bottom">
            <div>
              <i className="far fa-envelope"></i>
              <p>{this.state.user.email}</p>
            </div>

            {this.props.user && this.state.following ? (
              <button onClick={this.unfollowUser}> - unfollow</button>
            ) : null}
            {this.props.user && !this.state.following ? (
              <button onClick={this.followUser}> + Follow</button>
            ) : null}
          </div>
        </div>

        {this.state.portfolio.length > 0
          ? this.state.user.portfolio
              .map((project) => {
                return (
                  <div key={project._id}>
                    <ProjectCard
                      project={project}
                      showEditOptions={false}
                      showCommentInput={this.state.loggedInUser}
                      enableLikes={this.state.loggedInUser}
                      updateLikes={this.componentDidMount}
                    />
                  </div>
                );
              })
              .reverse()
          : null}
      </div>
    );
  }
}

export default withAuth(UserProfile);
