import React from 'react';
import {View, StyleSheet} from 'react-native';

//template
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

//bottom nav
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {windowWidth} from '../constants/global';
import RedLakeInfo from '../redLakeInfo';

//tab for bottom tab navigation
const SwimmingBottomTab = createBottomTabNavigator();

//stack navigator for Overview and Gallery screens
const SwimmingHorizontalStack = createStackNavigator();

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faHome, faRoute} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {SwimmingGallery} from './swimmingGallery';
import {useTheme} from 'styled-components';

//blue lake - details
export const SwimmingBottomNav = () => {
  return (
    <SwimmingBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <SwimmingBottomTab.Screen
        name="Swimming Screen"
        component={SwimmingHorizontalNav}
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
      <SwimmingBottomTab.Screen
        name="Red Lake Info"
        component={RedLakeInfo}
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
    </SwimmingBottomTab.Navigator>
  );
};

export const SwimmingHorizontalNav = () => {
  return (
    <SwimmingHorizontalStack.Navigator>
      <SwimmingHorizontalStack.Screen
        name="Overview"
        component={SwimmingScreen}
        options={{headerShown: false}}
      />
      <SwimmingHorizontalStack.Screen
        name="Gallery"
        component={SwimmingGallery}
        options={{headerShown: false}}
      />
    </SwimmingHorizontalStack.Navigator>
  );
};

export const SwimmingScreen = () => {
  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={require('../images/swimBlueLake.jpg')}
      city={'Imotski'}
      sight={'Blue Lake'}
      color2={'grey'}
      color={colors.PRIMARY_TEXT_COLOR}
      navigate={'Gallery'}
      title={'Swimming in Lake'}
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
    backgroundColor: '#1F83BB',
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
