import { gql } from '@apollo/client';

const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY($offset: Int!, $limit: Int!, $orderBy: OrderBy) {
    categories(offset: $offset, limit: $limit, orderBy: $orderBy) {
      id
      name_en
      name_gr
      summary_en
      summary_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
    categories_count
  }
`;

const CREATE_CATEGORY_MUTATION = gql`
  mutation CREATE_CATEGORY_MUTATION($input: CategoryInput!) {
    insert_category(input: $input) {
      id
      name_en
      name_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION($id: Int!, $set: CategorySet!) {
    update_category(id: $id, set: $set) {
      id
      name_en
      name_gr
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

const CATEGORY_BY_PK_QUERY = gql`
  query CATEGORY_BY_PK_QUERY($id: Int!) {
    category_by_pk(id: $id) {
      id
      name_en
      description_en
      name_gr
      description_gr
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

const DELETE_CATEGORY_MUTATION = gql`
  mutation DELETE_CATEGORY_MUTATION($id: Int!) {
    delete_category(id: $id) {
      success
      message
    }
  }
`;

export {
  CATEGORIES_QUERY,
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
  CATEGORY_BY_PK_QUERY,
  DELETE_CATEGORY_MUTATION,
};
