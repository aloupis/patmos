import { gql } from '@apollo/client';

const POSTS_QUERY = gql`
  query POSTS_QUERY($offset: Int!, $limit: Int!, $orderBy: OrderBy) {
    posts(offset: $offset, limit: $limit, orderBy: $orderBy) {
      id
      title_en
      title_gr
      summary_en
      summary_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
    posts_count
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($input: PostInput!) {
    insert_post(input: $input) {
      id
      title_en
      title_gr
      summary_en
      summary_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: Int!, $set: PostSet!) {
    update_post(id: $id, set: $set) {
      id
      title_en
      title_gr
      summary_en
      summary_gr
      created_at
      updated_at
      image_public_id
      author {
        id
        username
      }
    }
  }
`;

const POST_BY_PK_QUERY = gql`
  query POSTS_QUERY($id: Int!) {
    post_by_pk(id: $id) {
      id
      title_en
      content_en
      title_gr
      summary_en
      summary_gr
      content_gr
      created_at
      updated_at
      image_public_id
      author {
        id
        username
      }
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: Int!) {
    delete_post(id: $id) {
      success
      message
    }
  }
`;

export {
  POSTS_QUERY,
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
  POST_BY_PK_QUERY,
  DELETE_POST_MUTATION,
};
