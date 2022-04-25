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
import {ZabarskaGallery} from './zabarskaGallery';
import {ZabarskaVecerRoute} from './zabarskaVecerRoute';

const ZabarskaVecerBottomTab = createBottomTabNavigator();
const ZabarskaVecerHorizontalStack = createSharedElementStackNavigator();

export const ZabarskaVecerBottomNav = () => {
  return (
    <ZabarskaVecerBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <ZabarskaVecerBottomTab.Screen
        name="Zabarska Vecer"
        component={ZabarskaVecerHorizontalNav}
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
      <ZabarskaVecerBottomTab.Screen
        name="Zabarska Vecer Map"
        component={ZabarskaVecerRoute}
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
    </ZabarskaVecerBottomTab.Navigator>
  );
};

export const ZabarskaVecerHorizontalNav = () => {
  return (
    <ZabarskaVecerHorizontalStack.Navigator>
      <ZabarskaVecerHorizontalStack.Screen
        name="Overview"
        component={ZabarskaVecer}
        options={{headerShown: false}}
      />
      <ZabarskaVecerHorizontalStack.Screen
        name="Gallery"
        component={ZabarskaGallery}
        options={{headerShown: false}}
      />
    </ZabarskaVecerHorizontalStack.Navigator>
  );
};

const ZabarskaVecer = ({route}) => {
  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'Zmijavci'}
      title={'Žabarska Večer'}
      color={colors.PRIMARY_TEXT_COLOR}
      navigate={'Entertainment Screen'}
      color2={'grey'}
      details={`Unlike many places in the Imotski region where fishing nights have been organized in recent years, the locals of Zmijavec have gone a step further and organize the Frog Night every year. Thus, more than a thousand Zmijavčani and their guests from all over Croatia enjoy frog specialties, and the menu also includes eels and crabs. The heated atmosphere on an already hot night is mostly warmed by various tamburitza players, while draft beer and a nearby canal where the bravest jump in search of frogs that will bring them valuable prizes take care of the cooling. Definitely a successful folk party that is worth participating in.`}
    />
  );
};

ZabarskaVecer.sharedElements = route => {
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

export default ZabarskaVecer;

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
