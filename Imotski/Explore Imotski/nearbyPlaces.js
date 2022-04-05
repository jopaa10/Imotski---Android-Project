/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

//navigation
import {useNavigation} from '@react-navigation/core';

import {UserContext} from '../App';

//dimensions
import {windowHeight, windowWidth} from '../constants/global';
import {TouchableOpacity} from 'react-native-gesture-handler';

//navigation
import {createStackNavigator} from '@react-navigation/stack';

//first page of app
import ExploreImotski from './index';
import {
  BakeryDetailsNavigation,
  CoffeeDetailsNavigation,
  RestaurantDetailsNavigation,
  ShoppingMallDetailsNavigation,
  WinearyDetailsNavigation,
} from '../nearbyPlaces/nearbyPlacesByImages';

const NearybPlacesStack = createStackNavigator();

export const NearbyPlacesNavigator = () => (
  <NearybPlacesStack.Navigator>
    <NearybPlacesStack.Screen
      name="Explore Imotski"
      component={ExploreImotski}
      options={{headerShown: false}}
    />
    <NearybPlacesStack.Screen
      name="Coffee"
      component={CoffeeDetailsNavigation}
      options={{headerShown: false}}
    />
    <NearybPlacesStack.Screen
      name="Restaurants"
      component={RestaurantDetailsNavigation}
      options={{headerShown: false}}
    />
    <NearybPlacesStack.Screen
      name="Winearies"
      component={WinearyDetailsNavigation}
      options={{headerShown: false}}
    />
    <NearybPlacesStack.Screen
      name="Shopping Mall"
      component={ShoppingMallDetailsNavigation}
      options={{headerShown: false}}
    />
    <NearybPlacesStack.Screen
      name="Bakeries"
      component={BakeryDetailsNavigation}
      options={{headerShown: false}}
    />
  </NearybPlacesStack.Navigator>
);

export const NearbyPlaces = () => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(UserContext);
  /* const [colorChangeRestaurant, setColorChangeRestaurant] = useState('white');
  const [colorChangeWineanry, setColorChangeWineary] = useState('white'); */

  /*  const changeColor = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    console.log(scrollPosition);

    if (scrollPosition > 50 && scrollPosition < 250) {
      setColorChangeRestaurant('#1F83BB');

      if (scrollPosition > 150) {
        setColorChangeWineary('#1F83BB');
      } else {
        setColorChangeWineary('white');
      }
    } else {
      setColorChangeRestaurant('white');
    }
  };
 */
  return (
    <>
      <ScrollView horizontal={true} style={styles.horizontalView}>
        <View style={styles.containerNearbyPlaces}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Explore Imotski')}>
            <Text style={styles.txtPlaces}>{`Places`}</Text>
          </TouchableOpacity>
          {state && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Coffee')}>
                <Text style={styles.txtPlaces}>{`Coffee`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Restaurants')}>
                <Text style={styles.txtPlaces}>{`Restaurants`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Winearies')}>
                <Text style={styles.txtPlaces}>{`Winearies`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Shopping Mall')}>
                <Text style={[styles.txtPlaces, {color: 'white'}]}>
                  {`Shopping Mall`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Bakeries')}>
                <Text style={[styles.txtPlaces, {color: 'white'}]}>
                  {`Bakery`}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  horizontalView: {
    bottom: windowWidth * 0.33,
  },
  txtPlaces: {
    color: '#fff',
    marginHorizontal: windowWidth * 0.05,
    fontSize: 16,
    /*  borderColor: 'red',
    borderWidth: 1, */
  },
  containerNearbyPlaces: {
    flexDirection: 'row',
  },
});
