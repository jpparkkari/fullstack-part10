import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDelete = () => {

  const [mutate, result] = useMutation( DELETE_REVIEW );

  const deleteReview = async variables => {
    await mutate({variables});
  };

  return [deleteReview, result];
};

export default useDelete;