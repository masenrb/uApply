import React, { Component } from "react";

const UserContext = React.createContext(false);

class UserProvider extends Component {
  // Context state
  state = {
    user: { data: {}, isLoggedIn: false },
  };

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }));
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const { setUser } = this;

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}
export { UserProvider };
export const UserConsumer = UserContext.Consumer;

export default UserContext;
