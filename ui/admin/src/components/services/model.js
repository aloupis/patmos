import { gql } from '@apollo/client';

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
    services_count
  }
`;

const CREATE_SERVICE_MUTATION = gql`
  mutation CREATE_SERVICE_MUTATION($input: ServiceInput!) {
    insert_service(input: $input) {
      id
      name_en
      name_gr
      category {
        id
        name_en
        name_gr
      }
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

const UPDATE_SERVICE_MUTATION = gql`
  mutation UPDATE_SERVICE_MUTATION($id: Int!, $set: ServiceSet!) {
    update_service(id: $id, set: $set) {
      id
      name_en
      name_gr
      category {
        id
        name_en
        name_gr
      }
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

const SERVICE_BY_PK_QUERY = gql`
  query SERVICES_QUERY($id: Int!) {
    service_by_pk(id: $id) {
      id
      name_en
      content_en
      name_gr
      content_gr
      summary_en
      summary_gr
      category {
        id
        name_en
        name_gr
      }
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

const DELETE_SERVICE_MUTATION = gql`
  mutation DELETE_SERVICE_MUTATION($id: Int!) {
    delete_service(id: $id) {
      success
      message
    }
  }
`;

export {
  SERVICES_QUERY,
  CREATE_SERVICE_MUTATION,
  UPDATE_SERVICE_MUTATION,
  SERVICE_BY_PK_QUERY,
  DELETE_SERVICE_MUTATION,
};
