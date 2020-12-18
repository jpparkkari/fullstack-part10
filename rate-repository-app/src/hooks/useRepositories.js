
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  
    
  return { repositories: data ? data.repositories : undefined, loading, error };
};

export default useRepositories;