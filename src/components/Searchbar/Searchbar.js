import React, { Component } from "react";
import axios from "axios";
import "./Searchbar.css";

class Searchbar extends Component {
  state = {
    search: "",
  };

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    this.props.filterUsers(value);
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          className="input search-bar"
          name="search"
          placeholder="Search for a user"
          value={this.state.search}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}

export default Searchbar;