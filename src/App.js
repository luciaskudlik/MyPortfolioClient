import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import withTheme from "./hoc/withTheme";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import UserProfile from "./pages/UserProfile";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import Conversation from "./pages/Conversation";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="App" style={this.props.style}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/user/:id" component={UserProfile} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/myprofile" component={Private} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <PrivateRoute
            exact
            path="/conversation/:id"
            component={Conversation}
          />
        </Switch>
      </div>
    );
  }
}

export default withTheme(App, "light");
