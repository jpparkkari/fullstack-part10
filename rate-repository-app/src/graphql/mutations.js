import { gql } from 'apollo-boost';

export const SIGNIN = gql`

  mutation signIn($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;
