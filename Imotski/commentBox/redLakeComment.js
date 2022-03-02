import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
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
  return (
    <CommentTemplate
      diffColorForPlace={'#CA9A8C'}
      diffColorForPlace2={'#CA9A8C'}
      category={'red lake'}
    />
  );
};
