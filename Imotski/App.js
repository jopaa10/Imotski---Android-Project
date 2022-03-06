/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {DarkTheme, NavigationContainer} from '@react-navigation/native';

import styled, {ThemeProvider} from 'styled-components';
import BottomTabsNav from './BottomTabsNav';
import {AppDrawerScreen} from './exploreImotskiTemplate';
import {initialState, reducer} from './reducers/userReducer';

import {Provider, useSelector} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './reducers/themeReducer';
import {darkTheme} from './DarkMode/Theme';

const store = createStore(
  combineReducers({themeReducer}),
  applyMiddleware(thunk),
);

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider value={{state, dispatch}}>
          <NavigationContainer>
            <AppDrawerScreen />
          </NavigationContainer>
        </UserContext.Provider>
      </Provider>
    </>
  );
};

export default App;
