import gql from "graphql-tag";

/*
 * Queries
 */
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
      is_deleted
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
        name
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

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

/*
 * Mutationn
 */
export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: ID!, $data: editArticleInput!) {
    updateArticle(input: { where: { id: $id }, data: $data }) {
      article {
        id
        language
        article_url_in_other_language
        title
        content
        category {
          id
          name
        }
        published_at
        status
        author_id
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

// Soft delete only, will flag the article as is_deleted only
export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    updateArticle(input: { where: { id: $id }, data: { is_deleted: true } }) {
      article {
        id
        is_deleted
      }
    }
  }
`;
