import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query POSTS_QUERY {
    posts {
      id
      title_en
      title_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
  }
`;

// const POSTS_QUERY = gql `
// query POSTS_QUERY($title_gr:String!,$title_en:String!,$content_gr:String!,$content_en: String!) {

// }
// `

export { POSTS_QUERY };
