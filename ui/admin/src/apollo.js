import { ApolloClient, InMemoryCache } from '@apollo/client';

export const getApolloClient = () =>
  new ApolloClient({
    uri: '/gateway/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
  });
