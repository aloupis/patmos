import { gql } from '@apollo/client';

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

const UPDATE_SETTINGS_MUTATION = gql`
  mutation UPDATE_SETTINGS_MUTATION($set: SettingsSet!) {
    update_settings(set: $set) {
      about_us_title_gr
      about_us_title_en
      about_us_content_gr
      about_us_content_en
      about_us_image_public_id
    }
  }
`;

export { SETTINGS_QUERY, UPDATE_SETTINGS_MUTATION };
