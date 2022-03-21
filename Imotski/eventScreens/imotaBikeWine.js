import React from 'react';
import {View, Text} from 'react-native';

//template
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

const ImotaBikeAndWine = ({route}) => {
  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'Imotski and region'}
      title={'Imota Bike And Wine'}
      details={`Imota Bike & Wine đir 3.0, is a famous Imotski bike race during which you can taste the products of local winemakers, and is organized by the Tourist Board of Imota, the Association of Winemakers and Winegrowers of Imotski vineyards ‘Flower of Conversation’ and ‘BIKE IM’ Team. The recommended age limit for minors is 14 years, and all cycling participants under the age of 14 can participate in the cycling race only accompanied by a parent or guardian. For all participants in the cycling race under the age of 16, it is mandatory to wear a protective helmet, without which participation will not be allowed.`}
    />
  );
};

ImotaBikeAndWine.sharedElements = route => {
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

export default ImotaBikeAndWine;
