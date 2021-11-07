/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import {auto} from 'async';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ListOfSights from './listOfSights';
import Activities from './activities';

//drawer navigator
import {createDrawerNavigator} from '@react-navigation/drawer';

//drawer actions
import {DrawerActions} from '@react-navigation/native';

//navigation
import {useNavigation} from '@react-navigation/core';
import {RedLakeInfo} from '../redLakeInfo';
import BottomTabsNav from '../BottomTabsNav';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

//dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//drawer navigator
const AppDrawer = createDrawerNavigator();

export const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator
      initialRouteName="Explore Imotski"
      screenOptions={{headerShown: false}}>
      <AppDrawer.Screen name="Explore Imotski" component={BottomTabsNav} />
      <AppDrawer.Screen name="About Us" component={RedLakeInfo} />
    </AppDrawer.Navigator>
  );
};

export const ExploreImotski = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.container}>
          {/*<View
          style={{
            flex: 1,
          }}>
           <Svg
            style={styles.waves}
            viewBox={`0 0 ${windowWidth} 104`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M-198 55.7773L-185.067 53.7851C-170.84 51.7929 -143.68 47.8085 -116.52 43.8242C-90.6533 39.8398 -63.4933 36.8515 -36.3333 45.8163C-9.17334 55.7773 17.9867 77.6913 45.1467 88.6483C71.0133 100.601 98.1733 100.601 125.333 96.6171C152.493 92.6327 179.653 85.66 206.813 77.6913C232.68 70.7186 259.84 62.7499 274.067 58.7655L287 55.7773V-1H274.067C259.84 -1 232.68 -1 206.813 -1C179.653 -1 152.493 -1 125.333 -1C98.1733 -1 71.0133 -1 45.1467 -1C17.9867 -1 -9.17334 -1 -36.3333 -1C-63.4933 -1 -90.6533 -1 -116.52 -1C-143.68 -1 -170.84 -1 -185.067 -1H-198V55.7773Z"
              fill="#1F83BB"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M-1 98.3424L11.0213 90.3047C24.2447 81.1187 49.4894 63.8949 74.734 58.1537C99.9787 51.2642 124.021 55.8572 149.266 66.1914C174.511 77.6739 199.755 94.8977 225 100.639C250.245 107.528 275.489 102.935 300.734 94.8977C325.979 85.7117 351.223 73.0809 375.266 60.4502C400.511 46.6712 425.755 34.0405 438.979 27.151L451 21.4097V-5H438.979C425.755 -5 400.511 -5 375.266 -5C351.223 -5 325.979 -5 300.734 -5C275.489 -5 250.245 -5 225 -5C199.755 -5 174.511 -5 149.266 -5C124.021 -5 99.9787 -5 74.734 -5C49.4894 -5 24.2447 -5 11.0213 -5H-1V98.3424Z"
              fill="#2A99D8"
            />
            <Text style={styles.titleExploreIm}>EXPLORE IMOTSKI & REGION</Text>
          </Svg> 
        </View>*/}
          <View>
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <FontAwesomeIcon icon={faBars} size={25} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile Page')}>
                <Image
                  source={require('../images/userIcon.png')}
                  style={styles.avatar}
                />
              </TouchableOpacity>
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
                <Text style={styles.txtPlaces}>{`Places`}</Text>
              </View>
            </Svg>
          </View>
          <View style={styles.listContainer}>
            <ListOfSights />
          </View>
          <View style={styles.containerActivities}>
            <Text style={styles.txtActivities}>Activities</Text>
            <Activities />
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
    paddingVertical: windowWidth * 0.05,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.05,
  },
  containerDiscover: {
    //marginVertical: windowWidth * 0.01,
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  containerActivities: {
    bottom: windowWidth * 0.1,
  },
});
