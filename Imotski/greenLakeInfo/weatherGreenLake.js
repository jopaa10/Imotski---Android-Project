import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherGreenLake = () => {
  return (
    <>
      <WeatherTemplate
        city={'Ricice'}
        sight={'Green Lake'}
        image={require('../images/greenLake.jpg')}
        weatherLat={'43.5035'}
        weatherLong={'17.1256'}
        txtColor={'#CA9A8C'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Ricice'}
      />
    </>
  );
};
