/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useState, useEffect, useReducer} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View, Modal, StyleSheet, Text} from 'react-native';

import styled, {ThemeProvider} from 'styled-components';
import {AppDrawerScreen} from './exploreImotskiTemplate';
import {initialState, reducer} from './reducers/userReducer';

import {Provider, useSelector} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './reducers/themeReducer';
import {darkTheme, lightTheme} from './DarkMode/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';
import {windowHeight, windowWidth} from './constants/global';

const store = createStore(
  combineReducers({themeReducer}),
  applyMiddleware(thunk),
);

export const UserContext = createContext();

const AppWrapper = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const [themeMode, setThemeMode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  //console.log(theme.mode);

  useEffect(async () => {
    const themeMode = await AsyncStorage.getItem('theme');
    setThemeMode(themeMode);
    setIsLoading(false);
    SplashScreen.hide();
  }, []);

  setInterval(async () => {
    const themeMode = await AsyncStorage.getItem('theme');
    setThemeMode(themeMode);
  }, 1000);

  if (isLoading) {
    return (
      <View style={styles.centeredView}>
        <Modal visible={isLoading} transparent={true} statusBarTranslucent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <ActivityIndicator size={'large'} color={'#1F83BB'} />
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Loading...
              </Text> */}
              <LottieView
                source={require('./assets/97313-processing.json')}
                autoPlay
                style={{height: windowHeight * 0.1}}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <>
      {themeMode === 'light' && isLoading === false ? (
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //marginTop: 22,
    //backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    marginBottom: windowWidth * 0.1,
    width: windowWidth * 0.4,
    height: windowHeight * 0.15,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: windowHeight * 0.05,
    alignItems: 'center',
  },
});

export default App;
