import { gql } from 'apollo-boost';

export const SIGNIN = gql`

  mutation signIn($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`

  mutation createReview($input: CreateReviewInput) {
    createReview(review: $input) {
      id
      text
      rating
      createdAt
      user {
        id
        username
      }
      repositoryId
    }
  }
`;

