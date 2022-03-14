import React from 'react';

import {WeatherTemplate} from '../weatherTemplate/weatherTemp';

export const BlueLakeWeather = () => {
  return (
    <>
      <WeatherTemplate
        city={'Imotski'}
        sight={'Blue Lake'}
        image={require('../images/blueLakeArticle.jpg')}
        weatherLat={43.4506}
        weatherLong={17.21}
        txtColor={'#1F83BB'}
        navigate={'Next Days Forecast'}
      />
    </>
  );
};
