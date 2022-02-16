import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {ActivitiesInfoTemplate} from '../ActivitiesInfoTemplate';

//tab for bottom tab navigation
const WalkingBottomTab = createBottomTabNavigator();

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faRoute} from '@fortawesome/free-solid-svg-icons';

//dimensions
import {windowWidth} from '../constants/global';

//bottom nav
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RedLakeInfo} from '../redLakeInfo';

//blue lake - details
export const WalkingBottomNav = () => {
  return (
    <WalkingBottomTab.Navigator
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <WalkingBottomTab.Screen
        name="Walking Screen"
        component={WalkingScreen}
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
      <WalkingBottomTab.Screen
        name="Red Lake Info"
        component={RedLakeInfo}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faRoute}
                color={focused ? '#8E8E8E' : 'white'}
                size={30}
                style={styles.faCloudIcon}
              />
            </View>
          ),
        }}
      />
    </WalkingBottomTab.Navigator>
  );
};

export const WalkingScreen = () => {
  return (
    <ActivitiesInfoTemplate
      image={require('../images/redLakeWalking.jpg')}
      city={'Imotski'}
      sight={'Red Lake'}
      title={'Walking tour'}
      details={`Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
    />
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
    backgroundColor: '#CA9A8C',
    width: windowWidth * 0.6,
    height: 50,
    position: 'absolute',
    left: windowWidth * 0.2,
    right: windowWidth * 0.2,
    marginBottom: 20,
    borderRadius: 20,
  },
  faHeartIcon: {
    marginRight: windowWidth * 0.01,
  },
  faRouteIcon: {
    marginRight: windowWidth * 0.01,
  },
});
