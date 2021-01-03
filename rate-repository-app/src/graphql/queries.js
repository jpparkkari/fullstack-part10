import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query sorting($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id,
          language
          description,
          fullName,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!){
    repository(id: $id) {
      id,
      language
      description,
      fullName,
      forksCount,
      stargazersCount,
      ratingAverage,
      reviewCount,
      ownerAvatarUrl,
      url,
      reviews {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username
            }
          }
        }
      }
   }
 }
`;

export const GET_USER = gql`
  query {
    authorizedUser {
      id,
      username
    }
  }
`;

