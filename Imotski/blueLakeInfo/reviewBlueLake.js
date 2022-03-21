import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewBlueLake = () => {
  return (
    <ReviewScreen
      placeCategory={'blue lake'}
      sight={'Blue Lake'}
      city={'Imotski'}
      image={require('../images/blueLakeArticle.jpg')}
      navigate={'Explore Imotski'}
    />
  );
};
