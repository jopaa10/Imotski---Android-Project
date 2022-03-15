import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewStJure = () => {
  return (
    <ReviewScreen
      placeCategory={'vosac'}
      sight={'Vosac'}
      city={'Biokovo'}
      image={require('../images/biokovoSvJure.jpg')}
      navigate={'Explore Biokovo'}
    />
  );
};
