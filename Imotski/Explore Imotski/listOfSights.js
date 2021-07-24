import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt, faHeart} from '@fortawesome/free-solid-svg-icons';

//navigation hook
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const ListOfSights = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Imotski')}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../images/blueLakeH.jpg')}
          />
          <FontAwesomeIcon icon={faHeart} style={styles.iconHeart} size={20} />
          <View style={styles.cityContainer}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={styles.iconLocation}
              size={12}
            />
            <Text style={[styles.cityTitle, {marginLeft: 0}]}>Imotski</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Biokovo')}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../images/biokovo.jpg')}
          />
          <FontAwesomeIcon icon={faHeart} style={styles.iconHeart} size={20} />
          <View style={styles.cityContainer}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={styles.iconLocation}
              size={12}
            />
            <Text style={[styles.cityTitle, {marginLeft: 0}]}>Biokovo</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Prolozac')}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../images/dvaOkaH.jpg')}
          />
          <FontAwesomeIcon icon={faHeart} style={styles.iconHeart} size={20} />
          <View style={styles.cityContainer}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={styles.iconLocation}
              size={12}
            />
            <Text style={[styles.cityTitle, {marginLeft: 5}]}>Prolozac</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Ricice')}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../images/greenLakeH.jpg')}
          />
          <FontAwesomeIcon icon={faHeart} style={styles.iconHeart} size={20} />
          <View style={styles.cityContainer}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={styles.iconLocation}
              size={12}
            />
            <Text style={[styles.cityTitle, {marginRight: 12}]}>Ricice</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    left: windowWidth * 0.8,
    right: windowWidth * 0.8,
    top: 10,
  },
});

export default ListOfSights;
