import React from 'react';
import {View, Text} from 'react-native';

//template
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

const GlumciUZagvozdu = ({route}) => {
  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'Zagvozd'}
      title={'Glumci u Zagvozdu'}
      details={`Theatrical Encounters in Zagvozd (or Actors in Zagvozd) is a theatrical event that has been held since 1998. This summer theater festival is held every year in July and August in the Zabiokovo town of Zagvozd. Since its inception, this festival has hosted a number of famous cast members and drama actors. The founder, organizer and longtime artistic director of the festival is the actor Vedran Mlikota.`}
    />
  );
};

GlumciUZagvozdu.sharedElements = route => {
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

export default GlumciUZagvozdu;
