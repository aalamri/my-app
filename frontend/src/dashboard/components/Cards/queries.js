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
        name
      }
      published_at
      meta
    }
  }
`;

export const GET_CARD = gql`
  query GetCard($id: ID!) {
    card(id: $id) {
      id
      language
      card_id_of_other_language
      title
      content
      tags {
        id
        name
      }
      published_at
      status
      meta
      is_deleted
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
      name
    }
  }
`;

// Soft delete only, will flag the article as is_deleted only
export const DELETE_CARD = gql`
  mutation deleteCard($id: ID!) {
    updateCard(input: { where: { id: $id }, data: { is_deleted: true } }) {
      card {
        id
        is_deleted
      }
    }
  }
`;
