import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';

//waves
import Waves from '../wavesTemplate';

//dimension
const windowWidth = Dimensions.get('window').width;

//navigation
import {useNavigation} from '@react-navigation/native';

export const SignUp = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView style={styles.container}>
        <Waves navigate={'User'} />
        <View style={styles.signUpScreen}>
          <Text style={styles.txtSignUp}> Sign Up</Text>
          <Text style={styles.txtWelcome}>
            Fill in your information in order to use all features
          </Text>
          <Text style={styles.placeholder}>Name</Text>
          <View style={styles.viewField}>
            <TextInput style={styles.inputField} keyboardType="ascii-capable" />
          </View>
          <Text style={styles.placeholder}>Surname</Text>
          <View style={styles.viewField}>
            <TextInput style={styles.inputField} keyboardType="ascii-capable" />
          </View>
          <Text style={styles.placeholder}>Email</Text>
          <View style={styles.viewField}>
            <TextInput style={styles.inputField} keyboardType="email-address" />
          </View>
          <Text style={styles.placeholder}>Password</Text>
          <View style={styles.viewField}>
            <TextInput style={styles.inputField} secureTextEntry={true} />
          </View>
          <View style={styles.proceed}>
            <Pressable>
              <Text style={styles.proceedButton}>Proceed</Text>
            </Pressable>
          </View>
          <View>
            <Text style={styles.txtAlreadyMember}>Already a member?</Text>
            <Pressable onPress={() => navigation.navigate('Sign In')}>
              <Text style={styles.txtSignIn}>Sign In</Text>
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
  signUpScreen: {
    flex: 4,
  },
  txtSignUp: {
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
  txtAlreadyMember: {
    color: '#A8A8A8',
    fontSize: 12,
    paddingLeft: 30,
    paddingTop: windowWidth * 0.1,
  },
  txtSignIn: {
    color: '#1F83BB',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 30,
    marginBottom: 10,
  },
  viewField: {
    alignItems: 'center',
  },
  inputField: {
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
  placeholder: {
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
    marginTop: windowWidth * 0.2,
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
