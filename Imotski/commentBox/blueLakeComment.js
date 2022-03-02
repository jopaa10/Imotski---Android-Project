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

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCheckCircle,
  faCircle,
  faCircleNotch,
  faCross,
  faExclamationCircle,
  faExclamationTriangle,
  faSpinner,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

//Dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//comment navigation
import {createStackNavigator} from '@react-navigation/stack';

//bottom sheet modal
import {useNavigation} from '@react-navigation/core';

//waves
import Waves from '../wavesTemplate';
import {ScrollView} from 'react-native-gesture-handler';

//async storage to get token
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommentTemplate} from '../commentScreenTemplate';

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
  return (
    <CommentTemplate
      diffColorForPlace={'#1F83BB'}
      diffColorForPlace2={'#1F83BB'}
      category={'blue lake'}
    />
  );
};
