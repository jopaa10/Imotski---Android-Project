/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useState, useEffect, useReducer} from 'react';

import {DarkTheme, NavigationContainer} from '@react-navigation/native';

import styled, {ThemeProvider} from 'styled-components';
import BottomTabsNav from './BottomTabsNav';
import {AppDrawerScreen} from './exploreImotskiTemplate';
import {initialState, reducer} from './reducers/userReducer';

import {Provider, useSelector} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './reducers/themeReducer';
import {darkTheme, lightTheme} from './DarkMode/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from 'react-native-splash-screen';
import {windowHeight, windowWidth} from './constants/global';

const store = createStore(
  combineReducers({themeReducer}),
  applyMiddleware(thunk),
);

export const UserContext = createContext();

const AppWrapper = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const [themeMode, setThemeMode] = useState('');

  //console.log(theme.mode);

  useEffect(async () => {
    const themeMode = await AsyncStorage.getItem('theme');
    setThemeMode(themeMode);
  }, []);

  setInterval(async () => {
    const themeMode = await AsyncStorage.getItem('theme');
    setThemeMode(themeMode);
  }, 1000);

  //console.log(themeTempl);

  return (
    <>
      {themeMode === 'light' ? (
        <ThemeProvider theme={lightTheme}>
          <NavigationContainer theme={lightTheme}>
            <AppDrawerScreen />
          </NavigationContainer>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <NavigationContainer theme={darkTheme}>
            <AppDrawerScreen />
          </NavigationContainer>
        </ThemeProvider>
      )}
    </>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*  if (state) {
    return (
      <View style={{width: windowWidth, height: windowHeight, flex: 1}}>
        <Image
          source={require('../Imotski/images/exploreEmothaLogo.png')}
          style={{width: windowWidth, height: windowHeight}}
        />
      </View>
    );
  } */

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider value={{state, dispatch}}>
          <AppWrapper />
        </UserContext.Provider>
      </Provider>
    </>
  );
};

export default App;
