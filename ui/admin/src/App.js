import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import Routes from "./Routes";
import { ApolloProvider } from "react-apollo";
import { getApolloClient } from "./apollo";
import { AuthContext } from "./AuthContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    //to be revisited (it is not actually removed!)
    Cookies.remove("jwt", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      secure: false,
    });
    setIsAuthenticated(false);
  };

  return (
    <ApolloProvider client={getApolloClient()}>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login,
          logout,
        }}
      >
        <BrowserRouter>
          {isAuthenticated ? <Routes /> : <LoginForm />}
        </BrowserRouter>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
