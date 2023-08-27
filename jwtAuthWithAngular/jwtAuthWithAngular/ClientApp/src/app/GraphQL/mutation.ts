import { gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation login($loginData: UserLoginInput!) {
    userLogin(userDetails: $loginData) {
      errorMessage
      token
    }
  }
`;
