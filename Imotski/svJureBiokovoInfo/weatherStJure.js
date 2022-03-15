import React from 'react';

//template
import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const WeatherStJure = () => {
  return (
    <>
      <WeatherTemplate
        city={'Biokovo'}
        sight={'St Jure'}
        image={require('../images/biokovoSvJure.jpg')}
        weatherLat={'43.3423'}
        weatherLong={'17.0539'}
        txtColor={'#7d8572'}
        navigate={'Next Days Forecast'}
        navigateBack={'Explore Biokovo'}
      />
    </>
  );
};
