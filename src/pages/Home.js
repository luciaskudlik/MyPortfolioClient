import React from "react";
import Searchbar from "./../components/Searchbar/Searchbar";
import Navbar from "./../components/Navbar/Navbar";
import axios from "axios";
import UserCard from "../components/UserCard/UserCard";

class Home extends React.Component {
  state = {
    allUsers: [],
    filteredUsers: [],
    showErrorMessage: false,
  };

  filterUsers = (input) => {
    const filtered = this.state.allUsers.filter((user) => {
      const userName = user.username.toLowerCase();
      const searchInput = input.toLowerCase();
      return userName.includes(searchInput);
    });

    this.setState({ filteredUsers: filtered, showErrorMessage: false });

    if (filtered.length === 0) {
      this.setState({ showErrorMessage: true });
    }

    if (input === "") {
      this.setState({ filteredUsers: [], showErrorMessage: false });
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
        <h1>Home Page</h1>
        <Searchbar filterUsers={this.filterUsers} />
        {this.state.showErrorMessage ? (
          <p>sorry we didnt find any users with that name</p>
        ) : null}
        {this.state.filteredUsers.map((user) => {
          return <UserCard userOnCard={user} />;
        })}
      </div>
    );
  }
}

export default Home;
