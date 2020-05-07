import gql from "graphql-tag";

/*
 * Queries
 */
export const GET_USER_ID = gql`
  query me {
    me {
      id
    }
  }
`;

