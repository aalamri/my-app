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
      image {
        url
      }
      author {
        id
        first_name
        last_name
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
      published_at
      category {
        id
        name
      }
      image {
        url
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
