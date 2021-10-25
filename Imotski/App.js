/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import BottomTabsNav from './BottomTabsNav';
import {AppDrawerScreen} from './Explore Imotski';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AppDrawerScreen />
      </NavigationContainer>
    </>
  );
};

export default App;
