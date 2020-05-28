import gql from "graphql-tag";

/*
 * Queries
 */
export const FEEDBACK_QUERY = gql`
  query Feedbacks {
    feedbacks {
      id
      email
      feedback_type{
      id
      name
    }
      message
    }
  }
`;

export const FEEDBACK_TYPE_QUERY = gql`
  query FeedbackTypes{
    feedbackTypes {
      id
      name
    }
  }
`;
/*
/*
 * Mutationn
 */
export const CREATE_FEEDBACK = gql`
  mutation createFeedback($data: FeedbackInput!) {
    createFeedback(input: {data: $data }) {
      feedback {
        id
      }
    }
  }
`;