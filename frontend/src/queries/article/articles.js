import gql from "graphql-tag";

const ARTICLES_QUERY = gql`
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
      stats
    }
  }
`;

export default ARTICLES_QUERY;
