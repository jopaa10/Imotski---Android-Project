import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

//waves
import Waves from '../wavesTemplate';
/* 
//dimension
const windowWidth = Dimensions.get('window').width; */

//svg
import Svg, {G, Path} from 'react-native-svg';

//navigation
import styled, {ThemeProvider, useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

//dimensions
import {windowWidth, windowHeight} from '../constants/global';
import {UserContext} from '../App';

export const SignUp = props => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [daysOfStaying, setDaysOfStaying] = useState(null);
  const [placeOfResidence, setPlaceOfResidence] = useState('');
  const [error, setError] = useState('');
  const [borderErrorColor, setBorderErrorColor] = useState('white');

  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  const handleSubmit = async () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      alert('Invalid email address.');
    } else {
      fetch('http://192.168.1.4:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password,
          daysOfStaying: daysOfStaying,
          placeOfResidence: placeOfResidence,
        }),
      })
        .then(res => res.json())
        .then(async data => {
          //console.log(data);

          if (data.error) {
            setError(data.error);
            setBorderErrorColor('red');
          } else {
            try {
              await AsyncStorage.setItem('token', data.token);
              //await AsyncStorage.setItem('user', JSON.stringify(data));
              navigation.navigate('Profile Page');
            } catch (e) {
              console.log(e);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
          ]}>
          <ScrollView style={{height: windowHeight}}>
            {/* <Waves navigate={'User'} /> */}
            <View
              style={{
                height: windowHeight * 0.35,
                backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
              }}>
              <TouchableOpacity
                style={styles.arrowLeftIcon}
                onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                  color="white"
                  icon={faArrowLeft}
                  size={20}
                  style={{display: props.display}}
                />
              </TouchableOpacity>
              <Text style={styles.txtSignUp}> Sign Up</Text>
            </View>
            <Svg
              style={styles.waves}
              width="375"
              height={windowHeight * 0.21}
              viewBox={`0 0 375 ${windowHeight * 0.21}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <G filter="url(#filter0_i_718_2)">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
                  fill={colors.SECUNDARY_BACKGROUND_COLOR}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
                />
              </G>
            </Svg>
            <View style={styles.signUpScreen}>
              <Text style={styles.txtWelcome}>
                Fill in your information in order to use all features
              </Text>
              <Text style={styles.placeholder}>Name</Text>
              <View style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  keyboardType="ascii-capable"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
              <Text style={styles.placeholder}>Surname</Text>
              <View style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  keyboardType="ascii-capable"
                  value={surname}
                  onChangeText={text => setSurname(text)}
                />
              </View>
              <Text style={styles.placeholder}>Email</Text>
              <View style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <Text style={styles.placeholder}>Password</Text>
              <View style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </View>
              <Text
                style={[
                  styles.placeholder2in1Field,
                  {top: windowWidth * 0.13},
                ]}>
                Days of staying
              </Text>
              <Text
                style={[
                  styles.placeholder2in1Field,
                  {marginLeft: windowWidth * 0.57},
                ]}>
                Place of residence
              </Text>
              <View style={styles.view2in1Field}>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      width: windowWidth * 0.3,
                      marginTop: windowWidth * 0.05,
                      borderColor: borderErrorColor,
                    },
                  ]}
                  keyboardType="number-pad"
                  value={daysOfStaying}
                  onChangeText={text => setDaysOfStaying(text)}
                />
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      width: windowWidth * 0.3,
                      marginTop: windowWidth * 0.05,
                      borderColor: borderErrorColor,
                    },
                  ]}
                  keyboardType="default"
                  value={placeOfResidence}
                  onChangeText={text => setPlaceOfResidence(text)}
                />
              </View>
              <View>
                <Text style={styles.error}>{error}</Text>
              </View>
              <View style={styles.proceed}>
                <Pressable onPress={() => handleSubmit()}>
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
        </SafeAreaView>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  signUpScreen: {
    //flex: 4,
    height: windowHeight,
    //paddingBottom: windowWidth * 0.15,
    bottom: windowHeight * 0.25,
  },
  txtSignUp: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: windowHeight * 0.03,
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
  view2in1Field: {
    marginHorizontal: windowWidth * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputField: {
    backgroundColor: 'white',
    color: 'black',
    height: 56,
    width: windowWidth * 0.7,
    borderWidth: 1,
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
    marginLeft: windowWidth * 0.2,
    top: windowWidth * 0.15,
    elevation: 10,
    color: '#A8A8A8',
  },
  placeholder2in1Field: {
    textAlignVertical: 'top',
    fontSize: 10,
    marginLeft: windowWidth * 0.2,
    top: windowWidth * 0.1,
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
    marginTop: windowWidth * 0.1,
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: windowWidth * 0.05,
  },
  waves: {
    bottom: windowHeight * 0.2,
  },
  arrowLeftIcon: {
    marginTop: windowWidth * 0.15,
    marginHorizontal: windowWidth * 0.05,
  },
});
