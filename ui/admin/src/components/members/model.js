import { gql } from '@apollo/client';

const MEMBERS_QUERY = gql`
  query MEMBERS_QUERY($offset: Int!, $limit: Int!, $orderBy: OrderBy) {
    members(offset: $offset, limit: $limit, orderBy: $orderBy) {
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
    members_count
  }
`;

const CREATE_MEMBER_MUTATION = gql`
  mutation CREATE_MEMBER_MUTATION($input: MemberInput!) {
    insert_member(input: $input) {
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

const UPDATE_MEMBER_MUTATION = gql`
  mutation UPDATE_MEMBER_MUTATION($id: Int!, $set: MemberSet!) {
    update_member(id: $id, set: $set) {
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

const MEMBER_BY_PK_QUERY = gql`
  query MEMBER_BY_PK_QUERY($id: Int!) {
    member_by_pk(id: $id) {
      id
      name_en
      description_en
      name_gr
      description_gr
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

const DELETE_MEMBER_MUTATION = gql`
  mutation DELETE_MEMBER_MUTATION($id: Int!) {
    delete_member(id: $id) {
      success
      message
    }
  }
`;

export {
  MEMBERS_QUERY,
  CREATE_MEMBER_MUTATION,
  UPDATE_MEMBER_MUTATION,
  MEMBER_BY_PK_QUERY,
  DELETE_MEMBER_MUTATION,
};
