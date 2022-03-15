import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherGalipovac = () => {
  return (
    <>
      <WeatherTemplate
        city={'Dolica Draga'}
        sight={'Galipovac'}
        image={require('../images/galipovacView.jpg')}
        weatherLat={'43.4779796'}
        weatherLong={'17.1159147'}
        txtColor={'#CA9A8C'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Ricice'}
      />
    </>
  );
};
