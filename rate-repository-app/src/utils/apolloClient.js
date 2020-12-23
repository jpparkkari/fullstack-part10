import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}`: '',
          },
        });
        console.log('accessToken:', accessToken ? accessToken : "no accessToken");
      } catch (e) {
        console.log(e);
      }
    },

    // Replace the IP address part with your own IP address!
    uri: Constants.manifest.extra.apolloUri,
  });
};

export default createApolloClient;