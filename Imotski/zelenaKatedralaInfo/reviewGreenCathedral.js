import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewGreenCathedral = () => {
  return (
    <ReviewScreen
      placeCategory={'green cathedral'}
      sight={'Green Cathedral'}
      city={'Prolozac'}
      image={require('../images/zelenaKatedrala.jpg')}
      navigate={'Explore Prolozac'}
    />
  );
};
