import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { SIGNIN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation( SIGNIN );

  const signIn = async (credentials) => {
    const { data } = await mutate({ variables: {credentials} });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return result;
  };
  //console.log(result);

  return [signIn, result ];
};

export default useSignIn;