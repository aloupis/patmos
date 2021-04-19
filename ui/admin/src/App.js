import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, grey, green } from '@material-ui/core/colors';
import { ApolloProvider } from '@apollo/client';
import LoginForm from './LoginForm';
import Routes from './Routes';
import { getApolloClient } from './apollo';
import { UserContext } from './UserContext';
import { SnackbarProvider } from './SnackbarContext';
import useFindUser from './useFindUser';
import Loading from './common/Loading';
import 'typeface-roboto';
import 'typeface-inter';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007ac2',
      light: '#4da2d4',
      dark: '#0067b4',
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
    fontFamily: ['Inter var'].join(','),
    useNextVariants: true,
    body2: {
      whiteSpace: 'pre-wrap',
    },
  },
  drawer: {
    configuration: {
      width: 350,
    },
  },
});

const App = () => {
  const { user, setUser, isLoading, setUserContext } = useFindUser();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeUserContext = async () => {
      await setUserContext();
      setInitialized(true);
    };

    if (!initialized) {
      initializeUserContext();
    }
  }, [setUserContext, initialized]);

  if (!initialized) {
    return <Loading />;
  }

  return (
    <React.Suspense fallback={<Loading />}>
      <Sentry.ErrorBoundary fallback="An error has occurred">
        <SnackbarProvider>
          <ApolloProvider client={getApolloClient()}>
            <UserContext.Provider value={{ user, setUser, isLoading }}>
              <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                  {user ? <Routes /> : <LoginForm />}
                </MuiThemeProvider>
              </BrowserRouter>
            </UserContext.Provider>
          </ApolloProvider>
        </SnackbarProvider>
      </Sentry.ErrorBoundary>
    </React.Suspense>
  );
};

export default App;
