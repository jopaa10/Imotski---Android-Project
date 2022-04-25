import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

//svg
import Svg, {Path, G} from 'react-native-svg';

//dimension
import {windowHeight, windowWidth} from '../constants/global';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

//navigator
import {createStackNavigator} from '@react-navigation/stack';

//event screens
import {ImotskaSilaBottomNav} from '../eventScreens/imotskaSila';
import {CvitRazgovoraBottomNav} from '../eventScreens/cvitRazgovora';
import {MagicTimeVinylBottomNav} from '../eventScreens/magicTimeVinyl';
import {ImotaBikeAndWineBottomNav} from '../eventScreens/imotaBikeWine';
import {GlumciUZagvozduBottomNav} from '../eventScreens/glumciUZagvozdu';
import {ZabarskaVecerBottomNav} from '../eventScreens/zabarskaVecer';
import {
  createSharedElementStackNavigator,
  SharedElement,
} from 'react-navigation-shared-element';
import {useTheme} from 'styled-components';

const EventStack = createSharedElementStackNavigator();

export const EventNavigation = () => {
  return (
    <EventStack.Navigator>
      <EventStack.Screen
        name="Entertainment Screen"
        component={EntertainmentScreen}
        options={{headerShown: false}}
      />
      <EventStack.Screen
        name="Imotska Sila"
        component={ImotskaSilaBottomNav}
        options={{headerShown: false}}
      />
      <EventStack.Screen
        name="Cvit Razgovora"
        component={CvitRazgovoraBottomNav}
        options={{headerShown: false}}
      />
      <EventStack.Screen
        name="Magic Time Vinly Festival"
        component={MagicTimeVinylBottomNav}
        options={{headerShown: false}}
      />
      <EventStack.Screen
        name="Imota Bike And Wine"
        component={ImotaBikeAndWineBottomNav}
        options={{headerShown: false}}
      />
      <EventStack.Screen
        name="Glumci U Zagvozdu"
        component={GlumciUZagvozduBottomNav}
        options={{headerShown: false}}
      />
      <EventStack.Screen
        name="Zabarska Vecer"
        component={ZabarskaVecerBottomNav}
        options={{headerShown: false}}
      />
    </EventStack.Navigator>
  );
};

export const EntertainmentScreen = props => {
  const navigation = useNavigation();

  const {colors} = useTheme();

  const DATA = [
    {
      key: 1,
      title: 'Imotska sila',
      image: require('../images/imotskaSila.jpg'),
      city: 'City Imotski',
      navigation: 'Imotska Sila',
    },
    {
      key: 2,
      title: 'Cvit Razgovora',
      image: require('../images/cvitRazgovora.jpg'),
      city: 'City Imotski',
      navigation: 'Cvit Razgovora',
    },
    {
      key: 3,
      title: 'Magic Time Vinyl Festival',
      image: require('../images/magicVinylFestival.jpg'),
      city: 'Perinuša',
      navigation: 'Magic Time Vinly Festival',
    },
    {
      key: 4,
      title: 'Glumci u Zagvozdu',
      image: require('../images/glumciUZagvozdu.jpg'),
      city: 'Zagvozd',
      navigation: 'Glumci U Zagvozdu',
    },
    {
      key: 5,
      title: 'Imota Bike & wine',
      image: require('../images/imotaBikeAndWine.jpeg'),
      city: 'Imotski region',
      navigation: 'Imota Bike And Wine',
    },
    {
      key: 6,
      title: 'Žabarska Večer',
      image: require('../images/zabarskaVecerImotski.jpg'),
      city: 'Zmijavci',
      navigation: 'Zabarska Vecer',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          height: windowHeight,
          backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
        }}>
        <View
          style={{
            height: windowHeight * 0.3,
            backgroundColor: colors.EVENT_BACKGROUND_COLOR,
          }}>
          <TouchableOpacity
            style={styles.arrowLeftIcon}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              color="white"
              icon={faArrowLeft}
              size={20}
              style={{display: props.display}}
            />
          </TouchableOpacity>
          <Text style={styles.txtSignIn}> Summer Events</Text>
          <View
            style={{
              width: windowWidth,
              aspectRatio: 375 / 216,
              height: 'auto',
            }}>
            <Svg
              style={styles.waves}
              width={'100%'}
              height={'100%'}
              viewBox={`0 0 375 216`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <G filter="url(#filter0_i_718_2)">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-120 216L-94.375 184.436C-68.75 152.871 -17.5 89.7421 33.75 79.2206C85 68.6991 122.074 105.524 173.324 89.7421C224.574 73.9599 290 5.57019 341.25 0.309446C392.5 -4.9513 443.75 58.1776 469.375 89.7421L495 121.307V216H469.375C443.75 216 392.5 216 341.25 216C290 216 238.75 216 187.5 216C136.25 216 85 216 33.75 216C-17.5 216 -68.75 216 -94.375 216H-120Z"
                  fill={colors.SECUNDARY_BACKGROUND_COLOR}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
                />
              </G>
            </Svg>
          </View>
        </View>

        {DATA.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate(item.navigation, {
                screen: item.navigation,
                params: {
                  screen: 'Overview',
                  params: {
                    image: item.image,
                    id: `item.${item.key}.image`,
                  },
                },
              })
            }>
            <SharedElement id={`item.${item.key}.image`}>
              <View style={styles.listContainer}>
                <View style={styles.containerEvent}>
                  <Image
                    style={styles.image}
                    source={item.image}
                    resizeMode="cover"
                  />

                  <View style={styles.cityContainer}>
                    <Text style={styles.cityTitle}>{item.title}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: windowWidth * 0.05,
                        marginBottom: windowWidth * 0.01,
                      }}>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        style={styles.iconLocation}
                        size={16}
                      />
                      <Text style={styles.cityDestination}>{item.city}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </SharedElement>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: windowHeight,
  },
  titleExploreIm: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  listContainer: {
    flex: 1,
    //marginTop: 20,
    //bottom: windowWidth * 0.22,
    /* borderColor: 'black',
    borderWidth: 1, */
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerDiscover: {
    marginVertical: windowWidth * 0.05,
    borderColor: '#1F83BB',
    borderWidth: 1,
    flexDirection: 'row',
    bottom: windowWidth * 0.08,
    justifyContent: 'flex-end',
    width: windowWidth,
  },
  containerActivities: {
    bottom: windowWidth * 0.2,
    /* borderColor: 'black',
    borderWidth: 1, */
    flexDirection: 'column',
    width: windowWidth,
  },
  waves: {
    bottom: windowHeight * 0.05,
    height: windowHeight * 0.2,
  },
  arrowLeftIcon: {
    marginTop: windowWidth * 0.15,
    marginHorizontal: windowWidth * 0.05,
  },
  containerEvent: {
    flex: 1,
    width: windowWidth * 0.9,
    //marginTop: StatusBar.currentHeight || 0,
    marginTop: windowWidth * 0.01,
    height: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    overflow: 'hidden',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: windowHeight * 0.3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cityContainer: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'flex-start',
    //alignItems: 'center',
    bottom: windowWidth * 0.05,
    marginLeft: windowWidth * 0.05,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'rgba(12, 12, 12, 0.7)',
    borderRadius: 10,
  },
  cityTitle: {
    width: windowWidth * 0.5,
    height: 'auto',
    //marginLeft: 5,
    color: 'white',
    fontSize: 18,
    //textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
    marginLeft: windowWidth * 0.05,
  },
  cityDestination: {
    //width: windowWidth * 0.7,
    height: 'auto',
    //marginLeft: 5,
    color: 'white',
    fontSize: 14,
    //textAlign: 'center',
    marginLeft: windowWidth * 0.01,
  },
  iconLocation: {
    color: 'white',
  },
  txtSignIn: {
    width: windowWidth * 0.7,
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: windowWidth * 0.05,
    top: windowHeight * 0.02,
  },
});
