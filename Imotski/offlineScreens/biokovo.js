import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
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

//create stack nav
import {createStackNavigator} from '@react-navigation/stack';

//stack screens
import SkywalkBiokovoInfo from '../skywalkBiokovoInfo';
import VosacBiokovoInfo from '../vosacBiokovoInfo';
import StJureInfo from '../svJureBiokovoInfo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommentSkywalkNav} from '../skywalkBiokovoInfo/commentSkywalk';
import RedLakeInfo from '../redLakeInfo';
import BlueLakeInfo from '../blueLakeInfo';
import {SkywalkNavRoute} from '../skywalkBiokovoInfo/skywalkNav';
import {WeatherSkywalk} from '../skywalkBiokovoInfo/weatherSkywalk';

//screens st Jure
import {CommentNavStJure} from '../svJureBiokovoInfo/commentStJure';
import {WeatherStJure} from '../svJureBiokovoInfo/weatherStJure';
import {StJureNavRoute} from '../svJureBiokovoInfo/stJureNav';

//screens vosac
import {CommentNavVosac} from '../vosacBiokovoInfo/commentVosac';
import {WeatherVosac} from '../vosacBiokovoInfo/weatherVosac';
import {VosacNavRoute} from '../vosacBiokovoInfo/vosacNav';

//screens skywalk
import {GallerySkywalk} from '../skywalkBiokovoInfo/gallery';
import {ReviewSkywalk} from '../skywalkBiokovoInfo/reviewSkywalk';
import {GalleryVosac} from '../vosacBiokovoInfo/gallery';
import {ReviewVosac} from '../vosacBiokovoInfo/reviewVosac';
import {ReviewStJure} from '../svJureBiokovoInfo/reviewStJure';
import {GalleryStJure} from '../svJureBiokovoInfo/gallery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NextDaysForecastSkywalk} from '../skywalkBiokovoInfo/nextDaysForecast';
import {NextDaysForecastVosac} from '../vosacBiokovoInfo/nextDaysForecast';
import {NextDaysForecastStJure} from '../svJureBiokovoInfo/nextDaysForecast';
import {
  createSharedElementStackNavigator,
  SharedElement,
} from 'react-navigation-shared-element';

//stack navigator
const BiokovoStack = createSharedElementStackNavigator();

//bottom stack navigator
const SkywalkBottomStack = createBottomTabNavigator();
const VosacBottomStack = createBottomTabNavigator();
const StJureBottomStack = createBottomTabNavigator();

//weather stack for Skywalk
const WeatherStackSkywalk = createStackNavigator();

//next 7 days forecast for Skywalk
export const FutureDayForecastSkywalk = () => (
  <WeatherStackSkywalk.Navigator>
    <WeatherStackSkywalk.Screen
      name="Weather Data"
      component={WeatherSkywalk}
      options={{headerShown: false}}
    />

    <WeatherStackSkywalk.Screen
      name="Next Days Forecast"
      component={NextDaysForecastSkywalk}
      options={{headerShown: false}}
    />
  </WeatherStackSkywalk.Navigator>
);

//weather stack for Vosac
const WeatherStackVosac = createStackNavigator();

//next 7 days forecast for Vosac
export const FutureDayForecastVosac = () => (
  <WeatherStackVosac.Navigator>
    <WeatherStackVosac.Screen
      name="Weather Data"
      component={WeatherVosac}
      options={{headerShown: false}}
    />

    <WeatherStackVosac.Screen
      name="Next Days Forecast"
      component={NextDaysForecastVosac}
      options={{headerShown: false}}
    />
  </WeatherStackVosac.Navigator>
);

//weather stack for St Jure
const WeatherStackStJure = createStackNavigator();

//next 7 days forecast for St Jure
export const FutureDayForecastStJure = () => (
  <WeatherStackStJure.Navigator>
    <WeatherStackStJure.Screen
      name="Weather Data"
      component={WeatherStJure}
      options={{headerShown: false}}
    />

    <WeatherStackStJure.Screen
      name="Next Days Forecast"
      component={NextDaysForecastStJure}
      options={{headerShown: false}}
    />
  </WeatherStackStJure.Navigator>
);

//skywalk horizontal stack nav
const SkywalkHorizontalStack = createSharedElementStackNavigator();

//skywalk - details horizontal nav
const SkywalkHorizontalNav = () => (
  <SkywalkHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Skywalk Biokovo Info">
    <SkywalkHorizontalStack.Screen
      name="Overview"
      component={SkywalkBiokovoInfo}
      options={{headerShown: false}}
    />

    <SkywalkHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GallerySkywalk}
    />

    <SkywalkHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewSkywalk}
    />
  </SkywalkHorizontalStack.Navigator>
);

//vosac horizontal stack nav
const VosacHorizontalStack = createSharedElementStackNavigator();

//vosac - details horizontal nav
const VosacHorizontalNav = () => (
  <VosacHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="Vosac Biokovo Info">
    <VosacHorizontalStack.Screen
      name="Overview"
      component={VosacBiokovoInfo}
      options={{headerShown: false}}
    />

    <VosacHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryVosac}
    />

    <VosacHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewVosac}
    />
  </VosacHorizontalStack.Navigator>
);

//st jure horizontal stack nav
const StJureHorizontalStack = createSharedElementStackNavigator();

//st jure - details horizontal nav
const StJureHorizontalNav = () => (
  <StJureHorizontalStack.Navigator
    screenOptions={{unmountOnBlur: true}}
    initialRouteName="St Jure Biokovo Info">
    <StJureHorizontalStack.Screen
      name="Overview"
      component={StJureInfo}
      options={{headerShown: false}}
    />

    <StJureHorizontalStack.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={GalleryStJure}
    />

    <StJureHorizontalStack.Screen
      name="Review"
      options={{headerShown: false}}
      component={ReviewStJure}
    />
  </StJureHorizontalStack.Navigator>
);

//skywalk biokovo - details
const SkywalkBiokovoBottomNav = () => {
  const [isLogged, setLogged] = useState(false);
  const navigation = useNavigation();
  const [alertModal, setAlertModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);

  //console.log(route.params.key);

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
    <SkywalkBottomStack.Navigator
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <SkywalkBottomStack.Screen
        name="Skywalk Biokovo Info"
        component={SkywalkHorizontalNav}
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
        <SkywalkBottomStack.Screen
          name="Comment Section"
          component={CommentSkywalkNav}
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
        <SkywalkBottomStack.Screen
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

      <SkywalkBottomStack.Screen
        name="Weather"
        component={FutureDayForecastSkywalk}
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
        <SkywalkBottomStack.Screen
          name="Navigation"
          component={SkywalkNavRoute}
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
        <SkywalkBottomStack.Screen
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
    </SkywalkBottomStack.Navigator>
  );
};

//vosac biokovo - details
const VosacBiokovoBottomNav = () => {
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
    <VosacBottomStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.blueLakeTab, {backgroundColor: '#CA9A8C'}],
      }}>
      <VosacBottomStack.Screen
        name="Vosac Biokovo Info"
        component={VosacHorizontalNav}
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
        <VosacBottomStack.Screen
          name="Comment Section"
          component={CommentNavVosac}
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
        <VosacBottomStack.Screen
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

      <VosacBottomStack.Screen
        name="Weather"
        component={FutureDayForecastVosac}
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
        <VosacBottomStack.Screen
          name="Navigation"
          component={VosacNavRoute}
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
        <VosacBottomStack.Screen
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
    </VosacBottomStack.Navigator>
  );
};

//st jure biokovo - details
const StJureBiokovoBottomNav = () => {
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
    <StJureBottomStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.blueLakeTab, {backgroundColor: '#7d8572'}],
      }}>
      <StJureBottomStack.Screen
        name="St Jure Biokovo Info"
        component={StJureHorizontalNav}
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
        <StJureBottomStack.Screen
          name="Comment Section"
          component={CommentNavStJure}
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
        <StJureBottomStack.Screen
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

      <StJureBottomStack.Screen
        name="Weather"
        component={FutureDayForecastStJure}
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
        <StJureBottomStack.Screen
          name="Navigation"
          component={StJureNavRoute}
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
        <StJureBottomStack.Screen
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
    </StJureBottomStack.Navigator>
  );
};

//places which user can visited - Imotski screen
export const BiokovoInfo = () => (
  <BiokovoStack.Navigator>
    <BiokovoStack.Screen
      name="Explore Biokovo"
      component={Biokovo}
      options={{headerShown: false}}
    />
    <BiokovoStack.Screen
      name="Skywalk Biokovo Info"
      component={SkywalkBiokovoBottomNav}
      options={{headerShown: false}}
    />
    <BiokovoStack.Screen
      name="Vosac Biokovo Info"
      component={VosacBiokovoBottomNav}
      options={{headerShown: false}}
    />
    <BiokovoStack.Screen
      name="St Jure Biokovo Info"
      component={StJureBiokovoBottomNav}
      options={{headerShown: false}}
    />
  </BiokovoStack.Navigator>
);

export const Biokovo = () => {
  const navigation = useNavigation();
  const [displayAnimation, setDisplayAnimation] = useState('flex');

  const DATA = [
    {
      key: 1,
      name: 'Skywalk Biokovo',
      image: require('../images/skywalkBiokovo.jpg'),
      screen: 'Skywalk Biokovo Info',
      bgColor: '#1F83BB',
      fontAwColor: '#1F83BB',
      fontAwBgColor: 'white',
      display: displayAnimation,
    },
    {
      key: 2,
      name: 'Vošac',
      image: require('../images/biokovoVosac.jpg'),
      screen: 'Vosac Biokovo Info',
      bgColor: '#CA9A8C',
      fontAwColor: 'white',
      fontAwBgColor: '#CA9A8C',
      display: 'none',
    },
    {
      key: 3,
      name: 'Saint Jure',
      image: require('../images/biokovoSvJure.jpg'),
      screen: 'St Jure Biokovo Info',
      bgColor: '#7d8572',
      fontAwBgColor: '#7d8572',
      fontAwColor: 'white',
      display: 'none',
    },
  ];

  return (
    <>
      <SwiperTemplate
        content={DATA.map((item, index) => (
          <>
            <View key={index}>
              <SharedElement id={`item.${item.key}.image`}>
                <Image
                  style={styles.image}
                  source={item.image}
                  resizeMode={'cover'}
                />
              </SharedElement>
              <View
                style={{
                  width: windowWidth,
                }}>
                <Text style={styles.txt}>{item.name}</Text>
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: item.bgColor}]}
                  onPress={() => {
                    navigation.navigate(item.screen, {
                      screen: item.screen,
                      params: {
                        screen: 'Overview',
                        params: {
                          image: item.image,
                          id: `item.${item.key}.image`,
                        },
                      },
                    });
                  }}>
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
              key={(index += 4)}
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
    width: windowWidth,
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
    marginTop: windowWidth * 0.03,
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
