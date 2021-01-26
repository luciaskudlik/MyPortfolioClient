import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import Navbar from "./../components/Navbar/Navbar";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(email, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <Navbar />
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            required
          />

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
