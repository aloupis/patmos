import gql from 'graphql-tag';

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

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION(
    $title_gr: String!
    $title_en: String!
    $content_gr: String!
    $content_en: String!
  ) {
    insert_post(
      title_gr: $title_gr
      title_en: $title_en
      content_gr: $content_gr
      content_en: $content_en
    ) {
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

export { POSTS_QUERY, CREATE_POST_MUTATION };
