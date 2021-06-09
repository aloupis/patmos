const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input PostInput {
    title_en: String!
    title_gr: String!
    content_en: String!
    content_gr: String!
  }
  input PostSet {
    title_en: String
    title_gr: String
    content_en: String
    content_gr: String
  }
  input CategoryInput {
    name_en: String!
    name_gr: String!
    description_en: String!
    description_gr: String!
  }
  input CategorySet {
    name_en: String
    name_gr: String
    description_en: String
    description_gr: String
  }
  input ServiceInput {
    name_gr: String!
    name_en: String!
    content_gr: String!
    content_en: String!
    category_id: Int!
    price: Float!
  }
  input ServiceSet {
    name_gr: String
    name_en: String
    content_gr: String
    content_en: String
    category_id: Int
    price: Float
  }
  input MemberInput {
    name_en: String!
    name_gr: String!
    description_en: String!
    description_gr: String!
  }
  input MemberSet {
    name_en: String
    name_gr: String
    description_en: String
    description_gr: String
  }
  type User {
    id: ID!
    username: String!
    email: String!
  }
  input OrderBy {
    field: String!
    direction: String
  }
  type Post {
    id: ID!
    title_gr: String!
    title_en: String!
    content_gr: String!
    content_en: String!
    created_at: String!
    updated_at: String
    author: User
    editor: User
  }
  type Category {
    id: ID!
    name_gr: String!
    name_en: String!
    description_gr: String!
    description_en: String!
    created_at: String!
    updated_at: String
    author: User
    editor: User
  }
  type Member {
    id: ID!
    name_gr: String!
    name_en: String!
    description_gr: String!
    description_en: String!
    created_at: String!
    updated_at: String
    author: User
    editor: User
  }
  type Service {
    id: ID!
    name_gr: String!
    name_en: String!
    content_gr: String
    content_en: String
    price: Float
    category: Category
    created_at: String!
    updated_at: String
    author: User
    editor: User
  }
  type MutationResult {
    success: Boolean!
    message: String
  }
  type Query {
    posts(offset: Int!, limit: Int!, orderBy: OrderBy): [Post]
    post_by_pk(id: Int!): Post
    posts_count: Int!
    categories(offset: Int!, limit: Int!, orderBy: OrderBy): [Category]
    category_by_pk(id: Int!): Category
    categories_count: Int!
    members(offset: Int!, limit: Int!, orderBy: OrderBy): [Member]
    member_by_pk(id: Int!): Member
    members_count: Int!
    services(offset: Int!, limit: Int!, orderBy: OrderBy): [Service]
    service_by_pk(id: Int!): Service
    services_count: Int!
  }
  type Mutation {
    insert_post(input: PostInput!): Post!
    update_post(id: Int!, set: PostSet!): Post!
    delete_post(id: Int!): MutationResult!
    insert_category(input: CategoryInput!): Category!
    update_category(id: Int!, set: CategorySet!): Category!
    delete_category(id: Int!): MutationResult!
    insert_member(input: MemberInput!): Member!
    update_member(id: Int!, set: MemberSet!): Member!
    delete_member(id: Int!): MutationResult!
    insert_service(input: ServiceInput!): Service!
    update_service(id: Int!, set: ServiceSet!): Service!
    delete_service(id: Int!): MutationResult!
  }
`;

module.exports = { typeDefs };
