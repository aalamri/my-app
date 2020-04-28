import gql from "graphql-tag";

export const TAG_CARDS_QUERY = gql`
  query Tag($id: ID!) {
    tag(id: $id) {
      id
      name
      card {
        id
        title
        content
        image {
          url
        }
        tags {
          id
          name
        }
      }
    }
  }
`;

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;
