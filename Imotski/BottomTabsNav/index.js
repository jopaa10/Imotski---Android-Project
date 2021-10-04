import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Text, Modal} from 'react-native';
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
} from '@fortawesome/free-solid-svg-icons';

import {createStackNavigator} from '@react-navigation/stack';

//Main page: Explore Imotski & region
import {ExploreImotski} from '../Explore Imotski/index';
import {Imotski} from '../offlineScreens/imotski';
import {Biokovo} from '../offlineScreens/biokovo';
import {Prolozac} from '../offlineScreens/prolozac';
import {Ricice} from '../offlineScreens/ricice';

//blue lake info in Imotski screen
import {BlueLakeInfo} from '../blueLakeInfo';
import {Gallery} from '../blueLakeInfo/gallery';
import {Weather} from '../blueLakeInfo/weather';

//next 7 days forecast
import {NextDaysForecast} from '../blueLakeInfo/nextdaysforecast';

//red lake info in Imotski screen
import {RedLakeInfo} from '../redLakeInfo';

//first page for user signIn or signUp
import {SignInNav} from '../userPage';
import {ProfilePageNav} from '../profilePage';

//async storage for getting token
import AsyncStorage from '@react-native-async-storage/async-storage';

//navigation page for getting directions
import {RouteMap} from '../routeMap';

const Stack = createStackNavigator();
const BlueLakeStack = createStackNavigator();
const BlueLakeHorNav = createStackNavigator();
const BlueLakeInfoBottomNav = createBottomTabNavigator();

//weather stack
const WeatherStack = createStackNavigator();

//next 7 days forecast
const FutureDayForecast = () => (
  <WeatherStack.Navigator>
    <WeatherStack.Screen
      name="Weather Data"
      component={Weather}
      options={{headerShown: false}}
    />
    <WeatherStack.Screen
      name="Next Days Forecast"
      component={NextDaysForecast}
      options={{headerShown: false}}
    />
  </WeatherStack.Navigator>
);

const BlueLakeHorizontalNav = () => (
  <BlueLakeHorNav.Navigator>
    <BlueLakeHorNav.Screen
      name="Blue Lake Info"
      component={BlueLakeInfo}
      options={{headerShown: false}}
    />

    <BlueLakeHorNav.Screen
      name="Gallery"
      options={{headerShown: false}}
      component={Gallery}
    />
  </BlueLakeHorNav.Navigator>
);

//blue lake - details
const BlueLakeBottomNav = () => {
  const [isLogged, setLogged] = useState(false);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  });

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
      {isLogged === true ? (
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
              </View>
            ),
          }}
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
              </View>
            ),
          }}
          listeners={{
            tabPress: event => {
              event.preventDefault();
              alert('Sign up or login first!');
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
          component={RouteMap}
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
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault();
              alert('You must login first');
            },
          })}
        />
      )}
    </BlueLakeInfoBottomNav.Navigator>
  );
};

//places what user can visited in imotski
const ImotskiInfo = () => (
  <BlueLakeStack.Navigator>
    <BlueLakeStack.Screen
      name="Explore Imotski"
      component={Imotski}
      options={{headerShown: false}}
    />
    <BlueLakeStack.Screen
      name="Blue Lake Info"
      component={BlueLakeBottomNav}
      options={{headerShown: false}}
    />
    <BlueLakeStack.Screen name="Red Lake Info" component={RedLakeInfo} />
  </BlueLakeStack.Navigator>
);

const Tab = createBottomTabNavigator();

const windowWidth = Dimensions.get('window').width;

//bottom navigation on first screen Explore Imotski and region
const BottomTabs = () => {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false, style: styles.tabContainer}}>
      <Tab.Screen
        name="Explore Imotski"
        component={ExploreImotski}
        options={{
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
                    fill="#0D2D5C"
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
        name="Settings"
        component={RedLakeInfo}
        options={{
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
                    fill="#0D2D5C"
                  />
                </Svg>
              ) : (
                <></>
              )}
            </View>
          ),
        }}
      />
      {isLogged === true ? (
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
                      fill="#0D2D5C"
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
          name="User"
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
                      fill="#0D2D5C"
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
      <Stack.Screen name="Biokovo" component={Biokovo} />
      <Stack.Screen name="Prolozac" component={Prolozac} />
      <Stack.Screen name="Ricice" component={Ricice} />
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
    color: '#0D2D5C',
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
});

export default ExploreImotskiNav;
