import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import Navbar from "./../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showErrorMessage: false,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(email, password);
    this.updateAuthProvider();
  };

  updateAuthProvider = () => {
    this.setState({ showErrorMessage: this.props.showErrorMessage });
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
        <div id="login-page">
          <h1 className="signup-heading">Login</h1>
          <form onSubmit={this.handleFormSubmit} className="project-form">
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              className="add-project-input"
              placeholder="email"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className="add-project-input"
              placeholder="password"
              required
            />
            <input
              type="submit"
              value="Login"
              className="add-project-input"
              id="signup-button"
            />
          </form>
          {this.state.showErrorMessage ? <p>Email or Password wrong</p> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withAuth(Login);
