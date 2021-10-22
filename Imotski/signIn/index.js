import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//waves
import Waves from '../wavesTemplate';

//dimension
const windowWidth = Dimensions.get('window').width;

export const SignIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    fetch('http://192.168.1.4:5000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        //console.log(data);
        if (data.error) {
          alert(data.error);
          setEmail('');
          setPassword('');
        } else {
          try {
            await AsyncStorage.setItem('token', data.token);
            navigation.navigate('Profile Page');
            setEmail('');
            setPassword('');
          } catch (e) {
            console.log(e);
          }
        }
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Waves navigate={'User'} />
        <View style={styles.signInScreen}>
          <Text style={styles.txtSignIn}> Sign In</Text>
          <Text style={styles.txtWelcome}>Welcome back</Text>
          <Text style={styles.placeholderEmail}>Email</Text>
          <View style={styles.viewEmailPass}>
            <TextInput
              style={styles.inputEmailPass}
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <Text style={styles.placeholderPassword}>Password</Text>
          <View style={styles.viewEmailPass}>
            <TextInput
              style={styles.inputEmailPass}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.proceed}>
            <Pressable onPress={() => handleSubmit()}>
              <Text style={styles.proceedButton}>Proceed</Text>
            </Pressable>
          </View>
          <View>
            <Text style={styles.txtNewMember}>New member?</Text>
            <Pressable onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.txtSignUp}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  signInScreen: {
    flex: 4,
  },
  txtSignIn: {
    color: '#1F83BB',
    fontSize: 36,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  txtWelcome: {
    color: '#A8A8A8',
    fontSize: 14,
    paddingLeft: 30,
    paddingTop: 10,
  },
  txtNewMember: {
    color: '#A8A8A8',
    fontSize: 12,
    paddingLeft: 30,
    paddingTop: windowWidth * 0.1,
  },
  txtSignUp: {
    color: '#1F83BB',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 30,
    marginBottom: 10,
  },
  viewEmailPass: {
    alignItems: 'center',
  },
  inputEmailPass: {
    backgroundColor: 'white',
    height: 56,
    width: windowWidth * 0.7,
    borderRadius: 20,
    marginTop: windowWidth * 0.1,
    fontWeight: 'bold',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    elevation: 5,
    paddingLeft: windowWidth * 0.05,
    paddingVertical: 1,
  },
  placeholderEmail: {
    textAlignVertical: 'top',
    fontSize: 10,
    paddingLeft: windowWidth * 0.2,
    top: windowWidth * 0.15,
    elevation: 10,
    color: '#A8A8A8',
  },
  placeholderPassword: {
    textAlignVertical: 'top',
    fontSize: 10,
    paddingLeft: windowWidth * 0.2,
    top: windowWidth * 0.15,
    elevation: 10,
    color: '#A8A8A8',
  },
  proceed: {
    alignItems: 'center',
  },
  proceedButton: {
    backgroundColor: '#1F83BB',
    height: 56,
    width: windowWidth * 0.7,
    borderRadius: 20,
    marginTop: windowWidth * 0.15,
    textAlign: 'center',
    fontSize: 26,
    color: 'white',
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});
