import { useMutation } from '@apollo/client';
import { SIGNIN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation( SIGNIN );

  const signIn = async (credentials) => {
    console.log(credentials);
    return mutate({ variables: {credentials} });
    //return result;
  };
  //console.log(result);

  return [signIn, result ];
};

export default useSignIn;