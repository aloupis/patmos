import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const getApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:7000/graphql',
    credentials: 'include',
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};
