import React from "react";
import Searchbar from "./../components/Searchbar/Searchbar";
import Navbar from "./../components/Navbar/Navbar";
import axios from "axios";
import UserCard from "../components/UserCard/UserCard";
import image1 from "./../images/windows-C6T6vr1sQI0-unsplash.jpg";
import image2 from "./../images/ramiro-mendes-CjS3QsRuxnE-unsplash.jpg";

class Home extends React.Component {
  state = {
    allUsers: [],
    filteredUsers: [],
    showErrorMessage: false,
    hidePageContent: false,
  };

  filterUsers = (input) => {
    const filtered = this.state.allUsers.filter((user) => {
      const userName = user.username.toLowerCase();
      const searchInput = input.toLowerCase();
      return userName.includes(searchInput);
    });

    this.setState({
      filteredUsers: filtered,
      showErrorMessage: false,
      hidePageContent: true,
    });

    if (filtered.length === 0) {
      this.setState({ showErrorMessage: true, hidePageContent: true });
    }

    if (input === "") {
      this.setState({
        filteredUsers: [],
        showErrorMessage: false,
        hidePageContent: false,
      });
    }
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        this.setState({ allUsers: response.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Navbar />

        <Searchbar filterUsers={this.filterUsers} />
        {this.state.showErrorMessage ? (
          <p>sorry we didnt find any users with that name</p>
        ) : null}
        {this.state.filteredUsers.map((user) => {
          return (
            <div key={user._id}>
              <UserCard userOnCard={user} />
            </div>
          );
        })}

        {this.state.hidePageContent ? null : (
          <div id="homepage">
            <p>
              Welcome to myPortfolio, a platform for developers to share their
              greatest work.
            </p>
            <img src={image1} id="laptop-image" />
            <h3>Why do I need a portfolio</h3>
            <p>
              As young developers the projects we've built are what count most
              on the job market. Show employers what you have developed to
              increase your chances in getting a job.
            </p>
            <img src={image2} id="laptop-image" />
            <h3>How does it work?</h3>
            <p>
              If you are a company, you can start searching for a user by name
              and check out their profile. If you want to contact a user you can
              see their email address on the top of their profile page.{" "}
            </p>
            <p>
              If you are a developer you need to create an account with us to
              build your profile and share your projects.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
