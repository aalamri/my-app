import gql from "graphql-tag";

export const FEATURED_ARTICLE_QUERY = gql`
  query Article {
    articles {
      id
      title
      content
      status
      is_pinned
      language
      image {
        url
      }
      author {
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const FEATURED_CARDS_QUERY = gql`
  query Cards {
    cards {
      id
      title
      content
      status
      is_pinned
      language
      card_url_in_other_language
      meta
      image {
        url
      }
      author {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const FEATURED_TESTS_QUERY = gql`
  query Tests {
    tests {
      id
      title
      description
      status
      is_pinned
    }
  }
`;
