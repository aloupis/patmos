import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3050/gateway/graphql',
});


// const httpLink = createHttpLink({
//   uri: process.env.REACT_APP_GATEWAY
//     ? `${process.env.REACT_APP_GATEWAY}/graphql`
//     : `https://patmos-nginx.herokuapp.com/gateway/graphql`,
// });


export const getApolloClient = () =>
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
