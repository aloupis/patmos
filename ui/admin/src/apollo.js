import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log('aaa', process.env.REACT_APP_GATEWAY);
export const getApolloClient = () =>
  new ApolloClient({
    uri: `https://patmos-nginx.herokuapp.com/gateway/graphql`,
    credentials: 'include',
    cache: new InMemoryCache(),
  });
