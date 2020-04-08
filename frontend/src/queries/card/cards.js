import gql from "graphql-tag";

const CARDS_QUERY = gql`
  query Cards {
    cards {
      id
      Title
      Tags
      image {
        url
      }
      stats
    }
  }
`;

export default CARDS_QUERY;
