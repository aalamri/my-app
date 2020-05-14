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
        name
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
      content
      category {
      id
      name
      }
      image {
        url
      }
      published_at
      meta
    }
  }
`;

export const CATEGORY_CARDS_BY_ID_QUERY = gql`
  query categories ($id: ID) {
    categoriesConnection(where: { id: $id }) 
    {
      values {
      id 
      name
      cards {
        id
        title
        content
        meta
      }
    }
    }
  }
`;

export const CATEGORY_CARDS_QUERY = gql`
  query categoriesConnection {
    categoriesConnection 
    {
      values {
      id 
      name
      cards {
        id
        title
        content
        meta
      }
    }
    }
  }
`;
