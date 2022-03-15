import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherBadnjevice = () => {
  return (
    <>
      <WeatherTemplate
        city={'Prolozac'}
        sight={'Badnjevice Canjon'}
        image={require('../images/badnjevice.jpg')}
        weatherLat={'43.4564873'}
        weatherLong={'17.1749875'}
        txtColor={'#adbab3'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Prolozac'}
      />
    </>
  );
};
