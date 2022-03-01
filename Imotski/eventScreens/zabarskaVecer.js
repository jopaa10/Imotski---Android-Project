import React from 'react';
import {View, Text} from 'react-native';

//template
import {ActivitiesInfoTemplate} from '../ActivitiesInfoTemplate';

export const ZabarskaVecer = () => {
  return (
    <ActivitiesInfoTemplate
      image={require('../images/zabarskaVecerImotski.jpg')}
      city={'Imotski'}
      sight={'Zmijavci'}
      title={'Žabarska Večer'}
      details={`Unlike many places in the Imotski region where fishing nights have been organized in recent years, the locals of Zmijavec have gone a step further and organize the Frog Night every year. Thus, more than a thousand Zmijavčani and their guests from all over Croatia enjoy frog specialties, and the menu also includes eels and crabs. The heated atmosphere on an already hot night is mostly warmed by various tamburitza players, while draft beer and a nearby canal where the bravest jump in search of frogs that will bring them valuable prizes take care of the cooling. Definitely a successful folk party that is worth participating in.`}
    />
  );
};
