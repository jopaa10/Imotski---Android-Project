import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt, faHeart} from '@fortawesome/free-solid-svg-icons';

const DATA = [
  {
    id: '1',
    image: require('../images/blueLakeH.jpg'),
    title: 'Imotski',
  },
  {
    id: '2',
    image: require('../images/biokovo.jpg'),
    title: 'Biokovo',
    marginLeft: 5,
    backgroundColor: 'blue',
  },
  {
    id: '3',
    image: require('../images/dvaOkaH.jpg'),
    title: 'Prolozac',
    marginLeft: 10,
  },
  {
    id: '4',
    image: require('../images/greenLakeH.jpg'),
    title: 'Ricice',
  },
];

const Item = ({item}) => {
  return (
    <View style={[styles.container, {backgroundColor: item.backgroundColor}]}>
      <Image style={styles.image} source={item.image} />
      <FontAwesomeIcon icon={faHeart} style={styles.iconHeart} size={20} />
      <View style={styles.cityContainer}>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          style={styles.iconLocation}
          size={12}
        />
        <Text style={[styles.cityTitle, {marginLeft: item.marginLeft}]}>
          {item.title}
        </Text>
      </View>
    </View>
  );
};

const ListOfSights = () => {
  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      {/*
      <View style={styles.container}>
        <Image
          style={styles.imageImotski}
          source={require('../images/blueLakeH.jpg')}
          alt="Blue Lake"
        />
        <View style={styles.cityContainer}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={styles.iconLocation}
            size={12}
          />
          <Text style={styles.cityTitle}>Imotski</Text>
        </View>
      </View>
    */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    overflow: 'hidden',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cityContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 155,
    left: 20,
    width: 85,
    height: 26,
    borderRadius: 20,
    backgroundColor: 'rgba(12, 12, 12, 0.85)',
  },
  cityTitle: {
    width: 70,
    height: 18,
    marginLeft: 5,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  iconLocation: {
    color: 'white',
    position: 'absolute',
    left: 7,
  },
  iconHeart: {
    position: 'absolute',
    color: 'white',
    left: 340,
    top: 10,
  },
});

export default ListOfSights;
