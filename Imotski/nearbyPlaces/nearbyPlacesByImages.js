import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import React from 'react';

//dimension
import {windowHeight, windowWidth} from '../constants/global';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt, faStar} from '@fortawesome/free-solid-svg-icons';

import {TouchableOpacity} from 'react-native-gesture-handler';

//navigation
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {placeDetails} from '../nearbyPlacesDetails/placeDetails';

//nearby places
import {Coffee} from './coffee';
import {Restaurants} from './restaurants';
import {Bakeries} from './bakery';
import {ShoppingMall} from './shoppingMall';
import {Winearies} from './winearies';

//google key
import {GOOGLE_KEY} from '@env';

const placesStackNav = createStackNavigator();

export const CoffeeDetailsNavigation = () => (
  <placesStackNav.Navigator>
    <placesStackNav.Screen
      name="Coffee"
      component={Coffee}
      options={{headerShown: false}}
    />
    <placesStackNav.Screen
      name="Details"
      component={placeDetails}
      options={{headerShown: false}}
    />
  </placesStackNav.Navigator>
);

export const RestaurantDetailsNavigation = () => (
  <placesStackNav.Navigator>
    <placesStackNav.Screen
      name="Restaurants"
      component={Restaurants}
      options={{headerShown: false}}
    />
    <placesStackNav.Screen
      name="Details"
      component={placeDetails}
      options={{headerShown: false}}
    />
  </placesStackNav.Navigator>
);

export const WinearyDetailsNavigation = () => (
  <placesStackNav.Navigator>
    <placesStackNav.Screen
      name="Winearies"
      component={Winearies}
      options={{headerShown: false}}
    />
    <placesStackNav.Screen
      name="Details"
      component={placeDetails}
      options={{headerShown: false}}
    />
  </placesStackNav.Navigator>
);

export const ShoppingMallDetailsNavigation = () => (
  <placesStackNav.Navigator>
    <placesStackNav.Screen
      name="Shopping Mall"
      component={ShoppingMall}
      options={{headerShown: false}}
    />
    <placesStackNav.Screen
      name="Details"
      component={placeDetails}
      options={{headerShown: false}}
    />
  </placesStackNav.Navigator>
);

export const BakeryDetailsNavigation = () => (
  <placesStackNav.Navigator>
    <placesStackNav.Screen
      name="Bakeries"
      component={Bakeries}
      options={{headerShown: false}}
    />
    <placesStackNav.Screen
      name="Details"
      component={placeDetails}
      options={{headerShown: false}}
    />
  </placesStackNav.Navigator>
);

const NearbyPlacesByImages = ({imageData, userCurrentCoord}) => {
  console.log(userCurrentCoord);
  return (
    <View style={{flexDirection: 'row'}}>
      {imageData && imageData.length > 0 ? (
        imageData.map(
          (imageData, idx) =>
            idx !== 0 &&
            imageData.photos != undefined && (
              <NearbyPlacesByImagesItem
                data={imageData}
                currentCoord={userCurrentCoord}
              />
            ),
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const NearbyPlacesByImagesItem = ({data, currentCoord}) => {
  const navigation = useNavigation();
  //console.log(currentCoord);
  console.log(data.rating);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
          rating: data.rating,
          userCoord: currentCoord,
        })
      }>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
              data.photos[0].photo_reference +
              `&sensor=false&key=${GOOGLE_KEY}`,
          }}
        />
        <View
          style={{
            //zIndex: 1,
            flexDirection: 'row',
            height: 'auto',
            /* borderColor: 'red',
            borderWidth: 1, */
            width: 'auto',
            position: 'absolute',
            right: windowHeight * 0.02,
            top: windowHeight * 0.01,
            backgroundColor: 'rgba(12, 12, 12, 0.8)',
            borderRadius: 10,
            padding: 5,
          }}>
          <FontAwesomeIcon icon={faStar} color={'yellow'} />
          <Text style={{color: 'white', marginLeft: windowWidth * 0.01}}>
            {data.rating}
          </Text>
        </View>
        <View style={styles.cityContainer}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={styles.iconLocation}
            size={12}
          />
          <Text style={styles.cityTitle}>{data.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyPlacesByImages;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: windowWidth * 0.5,
    //marginTop: StatusBar.currentHeight || 0,
    marginTop: windowWidth * 0.01,
    height: 'auto',
    aspectRatio: 750 / 900,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    //overflow: 'hidden',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cityContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowHeight * 0.03,
    left: 20,
    width: windowWidth * 0.35,
    height: 'auto',
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(12, 12, 12, 0.85)',
  },
  cityTitle: {
    width: 70,
    height: 'auto',
    //marginLeft: 5,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  iconLocation: {
    color: 'white',
    position: 'absolute',
    left: 7,
  },
});
