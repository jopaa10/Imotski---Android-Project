import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';
import {NextDaysForecastTopana} from './nextDaysForecastTopana';

//stack navigation
const WeatherStack = createStackNavigator();

//next 7 days forecast for Blue Lake
export const FortressTopanaWeatherNav = () => (
  <WeatherStack.Navigator>
    <WeatherStack.Screen
      name="Weather Data"
      component={FortressTopanaWeather}
      options={{headerShown: false}}
    />

    <WeatherStack.Screen
      name="Next Days Forecast"
      component={NextDaysForecastTopana}
      options={{headerShown: false}}
    />
  </WeatherStack.Navigator>
);

export const FortressTopanaWeather = () => {
  return (
    <WeatherTemplate
      city={'Imotski'}
      sight={'Fortress Topana'}
      image={require('../images/topanaFortressH.jpg')}
      weatherLat={43.4498}
      weatherLong={17.2139}
      txtColor={'#7d8572'}
      navigate={'Next Days Forecast'}
    />
  );
};
