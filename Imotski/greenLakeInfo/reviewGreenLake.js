import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewGreenLake = () => {
  return (
    <ReviewScreen
      placeCategory={'green lake'}
      sight={'Green Lake'}
      city={'Ricice'}
      image={require('../images/greenLake.jpg')}
      navigate={'Explore Ricice'}
    />
  );
};
