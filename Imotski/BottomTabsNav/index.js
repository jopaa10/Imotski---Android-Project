import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//svg
import {Svg, Path} from 'react-native-svg';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBookmark,
  faHome,
  faUserAlt,
  faHeart,
  faComment,
  faCloudSun,
  faRoute,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import {createStackNavigator} from '@react-navigation/stack';

//app drawer
import {AppDrawerScreen} from '../Explore Imotski/index';

//dimension
import {windowWidth, windowHeight} from '../constants/global';

//Main page: Explore Imotski & region
import {Imotski} from '../offlineScreens/imotski';
import {BiokovoInfo} from '../offlineScreens/biokovo';
import {ProlozacInfo} from '../offlineScreens/prolozac';
import {RiciceInfo} from '../offlineScreens/ricice';

//blue lake info in Imotski screen
import BlueLakeInfo from '../blueLakeInfo';
import {Gallery} from '../blueLakeInfo/gallery';
import {BlueLakeWeather} from '../blueLakeInfo/weather';

//red lake info in Imotski screen
import RedLakeInfo from '../redLakeInfo/index';

//first page for user signIn or signUp
import {SignInNav} from '../userPage';
import {ProfilePageNav} from '../profilePage';

//async storage for getting token
import AsyncStorage from '@react-native-async-storage/async-storage';

//navigation page for getting directions
import {CommentNavBlueLake} from '../commentBox/blueLakeComment';

//navigation
import {useNavigation} from '@react-navigation/core';
import {ReviewScreen} from '../reviewScreen';
import {NearbyPlacesNavigator} from '../Explore Imotski/nearbyPlaces';
import MarkedPlaces from '../placesDetailsMapForAllUsers';

//activities screen
import {KayakBottomNav} from '../ActivitiesScreens/kayak';
import {WalkingBottomNav} from '../ActivitiesScreens/walking';
import {EventNavigation} from '../ActivitiesScreens/entertainment';
import {QuadBottomNav} from '../ActivitiesScreens/quad';
import {BikeScreen} from '../ActivitiesScreens/bike';
import {SwimmingBottomNav} from '../ActivitiesScreens/swimming';

//red lake
import {GalleryRedLake} from '../redLakeInfo/galleryRedLake';
import {WeatherRedLake} from '../redLakeInfo/weatherRedLake';
import {NextDaysForecastRedLake} from '../redLakeInfo/nextdaysforecastRedLake';
import {CommentNavRedLake} from '../commentBox/redLakeComment';
import {BlueLakeNavRoute} from '../routeMap/blueLakenav';
import {RedLakeNavRoute} from '../routeMap/redLakeNav';
import {NextDaysForecastBlueLake} from '../blueLakeInfo/nextDaysForecastBlueLake';
import {FortressBottomNav} from '../fortressTopanaInfo';
import {ReviewBlueLake} from '../blueLakeInfo/reviewBlueLake';
import {ReviewRedLake} from '../redLakeInfo/reviewRedLake';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createStackNavigator();

//blue lake
const ImotskiStack = createSharedElementStackNavigator();
const BlueLakeHorNav = createSharedElementStackNavigator();
const BlueLakeInfoBottomNav = createBottomTabNavigator();

//red lake
const RedLakeInfoBottomNav = createBottomTabNavigator();
const RedLakeHorNav = createSharedElementStackNavigator();

//weather stack for Blue lake
const WeatherStack = createStackNavigator();

//weather stack for Red lake
const WeatherStackRedLake = createStackNavigator();

//next 7 days forecast for Blue Lake
export const FutureDayForecast = () => (
  <WeatherStack.Navigator>
    <WeatherStack.Screen
      name="Weather Data"
      component={BlueLakeWeather}
      options={{headerShown: false}}
    />

    <WeatherStack.Screen
      name="Next Days Forecast"
      component={NextDaysForecastBlueLake}
      options={{headerShown: false}}
    />
  </WeatherStack.Navigator>
);

const BlueLakeHorizontalNav = () => (
  <BlueLakeHorNav.Navigator initialRouteName="Blue Lake Info">
    <BlueLakeHorNav.Screen
      name="Overview"
      component={BlueLakeInfo}
      options={{headerShown: false}}
    />

    <BlueLakeHorNav.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={Gallery}
    />

    <BlueLakeHorNav.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewBlueLake}
    />
  </BlueLakeHorNav.Navigator>
);

//blue lake - details
const BlueLakeBottomNav = () => {
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
    <BlueLakeInfoBottomNav.Navigator
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <BlueLakeInfoBottomNav.Screen
        name="Blue Lake Info"
        component={BlueLakeHorizontalNav}
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
        <BlueLakeInfoBottomNav.Screen
          name="Comment Section"
          component={CommentNavBlueLake}
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
        <BlueLakeInfoBottomNav.Screen
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

      <BlueLakeInfoBottomNav.Screen
        name="Weather"
        component={FutureDayForecast}
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
        <BlueLakeInfoBottomNav.Screen
          name="Navigation"
          component={BlueLakeNavRoute}
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
        <BlueLakeInfoBottomNav.Screen
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
    </BlueLakeInfoBottomNav.Navigator>
  );
};

//next 7 days forecast for Red Lake
export const FutureDayForecastRedLake = () => (
  <WeatherStackRedLake.Navigator>
    <WeatherStackRedLake.Screen
      name="Weather Data"
      component={WeatherRedLake}
      options={{headerShown: false}}
    />

    <WeatherStackRedLake.Screen
      name="Next Days Forecast"
      component={NextDaysForecastRedLake}
      options={{headerShown: false}}
    />
  </WeatherStackRedLake.Navigator>
);

//red lake - details
const RedLakeHorizontalNav = () => (
  <RedLakeHorNav.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Red Lake Info">
    <RedLakeHorNav.Screen
      name="Overview"
      component={RedLakeInfo}
      options={{headerShown: false}}
    />

    <RedLakeHorNav.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryRedLake}
    />

    <RedLakeHorNav.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewRedLake}
    />
  </RedLakeHorNav.Navigator>
);

const RedLakeBottomNav = () => {
  const [isLogged, setLogged] = useState(false);
  const navigation = useNavigation();
  const [alertModal, setAlertModal] = useState(false);

  useEffect(async () => {
    let token = await AsyncStorage.getItem('token');

    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
      token = null;
    }
    console.log(isLogged);
    console.log(token);
  }, []);

  return (
    <RedLakeInfoBottomNav.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{
        showLabel: false,
        style: styles.redLakeTab,
      }}>
      <RedLakeInfoBottomNav.Screen
        name="Red Lake Info"
        component={RedLakeHorizontalNav}
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
        <RedLakeInfoBottomNav.Screen
          name="Comment Section"
          component={CommentNavRedLake}
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
        <RedLakeInfoBottomNav.Screen
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
                              color: '#CA9A8C',
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
                            navigation.navigate('User');
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

      <RedLakeInfoBottomNav.Screen
        name="Weather"
        component={FutureDayForecastRedLake}
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
        <RedLakeInfoBottomNav.Screen
          name="Navigation"
          component={RedLakeNavRoute}
          options={{
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
        <RedLakeInfoBottomNav.Screen
          name="Alert"
          component={RedLakeInfo}
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
                              color: '#CA9A8C',
                              fontSize: 25,
                              fontWeight: 'bold',
                            }}>
                            {' '}
                            Oh no!{' '}
                          </Text>
                          <Text style={[styles.alertText, {color: '#CA9A8C'}]}>
                            You need to login/sign up first!
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[
                            styles.closeBtn,
                            {backgroundColor: '#CA9A8C'},
                          ]}
                          onPress={() => {
                            navigation.navigate('User');
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
    </RedLakeInfoBottomNav.Navigator>
  );
};

//places which user can visited - Imotski screen
const ImotskiInfo = () => (
  <ImotskiStack.Navigator>
    <ImotskiStack.Screen
      name="Explore Imotski"
      component={Imotski}
      options={{headerShown: false}}
    />
    <ImotskiStack.Screen
      name="Blue Lake Info"
      component={BlueLakeBottomNav}
      options={{headerShown: false}}
    />
    <ImotskiStack.Screen
      name="Red Lake Info"
      component={RedLakeBottomNav}
      options={{headerShown: false}}
    />
    <ImotskiStack.Screen
      name="Fortress Topana Info"
      component={FortressBottomNav}
      options={{headerShown: false}}
    />
  </ImotskiStack.Navigator>
);

//tab for bottom tab navigation
const Tab = createBottomTabNavigator();

//bottom navigation on first screen Explore Imotski and region
const BottomTabs = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = AsyncStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    }

    if (token === null) {
      setIsLogged(false);
      token = null;
    }
  }, []);

  //console.log(isLogged);

  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false, style: styles.tabContainer}}>
      <Tab.Screen
        name="Explore Imotski"
        component={NearbyPlacesNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faHome}
                style={focused ? styles.tabIconFocused : styles.tabIcon}
                size={24}
              />
              {focused ? (
                <Svg
                  width="21"
                  height="10"
                  viewBox="0 0 21 10"
                  style={{marginLeft: 2}}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 1.81818L0.5075 1.36364C0.9975 0.909091 1.995 0 2.9925 1.13636C4.0075 2.27273 5.005 5.45455 6.0025 6.36364C7 7.27273 7.9975 5.90909 8.995 4.09091C9.9925 2.27273 11.0075 0 12.005 0C13.0025 0 14 2.27273 14.9975 3.40909C15.995 4.54545 16.9925 4.54545 18.0075 4.54545C19.005 4.54545 20.0025 4.54545 20.4925 4.54545H21V10H20.4925C20.0025 10 19.005 10 18.0075 10C16.9925 10 15.995 10 14.9975 10C14 10 13.0025 10 12.005 10C11.0075 10 9.9925 10 8.995 10C7.9975 10 7 10 6.0025 10C5.005 10 4.0075 10 2.9925 10C1.995 10 0.9975 10 0.5075 10H0V1.81818Z"
                    fill="#1F83BB"
                  />
                </Svg>
              ) : (
                <></>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MarkedPlaces"
        component={MarkedPlaces}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faBookmark}
                style={focused ? styles.tabIconFocused : styles.tabIcon}
                size={22}
              />
              {focused ? (
                <Svg
                  width="21"
                  height="10"
                  viewBox="0 0 21 10"
                  style={{marginLeft: 2, marginTop: 2}}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 1.81818L0.5075 1.36364C0.9975 0.909091 1.995 0 2.9925 1.13636C4.0075 2.27273 5.005 5.45455 6.0025 6.36364C7 7.27273 7.9975 5.90909 8.995 4.09091C9.9925 2.27273 11.0075 0 12.005 0C13.0025 0 14 2.27273 14.9975 3.40909C15.995 4.54545 16.9925 4.54545 18.0075 4.54545C19.005 4.54545 20.0025 4.54545 20.4925 4.54545H21V10H20.4925C20.0025 10 19.005 10 18.0075 10C16.9925 10 15.995 10 14.9975 10C14 10 13.0025 10 12.005 10C11.0075 10 9.9925 10 8.995 10C7.9975 10 7 10 6.0025 10C5.005 10 4.0075 10 2.9925 10C1.995 10 0.9975 10 0.5075 10H0V1.81818Z"
                    fill="#1F83BB"
                  />
                </Svg>
              ) : (
                <></>
              )}
            </View>
          ),
        }}
      />
      {isLogged ? (
        <Tab.Screen
          name="Sign In"
          component={SignInNav}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faUserAlt}
                  style={focused ? styles.tabIconFocused : styles.tabIcon}
                  size={22}
                />
                {focused ? (
                  <Svg
                    width="21"
                    height="10"
                    viewBox="0 0 21 10"
                    style={{marginLeft: 2, marginTop: 2}}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 1.81818L0.5075 1.36364C0.9975 0.909091 1.995 0 2.9925 1.13636C4.0075 2.27273 5.005 5.45455 6.0025 6.36364C7 7.27273 7.9975 5.90909 8.995 4.09091C9.9925 2.27273 11.0075 0 12.005 0C13.0025 0 14 2.27273 14.9975 3.40909C15.995 4.54545 16.9925 4.54545 18.0075 4.54545C19.005 4.54545 20.0025 4.54545 20.4925 4.54545H21V10H20.4925C20.0025 10 19.005 10 18.0075 10C16.9925 10 15.995 10 14.9975 10C14 10 13.0025 10 12.005 10C11.0075 10 9.9925 10 8.995 10C7.9975 10 7 10 6.0025 10C5.005 10 4.0075 10 2.9925 10C1.995 10 0.9975 10 0.5075 10H0V1.81818Z"
                      fill="#1F83BB"
                    />
                  </Svg>
                ) : (
                  <></>
                )}
              </View>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Profile Page"
          component={ProfilePageNav}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesomeIcon
                  icon={faUserAlt}
                  style={focused ? styles.tabIconFocused : styles.tabIcon}
                  size={22}
                />
                {focused ? (
                  <Svg
                    width="21"
                    height="10"
                    viewBox="0 0 21 10"
                    style={{marginLeft: 2, marginTop: 2}}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 1.81818L0.5075 1.36364C0.9975 0.909091 1.995 0 2.9925 1.13636C4.0075 2.27273 5.005 5.45455 6.0025 6.36364C7 7.27273 7.9975 5.90909 8.995 4.09091C9.9925 2.27273 11.0075 0 12.005 0C13.0025 0 14 2.27273 14.9975 3.40909C15.995 4.54545 16.9925 4.54545 18.0075 4.54545C19.005 4.54545 20.0025 4.54545 20.4925 4.54545H21V10H20.4925C20.0025 10 19.005 10 18.0075 10C16.9925 10 15.995 10 14.9975 10C14 10 13.0025 10 12.005 10C11.0075 10 9.9925 10 8.995 10C7.9975 10 7 10 6.0025 10C5.005 10 4.0075 10 2.9925 10C1.995 10 0.9975 10 0.5075 10H0V1.81818Z"
                      fill="#1F83BB"
                    />
                  </Svg>
                ) : (
                  <></>
                )}
              </View>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const ExploreImotskiNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom Navigation"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Imotski"
        component={ImotskiInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Biokovo"
        component={BiokovoInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Prolozac"
        component={ProlozacInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ricice"
        component={RiciceInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Kayak Screen"
        component={KayakBottomNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bike Screen"
        component={BikeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Walking Screen"
        component={WalkingBottomNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Entertainment Screen"
        component={EventNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Quad Screen"
        component={QuadBottomNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Swimming Screen"
        component={SwimmingBottomNav}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
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
  redLakeTab: {
    backgroundColor: '#CA9A8C',
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
    marginTop: windowWidth * 0.05,
  },
  alertMessage: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowWidth * 0.025,
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
    bottom: windowWidth * 0.025,
  },
  closeBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ExploreImotskiNav;
