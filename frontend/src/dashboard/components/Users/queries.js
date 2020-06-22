import gql from "graphql-tag";

export const USERS_QUERY = gql`
query users {
  users {
    id    
   email
    firstName
    lastName
    role {
      name
      type
    }
  }
}
`;
export const ROLES_QUERY = gql`
query roles {
  roles {
    id    
    name
    type
  }
}
`;

export const DELETE_USER_QUERY = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(input:{ where: { id: $id }}) {
      user{
        id,
      }
    }
  }
`;


