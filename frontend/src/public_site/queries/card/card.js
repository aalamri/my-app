import gql from "graphql-tag";

const CARD_QUERY = gql`
  query Cards($id: ID!) {
    card(id: $id) {
      id
      title
      Content
      image {
        url
      }
      tags {
        id
        Subject
      }
      published_at
      meta
    }
  }
`;

export default CARD_QUERY;
