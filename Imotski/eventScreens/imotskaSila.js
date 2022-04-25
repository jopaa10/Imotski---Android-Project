import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  createSharedElementStackNavigator,
  SharedElement,
} from 'react-navigation-shared-element';

//template
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

import {useTheme} from 'styled-components';
import {windowWidth} from '../constants/global';
import {ImotskaSilaGallery} from './imotskaSilaGallery';
import {KayakMap} from '../ActivitesMaps/kayakMap';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faRoute} from '@fortawesome/free-solid-svg-icons';
import {ImotskaSilaRoute} from './imotskaSilaRoute';

const ImotskaSilaBottomTab = createBottomTabNavigator();
const ImotskaSilaHorizontalStack = createSharedElementStackNavigator();

export const ImotskaSilaBottomNav = () => {
  return (
    <ImotskaSilaBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <ImotskaSilaBottomTab.Screen
        name="Imotska Sila"
        component={ImotskaSilaHorizontalNav}
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
      <ImotskaSilaBottomTab.Screen
        name="Imotska Sila Map"
        component={ImotskaSilaRoute}
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
    </ImotskaSilaBottomTab.Navigator>
  );
};

export const ImotskaSilaHorizontalNav = () => {
  return (
    <ImotskaSilaHorizontalStack.Navigator>
      <ImotskaSilaHorizontalStack.Screen
        name="Overview"
        component={ImotskaSila}
        options={{headerShown: false}}
      />
      <ImotskaSilaHorizontalStack.Screen
        name="Gallery"
        component={ImotskaSilaGallery}
        options={{headerShown: false}}
      />
    </ImotskaSilaHorizontalStack.Navigator>
  );
};

const ImotskaSila = ({route}) => {
  //console.log(route.params.id);
  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'City Imotski'}
      color={colors.PRIMARY_TEXT_COLOR}
      navigate={'Entertainment Screen'}
      color2={'grey'}
      title={'Imotska Sila'}
      details={`The traditional summer cultural event that begins every year on July 4 on the birthday of the great Imotski poet Tin Ujevic. The organizer is the Imotski Public Open University.
      cultural event that begins every year on July 4 on the birthday of the great Imotski poet Tin Ujevic. The organizer is the Imotski Public Open University.
      cultural event that begins every year on July 4 on the birthday of the great Imotski poet Tin Ujevic. The organizer is the Imotski Public Open University.`}
    />
  );
};

ImotskaSila.sharedElements = route => {
  //const {item} = route.params;
  //console.log(route.params.id);
  return [
    {
      id: route.params.id,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default ImotskaSila;

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
    backgroundColor: '#6c7a40',
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
