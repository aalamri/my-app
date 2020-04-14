import gql from "graphql-tag";

const CARDS_QUERY = gql`
  query Cards {
    cards {
      id
      title
      tags {
        id
        Subject
      }
      image {
        url
      }
      meta
    }
  }
`;

export default CARDS_QUERY;
