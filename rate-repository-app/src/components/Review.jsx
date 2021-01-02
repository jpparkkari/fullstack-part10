import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
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

  submitField: {
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
  repositoryAuthor: yup
    .string()
    .required('Author name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating value is required')
    .integer('Value must be an integer')
    .min(0)
    .max(100)
});

const initialValues = 
  {
    repositoryAuthor: '',
    repositoryName: '',
    rating: '',
    review: ''
  };

  const ReviewForm = ({ onSubmit }) => {
    return (
      <View style={styles.container} >
        <FormikTextInput 
          testID="repositoryAuthorField"
          name="repositoryAuthor" 
          placeholder="Author"  
        />
        <View style={styles.separator}></View>
        <FormikTextInput
          testID="repositoryNameField"
          name="repositoryName" 
          placeholder="Repository Name"
        />
        <View style={styles.separator}></View>
        <FormikTextInput
          testID="repositoryRatingField"
          name="rating" 
          placeholder="Rating (0-100)"
        />
        <View style={styles.separator}></View>
        <FormikTextInput 
          testID="repositoryReviewField"
          name="review"
          placeholder="Review (optional)"
          multiline={true}
        />
        <View style={styles.separator}></View>
        <TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}  >
          <Text style={styles.submitField}>Submit</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

export const ReviewFormContainer = ({handleSubmit}) => {
  
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


const Review = () => {
  const [createReview] = useReview();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    const { repositoryAuthor, repositoryName, rating, review } = values;
    const ratingNumber = Number(rating);

    try {
      const data = await createReview({ 
        repositoryName, 
        ownerName: repositoryAuthor, 
        rating: ratingNumber, 
        text: review 
      });
      history.push(`/repository/${data.createReview.repositoryId}`);
      
    } catch (e) {
      console.log("error:", e);
    }
    
  };

  return <ReviewFormContainer handleSubmit={onSubmit}/>;
};

export default Review;