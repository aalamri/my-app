import gql from "graphql-tag";

export const ARTICLES_QUERY = gql`
  query Articles {
    articles {
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

export const ARTICLE_QUERY = gql`
  query Articles($id: ID!) {
    article(id: $id) {
      id
      title
      content
      language
      status
      image {
        url
      }
      tag {
        id
        Subject
      }
      published_at
      meta
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      language
      article_url_in_other_language
      title
      content
      category {
        name
      }
      published_at
      status
      meta
      is_deleted
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: ID!, $data: editArticleInput!) {
    updateArticle(input: { where: { id: $id }, data: $data }) {
      article {
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
        title
        published_at
      }
    }
  }
`;
