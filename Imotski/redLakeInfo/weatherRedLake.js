import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherRedLake = () => {
  return (
    <>
      <WeatherTemplate
        city={'Imotski'}
        sight={'Red Lake'}
        image={require('../images/redLakeH.jpg')}
        weatherLat={'43.4550'}
        weatherLong={'17.1982'}
        txtColor={'#CA9A8C'}
        navigate={'Next Days Forecast'}
      />
    </>
  );
};
