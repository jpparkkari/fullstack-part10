import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { format } from 'date-fns';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { ItemSeparator } from './RepositoryList';

const reviewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 20,
    paddingVertical: 15,
    //width: 500
    backgroundColor: 'white',
    
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
  }
});

const Repository = ({repository}) => {
  
  //console.log(repository);
  return <RepositoryItem item={repository} showGitHubLink={true} />;
};

const ReviewItem = ({review}) => {
  
  return (
    <View style={reviewStyles.container}>
      <View style={reviewStyles.ratingContainer}>
        <Text style={reviewStyles.rating}>{review.rating}</Text>
      </View>
      <View style={reviewStyles.reviewContainer}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={reviewStyles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {

  const { id } = useParams();
  //console.log(id);

  const { loading, data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {id},
  });
  const repository = data?.repository;
  const reviews = data?.repository.reviews.edges.map((edge) => edge.node);
  if (loading) return <Text>loading...</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <Repository repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      // ...
    />
  );

};

export default SingleRepository;