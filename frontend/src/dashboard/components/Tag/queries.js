import gql from "graphql-tag";

export const TAG_CARDS_QUERY = gql`
  query Tag($id: ID!) {
    tag(id: $id) {
      id
      Subject
      card {
        id
        title
        content
        image {
          url
        }
        tags {
          id
          Subject
        }
      }
    }
  }
`;

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      Subject
    }
  }
`;
