import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewBadnjevice = () => {
  return (
    <ReviewScreen
      placeCategory={'badnjevice'}
      sight={'Badnjevice Canjon'}
      city={'Prolozac'}
      image={require('../images/badnjevice.jpg')}
      navigate={'Explore Prolozac'}
    />
  );
};
