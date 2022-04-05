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

export const CommentGalipovacNav = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={GalipovacComment}
      />
    </commentStack.Navigator>
  );
};

export const GalipovacComment = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentTemplate
          waveColor={colors.SECUNDARY_BACKGROUND_COLOR}
          bgCommColor={colors.GALIPOVAC_BACKGROUND_COLOR}
          name={'Galipovac'}
          category={'galipovac'}
        />
      </ThemeProvider>
    </>
  );
};
