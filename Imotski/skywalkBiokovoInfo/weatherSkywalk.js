import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherSkywalk = () => {
  return (
    <>
      <WeatherTemplate
        city={'Biokovo'}
        sight={'Skywalk Biokovo'}
        image={require('../images/skywalkBiokovo.jpg')}
        weatherLat={'43.2854'}
        weatherLong={'17.0848'}
        txtColor={'#1F83BB'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Biokovo'}
      />
    </>
  );
};
