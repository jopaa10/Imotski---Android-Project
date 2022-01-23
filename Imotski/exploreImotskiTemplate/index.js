/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
/* import ListOfSights from './listOfSights';
import Activities from './activities'; */

//navigation
import {useNavigation} from '@react-navigation/core';
import BottomTabsNav from '../BottomTabsNav';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

import {UserContext} from '../App';
import {windowHeight, windowWidth} from '../constants/global';
import {NearbyPlaces} from '../Explore Imotski/nearbyPlaces';

//drawer navigator
const AppDrawer = createDrawerNavigator();

//drawer content
import {DrawerContent} from '../drawerNav';

//drawer navigator
import {createDrawerNavigator} from '@react-navigation/drawer';

//drawer actions
import {DrawerActions} from '@react-navigation/native';

export const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator
      drawerStyle={{
        width: windowWidth * 0.7,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <AppDrawer.Screen name="Imotski" component={BottomTabsNav} />
    </AppDrawer.Navigator>
  );
};

export const TemplateExploreImotski = props => {
  const navigation = useNavigation();
  const [userPhoto, setUserPhoto] = useState('');
  const {state, dispatch} = useContext(UserContext);

  //console.log(state);

  if (state != null) {
    fetch('http://192.168.1.3:5000/protected', {
      headers: {
        Authorization: 'Bearer ' + state,
      },
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setUserPhoto(data.userData.photo);
      });
  }

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <ScrollView style={styles.container}>
          <View style={{zIndex: -1}}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <FontAwesomeIcon icon={faBars} size={25} color={'white'} />
              </TouchableOpacity>
              <View>
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(!state ? 'User' : 'Profile Page')
                    }>
                    {!state ? (
                      <Image
                        source={require('../images/userIcon.png')}
                        style={styles.avatar}
                      />
                    ) : (
                      <>
                        <Image
                          source={{uri: userPhoto}}
                          style={styles.profilePic}
                        />
                      </>
                    )}
                  </TouchableOpacity>
                </>
              </View>
            </View>
            <Svg
              width={windowWidth}
              height="130"
              viewBox={`10 5 ${windowWidth} 130`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M415 53.1351L397.5 67.8949C380 82.6546 345 112.174 310 123.982C275 135.79 240 129.886 205 109.222C170 88.5585 135 53.1351 100 44.2793C65 35.4234 30 53.1351 12.5 61.991L-5.00001 70.8468L-5.00001 -4.43602e-06L12.5 -4.43602e-06C30 -4.43602e-06 65 -4.43602e-06 100 -4.43602e-06C135 -4.43602e-06 170 -4.43602e-06 205 -4.43602e-06C240 -4.43602e-06 275 -4.43602e-06 310 -4.43602e-06C345 -4.43602e-06 380 -4.43602e-06 397.5 -4.43602e-06H415L415 53.1351Z"
                fill="#1F83BB"
              />
              <View style={styles.containerDiscover}>
                <Text style={styles.txtDiscover}> Discover </Text>
              </View>
            </Svg>
            <NearbyPlaces />
          </View>
          <View style={styles.listContainer}>
            {/*  <ListOfSights /> */}
            {props.listOfSights}
            {props.nearbyPlaces}
          </View>
          <View style={styles.containerActivities}>
            <Text style={styles.txtActivities}>Activities</Text>
            {/* <Activities /> */}
            {props.activity}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    height: windowHeight,
    width: windowWidth,
  },
  waves: {
    width: windowWidth,
    height: 109,
    paddingTop: 0,
  },
  titleExploreIm: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  listContainer: {
    flex: 1,
    //marginTop: 20,
    bottom: windowWidth * 0.1,
  },
  txtActivities: {
    color: '#1F83BB',
    fontWeight: 'bold',
    marginHorizontal: 20,
    fontSize: 17,
  },
  txtDiscover: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 15,
    fontSize: 22,
  },
  txtPlaces: {
    color: '#1F83BB',
    marginHorizontal: 20,
    fontSize: 16,
    paddingTop: windowWidth * 0.08,
  },
  avatar: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  avatarContainer: {
    backgroundColor: '#1F83BB',
    width: windowWidth,
    //height: windowHeight * 0.3,
    paddingVertical: windowWidth * 0.12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.05,
  },
  profilePic: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.06,
    borderRadius: Math.round((windowWidth + windowHeight) / 2),
    borderWidth: 1,
  },
  containerDiscover: {
    //marginVertical: windowWidth * 0.01,
    /*   borderColor: 'black',
    borderWidth: 1, */
    //flexDirection: 'row',
    bottom: windowWidth * 0.03,
  },

  containerActivities: {
    bottom: windowWidth * 0.1,
  },
});
