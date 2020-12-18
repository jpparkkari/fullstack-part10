import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    uri: Constants.manifest.extra.apolloUri,
  });
};

export default createApolloClient;