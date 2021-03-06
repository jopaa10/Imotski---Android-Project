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
import {useTheme} from 'styled-components';

const commentStack = createStackNavigator();

export const CommentDvaOkaNav = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={DvaOkaComment}
      />
    </commentStack.Navigator>
  );
};

export const DvaOkaComment = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentTemplate
          waveColor={colors.SECUNDARY_BACKGROUND_COLOR}
          bgCommColor={colors.DVA_OKA_BACKGROUND_COLOR}
          name={'Dva Oka'}
          category={'dva oka'}
        />
      </ThemeProvider>
    </>
  );
};
