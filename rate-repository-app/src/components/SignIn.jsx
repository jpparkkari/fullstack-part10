import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    justifyContent: "space-around",
    alignContent: "space-between",
    padding: 10,
    backgroundColor: 'white'
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = { username: '', password: '' };

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container} >
      <FormikTextInput 
        testID="usernameField"
        name="username" 
        placeholder="Username"  
      />
      <View style={styles.separator}></View>
      <FormikTextInput
        testID="passwordField"
        name="password" 
        placeholder="Password" 
        secureTextEntry={true}  
      />
      <View style={styles.separator}></View>
      <TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}  >
        <Text style={styles.signInField}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignInFormContainer = ({handleSubmit}) => {
  
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      //const { data } = await signIn({ username, password });
      await signIn({ username, password });
      history.push("/");
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInFormContainer handleSubmit={onSubmit} />
  );
};

export default SignIn;