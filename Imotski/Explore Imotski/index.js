/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {TemplateExploreImotski} from '../exploreImotskiTemplate';
import Activities from './activities';
import ListOfSights from './listOfSights';
import BottomTabsNav from '../BottomTabsNav';

/* //drawer navigator
const AppDrawer = createDrawerNavigator();

//drawer content
import {DrawerContent} from '../drawerNav';

//drawer navigator
import {createDrawerNavigator} from '@react-navigation/drawer';

//drawer actions
import {DrawerActions} from '@react-navigation/native'; */

/* export const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator
      drawerStyle={{
        width: windowWidth * 0.7,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <AppDrawer.Screen name="Imotski" component={BottomTabsNav} />
    </AppDrawer.Navigator>
  );
}; */

const ExploreImotski = () => {
  return (
    <TemplateExploreImotski
      listOfSights={<ListOfSights />}
      activity={<Activities />}
    />
  );
};

export default ExploreImotski;
