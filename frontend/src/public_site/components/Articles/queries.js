import gql from "graphql-tag";

export const ARTICLE_QUERY = gql`
  query Articles($id: ID!) {
    article(id: $id) {
      id
      title
      content
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
      is_pinned
      published_at
      meta
      is_deleted
    }
  }
`;

export const ARTICLES_QUERY = gql`
  query Articles {
    articles {
      id
      title
      category {
        id
        name
      }
      image {
        url
      }
      meta
      is_deleted
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
