import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewRedLake = () => {
  return (
    <ReviewScreen
      placeCategory={'red lake'}
      sight={'Red Lake'}
      city={'Imotski'}
      image={require('../images/redLakeH.jpg')}
      navigate={'Explore Imotski'}
    />
  );
};
