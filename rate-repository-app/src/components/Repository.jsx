import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const item = {
  id: 'jaredpalmer.formik',
  fullName: 'jaredpalmer/formik',
  description: 'Build forms in React, without the tears',
  language: 'TypeScript',
  forksCount: 1589,
  stargazersCount: 21553,
  ratingAverage: 88,
  reviewCount: 4,
  ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
};

//hae tässä grapql:stä yksittäinen repo



const Repository = () => {

  const { id } = useParams();
  console.log(id);

  const { loading, data } = useQuery(GET_REPOSITORY, {
    
    variables: {id},
  });
  const repository = data?.repository;
  
  if (loading) return <Text>loading...</Text>;
  console.log(repository);
  return <RepositoryItem item={repository} showGitHubLink={true} />;
};

export default Repository;