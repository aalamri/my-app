import gql from "graphql-tag";

/*
 * Queries
 */
export const TEST_QUERY = gql`
  query Tests($id: ID!) {
    test(id: $id) {
      id
      title
      description
      question {
        __typename
        ... on ComponentQuestionsGroupNewQuestion {
          title
          content
          multiple_choices
          correct_answer
          wrong_answer_1
          wrong_answer_2
          wrong_answer_3
          wrong_answer_4
        }
      }
      createdAt
    }
  }
`;

export const TESTS_QUERY = gql`
  query Tests {
    tests {
      id
      title
      description
      createdAt
    }
  }
`;

/*
 * Mutations
 */
export const CREATE_TEST = gql`
  mutation createTest($data: TestInput!) {
    createTest(input: { data: $data }) {
      test {
        id
        title
        createdAt
      }
    }
  }
`;
