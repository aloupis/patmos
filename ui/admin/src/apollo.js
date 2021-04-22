import { ApolloClient, InMemoryCache } from '@apollo/client';

export const getApolloClient = () =>
  new ApolloClient({
    uri: process.env.REACT_APP_GATEWAY ? `${process.env.REACT_APP_GATEWAY}/graphql` : `https://patmos-nginx.herokuapp.com/gateway/graphql`,
    credentials: 'include',
    cache: new InMemoryCache(),
  });
