import gql from "graphql-tag";

export const CARD_QUERY = gql`
  query Cards($id: ID!) {
    card(id: $id) {
      id
      title
      content
      language
      card_id_of_other_language
      image {
        url
      }
      author {
        id
        firstName
        lastName
      }
      createdAt
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
      author {
        id
        firstName
        lastName
      }
      createdAt
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
        author {
        id
        firstName
        lastName
      }
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
        author {
        id
        firstName
        lastName
      }
      }
    }
    }
  }
`;

export const CARDS_SORT_ALPHA_ASC = gql`
query Cards($lan:ENUM_CARDS_LANGUAGE){
  cards(sort:"title:asc", where: {language:$lan}) {
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
    author {
        id
        firstName
        lastName
      }
    createdAt
    meta
  }
}`;

export const CARDS_SORT_ALPHA_DESC = gql`
query Cards($lan:ENUM_CARDS_LANGUAGE){
  cards(sort:"title:desc", where: {language:$lan}) {
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
    author {
        id
        firstName
        lastName
      }
    createdAt
    meta
  }
}`;

export const CARDS_SORT_CREATED_ASC = gql`
query Cards($lan:ENUM_CARDS_LANGUAGE){
  cards(sort:"createdAt:asc", where: {language:$lan}) {
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
    author {
        id
        firstName
        lastName
      }
    createdAt
    meta
  }
}`;

export const CARDS_SORT_CREATED_DESC = gql`
query Cards($lan:ENUM_CARDS_LANGUAGE){
  cards(sort:"createdAt:desc", where: {language:$lan}) {
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
    author {
        id
        firstName
        lastName
      }
    createdAt
    meta
  }
}`;
