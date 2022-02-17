import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

//Dimensions
const windowWidth = Dimensions.get('window').width;

//navigation
import {useNavigation} from '@react-navigation/core';

export const ActivitiesInfoTemplate = props => {
  const navigation = useNavigation();

  const DATA = [
    {
      index: 1,
      navigate: 'Blue Lake Info',
      title: 'Overview',
      color: props.color,
    },

    {
      index: 2,
      navigate: 'Gallery',
      title: 'Gallery',
      color: props.color2,
    },

    {
      index: 3,
      navigate: 'Review',
      title: 'Review',
      color: props.color3,
    },
  ];

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View>
          <Image style={styles.image} source={props.image} />
          <Pressable
            style={styles.arrowLeftIcon}
            onPress={() => navigation.navigate('Explore Imotski')}>
            <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
          </Pressable>
          <Text style={styles.txtCity}>{props.city}</Text>
          <Text style={styles.txtBlueLake}>
            <FontAwesomeIcon color={'white'} icon={faMapMarkerAlt} />
            {props.sight}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.horizontalTabs}>
            <Text>Overview</Text>
            <Text>Gallery</Text>
          </View>
          <Text style={styles.txtTitle}> {props.title}</Text>
          <Text style={styles.txtInfoBL}>{props.details}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  topTabsNav: {
    position: 'absolute',
    width: windowWidth,
    top: windowWidth * 0.85,
    height: 50,
    borderRadius: 10,
    color: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 0,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    bottom: windowWidth * 0.12,
    width: windowWidth,
    height: 'auto',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  horizontalTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-around',
    marginTop: 15,
  },
  txtTitle: {
    fontSize: 22,
    marginTop: 20,
    marginHorizontal: 15,
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  txtInfoBL: {
    flex: 1,
    textAlign: 'justify',
    marginTop: 10,
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  image: {
    width: windowWidth,
    height: 340,
  },
  txtCity: {
    position: 'absolute',
    bottom: windowWidth * 0.25,
    marginLeft: windowWidth * 0.08,
    color: 'white',
    fontSize: 25,
  },
  txtBlueLake: {
    position: 'absolute',
    bottom: windowWidth * 0.18,
    marginLeft: windowWidth * 0.06,
    color: 'white',
    fontSize: 15,
  },
  arrowLeftIcon: {
    position: 'absolute',
    marginTop: windowWidth * 0.1,
    marginHorizontal: 20,
  },
  horizotalTab: {
    fontSize: 15,
  },
});
