import React from 'react';
import {View, Text} from 'react-native';

//template
import ActivitiesInfoTemplate from '../ActivitiesInfoTemplate';

const ZabarskaVecer = ({route}) => {
  return (
    <ActivitiesInfoTemplate
      image={route.params.image}
      id={route.params.id}
      city={'Imotski'}
      sight={'Zmijavci'}
      title={'Žabarska Večer'}
      details={`Unlike many places in the Imotski region where fishing nights have been organized in recent years, the locals of Zmijavec have gone a step further and organize the Frog Night every year. Thus, more than a thousand Zmijavčani and their guests from all over Croatia enjoy frog specialties, and the menu also includes eels and crabs. The heated atmosphere on an already hot night is mostly warmed by various tamburitza players, while draft beer and a nearby canal where the bravest jump in search of frogs that will bring them valuable prizes take care of the cooling. Definitely a successful folk party that is worth participating in.`}
    />
  );
};

ZabarskaVecer.sharedElements = route => {
  //const {item} = route.params;
  //console.log(route.params.id);
  return [
    {
      id: route.params.id,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default ZabarskaVecer;
