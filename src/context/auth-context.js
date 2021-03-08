import React from "react";
import authService from "./../lib/auth-service";

const { Consumer, Provider } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null,
    showErrorMessage: false,
  };

  componentDidMount() {
    authService
      .me()
      .then((user) =>
        this.setState({ isLoggedIn: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({
          isLoggedIn: false,
          user: null,
          isLoading: false,
        })
      );
  }

  signup = (username, image, occupation, email, password) => {
    authService
      .signup(username, image, occupation, email, password)
      .then((user) =>
        this.setState({ isLoggedIn: true, user, showErrorMessage: false })
      )
      .catch((err) => {
        console.log("could not sign up");
        this.setState({
          isLoggedIn: false,
          user: null,
          showErrorMessage: true,
        });
      });
  };

  login = (email, password) => {
    authService
      .login(email, password)
      .then((user) =>
        this.setState({ isLoggedIn: true, user, showErrorMessage: false })
      )
      .catch((err) => {
        console.log("LOGIN FAILED");
        this.setState({
          isLoggedIn: false,
          user: null,
          showErrorMessage: true,
        });
      });
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoggedIn, isLoading, user, showErrorMessage } = this.state;
    const { signup, login, logout } = this;

    if (isLoading) return <p>Loading</p>;

    return (
      <Provider
        value={{
          isLoggedIn,
          isLoading,
          user,
          showErrorMessage,
          signup,
          login,
          logout,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {(value) => {
            const {
              isLoggedIn,
              isLoading,
              showErrorMessage,
              user,
              signup,
              login,
              logout,
            } = value;

            return (
              <WrappedComponent
                {...this.props}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                showErrorMessage={showErrorMessage}
                user={user}
                signup={signup}
                login={login}
                logout={logout}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

export { AuthProvider, withAuth };
