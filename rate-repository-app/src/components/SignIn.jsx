import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    justifyContent: "space-around",
    alignContent: "space-between",
    padding: 10
  },
  inputField: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5

  },
  signInField: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "blue",
    color: "white",
    textAlign: "center"
  },
});

const initialValues = { username: '', password: '' };

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container} >
      <FormikTextInput name="username" placeholder="Username" style={styles.inputField} />
      <View style={styles.separator}></View>
      <FormikTextInput name="password" placeholder="Password" style={styles.inputField} secureTextEntry="true"  />
      <View style={styles.separator}></View>
      <TouchableWithoutFeedback onPress={onSubmit}  >
        <Text style={styles.signInField}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};


const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;