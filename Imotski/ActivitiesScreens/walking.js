import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {ActivitiesInfoTemplate} from '../ActivitiesInfoTemplate';

//tab for bottom tab navigation
const WalkingBottomTab = createBottomTabNavigator();

//stack navigator for Overview and Gallery screens
const WalkingHorizontalStack = createStackNavigator();

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faHome, faRoute} from '@fortawesome/free-solid-svg-icons';

//dimensions
import {windowWidth} from '../constants/global';

//bottom nav
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RedLakeInfo} from '../redLakeInfo';
import {WalkingMap} from '../ActivitesMaps/walkingMap';
import {createStackNavigator} from '@react-navigation/stack';
import {WalkingGallery} from './walkingGallery';
import {Colors} from 'react-native-paper';
import {useTheme} from 'styled-components';

//blue lake - details
export const WalkingBottomNav = () => {
  return (
    <WalkingBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <WalkingBottomTab.Screen
        name="Walking Screen"
        component={WalkingHorizontalNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faHome}
                color={focused ? 'white' : '#8E8E8E'}
                size={25}
                style={styles.faHeartIcon}
              />
            </View>
          ),
        }}
      />
      <WalkingBottomTab.Screen
        name="Red Lake Info"
        component={WalkingMap}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faRoute}
                color={focused ? 'white' : '#8E8E8E'}
                size={25}
                style={styles.faRouteIcon}
              />
            </View>
          ),
        }}
      />
    </WalkingBottomTab.Navigator>
  );
};

export const WalkingHorizontalNav = () => {
  return (
    <WalkingHorizontalStack.Navigator>
      <WalkingHorizontalStack.Screen
        name="Overview"
        component={WalkingScreen}
        options={{headerShown: false}}
      />
      <WalkingHorizontalStack.Screen
        name="Gallery"
        component={WalkingGallery}
        options={{headerShown: false}}
      />
    </WalkingHorizontalStack.Navigator>
  );
};

export const WalkingScreen = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../images/redLakeWalking.jpg')}
      city={'Imotski'}
      sight={'Red Lake'}
      color={colors.PRIMARY_TEXT_COLOR}
      color2={'grey'}
      title={'Walking tour'}
      navigate={'Gallery'}
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
    width: windowWidth * 0.5,
    height: 45,
    position: 'absolute',
    left: windowWidth * 0.25,
    right: windowWidth * 0.25,
    marginBottom: 20,
    borderRadius: 10,
  },
  faHeartIcon: {
    marginRight: windowWidth * 0.01,
  },
  faRouteIcon: {
    marginRight: windowWidth * 0.01,
  },
});
