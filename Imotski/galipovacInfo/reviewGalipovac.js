import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewGalipovac = () => {
  return (
    <ReviewScreen
      placeCategory={'galipovac'}
      sight={'Galipovac'}
      city={'Dolica Draga'}
      image={require('../images/galipovacView.jpg')}
      navigate={'Explore Ricice'}
      navigateBack={'Explore Ricice'}
    />
  );
};
