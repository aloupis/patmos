import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, grey, green } from "@material-ui/core/colors";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import Routes from "./Routes";
import { ApolloProvider } from "react-apollo";
import { getApolloClient } from "./apollo";
import { AuthContext } from "./AuthContext";
import "typeface-roboto";
import "typeface-inter";

import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007ac2",
      light: "#4da2d4",
      dark: "#0067b4",
    },
    secondary: { light: green[400], main: green[600], dark: green[800] },
    error: { main: red[500] },
    button: {
      main: grey[600],
      light: grey[400],
      dark: grey[800],
    },
  },
  typography: {
    fontFamily: ["Inter var"].join(","),
    useNextVariants: true,
    body2: {
      whiteSpace: "pre-wrap",
    },
  },
  drawer: {
    configuration: {
      width: 350,
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("isAuthenticated")
  );

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
          <MuiThemeProvider theme={theme}>
            {isAuthenticated ? <Routes /> : <LoginForm />}
          </MuiThemeProvider>
        </BrowserRouter>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
