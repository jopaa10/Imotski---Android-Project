import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherVosac = () => {
  return (
    <>
      <WeatherTemplate
        city={'Biokovo'}
        sight={'Vosac'}
        image={require('../images/biokovoVosac.jpg')}
        weatherLat={'43.3107'}
        weatherLong={'17.0466'}
        txtColor={'#CA9A8C'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Biokovo'}
      />
    </>
  );
};
