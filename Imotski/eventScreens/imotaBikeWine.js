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
import {ImotaBikeGallery} from './imotaBikeGallery';
import {ImotaBikeWineRoute} from './imotaBikeRoute';

const ImotaBikeAndWineBottomTab = createBottomTabNavigator();
const ImotaBikeAndWineHorizontalStack = createSharedElementStackNavigator();

export const ImotaBikeAndWineBottomNav = () => {
  return (
    <ImotaBikeAndWineBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <ImotaBikeAndWineBottomTab.Screen
        name="Imota Bike And Wine"
        component={ImotaBikeAndWineHorizontalNav}
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
      <ImotaBikeAndWineBottomTab.Screen
        name="Imota Bike Wine Map"
        component={ImotaBikeWineRoute}
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
    </ImotaBikeAndWineBottomTab.Navigator>
  );
};

export const ImotaBikeAndWineHorizontalNav = () => {
  return (
    <ImotaBikeAndWineHorizontalStack.Navigator>
      <ImotaBikeAndWineHorizontalStack.Screen
        name="Overview"
        component={ImotaBikeAndWine}
        options={{headerShown: false}}
      />
      <ImotaBikeAndWineHorizontalStack.Screen
        name="Gallery"
        component={ImotaBikeGallery}
        options={{headerShown: false}}
      />
    </ImotaBikeAndWineHorizontalStack.Navigator>
  );
};

const ImotaBikeAndWine = ({route}) => {
  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'Imotski and region'}
      color={colors.PRIMARY_TEXT_COLOR}
      navigate={'Entertainment Screen'}
      color2={'grey'}
      title={'Imota Bike And Wine'}
      details={`Imota Bike & Wine đir 3.0, is a famous Imotski bike race during which you can taste the products of local winemakers, and is organized by the Tourist Board of Imota, the Association of Winemakers and Winegrowers of Imotski vineyards ‘Flower of Conversation’ and ‘BIKE IM’ Team. The recommended age limit for minors is 14 years, and all cycling participants under the age of 14 can participate in the cycling race only accompanied by a parent or guardian. For all participants in the cycling race under the age of 16, it is mandatory to wear a protective helmet, without which participation will not be allowed.`}
    />
  );
};

ImotaBikeAndWine.sharedElements = route => {
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

export default ImotaBikeAndWine;

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
