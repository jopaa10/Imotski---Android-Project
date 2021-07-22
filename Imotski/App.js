/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import BottomTabsNav from './BottomTabsNav';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <BottomTabsNav />
      </NavigationContainer>
    </>
  );
};

export default App;
