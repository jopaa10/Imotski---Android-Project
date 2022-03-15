import React from 'react';

//review template screen
import {ReviewScreen} from '../reviewScreen';

export const ReviewDvaOka = () => {
  return (
    <ReviewScreen
      placeCategory={'dva oka'}
      sight={'Dva Oka'}
      city={'Prolozac'}
      image={require('../images/dvaOkaH.jpg')}
      navigate={'Explore Prolozac'}
    />
  );
};
