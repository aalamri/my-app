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
      questions {
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
      test_url_in_other_language
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
      status
      language
      test_url_in_other_language
    }
  }
`;

export const GET_TEST = gql`
  query GetTest($id: ID!) {
    test(id: $id) {
      id
      language
      test_url_in_other_language
      title
      description
      category {
        id
        name
      }
      status
      meta
      is_deleted
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const UPDATE_TEST = gql`
  mutation UpdateTest($id: ID!, $data: editTestInput!) {
    updateTest(input: { where: { id: $id }, data: $data }) {
      test {
        id
        title
      }
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
      }
    }
  }
`;
