import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//svg
import {Svg, Path} from 'react-native-svg';

//Main page: Explore Imotski & region
import ExploreImotski from '../Explore Imotski/index';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark, faHome, faUserAlt} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const windowWidth = Dimensions.get('window').width;

const BottomTabsNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false, style: styles.tabContainer}}>
      <Tab.Screen
        name="Home"
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
        component={ExploreImotski}
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
      <Tab.Screen
        name="User"
        component={ExploreImotski}
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
    </Tab.Navigator>
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
});

export default BottomTabsNav;
