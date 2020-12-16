import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

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

const AppBar = () => {
  return (
  //<TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" link='/'/>
        <AppBarTab name="Sign in" link='/signin'/>
      </ScrollView>
    </View>
  //</TouchableWithoutFeedback>
  );
};

export default AppBar;