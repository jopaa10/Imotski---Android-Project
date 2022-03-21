import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

//tab for bottom tab navigation
const QuadBottomTab = createBottomTabNavigator();

//stack navigator for Overview and Gallery screens
const QuadHorizontalStack = createStackNavigator();

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faHome, faRoute} from '@fortawesome/free-solid-svg-icons';

//dimensions
import {windowWidth} from '../constants/global';

//bottom nav
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RedLakeInfo} from '../redLakeInfo';
import {QuadMap} from '../ActivitesMaps/quadMap';
import {createStackNavigator} from '@react-navigation/stack';
import {QuadGallery} from './quadGallery';
import {useTheme} from 'styled-components';

//blue lake - details
export const QuadBottomNav = () => {
  return (
    <QuadBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <QuadBottomTab.Screen
        name="Quad Screen"
        component={QuadHorizontalNav}
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
      <QuadBottomTab.Screen
        name="Quad Map"
        component={QuadMap}
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
    </QuadBottomTab.Navigator>
  );
};

export const QuadHorizontalNav = () => {
  return (
    <QuadHorizontalStack.Navigator>
      <QuadHorizontalStack.Screen
        name="Overview"
        component={QuadScreen}
        options={{headerShown: false}}
      />
      <QuadHorizontalStack.Screen
        name="Gallery"
        component={QuadGallery}
        options={{headerShown: false}}
      />
    </QuadHorizontalStack.Navigator>
  );
};

export const QuadScreen = () => {
  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={require('../images/quadActivity.jpg')}
      city={'Imotski'}
      sight={'Green Lake'}
      color2={'grey'}
      color={colors.PRIMARY_TEXT_COLOR}
      title={'Tour by Quad'}
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
    backgroundColor: '#656d44',
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
