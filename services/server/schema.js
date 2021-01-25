const { gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    posts: String
  }
`;

module.exports ={ typeDefs}