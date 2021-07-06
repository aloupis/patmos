import { gql } from '@apollo/client';

const POSTS_QUERY = gql`
  query POSTS_QUERY($offset: Int!, $limit: Int!, $orderBy: OrderBy) {
    posts(offset: $offset, limit: $limit, orderBy: $orderBy) {
      id
      title_en
      title_gr
      content_en
      content_gr
      image_public_id
      summary_en
      summary_gr
      created_at
      updated_at
    }

  }
`;


const MEMBERS_QUERY = gql`
  query MEMBERS_QUERY($offset: Int!, $limit: Int!, $orderBy: OrderBy) {
    members(offset: $offset, limit: $limit, orderBy: $orderBy) {
      id
      name_en
      name_gr
      image_public_id
      summary_en
      summary_gr
      position_en
      position_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
  }
`;

const MEMBER_BY_PK_QUERY = gql`
  query MEMBER_BY_PK_QUERY($id: Int!,$offset: Int!, $limit: Int!, $orderBy: OrderBy) {
    member_by_pk(id: $id) {
      id
      name_en
      description_en
      name_gr
      description_gr
      image_public_id
      summary_en
      summary_gr
      position_en
      position_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
    members(offset: $offset, limit: $limit, orderBy: $orderBy) {
      id
      name_en
      name_gr
      image_public_id
      summary_en
      summary_gr
      position_en
      position_gr
      created_at
      updated_at
      author {
        id
        username
      }
    }
  }
`;


const SERVICES_QUERY = gql`
  query SERVICES_QUERY($offset: Int!, $limit: Int!, $orderBy: OrderBy) {
    services(offset: $offset, limit: $limit, orderBy: $orderBy) {
      id
      name_en
      name_gr
      category {
        id
        name_en
        name_gr
      }
      image_public_id
      summary_en
      summary_gr
      price
      created_at
      updated_at
      author {
        id
        username
      }
    }
  }
`;


const SETTINGS_QUERY = gql`
  query SETTINGS_QUERY {
    settings {
      about_us_title_gr
      about_us_title_en
      about_us_content_gr
      about_us_content_en
      about_us_image_public_id
    }
  }
`;



export {
  POSTS_QUERY,
  MEMBERS_QUERY,
  MEMBER_BY_PK_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY
};
