import { ApolloClient, InMemoryCache } from '@apollo/client';

export const getApolloClient = () =>
  new ApolloClient({
    uri: `https://patmos-gateway.herokuapp.com/graphql`,
    credentials: 'include',
    cache: new InMemoryCache(),
  });
