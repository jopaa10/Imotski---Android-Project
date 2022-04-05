import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt, faHeart} from '@fortawesome/free-solid-svg-icons';

//navigation hook
import {useNavigation} from '@react-navigation/native';

//dimensions
import {windowWidth, windowHeight} from '../constants/global';

import * as Animatable from 'react-native-animatable';

const ListOfSights = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView horizontal={true}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#00000040', false)}
          useForeground={true}
          onPress={() => navigation.navigate('Imotski')}>
          <Animatable.View
            duration={600}
            delay={400}
            animation="fadeInRight"
            style={styles.container}>
            <Image
              style={styles.image}
              source={require('../images/blueLakeH.jpg')}
            />

            <View style={styles.cityContainer}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={styles.iconLocation}
                size={12}
              />
              <Text style={[styles.cityTitle, {marginLeft: 0}]}>Imotski</Text>
            </View>
          </Animatable.View>
        </TouchableNativeFeedback>

        <TouchableOpacity onPress={() => navigation.navigate('Biokovo')}>
          <Animatable.View
            duration={700}
            delay={500}
            animation="fadeInRight"
            style={styles.container}>
            <Image
              style={styles.image}
              source={require('../images/biokovo.jpg')}
            />

            <View style={styles.cityContainer}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={styles.iconLocation}
                size={12}
              />
              <Text style={[styles.cityTitle, {marginLeft: 0}]}>Biokovo</Text>
            </View>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Prolozac')}>
          <Animatable.View
            duration={800}
            delay={600}
            animation="fadeInRight"
            style={styles.container}>
            <Image
              style={styles.image}
              source={require('../images/dvaOkaH.jpg')}
            />

            <View style={styles.cityContainer}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={styles.iconLocation}
                size={12}
              />
              <Text style={[styles.cityTitle, {marginLeft: 5}]}>Prolozac</Text>
            </View>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Ricice')}>
          <Animatable.View
            duration={900}
            delay={700}
            animation="fadeInRight"
            style={styles.container}>
            <Image
              style={styles.image}
              source={require('../images/greenLakeH.jpg')}
            />
            <View style={styles.cityContainer}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={styles.iconLocation}
                size={12}
              />
              <Text style={[styles.cityTitle, {marginRight: 12}]}>Ricice</Text>
            </View>
          </Animatable.View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth * 0.5,
    //marginTop: StatusBar.currentHeight || 0,
    marginTop: windowWidth * 0.01,
    height: 'auto',
    aspectRatio: 750 / 900,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    marginHorizontal: windowWidth * 0.05,
    marginBottom: 30,
    shadowColor: '#000',
    //overflow: 'hidden',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cityContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowHeight * 0.03,
    left: 20,
    width: 85,
    height: 'auto',
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(12, 12, 12, 0.85)',
    /*  borderColor: 'purple',
    borderWidth: 2, */
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
