import {faHome, faRoute} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {useTheme} from 'styled-components';
import {KayakMap} from '../ActivitesMaps/kayakMap';

//template
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';
import {windowWidth} from '../constants/global';
import {GlumciGallery} from './glumciUZagvozduGallery';
import {GlumciUZagvozduRoute} from './glumciUZagvozduRoute';

const GlumciUZagvozduBottomTab = createBottomTabNavigator();
const GlumciUZagvozduHorizontalStack = createSharedElementStackNavigator();

export const GlumciUZagvozduBottomNav = () => {
  return (
    <GlumciUZagvozduBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <GlumciUZagvozduBottomTab.Screen
        name="Glumci U Zagvozdu"
        component={GlumciUZagvozduHorizontalNav}
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
      <GlumciUZagvozduBottomTab.Screen
        name="Glumci U Zagvozdu Map"
        component={GlumciUZagvozduRoute}
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
    </GlumciUZagvozduBottomTab.Navigator>
  );
};

export const GlumciUZagvozduHorizontalNav = () => {
  return (
    <GlumciUZagvozduHorizontalStack.Navigator>
      <GlumciUZagvozduHorizontalStack.Screen
        name="Overview"
        component={GlumciUZagvozdu}
        options={{headerShown: false}}
      />
      <GlumciUZagvozduHorizontalStack.Screen
        name="Gallery"
        component={GlumciGallery}
        options={{headerShown: false}}
      />
    </GlumciUZagvozduHorizontalStack.Navigator>
  );
};

const GlumciUZagvozdu = ({route}) => {
  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Zagvozd'}
      color={colors.PRIMARY_TEXT_COLOR}
      navigate={'Entertainment Screen'}
      color2={'grey'}
      sight={'Zagvozd'}
      title={'Glumci u Zagvozdu'}
      details={`Theatrical Encounters in Zagvozd (or Actors in Zagvozd) is a theatrical event that has been held since 1998. This summer theater festival is held every year in July and August in the Zabiokovo town of Zagvozd. Since its inception, this festival has hosted a number of famous cast members and drama actors. The founder, organizer and longtime artistic director of the festival is the actor Vedran Mlikota.`}
    />
  );
};

GlumciUZagvozdu.sharedElements = route => {
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

export default GlumciUZagvozdu;

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
