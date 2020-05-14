import gql from "graphql-tag";

/*
 * Queries
 */
export const FEEDBACK_QUERY = gql`
  query Feedbacks {
    feedbacks {
      id
      email
      Type
      message
    }
  }
`;
/*
 * Mutationn
 */
export const CREATE_FEEDBACK = gql`
  mutation createFeedback($data: createFeedbackInput!) {
    createFeedback(input: {data: $data }) {
      feedback {
        id
      }
    }
  }
`;