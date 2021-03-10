import { ApolloClient, InMemoryCache } from '@apollo/client';

export const getApolloClient = () =>
  new ApolloClient({
    uri: 'http://localhost:7000/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
  });
