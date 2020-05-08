import gql from "graphql-tag";

export const FEATURED_ARTICLE_QUERY = gql`
  query Article {
    articles {
      id
      title
      content
      status
      is_pinned
      image {
        url
      }
      author {
        first_name
        last_name
      }
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
      card_url_in_other_language
      meta
      image {
        url
      }
      author {
        first_name
        last_name
      }
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