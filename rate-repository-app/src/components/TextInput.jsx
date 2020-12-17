/* eslint-disable no-unused-vars */
import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputField: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5

  },
  error: {
    borderColor: '#d73a4a'
  }
});

const TextInput = ({ style = {}, error, ...props }) => {

  const textInputStyle = [
    styles.inputField,
    style,
    error && styles.error
  ];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;