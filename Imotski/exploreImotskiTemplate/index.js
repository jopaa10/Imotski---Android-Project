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
import {faBars, faSearchLocation} from '@fortawesome/free-solid-svg-icons';

import {UserContext} from '../App';
import {windowHeight, windowWidth} from '../constants/global';
import {NearbyPlaces} from '../Explore Imotski/nearbyPlaces';

//redux
import {useSelector} from 'react-redux';

//drawer navigator
const AppDrawer = createDrawerNavigator();

//drawer content
import {DrawerContent} from '../drawerNav';

//drawer navigator
import {createDrawerNavigator} from '@react-navigation/drawer';

//drawer actions
import {DrawerActions, ThemeProvider} from '@react-navigation/native';
import {useTheme} from 'styled-components';

import * as Animatable from 'react-native-animatable';

export const AppDrawerScreen = () => {
  const {colors} = useTheme();
  return (
    <AppDrawer.Navigator
      drawerStyle={{
        width: windowWidth * 0.7,
        height: 'auto',
        backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
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

  const {colors} = useTheme();

  //console.log(state);

  if (state != null) {
    fetch('http://192.168.1.2:5000/protected', {
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

  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
            ]}>
            <View style={{zIndex: -1}}>
              <View
                style={[
                  styles.avatarContainer,
                  {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
                ]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }>
                  <FontAwesomeIcon icon={faBars} size={25} color={'white'} />
                </TouchableOpacity>
                <View>
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(!state ? 'Sign In' : 'Profile Page')
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
              <View
                style={{
                  width: windowWidth,
                  aspectRatio: 375 / 116,
                  height: 'auto',
                }}>
                <Svg
                  style={{
                    bottom: windowHeight * 0.015,
                  }}
                  width={'100%'}
                  height={'100%'}
                  viewBox={`0 0 375 116`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M375 47.4129L359.375 60.5831C343.75 73.7534 312.5 100.094 281.25 110.63C250 121.166 218.75 115.898 187.5 97.4598C156.25 79.0215 125 47.4129 93.75 39.5107C62.5 31.6086 31.25 47.4129 15.625 55.315L9.03976e-06 63.2172L9.03976e-06 1.45076e-06L15.625 1.45076e-06C31.25 1.45076e-06 62.5 1.45076e-06 93.75 1.45076e-06C125 1.45076e-06 156.25 1.45076e-06 187.5 1.45076e-06C218.75 1.45076e-06 250 1.45076e-06 281.25 1.45076e-06C312.5 1.45076e-06 343.75 1.45076e-06 359.375 1.45076e-06L375 1.45076e-06L375 47.4129Z"
                    fill={colors.PRIMARY_BACKGROUND_COLOR}
                  />

                  <Animatable.View
                    duration={500}
                    delay={600}
                    animation="bounceIn"
                    style={[
                      styles.containerDiscover,
                      {borderColor: colors.PRIMARY_BACKGROUND_COLOR},
                    ]}>
                    <FontAwesomeIcon
                      icon={faSearchLocation}
                      size={25}
                      style={{
                        marginLeft: 5,
                      }}
                      color={'white'}
                    />
                    <Text style={styles.txtDiscover}> Imotski & region </Text>
                  </Animatable.View>
                </Svg>
              </View>
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
      </ThemeProvider>
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
    bottom: windowWidth * 0.25,
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  txtActivities: {
    color: '#1F83BB',
    fontWeight: 'bold',
    marginHorizontal: windowWidth * 0.05,
    height: 'auto',
    width: windowWidth * 0.4,
    fontSize: 17,
    /*  borderColor: 'red',
    borderWidth: 2, */
  },
  txtDiscover: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 15,
    fontSize: 20,
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
    marginVertical: windowWidth * 0.01,
    borderColor: '#1F83BB',
    borderWidth: 1,
    flexDirection: 'row',
    bottom: windowWidth * 0.085,
    justifyContent: 'flex-end',
    width: windowWidth,
  },

  containerActivities: {
    bottom: windowWidth * 0.2,
    /* borderColor: 'black',
    borderWidth: 1, */
    flexDirection: 'column',
    width: windowWidth,
  },
});
