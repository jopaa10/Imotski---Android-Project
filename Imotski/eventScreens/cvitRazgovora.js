import React from 'react';
import {View, Text} from 'react-native';
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

const CvitRazgovora = ({route}) => {
  //console.log(route.params.id);

  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'City Imotski'}
      title={'Cvit Razgovora'}
      details={`Every year, the Association of Winemakers and Winegrowers of Imotski Vineyards organizes the event "Flower of Conversation" which brings together many Imotski winemakers and a large number of visitors from the Imotski region, Dalmatia and a large number of tourists staying in Dalmatia.

      The intention is to promote the Imotski vineyards through this event, enrich the tourist offer of our region and invite visitors to visit the tasting rooms and wineries that participate in this event.
      
      By purchasing a glass, each visitor exercises the right to taste the wines offered in the wineries participating in the program.`}
    />
  );
};

CvitRazgovora.sharedElements = route => {
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

export default CvitRazgovora;
