import gql from "graphql-tag";

export const CARDS_QUERY = gql`
  query Cards {
    cards{
    id
    createdAt
    updatedAt
    title
    Language
    Content
    is_approved
  }
  }
`;

export const CARD_QUERY = gql`
  query Cards($id: ID!) {
    card(id: $id) {
      id
      title
      Content
      Language
      is_approved
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

