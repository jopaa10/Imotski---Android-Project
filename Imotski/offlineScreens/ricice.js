import React, {useRef, useEffect, useState, Anima} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleDoubleDown,
  faCloudSun,
  faComment,
  faHeart,
  faReply,
  faRoute,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

//useNav hookd
import {useNavigation} from '@react-navigation/core';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//animatable
import * as Animatable from 'react-native-animatable';
import {SwiperTemplate} from '../swiperTemplate';

//stack navigator
import {createStackNavigator} from '@react-navigation/stack';

//stack navigator
const RiciceStack = createStackNavigator();

//bottom stack navigator
const GreenLakeBottomStack = createBottomTabNavigator();
const GalipovacBottomStack = createBottomTabNavigator();

//stack screens
import {GreenLakeInfo} from '../greenLakeInfo';
import {GalipovacInfo} from '../galipovacInfo/index';
import {CommentGreenLakeNav} from '../greenLakeInfo/commentGreenLake';
import {RedLakeInfo} from '../redLakeInfo';
import {WeatherGreenLake} from '../greenLakeInfo/weatherGreenLake';
import {BlueLakeInfo} from '../blueLakeInfo';
import {GreenLakeNavRoute} from '../greenLakeInfo/greenLakeNav';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GalleryGreenLake} from '../greenLakeInfo/gallery';
import {ReviewGreenLake} from '../greenLakeInfo/reviewGreenLake';
import {CommentGalipovacNav} from '../galipovacInfo/comment';
import {WeatherGalipovac} from '../galipovacInfo/weather';
import {ReviewGalipovac} from '../galipovacInfo/reviewGalipovac';
import {GalipovacNavRoute} from '../galipovacInfo/galipovacNav';
import {GalleryGalipovac} from '../galipovacInfo/gallery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NextDaysForecastGreenLake} from '../greenLakeInfo/nextDaysForecast';
import {NextDaysForecastGalipovac} from '../galipovacInfo/nextDaysForecast';

//green lake horizontal stack nav
const GreenLakeHorizontalStack = createStackNavigator();

//weather stack for Green Cathedral
const WeatherStackGreenLake = createStackNavigator();

//next 7 days forecast for Green Cathedral
export const FutureDayForecastGreenLake = () => (
  <WeatherStackGreenLake.Navigator>
    <WeatherStackGreenLake.Screen
      name="Weather Data"
      component={WeatherGreenLake}
      options={{headerShown: false}}
    />

    <WeatherStackGreenLake.Screen
      name="Next Days Forecast"
      component={NextDaysForecastGreenLake}
      options={{headerShown: false}}
    />
  </WeatherStackGreenLake.Navigator>
);

//weather stack for Green Cathedral
const WeatherStackGalipovac = createStackNavigator();

//next 7 days forecast for Green Cathedral
export const FutureDayForecastGalipovac = () => (
  <WeatherStackGalipovac.Navigator>
    <WeatherStackGalipovac.Screen
      name="Weather Data"
      component={WeatherGalipovac}
      options={{headerShown: false}}
    />

    <WeatherStackGalipovac.Screen
      name="Next Days Forecast"
      component={NextDaysForecastGalipovac}
      options={{headerShown: false}}
    />
  </WeatherStackGalipovac.Navigator>
);

//green lake - details horizontal nav
const GreenLakeHorizontalNav = () => (
  <GreenLakeHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Green Lake Info">
    <GreenLakeHorizontalStack.Screen
      name="Overview"
      component={GreenLakeInfo}
      options={{headerShown: false}}
    />

    <GreenLakeHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryGreenLake}
    />

    <GreenLakeHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewGreenLake}
    />
  </GreenLakeHorizontalStack.Navigator>
);

//galipovac horizontal stack nav
const GalipovacHorizontalStack = createStackNavigator();

//galipovac - details horizontal nav
const GalipovacHorizontalNav = () => (
  <GalipovacHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Galipovac Info">
    <GalipovacHorizontalStack.Screen
      name="Overview"
      component={GalipovacInfo}
      options={{headerShown: false}}
    />

    <GalipovacHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryGalipovac}
    />

    <GalipovacHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewGalipovac}
    />
  </GalipovacHorizontalStack.Navigator>
);

//skywalk biokovo - details
const GreenLakeBottomNav = () => {
  const [isLogged, setLogged] = useState(false);
  const navigation = useNavigation();
  const [alertModal, setAlertModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);

  useEffect(async () => {
    let token = await AsyncStorage.getItem('token');

    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
      token = null;
    }
    /* console.log(isLogged);
    console.log(token); */
  }, []);

  return (
    <GreenLakeBottomStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.blueLakeTab, {backgroundColor: '#6ba4a1'}],
      }}>
      <GreenLakeBottomStack.Screen
        name="Green Lake Info"
        component={GreenLakeHorizontalNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faHeart}
                color={focused ? '#8E8E8E' : 'white'}
                size={30}
                style={styles.faHeartIcon}
              />
            </View>
          ),
        }}
      />
      {isLogged ? (
        <GreenLakeBottomStack.Screen
          name="Comment Section"
          component={CommentGreenLakeNav}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faComment}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faCommentIcon}
                />
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('Comment Section');
            },
          })}
        />
      ) : (
        <GreenLakeBottomStack.Screen
          name="Comment"
          component={RedLakeInfo}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faComment}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faCommentIcon}
                />
                <Modal
                  statusBarTranslucent
                  transparent={true}
                  visible={alertModal}
                  style={styles.alertModal}>
                  <View style={styles.centeredView}>
                    <View style={styles.alertModalContainer}>
                      <>
                        <TouchableOpacity
                          style={styles.alertIcon}
                          onPress={() => setAlertModal(false)}>
                          <View>
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              color={'black'}
                              size={20}
                            />
                          </View>
                        </TouchableOpacity>
                        <View style={styles.alertMessage}>
                          <Text
                            style={{
                              color: '#1F83BB',
                              fontSize: 25,
                              fontWeight: 'bold',
                            }}>
                            {' '}
                            Oh no!{' '}
                          </Text>
                          <Text style={styles.alertText}>
                            You need to login/sign up first!
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          onPress={() => {
                            navigation.navigate('Sign In');
                            setAlertModal(false);
                          }}>
                          <Text style={styles.closeBtnTxt}>Go to login</Text>
                        </TouchableOpacity>
                      </>
                    </View>
                  </View>
                </Modal>
              </View>
            ),
          }}
          listeners={{
            tabPress: event => {
              event.preventDefault();
              setAlertModal(true);
              //alert('Sign up or login first!');
            },
          }}
        />
      )}

      <GreenLakeBottomStack.Screen
        name="Weather"
        component={FutureDayForecastGreenLake}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faCloudSun}
                color={focused ? '#8E8E8E' : 'white'}
                size={30}
                style={styles.faCloudIcon}
              />
            </View>
          ),
        }}
      />
      {isLogged === true ? (
        <GreenLakeBottomStack.Screen
          name="Navigation"
          component={GreenLakeNavRoute}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faRoute}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faRouteIcon}
                />
              </View>
            ),
          }}
        />
      ) : (
        <GreenLakeBottomStack.Screen
          name="Alert"
          component={BlueLakeInfo}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faRoute}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faRouteIcon}
                />
                <Modal
                  statusBarTranslucent
                  transparent={true}
                  visible={alertModal}
                  style={styles.alertModal}>
                  <View style={styles.centeredView}>
                    <View style={styles.alertModalContainer}>
                      <>
                        <TouchableOpacity
                          style={styles.alertIcon}
                          onPress={() => setAlertModal(false)}>
                          <View>
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              color={'black'}
                              size={20}
                            />
                          </View>
                        </TouchableOpacity>
                        <View style={styles.alertMessage}>
                          <Text
                            style={{
                              color: '#1F83BB',
                              fontSize: 25,
                              fontWeight: 'bold',
                            }}>
                            {' '}
                            Oh no!{' '}
                          </Text>
                          <Text style={styles.alertText}>
                            You need to login/sign up first!
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          onPress={() => {
                            navigation.navigate('Sign In');
                            setAlertModal(false);
                          }}>
                          <Text style={styles.closeBtnTxt}>Go to login</Text>
                        </TouchableOpacity>
                      </>
                    </View>
                  </View>
                </Modal>
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault();
              setAlertModal(true);
              //alert('You must login first');
            },
          })}
        />
      )}
    </GreenLakeBottomStack.Navigator>
  );
};

//vosac biokovo - details
const GalipovacBiokovoBottomNav = () => {
  const [isLogged, setLogged] = useState(false);
  const navigation = useNavigation();
  const [alertModal, setAlertModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);

  useEffect(async () => {
    let token = await AsyncStorage.getItem('token');

    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
      token = null;
    }
    /* console.log(isLogged);
    console.log(token); */
  }, []);

  return (
    <GalipovacBottomStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.blueLakeTab, {backgroundColor: 'rgb(126,150,85)'}],
      }}>
      <GalipovacBottomStack.Screen
        name="Galipovac Info"
        component={GalipovacHorizontalNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faHeart}
                color={focused ? '#8E8E8E' : 'white'}
                size={30}
                style={styles.faHeartIcon}
              />
            </View>
          ),
        }}
      />
      {isLogged ? (
        <GalipovacBottomStack.Screen
          name="Comment Section"
          component={CommentGalipovacNav}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faComment}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faCommentIcon}
                />
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('Comment Section');
            },
          })}
        />
      ) : (
        <GalipovacBottomStack.Screen
          name="Comment"
          component={RedLakeInfo}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faComment}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faCommentIcon}
                />
                <Modal
                  statusBarTranslucent
                  transparent={true}
                  visible={alertModal}
                  style={styles.alertModal}>
                  <View style={styles.centeredView}>
                    <View style={styles.alertModalContainer}>
                      <>
                        <TouchableOpacity
                          style={styles.alertIcon}
                          onPress={() => setAlertModal(false)}>
                          <View>
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              color={'black'}
                              size={20}
                            />
                          </View>
                        </TouchableOpacity>
                        <View style={styles.alertMessage}>
                          <Text
                            style={{
                              color: '#1F83BB',
                              fontSize: 25,
                              fontWeight: 'bold',
                            }}>
                            {' '}
                            Oh no!{' '}
                          </Text>
                          <Text style={styles.alertText}>
                            You need to login/sign up first!
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          onPress={() => {
                            navigation.navigate('Sign In');
                            setAlertModal(false);
                          }}>
                          <Text style={styles.closeBtnTxt}>Go to login</Text>
                        </TouchableOpacity>
                      </>
                    </View>
                  </View>
                </Modal>
              </View>
            ),
          }}
          listeners={{
            tabPress: event => {
              event.preventDefault();
              setAlertModal(true);
              //alert('Sign up or login first!');
            },
          }}
        />
      )}

      <GalipovacBottomStack.Screen
        name="Weather"
        component={FutureDayForecastGalipovac}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faCloudSun}
                color={focused ? '#8E8E8E' : 'white'}
                size={30}
                style={styles.faCloudIcon}
              />
            </View>
          ),
        }}
      />
      {isLogged === true ? (
        <GalipovacBottomStack.Screen
          name="Navigation"
          component={GalipovacNavRoute}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faRoute}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faRouteIcon}
                />
              </View>
            ),
          }}
        />
      ) : (
        <GalipovacBottomStack.Screen
          name="Alert"
          component={BlueLakeInfo}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faRoute}
                  color={focused ? '#8E8E8E' : 'white'}
                  size={30}
                  style={styles.faRouteIcon}
                />
                <Modal
                  statusBarTranslucent
                  transparent={true}
                  visible={alertModal}
                  style={styles.alertModal}>
                  <View style={styles.centeredView}>
                    <View style={styles.alertModalContainer}>
                      <>
                        <TouchableOpacity
                          style={styles.alertIcon}
                          onPress={() => setAlertModal(false)}>
                          <View>
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              color={'black'}
                              size={20}
                            />
                          </View>
                        </TouchableOpacity>
                        <View style={styles.alertMessage}>
                          <Text
                            style={{
                              color: '#1F83BB',
                              fontSize: 25,
                              fontWeight: 'bold',
                            }}>
                            {' '}
                            Oh no!{' '}
                          </Text>
                          <Text style={styles.alertText}>
                            You need to login/sign up first!
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          onPress={() => {
                            navigation.navigate('Sign In');
                            setAlertModal(false);
                          }}>
                          <Text style={styles.closeBtnTxt}>Go to login</Text>
                        </TouchableOpacity>
                      </>
                    </View>
                  </View>
                </Modal>
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault();
              setAlertModal(true);
              //alert('You must login first');
            },
          })}
        />
      )}
    </GalipovacBottomStack.Navigator>
  );
};

//places which user can visited - Imotski screen
export const RiciceInfo = () => (
  <RiciceStack.Navigator>
    <RiciceStack.Screen
      name="Explore Ricice"
      component={Ricice}
      options={{headerShown: false}}
    />
    <RiciceStack.Screen
      name="Green Lake Info"
      component={GreenLakeBottomNav}
      options={{headerShown: false}}
    />
    <RiciceStack.Screen
      name="Galipovac Info"
      component={GalipovacBiokovoBottomNav}
      options={{headerShown: false}}
    />
  </RiciceStack.Navigator>
);

export const Ricice = () => {
  const navigation = useNavigation();
  const [displayAnimation, setDisplayAnimation] = useState('flex');

  const DATA = [
    {
      key: 1,
      name: 'Green Lake',
      image: require('../images/greenLake.jpg'),
      screen: 'Green Lake Info',
      bgColor: '#6ba4a1',
      fontAwColor: 'white',
      fontAwBgColor: '#6ba4a1',
      display: displayAnimation,
    },
    {
      key: 2,
      name: 'Galipovac',
      image: require('../images/galipovacView.jpg'),
      screen: 'Galipovac Info',
      bgColor: 'rgb(126,150,85)',
      fontAwColor: 'white',
      fontAwBgColor: 'rgb(126,150,85)',
      display: 'none',
    },
  ];

  return (
    <>
      <SwiperTemplate
        content={DATA.map((item, index, indexAnimated) => (
          <>
            <View key={index}>
              <Image style={styles.image} source={item.image} />
              <View
                style={{
                  width: windowWidth,
                }}>
                <Text style={styles.txt}>{item.name}</Text>
                <Pressable
                  style={[styles.btn, {backgroundColor: item.bgColor}]}
                  onPress={() => navigation.navigate(item.screen)}>
                  <Text style={styles.txtBtn}>Explore</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.btnCircle,
                    {backgroundColor: item.fontAwBgColor},
                  ]}
                  onPress={() => navigation.goBack()}>
                  <FontAwesomeIcon
                    icon={faReply}
                    style={[styles.btnCircleIcon, {color: item.fontAwColor}]}
                    size={30}
                  />
                </Pressable>
              </View>
            </View>
            <Animatable.View
              key={indexAnimated}
              animation={'bounce'}
              easing={'ease-out'}
              iterationCount={3}
              onAnimationEnd={() => setDisplayAnimation('none')}
              style={{
                bottom: windowHeight * 0.4,
                alignItems: 'center',
                display: item.display,
              }}>
              <FontAwesomeIcon
                icon={faAngleDoubleDown}
                color={'white'}
                size={40}
              />
              <Text style={{color: 'white'}}>Swipe down for more</Text>
            </Animatable.View>
          </>
        ))}
      />
    </>
  );
};

const styles = StyleSheet.create({
  /* container: {
    width: windowWidth,
    flex: 1,
    height: windowHeight,
  }, */
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    position: 'absolute',
    bottom: windowWidth * 0.3,
    marginLeft: windowWidth * 0.1,
    color: 'white',
    fontSize: 24,
  },
  btn: {
    width: windowWidth * 0.6,
    height: 40,
    position: 'absolute',
    bottom: windowWidth * 0.15,
    backgroundColor: '#1F83BB',
    marginLeft: windowWidth * 0.1,
    borderRadius: 10,
  },
  txtBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  btnCircle: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: windowWidth * 0.15,
    right: windowWidth * 0.1,
    width: 45,
    borderRadius: 45 / 2,
    height: 40,
  },
  btnCircleIcon: {
    color: '#1F83BB',
    marginHorizontal: 8,
    marginVertical: 5,
  },
  dots: {
    /* position: 'absolute',
    top: windowWidth * 0.1, */
    width: 12,
    borderRadius: 12 / 2,
    height: 12,
    backgroundColor: 'white',
    /* right: windowWidth * 0.05, */
  },
  tabContainer: {
    position: 'absolute',
    left: windowWidth * 0.25,
    right: windowWidth * 0.25,
    width: windowWidth * 0.5,
    height: 45,
    marginBottom: 10,
    borderRadius: 10,
  },
  tabIcon: {
    color: '#A1A1A1',
  },
  tabIconFocused: {
    color: '#1F83BB',
  },
  blueLakeTab: {
    backgroundColor: '#1F83BB',
    width: windowWidth * 0.9,
    height: 50,
    position: 'absolute',
    left: windowWidth * 0.05,
    right: windowWidth * 0.05,
    marginBottom: 20,
    borderRadius: 20,
  },
  faHeartIcon: {
    marginRight: windowWidth * 0.01,
  },
  faCommentIcon: {
    marginRight: windowWidth * 0.01,
  },
  faCloudIcon: {
    marginRight: windowWidth * 0.01,
  },
  faRouteIcon: {
    marginRight: windowWidth * 0.01,
  },
  alertModal: {
    width: windowWidth,
    height: windowHeight,
  },
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  alertModalContainer: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.35,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  alertIcon: {
    //flex: 1,
    //justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.05,
    marginTop: windowWidth * 0.02,
  },
  alertMessage: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowWidth * 0.05,
  },
  alertText: {
    textAlign: 'center',
    color: '#1F83BB',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: windowWidth * 0.03,
  },
  closeBtn: {
    backgroundColor: '#1F83BB',
    width: windowWidth * 0.5,
    borderRadius: 10,
    alignItems: 'center',
    flex: 0.7,
    marginBottom: windowWidth * 0.1,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#1F83BB',
    bottom: windowWidth * 0.05,
  },
  closeBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
