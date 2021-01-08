import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $searchKeyword: String,  
    $first: Int, 
    $after: String,
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after
    ) {
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
        cursor
      }
      pageInfo {
        endCursor,
        startCursor,
        totalCount,
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String){
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
          endCursor,
          startCursor,
          totalCount,
          hasNextPage
        }
      }
   }
 }
`;

export const GET_USER = gql`
  query getUser($includeReviews: Boolean = false) {
    authorizedUser {
      id,
      username,
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username
            },
            repository {
              ownerName,
              name,
              id
            }
          }
          cursor
        }
        pageInfo {
          endCursor,
          startCursor,
          totalCount,
          hasNextPage
        }
      }
    }
  }
`;

