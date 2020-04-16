import gql from "graphql-tag";

export const CARDS_QUERY = gql`
  query Cards {
    cards {
      id
      createdAt
      updatedAt
      title
      Language
      Content
      status
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
mutation UpdateCard ($id: ID!, $data: editCardInput!){
  updateCard(input:{
    where: {
      id: $id
    }
    data: $data 
  }

  )
  {
    card {
      id
      title
    }
  }
}
`;
