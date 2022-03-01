import React from 'react';
import {View, Text} from 'react-native';

//template
import {ActivitiesInfoTemplate} from '../ActivitiesInfoTemplate';

export const ImotskaSila = () => {
  return (
    <ActivitiesInfoTemplate
      image={require('../images/imotskaSila.jpg')}
      city={'Imotski'}
      sight={'City Imotski'}
      title={'Imotska Sila'}
      details={`The traditional summer cultural event that begins every year on July 4 on the birthday of the great Imotski poet Tin Ujevic. The organizer is the Imotski Public Open University.`}
    />
  );
};
