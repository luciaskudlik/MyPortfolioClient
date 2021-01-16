import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../context/auth-context";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              {this.props.isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to={"/myprofile"} className="nav-link">
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/login"}
                      className="nav-link"
                      onClick={this.props.logout}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/signup"} className="nav-link">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );

    {
      /* <nav className="navbar">
         <Link to={'/'} id='home-btn'>
           <h4>Home</h4>
         </Link>
         {this.props.isLoggedIn ? (
           <>
             <p>username: {this.props.user && this.props.user.username}</p>
             <button onClick={this.props.logout}>Logout</button>
           </>
         ) : (
           <>
             <Link to="/login">
               <button className="navbar-button">Login</button>{' '}
             </Link>
             <br />
             <Link to="/signup">
               <button className="navbar-button">Sign Up</button>{' '}
             </Link>
           </>
         )}
       </nav> */
    }
  }
}

export default withAuth(Navbar);
