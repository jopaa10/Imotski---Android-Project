import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherDvaOka = () => {
  return (
    <>
      <WeatherTemplate
        city={'Prolozac'}
        sight={'Dva Oka'}
        image={require('../images/dvaOkaH.jpg')}
        weatherLat={'43.4539'}
        weatherLong={'17.1743'}
        txtColor={'#866926'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Prolozac'}
      />
    </>
  );
};
