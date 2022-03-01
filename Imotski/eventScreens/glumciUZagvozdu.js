import React from 'react';
import {View, Text} from 'react-native';

//template
import {ActivitiesInfoTemplate} from '../ActivitiesInfoTemplate';

export const GlumciUZagvozdu = () => {
  return (
    <ActivitiesInfoTemplate
      image={require('../images/glumciUZagvozdu.jpg')}
      city={'Imotski'}
      sight={'Zagvozd'}
      title={'Glumci u Zagvozdu'}
      details={`Theatrical Encounters in Zagvozd (or Actors in Zagvozd) is a theatrical event that has been held since 1998. This summer theater festival is held every year in July and August in the Zabiokovo town of Zagvozd. Since its inception, this festival has hosted a number of famous cast members and drama actors. The founder, organizer and longtime artistic director of the festival is the actor Vedran Mlikota.`}
    />
  );
};
