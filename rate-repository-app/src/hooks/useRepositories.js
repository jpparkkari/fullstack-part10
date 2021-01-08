
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( variables ) => {
  
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    //variables: {orderBy: "RATING_AVERAGE", orderDirection: "ASC"}
    variables
  });
  
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log('cannot fetch more');
      console.log(`loading: ${loading}, data.repositories: ${data.repositories.pageInfo.hasNextPage}`);
      return;
    }
  
    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };
        console.log('new result fetched');
        return nextResult;
      },
    });
  };

    
  return { 
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading, 
    ...result 
  };
};

export default useRepositories;