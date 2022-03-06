import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ProgressBarAndroidComponent,
} from 'react-native';

//comment navigation
import {createStackNavigator} from '@react-navigation/stack';

import {CommentTemplate} from '../commentScreenTemplate';
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@react-navigation/native';

const commentStack = createStackNavigator();

export const CommentNavBlueLake = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={BlueLakeComment}
      />
    </commentStack.Navigator>
  );
};

export const BlueLakeComment = () => {
  /*  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);
 */

  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentTemplate
          diffColorForPlace={theme.PRIMARY_BACKGROUND_COLOR}
          diffColorForPlace2={'#1F83BB'}
          category={'blue lake'}
        />
      </ThemeProvider>
    </>
  );
};
