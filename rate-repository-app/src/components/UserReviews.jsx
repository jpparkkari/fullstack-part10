import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { format } from 'date-fns';
import { FlatList, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GET_USER } from '../graphql/queries';
import Text from './Text';
import { ItemSeparator } from './RepositoryList';
import { useHistory } from 'react-router-native';
import useDelete from '../hooks/useDelete';

const reviewStyles = StyleSheet.create({
  container: {
    //flexDirection: 'row',
    //flexGrow: 1,
    padding: 20,
    paddingVertical: 15,
    //width: 500
    backgroundColor: 'white',
    
  },
  body: {
    flexDirection: 'row'
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: 'blue',
    color: 'blue',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    fontWeight: 'bold'
  },
  ratingContainer: {
    flexGrow: 0,
    paddingRight: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%'
  },
  reviewText: {
    flexWrap: 'wrap',
    flexShrink: 1
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
    
  },
  gitHubLink: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    backgroundColor: 'blue',
    overflow: 'hidden',
    borderRadius: 6,
    marginTop: 5,
    padding: 12,
    marginRight: 10
  },
  deleteLink: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    backgroundColor: 'red',
    overflow: 'hidden',
    borderRadius: 6,
    marginTop: 5,
    padding: 12
  }
});


const ReviewItem = ({review, refetch}) => {

  const [deleteReview] = useDelete();
  const history = useHistory();
  
  const onPress = () => {
    history.push(`/repository/${review.repository.id}`);
  };
  const id = review.id;
  
  const onDeleteReview = async () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: async () => {await deleteReview( {id} ); refetch();}}
      ]
    );
    
  };

  return (
    <View style={reviewStyles.container}>
      <View style={reviewStyles.body}>
        <View style={reviewStyles.ratingContainer}>
          <Text style={reviewStyles.rating}>{review.rating}</Text>
        </View>
        <View style={reviewStyles.reviewContainer}>
          <Text fontWeight='bold'>{review.repository.ownerName}/{review.repository.name}</Text>
          <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={reviewStyles.reviewText}>{review.text}</Text>
        </View>
      </View>
      <View style={reviewStyles.footer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={reviewStyles.gitHubLink}>View Repository</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteReview}>
          <Text style={reviewStyles.deleteLink}>Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const UserReviews = () => {
  console.log('at userreviews');

  const { loading, data, refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {includeReviews: true},
  });
  
  const reviews = data?.authorizedUser.reviews.edges.map((edge) => edge.node);
  if (loading) return <Text>loading...</Text>;
  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      // ...
    />
  );

};

export default UserReviews;