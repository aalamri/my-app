import gql from "graphql-tag";

const CARD_QUERY = gql`
  query Cards($id: ID!) {
    card(id: $id) {
      id
      Title
      Content
      image {
        url
      }
      Tags
      published_at
      stats
    }
  }
`;

export default CARD_QUERY;