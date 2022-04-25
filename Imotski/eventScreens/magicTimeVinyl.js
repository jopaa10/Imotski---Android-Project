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
import {MagicTimeVinylGallery} from './magicTimeGallery';
import {MagicTimeVinylRoute} from './magicVinylRoute';

const MagicTimeVinylBottomTab = createBottomTabNavigator();
const MagicTimeVinylHorizontalStack = createSharedElementStackNavigator();

export const MagicTimeVinylBottomNav = () => {
  return (
    <MagicTimeVinylBottomTab.Navigator
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{showLabel: false, style: styles.blueLakeTab}}>
      <MagicTimeVinylBottomTab.Screen
        name="Magic Time Vinly Festival"
        component={MagicTimeVinylHorizontalNav}
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
      <MagicTimeVinylBottomTab.Screen
        name="Magic Time Vinyl Map"
        component={MagicTimeVinylRoute}
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
    </MagicTimeVinylBottomTab.Navigator>
  );
};

export const MagicTimeVinylHorizontalNav = () => {
  return (
    <MagicTimeVinylHorizontalStack.Navigator>
      <MagicTimeVinylHorizontalStack.Screen
        name="Overview"
        component={MagicTimeVinyl}
        options={{headerShown: false}}
      />
      <MagicTimeVinylHorizontalStack.Screen
        name="Gallery"
        component={MagicTimeVinylGallery}
        options={{headerShown: false}}
      />
    </MagicTimeVinylHorizontalStack.Navigator>
  );
};

const MagicTimeVinyl = ({route}) => {
  const {colors} = useTheme();

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'Perinuša'}
      title={'Magic Time Vinyl Festival'}
      navigate={'Entertainment Screen'}
      color={colors.PRIMARY_TEXT_COLOR}
      color2={'grey'}
      details={`The Magic Time Vinyl Festival is a unique event in this area where only music from records is played. So a completely analog festival where vinyl reigns exclusively in all sizes and revs. The idea of ​​the festival is to gather fans of gramophone records and DJs for two days and present music that is almost forgotten. You will certainly not hear most of the songs on the radio or on TV, not to mention discos and clubs. This is not to say that the songs are bad, on the contrary, even after 30, 40 years they still sound exciting, but under the onslaught of new commercial music they are simply buried in an avalanche of digital hyperproduction. We understand that time goes on and it is easier to click with the mouse than to look for small cracks on black vinyl, but in that forest instant super offers often miss us, especially if it is about songs from the last century. Old songs can be very exciting and we want to show that at this festival. We want to bring them back from oblivion, revive them, provoke nostalgia, make you dance and show the younger generations the richness and quality of music that was played in this area. Vinyl is a symbol of a different way of life and a different way of listening to music. There is no "next" or "skip" but A and B sides. There is no speed listening or shuffle, but listening to the records was a whole ritual equal to Japanese tea drinking. "Let's listen to records" is a sentence that symbolizes those old times, and which can hardly be imagined in this digital modernity. Vinyl is also a symbol of musical evolutions - from jazz, twist, rock’n’roll, funk, disco, punk, the new wave… from the Opatija, Split festival, San Remo to underground clubs on the verge of the 90s. We want to merge and show all this at this unique analog festival. The venue of the festival also has that magical moment because it takes place in the middle of summer on dreamy meadows along the river Vrljika, near the murmur of old mills and the legendary Perinuša. The whole natural environment, the clarity of the water, and the analog sound from the records, we hope, will enchant you as well… Welcome to the festival at 33 and 45 rpm.`}
    />
  );
};

MagicTimeVinyl.sharedElements = route => {
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

export default MagicTimeVinyl;

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
