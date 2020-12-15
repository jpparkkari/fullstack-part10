import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    color: '#ffffff',
    paddingBottom: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
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
      <Link to={link}>
        <Text style={styles.text}>{name}</Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  return (
  <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
    <View style={styles.container}>
      <AppBarTab name="Repositories" link='/'/>
      <AppBarTab name="Sign in" link='/signin'/>
    </View>
  </TouchableWithoutFeedback>
  );
};

export default AppBar;