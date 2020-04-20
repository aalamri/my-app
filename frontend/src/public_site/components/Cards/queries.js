import gql from "graphql-tag";

export const CARD_QUERY = gql`
  query Cards($id: ID!) {
    card(id: $id) {
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
      published_at
      meta
    }
  }
`;

export const CARDS_QUERY = gql`
  query Cards {
    cards {
      id
      title
      tags {
        id
        Subject
      }
      image {
        url
      }
      meta
    }
  }
`;
