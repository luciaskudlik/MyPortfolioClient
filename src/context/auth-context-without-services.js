import React from 'react';
import axios from 'axios';

const { Consumer, Provider } = React.createContext();


class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null
  }

  componentDidMount () {
    axios.get('http://localhost:5000/auth/me', { withCredentials: true } )
      .then( (response) => {
        const user = response.data;
        this.setState( { isLoggedIn: true, user: user, isLoading: false } )
      })
      .catch( (err) => {
        this.setState( { isLoggedIn: false, user: null, isLoading: false } )
      });
  }

  signup = (username, password) => {
    axios.post(
      'http://localhost:5000/auth/signup', 
      { username, password }, 
      { withCredentials: true }
    )
    .then((response) => {
      const user = response.data;
      this.setState({ isLoggedIn: true, user: user });
    })
    .catch((err) => {
      this.setState({ isLoggedIn: false, user: null });
    })
  }

  login = (username, password) => {
    axios.post(
      'http://localhost:5000/auth/login', 
      { username, password }, 
      { withCredentials: true }
    )
    .then((response) => {
      const user = response.data;
      this.setState({ isLoggedIn: true, user: user });
    })
    .catch((err) => {
      this.setState({ isLoggedIn: false, user: null });
    })
  }

  logout = () => {
    axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
      .then( (data) => {
        this.setState({ isLoggedIn: false, user: null })
      })
      .catch( (err) => console.log(err));
  }


  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    const { signup, login, logout } = this;

    if (isLoading) return <p>Loading</p>;

    return(
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout }}  >
        {this.props.children}
      </Provider>
    )
  }

}


// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  
  return class extends React.Component {
    render() {
      return(
        <Consumer>
          { (value) => {
            const { isLoggedIn, isLoading, user, signup, login, logout } = value;

            return (<WrappedComponent 
                      {...this.props}
                      isLoggedIn={isLoggedIn} 
                      isLoading={isLoading} 
                      user={user} 
                      signup={signup} 
                      login={login} 
                      logout={logout}
                    />)

          } }
        </Consumer>
        )
    }
}
}


export { AuthProvider, withAuth }