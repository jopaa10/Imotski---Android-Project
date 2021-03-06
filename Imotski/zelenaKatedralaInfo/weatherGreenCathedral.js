import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherGreenCathedral = () => {
  return (
    <>
      <WeatherTemplate
        city={'Prolozac'}
        sight={'Green Cathedral'}
        image={require('../images/zelenaKatedrala.jpg')}
        weatherLat={'43.4539'}
        weatherLong={'17.1743'}
        txtColor={'#a69244'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Prolozac'}
      />
    </>
  );
};
