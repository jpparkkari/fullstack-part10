import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    color: '#ffffff',
    paddingBottom: Constants.statusBarHeight,
    // ...
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  }
  // ...
});

const AppBarTab = ({name}) => {
  return <View style={styles.container}>{/* ... */}<Text style={styles.text}>{name}</Text></View>;
};

const AppBar = () => {
  return (
  <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
    <View>
      <AppBarTab name="Repositories" />
      <AppBarTab name="Sign in" link='/signin'/>
    </View>
  </TouchableWithoutFeedback>
  );
};

export default AppBar;