import {ThemeProvider} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {CommentTemplate} from '../commentScreenTemplate';

const commentStack = createStackNavigator();

export const CommentNavRedLake = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={RedLakeComment}
      />
    </commentStack.Navigator>
  );
};

export default RedLakeComment = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentTemplate
          waveColor={colors.SECUNDARY_BACKGROUND_COLOR}
          bgCommColor={colors.TEMPLATE_BACKGROUND_COLOR}
          name={'Red Lake'}
          category={'red lake'}
        />
      </ThemeProvider>
    </>
  );
};
