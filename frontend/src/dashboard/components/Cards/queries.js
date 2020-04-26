import gql from "graphql-tag";

export const CARDS_QUERY = gql`
  query Cards {
    cards {
      id
      createdAt
      updatedAt
      title
      language
      content
      status
    }
  }
`;

export const CARD_QUERY = gql`
  query Cards($id: ID!) {
    card(id: $id) {
      id
      title
      content
      language
      status
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

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $data: editCardInput!) {
    updateCard(input: { where: { id: $id }, data: $data }) {
      card {
        id
        title
      }
    }
  }
`;

export const CREATE_CARD = gql`
  mutation createCard($data: CardInput!) {
    createCard(input: { data: $data }) {
      card {
        id
        title
        content
        published_at
      }
    }
  }
`;

export const GET_TAGS = gql`
  query {
    tags {
      id
      Subject
    }
  }
`;