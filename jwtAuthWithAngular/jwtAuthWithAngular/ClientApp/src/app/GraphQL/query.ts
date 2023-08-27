import { gql } from 'apollo-angular';

export const GET_USER_DATA = gql`
  query FetchUserData {
    userData
  }
`;

export const GET_Admin_DATA = gql`
  query FetchAdminData {
    adminData
  }
`;
