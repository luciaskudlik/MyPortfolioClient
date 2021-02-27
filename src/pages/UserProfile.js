import React from "react";
import axios from "axios";
import Navbar from "./../components/Navbar/Navbar";
import ProjectCard from "./../components/ProjectCard/ProjectCard";
import { withAuth } from "./../context/auth-context";
import PopUp from "./../components/PopUp/PopUp";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import userService from "./../lib/user-service";
import chatService from "./../lib/chat-service";

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
    showEmail: false,
    redirect: false,
    chatId: "",
    displayLogInAlert: true,
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;

    userService.getOneUser(id).then((data) => {
      this.setState({
        user: data,
        portfolio: data.portfolio,
        followers: data.followers,
        userIsFollowing: data.following,
      });

      if (this.props.user) {
        this.setState({ loggedInUser: true });

        if (
          data.followers.some(
            (follower) => follower._id === this.props.user._id
          )
        ) {
          this.setState({ following: true });
        }
      }
    });

    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
    //   .then((response) => {
    //     this.setState({
    //       user: response.data,
    //       portfolio: response.data.portfolio,
    //       followers: response.data.followers,
    //       userIsFollowing: response.data.following,
    //     });

    //     if (this.props.user) {
    //       this.setState({ loggedInUser: true });

    //       if (
    //         response.data.followers.some(
    //           (follower) => follower._id === this.props.user._id
    //         )
    //       ) {
    //         console.log("YES IT INCLUDES");
    //         this.setState({ following: true });
    //       }
    //     }
    //   })
    //   .catch((err) => console.log(err));
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
    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_URL}/api/user/follow/${id}`,
    //     { currentUserId },
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     console.log("followed succesfully");
    //     this.setState({
    //       following: true,
    //     });
    //     this.componentDidMount();
    //   })
    //   .catch((err) => console.log(err));

    userService.followUser(id, currentUserId).then(() => {
      console.log("followed succesfully");
      this.setState({
        following: true,
      });
      this.componentDidMount();
    });
  };

  unfollowUser = () => {
    const { id } = this.props.match.params;
    const currentUserId = this.props.user._id;
    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_URL}/api/user/unfollow/${id}`,
    //     { currentUserId },
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     console.log("unfollowed succesfully");
    //     const newFollowers = this.state.followers.filter(
    //       (follower) => follower._id !== currentUserId
    //     );
    //     this.setState({ following: false, followers: newFollowers });
    //   })
    //   .catch((err) => console.log(err));

    userService.unfollowUser(id, currentUserId).then(() => {
      console.log("unfollowed succesfully");
      const newFollowers = this.state.followers.filter(
        (follower) => follower._id !== currentUserId
      );
      this.setState({ following: false, followers: newFollowers });
    });
  };

  displayEmail = () => {
    this.setState({ showEmail: !this.state.showEmail });
  };

  createChat = () => {
    if (this.props.user) {
      const { id } = this.props.match.params;
      const currentUserId = this.props.user._id;

      if (
        this.state.user.chats.some((chat) => {
          return chat.participants.includes(this.props.user._id);
        })
      ) {
        console.log("chat already exists");

        const filteredChat = this.state.user.chats.filter((chat) => {
          return chat.participants.includes(this.props.user._id);
        });

        this.setState({ chatId: filteredChat[0]._id, redirect: true });
      } else {
        //****************DO NOT DELETE COMMENT****************************/
        // axios
        //   .post(`${process.env.REACT_APP_API_URL}/api/chat/${id}`, {
        //     currentUserId,
        //     withCredentials: true,
        //   })
        //   .then((response) => {
        //     console.log("new chat created", response.data);
        //     this.setState({ chatId: response.data, redirect: true });
        //   })
        //   .catch((err) => console.log(err));

        chatService.createChat(id, currentUserId).then((data) => {
          console.log("new chat created", data);
          this.setState({ chatId: data, redirect: true });
        });
      }
    } else {
      alert("Please log in to contact " + this.state.user.username);
    }
  };

  followNotLoggedIn = () => {
    alert("Please log in to follow " + this.state.user.username);
  };

  render() {
    console.log(this.state.userIsFollowing);
    return (
      <div className="user-profile">
        <Navbar />
        <div className="page-content">
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
              {this.props.user && this.state.following ? (
                <button onClick={this.unfollowUser} className="follow-button">
                  {" "}
                  Unfollow
                </button>
              ) : null}

              {!this.props.user ? (
                <button
                  onClick={this.followNotLoggedIn}
                  className="follow-button"
                >
                  {" "}
                  + Follow
                </button>
              ) : null}
              {this.props.user && !this.state.following ? (
                <button onClick={this.followUser} className="follow-button">
                  {" "}
                  + Follow
                </button>
              ) : null}
              {/* {this.state.displayLogInAlert ? (
              <i class="far fa-comment-alt">
                <p>You need to log in</p>
              </i>
            ) : null} */}
              <button className="follow-button" onClick={this.createChat}>
                Message
              </button>

              {this.state.redirect ? (
                <Redirect to={`/conversation/${this.state.chatId}`} />
              ) : null}

              <button className="follow-button" onClick={this.displayEmail}>
                Email
              </button>
              {this.state.showEmail ? (
                <p className="email-show">{this.state.user.email}</p>
              ) : null}
            </div>
          </div>
          <div id="projects-scroll-bar">
            {this.state.portfolio.length > 0
              ? this.state.user.portfolio
                  .map((project) => {
                    return (
                      <div key={project._id}>
                        <ProjectCard
                          madeBy={this.state.user}
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default withAuth(UserProfile);
