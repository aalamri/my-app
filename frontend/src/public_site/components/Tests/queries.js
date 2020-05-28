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
      language
      status
      test_id_of_other_language
      questions {
        __typename
        ... on ComponentQuestionsQuestionSingleAnswer {
          id
          title
          content
          choices_type
          correct_answer
          wrong_answer_1
          wrong_answer_2
          wrong_answer_3
          wrong_answer_4
          wrong_answer_5
          meta
        }
        ... on ComponentQuestionsQuestion {
          id
          title
          content
          choices_type
          choice_1
          choice_2
          choice_3
          choice_4
          choice_5
          choice_6
          choice_1_is_correct
          choice_2_is_correct
          choice_3_is_correct
          choice_4_is_correct
          choice_5_is_correct
          choice_6_is_correct
          meta        
        }
      }
      createdAt
      meta
    }
  }
`;

export const GET_TESTS_LIST = gql`
  query Tests {
    tests(where: {
      status: "Approved"
    }) {
      id
      title
      description
      status
      category {
        id
        name
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
