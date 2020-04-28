import gql from "graphql-tag";

export const SEARCH_QUERY = gql`
query Search ($title: TITLE!){
    cards(input: { where: { title_contains: $title }}) {
      id
      title
      content
    }
    articles(input: { where: { title_contains: $title }}) {
      id
      title
      content
    }
    tests(input: { where: { title_contains: $title }}) {
      id
      title
      
    }
  }
`;