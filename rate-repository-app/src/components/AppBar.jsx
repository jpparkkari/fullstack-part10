import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
  return <AppBarTab name="Repositories" />;
};

export default AppBar;