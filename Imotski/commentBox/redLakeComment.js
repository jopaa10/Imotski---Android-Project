import {ThemeProvider} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentTemplate
          diffColorForPlace={theme.TEMPLATE_BACKGROUND_COLOR}
          diffColorForPlace2={'#CA9A8C'}
          category={'red lake'}
        />
      </ThemeProvider>
    </>
  );
};
