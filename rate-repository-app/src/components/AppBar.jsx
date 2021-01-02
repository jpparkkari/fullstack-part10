import React, {useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';
import { useApolloClient } from '@apollo/client'; 

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10

    
    // ...
  },
  tab: {
    paddingRight: 30,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  }
  // ...
});

const AppBarTab = ({name, link}) => {
  return (
    <View style={styles.tab}>
      <Link to={link} component={TouchableOpacity} activeOpacity={0.8}>
        <Text style={styles.text}>{name}</Text>
      </Link>
    </View>
  );
};

const LogoutTab = () => {

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();
  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        history.push('/');
      }}
      >
        <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
};

const AppBar = () => {
  const signedUser = useQuery(GET_USER);


  return (
  //<TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" link='/' />
       
        {signedUser.data?.authorizedUser ? 
          <>
            <AppBarTab name="Create a Review" link='/review' />
            <LogoutTab  />
          </> :
          <AppBarTab name="Sign in" link='/signin'/>
        }
      </ScrollView>
    </View>
  //</TouchableWithoutFeedback>
  ); 
};

export default AppBar;