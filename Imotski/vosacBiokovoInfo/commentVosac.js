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

export const CommentNavVosac = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={VosacComment}
      />
    </commentStack.Navigator>
  );
};

export const VosacComment = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentTemplate
          waveColor={colors.SECUNDARY_BACKGROUND_COLOR}
          bgCommColor={colors.TEMPLATE_BACKGROUND_COLOR}
          name={'Vosac'}
          category={'vosac'}
        />
      </ThemeProvider>
    </>
  );
};
