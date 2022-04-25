import {faHome, faRoute} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';
import {windowWidth} from '../constants/global';
import {CvitRazgovoraGallery} from './cvitRazgovoraGallery';
import {CvitRazgovoraRoute} from './cvitRazgovoraMap';

const CvitRazgovoraBottomTab = createBottomTabNavigator();
const CvitRazgovoraHorizontalStack = createSharedElementStackNavigator();

export const CvitRazgovoraBottomNav = () => {
  return (
    <CvitRazgovoraBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <CvitRazgovoraBottomTab.Screen
        name="Cvit Razgovora"
        component={CvitRazgovoraHorizontalNav}
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
      <CvitRazgovoraBottomTab.Screen
        name="Cvit Razgovora Map"
        component={CvitRazgovoraRoute}
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
    </CvitRazgovoraBottomTab.Navigator>
  );
};

export const CvitRazgovoraHorizontalNav = () => {
  return (
    <CvitRazgovoraHorizontalStack.Navigator>
      <CvitRazgovoraHorizontalStack.Screen
        name="Overview"
        component={CvitRazgovora}
        options={{headerShown: false}}
      />
      <CvitRazgovoraHorizontalStack.Screen
        name="Gallery"
        component={CvitRazgovoraGallery}
        options={{headerShown: false}}
      />
    </CvitRazgovoraHorizontalStack.Navigator>
  );
};

const CvitRazgovora = ({route}) => {
  //console.log(route.params.id);

  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'City Imotski'}
      title={'Cvit Razgovora'}
      color={colors.PRIMARY_TEXT_COLOR}
      color2={'grey'}
      navigate={'Entertainment Screen'}
      details={`Every year, the Association of Winemakers and Winegrowers of Imotski Vineyards organizes the event "Flower of Conversation" which brings together many Imotski winemakers and a large number of visitors from the Imotski region, Dalmatia and a large number of tourists staying in Dalmatia.

      The intention is to promote the Imotski vineyards through this event, enrich the tourist offer of our region and invite visitors to visit the tasting rooms and wineries that participate in this event.
      
      By purchasing a glass, each visitor exercises the right to taste the wines offered in the wineries participating in the program.`}
    />
  );
};

CvitRazgovora.sharedElements = ({route}) => {
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

export default CvitRazgovora;
