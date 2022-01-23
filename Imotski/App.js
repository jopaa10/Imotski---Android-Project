/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import BottomTabsNav from './BottomTabsNav';
import {AppDrawerScreen} from './exploreImotskiTemplate';
import {initialState, reducer} from './reducers/userReducer';

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <NavigationContainer>
          <AppDrawerScreen />
        </NavigationContainer>
      </UserContext.Provider>
    </>
  );
};

export default App;
