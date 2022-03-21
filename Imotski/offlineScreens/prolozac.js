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
import {SafeAreaView} from 'react-native-safe-area-context';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//animatable
import * as Animatable from 'react-native-animatable';
import {SwiperTemplate} from '../swiperTemplate';

//stack nav
import {createStackNavigator} from '@react-navigation/stack';

//stack screens
import DvaOkaInfo from '../dvaOkaInfo';
import BadnjeviceInfo from '../badnjeviceInfo';

//green cathedral screens
import GreenCathedralInfo from '../zelenaKatedralaInfo';
import {GalleryGreenCathedral} from '../zelenaKatedralaInfo/gallery';
import {ReviewGreenCathedral} from '../zelenaKatedralaInfo/reviewGreenCathedral';
import {CommentGreenCathedralNav} from '../zelenaKatedralaInfo/commentGreenCathedral';
import RedLakeInfo from '../redLakeInfo';
import {WeatherGreenCathedral} from '../zelenaKatedralaInfo/weatherGreenCathedral';
import {GreenCathedralNavRoute} from '../zelenaKatedralaInfo/greenCathedralNav';
import BlueLakeInfo from '../blueLakeInfo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//dva oka screens
import {CommentDvaOkaNav} from '../dvaOkaInfo/commentDvaOka';
import {WeatherDvaOka} from '../dvaOkaInfo/weatherDvaOka';
import {DvaOkaNavRoute} from '../dvaOkaInfo/dvaOkaNav';
import {ReviewDvaOka} from '../dvaOkaInfo/reviewDvaOka';
import {GalleryDvaOka} from '../dvaOkaInfo/gallery';

//badnjevice screens
import {GalleryBadnjevice} from '../badnjeviceInfo/galleryBadnjevice';
import {ReviewBadnjevice} from '../badnjeviceInfo/reviewBadnjevice';
import {BadnjeviceNavRoute} from '../badnjeviceInfo/badnjeviceNav';
import {CommentBadnjeviceNav} from '../badnjeviceInfo/commentBadnjevice';
import {WeatherBadnjevice} from '../badnjeviceInfo/weatherBadnjevice';
import AsyncStorage from '@react-native-async-storage/async-storage';

//next 7 days forecast
import {NextDaysForecastGreenCathedral} from '../zelenaKatedralaInfo/nextDaysForecast';
import {NextDaysForecastDvaOka} from '../dvaOkaInfo/nextDaysForecast';
import {NextDaysForecastBadnjevice} from '../badnjeviceInfo/nextDaysForecast';
import {
  createSharedElementStackNavigator,
  SharedElement,
} from 'react-navigation-shared-element';

//stack navigator
const ProlozacStack = createSharedElementStackNavigator();

//bottom stack navigator
const GreenCathedralBottomStack = createBottomTabNavigator();
const DvaOkaBottomStack = createBottomTabNavigator();
const BadnjeviceBottomStack = createBottomTabNavigator();

//weather stack for Green Cathedral
const WeatherStackGreenCathedral = createStackNavigator();

//next 7 days forecast for Green Cathedral
export const FutureDayForecastGreenCathedral = () => (
  <WeatherStackGreenCathedral.Navigator>
    <WeatherStackGreenCathedral.Screen
      name="Weather Data"
      component={WeatherGreenCathedral}
      options={{headerShown: false}}
    />

    <WeatherStackGreenCathedral.Screen
      name="Next Days Forecast"
      component={NextDaysForecastGreenCathedral}
      options={{headerShown: false}}
    />
  </WeatherStackGreenCathedral.Navigator>
);

//weather stack for Dva Oka
const WeatherStackDvaOka = createStackNavigator();

//next 7 days forecast for Badnjevice
export const FutureDayForecastDvaOka = () => (
  <WeatherStackDvaOka.Navigator>
    <WeatherStackDvaOka.Screen
      name="Weather Data"
      component={WeatherDvaOka}
      options={{headerShown: false}}
    />

    <WeatherStackDvaOka.Screen
      name="Next Days Forecast"
      component={NextDaysForecastDvaOka}
      options={{headerShown: false}}
    />
  </WeatherStackDvaOka.Navigator>
);

//weather stack for Badnjevice
const WeatherStackBadnjevice = createStackNavigator();

//next 7 days forecast for Dva Oka
export const FutureDayForecastBadnjevice = () => (
  <WeatherStackBadnjevice.Navigator>
    <WeatherStackBadnjevice.Screen
      name="Weather Data"
      component={WeatherBadnjevice}
      options={{headerShown: false}}
    />

    <WeatherStackBadnjevice.Screen
      name="Next Days Forecast"
      component={NextDaysForecastBadnjevice}
      options={{headerShown: false}}
    />
  </WeatherStackBadnjevice.Navigator>
);

//skywalk horizontal stack nav
const GreenCathedralHorizontalStack = createSharedElementStackNavigator();

//green cathedral - details horizontal nav
const GreenCathedralHorizontalNav = () => (
  <GreenCathedralHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Green Cathedral Info">
    <GreenCathedralHorizontalStack.Screen
      name="Overview"
      component={GreenCathedralInfo}
      options={{headerShown: false}}
    />

    <GreenCathedralHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryGreenCathedral}
    />

    <GreenCathedralHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewGreenCathedral}
    />
  </GreenCathedralHorizontalStack.Navigator>
);

//vosac horizontal stack nav
const DvaOkaHorizontalStack = createSharedElementStackNavigator();

//dva oka - details horizontal nav
const DvaOkaHorizontalNav = () => (
  <DvaOkaHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Dva Oka Info">
    <DvaOkaHorizontalStack.Screen
      name="Overview"
      component={DvaOkaInfo}
      options={{headerShown: false}}
    />

    <DvaOkaHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryDvaOka}
    />

    <DvaOkaHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewDvaOka}
    />
  </DvaOkaHorizontalStack.Navigator>
);

//badnjevice horizontal stack nav
const BadnjeviceHorizontalStack = createSharedElementStackNavigator();

//badnjevice prolozac - details horizontal nav
const BadnjeviceHorizontalNav = () => (
  <BadnjeviceHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Badnjevice Info">
    <BadnjeviceHorizontalStack.Screen
      name="Overview"
      component={BadnjeviceInfo}
      options={{headerShown: false}}
    />

    <BadnjeviceHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryBadnjevice}
    />

    <BadnjeviceHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewBadnjevice}
    />
  </BadnjeviceHorizontalStack.Navigator>
);

//green cathedral - details
const GreenCathedralBottomNav = () => {
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
    <GreenCathedralBottomStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.blueLakeTab, {backgroundColor: '#a69244'}],
      }}>
      <GreenCathedralBottomStack.Screen
        name="Green Cathedral Info"
        component={GreenCathedralHorizontalNav}
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
        <GreenCathedralBottomStack.Screen
          name="Comment Section"
          component={CommentGreenCathedralNav}
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
        <GreenCathedralBottomStack.Screen
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

      <GreenCathedralBottomStack.Screen
        name="Weather"
        component={FutureDayForecastGreenCathedral}
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
        <GreenCathedralBottomStack.Screen
          name="Navigation"
          component={GreenCathedralNavRoute}
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
        <GreenCathedralBottomStack.Screen
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
    </GreenCathedralBottomStack.Navigator>
  );
};

//dva oka prolozac - details
const DvaOkaBottomNav = () => {
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
    <DvaOkaBottomStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.blueLakeTab, {backgroundColor: '#866926'}],
      }}>
      <DvaOkaBottomStack.Screen
        name="Dva Oka Info"
        component={DvaOkaHorizontalNav}
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
        <DvaOkaBottomStack.Screen
          name="Comment Section"
          component={CommentDvaOkaNav}
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
        <DvaOkaBottomStack.Screen
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

      <DvaOkaBottomStack.Screen
        name="Weather"
        component={FutureDayForecastDvaOka}
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
        <DvaOkaBottomStack.Screen
          name="Navigation"
          component={DvaOkaNavRoute}
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
        <DvaOkaBottomStack.Screen
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
    </DvaOkaBottomStack.Navigator>
  );
};

//badnjevice prolozac - details
const BadnjeviceBottomNav = () => {
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
    <BadnjeviceBottomStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.blueLakeTab, {backgroundColor: '#adbab3'}],
      }}>
      <BadnjeviceBottomStack.Screen
        name="Badnjevice Info"
        component={BadnjeviceHorizontalNav}
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
        <BadnjeviceBottomStack.Screen
          name="Comment Section"
          component={CommentBadnjeviceNav}
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
        <BadnjeviceBottomStack.Screen
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

      <BadnjeviceBottomStack.Screen
        name="Weather"
        component={FutureDayForecastBadnjevice}
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
        <BadnjeviceBottomStack.Screen
          name="Navigation"
          component={BadnjeviceNavRoute}
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
        <BadnjeviceBottomStack.Screen
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
    </BadnjeviceBottomStack.Navigator>
  );
};

//places which user can visited - Imotski screen
export const ProlozacInfo = () => (
  <ProlozacStack.Navigator>
    <ProlozacStack.Screen
      name="Explore Prolozac"
      component={Prolozac}
      options={{headerShown: false}}
    />
    <ProlozacStack.Screen
      name="Green Cathedral Info"
      component={GreenCathedralBottomNav}
      options={{headerShown: false}}
    />
    <ProlozacStack.Screen
      name="Dva Oka Info"
      component={DvaOkaBottomNav}
      options={{headerShown: false}}
    />
    <ProlozacStack.Screen
      name="Badnjevice Info"
      component={BadnjeviceBottomNav}
      options={{headerShown: false}}
    />
  </ProlozacStack.Navigator>
);

export const Prolozac = () => {
  const navigation = useNavigation();
  const [displayAnimation, setDisplayAnimation] = useState('flex');

  const DATA = [
    {
      key: 1,
      name: 'Green Cathedral',
      image: require('../images/zelenaKatedrala.jpg'),
      screen: 'Green Cathedral Info',
      bgColor: '#a69244',
      fontAwColor: '#a69244',
      fontAwBgColor: 'white',
      display: displayAnimation,
    },
    {
      key: 2,
      name: 'Dva Oka',
      image: require('../images/dvaOkaH.jpg'),
      screen: 'Dva Oka Info',
      bgColor: '#866926',
      fontAwColor: 'white',
      fontAwBgColor: '#866926',
      display: 'none',
    },
    {
      key: 3,
      name: 'Badnjevice Kanjon',
      image: require('../images/badnjevice.jpg'),
      screen: 'Badnjevice Info',
      bgColor: '#adbab3',
      fontAwBgColor: '#adbab3',
      fontAwColor: 'white',
      display: 'none',
    },
  ];

  return (
    <>
      <SwiperTemplate
        content={DATA.map((item, index, indexAnimated) => (
          <>
            <View key={index}>
              <SharedElement id={`item.${item.key}.image`}>
                <Image style={styles.image} source={item.image} />
              </SharedElement>
              <View
                style={{
                  width: windowWidth,
                }}>
                <Text style={styles.txt}>{item.name}</Text>
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: item.bgColor}]}
                  onPress={() =>
                    navigation.navigate(item.screen, {
                      screen: item.screen,
                      params: {
                        screen: 'Overview',
                        params: {
                          image: item.image,
                          id: `item.${item.key}.image`,
                        },
                      },
                    })
                  }>
                  <Text style={styles.txtBtn}>Explore</Text>
                </TouchableOpacity>
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
