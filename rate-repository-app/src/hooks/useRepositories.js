
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({orderBy, orderDirection} ) => {
  
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    //variables: {orderBy: "RATING_AVERAGE", orderDirection: "ASC"}
    variables: {orderBy, orderDirection}
  });
  
    
  return { repositories: data ? data.repositories : undefined, loading, error };
};

export default useRepositories;