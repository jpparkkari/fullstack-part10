import React, {useState} from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
//import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

/*
const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];*/



export const ItemSeparator = () => <View style={styles.separator} />;

const Dropdown = ({setVariables}) => {

  const onChange = (value) => {
    switch (value) {
      case 'latest':
        setVariables({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
        //setOrderDirection('DESC');
        //setOrderBy('CREATED_AT');
        break;
      case 'highest':
        setVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
        //setOrderDirection('DESC');
        //setOrderBy('RATING_AVERAGE');
        break;
      case 'lowest':
        setVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
        //setOrderDirection('ASC');
        //setOrderBy('RATING_AVERAGE');
        break;
      default:
        setVariables({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
        //setOrderDirection('DESC');
        //setOrderBy('CREATED_AT');
    }
  };

  return (
    <RNPickerSelect
      onValueChange={value => onChange(value) }
      items={[
        { label: 'Latest repositories', value: 'latest'},
        { label: 'Highest rated repositories', value: 'highest' },
        { label: 'Lowes rated repositories', value: 'lowest' },
      ]}
      placeholder={{ label: 'select sorting', value: ''}}
      style={pickerSelectStyles}
    />
  );
};

export const RepositoryListContainer = ({
  repositories, 
  setVariables, 
  setSearchText,
  onEndReach
} ) => {
  
/*  const history = useHistory();

  const handlePress = id => {
    console.log('id:', id);
    history.push(`/repository/${id}`);
  };
*/
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <>
          <TextInput
            style = {{backgroundColor: 'white'}}
            onChangeText={value => setSearchText(value)}
            placeholder="Search"
          />
          < Dropdown setVariables={setVariables} />
        </>
      }
      // other props
      renderItem={({ item }) => {
        return (    
          <Link to={{ pathname:`/repository/${item.id}`}} component={TouchableOpacity} activeOpacity={0.8}>
            <RepositoryItem item={item}/>
          </Link>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [variables, setVariables] = useState({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
  //const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [searchText, setSearchText] = useState('');
  const [searchKeyword] = useDebounce(searchText, 500);
  
  const { repositories, fetchMore } = useRepositories({
    ...variables, 
    searchKeyword,
    first: 8
  });

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      setVariables={setVariables} 
      setSearchText={setSearchText}
      onEndReach={onEndReach}
    />
  );
  
};

export default RepositoryList;