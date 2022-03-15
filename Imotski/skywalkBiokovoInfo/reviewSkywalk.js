import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewSkywalk = () => {
  return (
    <ReviewScreen
      placeCategory={'skywalk'}
      sight={'Skywalk Biokovo'}
      city={'Biokovo'}
      image={require('../images/skywalkBiokovo.jpg')}
      navigate={'Explore Biokovo'}
    />
  );
};
