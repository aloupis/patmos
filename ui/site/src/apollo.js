import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';


const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GATEWAY
    ? `${process.env.REACT_APP_GATEWAY}/graphql`
    // : `https://patmos-nginx.herokuapp.com/gateway/graphql`,
    : `https://patmos-gateway.herokuapp.com/graphql`,
});


export const getApolloClient = () =>
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
