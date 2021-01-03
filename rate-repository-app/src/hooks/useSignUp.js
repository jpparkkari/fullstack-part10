import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { SIGNUP } from '../graphql/mutations';
import { SIGNIN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [signUpMutate] = useMutation( SIGNUP );
  const [signInMutate, signInResult] = useMutation( SIGNIN );

  const signUp = async (credentials) => {
    //try catch
    try {
      await signUpMutate({ variables: {credentials} });
      //console.log(data);
      //console.log(result);
    } catch (e) {
      console.log(e.message);
    }
    //tähän sisäänloggaus usesigninillä
    try {
      //console.log("signing in ", credentials);
      const { data } = await signInMutate({ variables: {credentials} });
      //console.log(data);
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    } catch (e) {
      console.log(e.message);
    }
    return signInResult;
  };
  //console.log(result);

  return [signUp, signInResult ];
};

export default useSignUp;