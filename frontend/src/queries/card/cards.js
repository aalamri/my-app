import gql from "graphql-tag";

const CARDS_QUERY = gql`
  query Cards {
    cards {
      id
      Title
      tags {
        id
        Subject
      }
      image {
        url
      }
      stats
    }
  }
`;

export default CARDS_QUERY;
