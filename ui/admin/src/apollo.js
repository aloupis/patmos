import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GATEWAY
    ? `${process.env.REACT_APP_GATEWAY}/graphql`
    : // : `https://patmos-nginx.herokuapp.com/gateway/graphql`,
      `https://patmos-gateway.herokuapp.com/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});

export const getApolloClient = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    credentials: 'include',
    cache: new InMemoryCache(),
  });
