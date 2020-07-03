import gql from "graphql-tag";

export const ARTICLE_QUERY = gql`
  query Articles($id: ID!) {
    article(id: $id) {
      id
      title
      content
      language
      image {
        url
      }
      category {
        id
        name
      }
      author {
        id
        firstName
        lastName
      }
      is_pinned
      createdAt
      updatedAt
      meta
      is_deleted
      article_id_of_other_language
    }
  }
`;

export const ARTICLES_QUERY = gql`
  query Articles {
    articles {
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
      meta
      is_deleted
      article_id_of_other_language
      createdAt
      updatedAt

    }
  }
`;

export const GET_OTHER_LANG_URL = gql`
  query GetOtherLangURL($id: String!) {
    articlesConnection(where: {
      multi_lang_id: $id
    }) {
      values {
        id
        title
      }
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle($data: ArticleInput!) {
    createArticle(input: { data: $data }) {
      article {
        id
      }
    }
  }
`;

export const CATEGORY_ARTICLES_QUERY = gql`
  query categoriesConnection {
    categoriesConnection 
    {
      values {
      id 
      name
      articles {
        id
        title
        content
        meta
        author {
        id
        firstName
        lastName
        image {
        url
      }
      }
      }
    }
    }
  }
`;

export const CATEGORY_ARTICLES_BY_ID_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      name
      articles {
        id
        title
        content
        image {
          url
        }
        author {
        id
        firstName
        lastName
      }
        category {
          id
          name
        }
      }
    }
  }
`;

export const ARTICLES_SORT_ALPHA_ASC = gql`
query Articles($lan:ENUM_CARDS_LANGUAGE){
  articles(sort:"title:asc", where: {language:$lan}) {
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
      meta
      is_deleted
      article_id_of_other_language
      createdAt
      updatedAt
  }
}`;

export const ARTICLES_SORT_ALPHA_DESC = gql`
query Articles($lan:ENUM_CARDS_LANGUAGE){
  articles(sort:"title:desc", where: {language:$lan}) {
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
      meta
      is_deleted
      article_id_of_other_language
      createdAt
      updatedAt
  }
}`;

export const ARTICLES_SORT_CREATED_ASC = gql`
query Articles($lan:ENUM_CARDS_LANGUAGE){
  articles(sort:"createdAt:asc", where: {language:$lan}) {
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
      meta
      is_deleted
      article_id_of_other_language
      createdAt
      updatedAt
  }
}`;

export const ARTICLES_SORT_CREATED_DESC = gql`
query Articles($lan:ENUM_CARDS_LANGUAGE){
  articles(sort:"createdAt:desc", where: {language:$lan}) {
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
      meta
      is_deleted
      article_id_of_other_language
      createdAt
      updatedAt
  }
}`;

