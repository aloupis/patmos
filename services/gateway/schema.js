const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    created_at: String!
    updated_at: String
    author: User
    editor: User
  }
  type File {
    id: ID!
    name: String!
    type: String!
    url: String!
    uploaded_by: User!
    uploaded_at: String!
  }
  type Service {
    id: ID!
    name: String!
    content: String
    price: Float!
  }
  type Query {
    posts: [Post]
    files: [File]
    services: [Service]
    post(id: ID!): Post
    file(id: ID!): File
    service(id: ID!): Service
  }
  type Mutation {
    insert_post(title: String!, content: String!): Post!
    update_post(id: ID!, title: String, content: String): Post!
    delete_post(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };
