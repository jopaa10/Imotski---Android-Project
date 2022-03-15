import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewVosac = () => {
  return (
    <ReviewScreen
      placeCategory={'vosac'}
      sight={'Vosac'}
      city={'Biokovo'}
      image={require('../images/biokovoVosac.jpg')}
      navigate={'Explore Biokovo'}
    />
  );
};
