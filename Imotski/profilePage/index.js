import React from 'react';
import {View, Text, Pressable} from 'react-native';

//navigation
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

//stack navigation
import {createStackNavigator} from '@react-navigation/stack';
import {SignInNav, UserFirstPage} from '../userPage';
import {SignIn} from '../signIn';
import {SignUp} from '../signUp';

const ProfileStackNav = createStackNavigator();

export const ProfilePageNav = () => {
  return (
    <ProfileStackNav.Navigator>
      <ProfileStackNav.Screen
        name="User"
        component={SignInNav}
        options={{headerShown: false}}
      />
    </ProfileStackNav.Navigator>
  );
};

export const ProfilePage = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.navigate('User');
    });
  };

  return (
    <View>
      <Text>Profile Page</Text>
      <Pressable onPress={handleLogOut}>
        <Text>LogOut</Text>
      </Pressable>
    </View>
  );
};
