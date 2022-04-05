import React, {useEffect, useState} from 'react';

//comment navigation
import {createStackNavigator} from '@react-navigation/stack';

import {CommentTemplate} from '../commentScreenTemplate';
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@react-navigation/native';
import {useTheme} from 'styled-components';

const commentStack = createStackNavigator();

export const CommentNavFortressTopana = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={FortressTopanaComment}
      />
    </commentStack.Navigator>
  );
};

export const FortressTopanaComment = () => {
  /*  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);
 */

  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentTemplate
          waveColor={colors.SECUNDARY_BACKGROUND_COLOR}
          bgCommColor={colors.TOPANA_BACKGROUND_COLOR}
          name={'Fortress Topana'}
          category={'fortress topana'}
        />
      </ThemeProvider>
    </>
  );
};
