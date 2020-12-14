import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 15,
    //width: 500
    backgroundColor: 'white'
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
  languageText: {
    alignSelf: 'flex-start',
    color: 'white',
    backgroundColor: 'blue',
    overflow: 'hidden',
    borderRadius: 6,
    marginTop: 5,
    padding: 6
  }
});

const footerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
});

const CardHeader = ({item}) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.avatarContainer}>
        <Image style={headerStyles.avatar} source={{uri: item.ownerAvatarUrl }} />
      </View>
      <View style={headerStyles.infoContainer}>
        <Text fontWeight='bold'>{item.fullName}</Text>
        <Text color='textSecondary'>{item.description}</Text>   
        <Text style={headerStyles.languageText}>{item.language}</Text>
      </View>
           
    </View>
  );
};



const CardFooter = ({item}) => {
  return (
    <View style={footerStyles.container}>
      <View>
        <Text>{item.stargazersCount < 1000 ? item.stargazersCount : (item.stargazersCount/1000).toFixed(1) + "K" }</Text>
        <Text>Stars</Text>
      </View>
      <View>
        <Text>{item.forksCount <1000 ? item.forksCount : (item.forksCount/1000).toFixed(1) + "K" }</Text>
        <Text>Forks</Text>
      </View>
      <View>
        <Text>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View>
        <Text>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({item}) => {
  return(
    <View style={styles.container}>
      <CardHeader item={item}/>
      
      <CardFooter item={item} />
      </View>
  );
};

export default RepositoryItem;