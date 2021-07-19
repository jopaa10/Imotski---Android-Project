import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

const ListOfSights = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
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
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  imageImotski: {
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
});

export default ListOfSights;
