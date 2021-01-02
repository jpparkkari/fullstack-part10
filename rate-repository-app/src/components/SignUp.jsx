import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
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

  signUpField: {
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
    .required('Username is required')
    .min(1, ({ min }) => `Username must be at least ${min} characters`)
    .max(30, ({ max }) => `Username must be less than ${max} characters`),
  password: yup
    .string()
    .required('Password is required')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .max(50, ({ max }) => `Password must be less than ${max} characters`),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required("Password confirmation is required")
});

const initialValues = { username: '', password: '', passwordConfirm: '' };

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        testID="passwordConfirmField"
        name="passwordConfirm" 
        placeholder="Password Confirmation" 
        secureTextEntry={true}  
      />
      <View style={styles.separator}></View>
      <TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}  >
        <Text style={styles.signUpField}>Sign up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignUpFormContainer = ({handleSubmit}) => {
  
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      //const { data } = await signIn({ username, password });
      await signUp({ username, password });
      history.push("/");
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpFormContainer handleSubmit={onSubmit} />
  );
};

export default SignUp;