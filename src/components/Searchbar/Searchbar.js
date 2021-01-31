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

  closeSearchbar = () => {
    this.setState({ search: "" });
    this.props.filterUsers("");
  };

  render() {
    return (
      <div className="search-container">
        <div id="search">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            className="input search-bar"
            name="search"
            placeholder="Search for a user"
            value={this.state.search}
            onChange={this.handleInput}
          />
        </div>
        <i
          class="fas fa-times-circle search-icon"
          onClick={this.closeSearchbar}
        ></i>
      </div>
    );
  }
}

export default Searchbar;
