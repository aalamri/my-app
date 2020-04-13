import gql from "graphql-tag";

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
    }
  }
`;

export default ARTICLES_QUERY;

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
