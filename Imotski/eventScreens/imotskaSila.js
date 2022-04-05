import React from 'react';
import {View, Text} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

//template
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

const ImotskaSila = ({route}) => {
  //console.log(route.params.id);

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'City Imotski'}
      color={'black'}
      title={'Imotska Sila'}
      details={`The traditional summer cultural event that begins every year on July 4 on the birthday of the great Imotski poet Tin Ujevic. The organizer is the Imotski Public Open University.
      cultural event that begins every year on July 4 on the birthday of the great Imotski poet Tin Ujevic. The organizer is the Imotski Public Open University.
      cultural event that begins every year on July 4 on the birthday of the great Imotski poet Tin Ujevic. The organizer is the Imotski Public Open University.`}
    />
  );
};

ImotskaSila.sharedElements = route => {
  //const {item} = route.params;
  //console.log(route.params.id);
  return [
    {
      id: route.params.id,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default ImotskaSila;
