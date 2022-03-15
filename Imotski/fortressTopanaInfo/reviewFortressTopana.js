import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewFortressTopana = () => {
  return (
    <ReviewScreen
      placeCategory={'fortress topana'}
      sight={'Fortress Topana'}
      city={'Imotski'}
      image={require('../images/topanaFortressH.jpg')}
      navigate={'Explore Imotski'}
    />
  );
};
