import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';

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
import {useSelector} from 'react-redux';

//dimensions
import {windowWidth, windowHeight} from '../constants/global';

//animations
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
//import {TouchableOpacity} from 'react-native-gesture-handler';

const HEADER_HEIGHT = 350;

export const SignUp = props => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [daysOfStaying, setDaysOfStaying] = useState(null);
  const [placeOfResidence, setPlaceOfResidence] = useState('');
  const [error, setError] = useState(null);
  const [borderErrorColor, setBorderErrorColor] = useState('white');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  const handleSubmit = async () => {
    setIsLoading(true);
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      //alert('Invalid email address.');
      setError('Invalid email adress');
      setIsError(true);
      setIsLoading(false);
    } else {
      fetch('http://192.168.1.2:5000/signup', {
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
            console.log(data.error);
            setError(data.error);
            //setBorderErrorColor('red');
            setIsLoading(false);
            setIsError(true);
          } else {
            try {
              await AsyncStorage.setItem('token', data.token);
              //await AsyncStorage.setItem('user', JSON.stringify(data));
              navigation.navigate('Profile Page');
              setIsLoading(false);
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

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
          ]}>
          <Animated.ScrollView
            style={{height: windowHeight}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: true},
            )}>
            {/* <Waves navigate={'User'} /> */}
            <View
              style={{
                height: windowHeight * 0.32,
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
              <Animatable.Text
                animation={'fadeInLeft'}
                delay={497}
                style={styles.txtSignUp}>
                {' '}
                Sign Up
              </Animatable.Text>
            </View>
            <Animated.View style={styles.wavesView(offset)}>
              <Svg
                style={styles.waves}
                width={windowWidth}
                height={windowHeight * 0.24}
                viewBox={`0 0 ${windowWidth} ${windowHeight * 0.24}`}
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
            </Animated.View>
            <View style={styles.signUpScreen}>
              <Animatable.Text
                animation={'fadeInLeft'}
                delay={500}
                style={styles.txtWelcome}>
                Fill in your information in order to use all features
              </Animatable.Text>
              <Animatable.Text
                animation={'fadeInRight'}
                delay={500}
                style={styles.placeholder}>
                Name
              </Animatable.Text>
              <Animatable.View
                animation={'fadeInRight'}
                delay={500}
                style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  keyboardType="ascii-capable"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </Animatable.View>
              <Animatable.Text
                animation={'fadeInLeft'}
                delay={503}
                style={styles.placeholder}>
                Surname
              </Animatable.Text>
              <Animatable.View
                animation={'fadeInLeft'}
                delay={503}
                style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  keyboardType="ascii-capable"
                  value={surname}
                  onChangeText={text => setSurname(text)}
                />
              </Animatable.View>
              <Animatable.Text
                animation={'fadeInRight'}
                delay={506}
                style={styles.placeholder}>
                Email
              </Animatable.Text>
              <Animatable.View
                animation={'fadeInRight'}
                delay={506}
                style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </Animatable.View>
              <Animatable.Text
                animation={'fadeInLeft'}
                delay={509}
                style={styles.placeholder}>
                Password
              </Animatable.Text>
              <Animatable.View
                animation={'fadeInLeft'}
                delay={509}
                style={styles.viewField}>
                <TextInput
                  style={[styles.inputField, {borderColor: borderErrorColor}]}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </Animatable.View>
              <Animatable.Text
                animation={'fadeInRight'}
                delay={512}
                style={[
                  styles.placeholder2in1Field,
                  {top: windowWidth * 0.13},
                ]}>
                Days of staying
              </Animatable.Text>
              <Animatable.Text
                animation={'fadeInRight'}
                delay={512}
                style={[
                  styles.placeholder2in1Field,
                  {marginLeft: windowWidth * 0.57},
                ]}>
                Place of residence
              </Animatable.Text>
              <Animatable.View
                animation={'fadeInRight'}
                delay={512}
                style={styles.view2in1Field}>
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
              </Animatable.View>
              {/* <View>
                <Text style={styles.error}>{error}</Text>
              </View> */}
              <Animatable.View
                animation={'fadeInLeft'}
                delay={515}
                style={styles.proceed}>
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <Text style={styles.proceedButton}>Proceed</Text>
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View
                animation={'fadeInRight'}
                delay={515}
                style={{
                  marginTop: windowWidth * 0.1,
                }}>
                <Text style={styles.txtAlreadyMember}>Already a member?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Sign In')}>
                  <Text style={styles.txtSignIn}>Sign In</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>

            <Modal
              visible={isLoading}
              style={{height: windowHeight}}
              statusBarTranslucent={true}>
              <View style={styles.centeredView}>
                <View style={[styles.modalView, {paddingTop: 35}]}>
                  <View style={styles.modal}>
                    <LottieView
                      source={require('../assets/98267-bicycle.json')}
                      autoPlay
                      style={{height: windowHeight * 0.1}}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </Animated.ScrollView>

          <Modal
            transparent={true}
            visible={isError}
            style={{height: windowHeight}}
            onRequestClose={() => setIsError(false)}
            statusBarTranslucent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => setIsError(false)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    color={'rgba(0, 0, 0, 0.8)'}
                    size={20}
                  />
                </TouchableOpacity>
                <LottieView
                  source={require('../assets/14651-error-animation.json')}
                  autoPlay
                  style={{height: windowHeight * 0.18}}
                />
                <Text style={{color: 'black'}}>{error}</Text>
              </View>
            </View>
          </Modal>
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
    height: windowHeight * 0.95,
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
    // paddingTop: windowWidth * 0.12,
  },
  txtSignIn: {
    color: '#1F83BB',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 30,
    marginVertical: windowWidth * 0.02,
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
    elevation: 5,
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
    //shadowOpacity: 0.5,
    //elevation: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: windowWidth * 0.05,
  },
  waves: {
    bottom: windowHeight * 0.2,
  },
  wavesView: offset => ({
    width: '100%',
    //bottom: windowHeight * 0.2,
    top: offset,
    transform: [
      {
        translateY: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [
            -HEADER_HEIGHT / 2,
            0,
            -HEADER_HEIGHT * 0.5,
            HEADER_HEIGHT * 0.3,
          ],
        }),
      },
      {
        scale: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [2, 1, 2, 1],
        }),
      },
    ],
  }),
  arrowLeftIcon: {
    marginTop: windowWidth * 0.1,
    marginHorizontal: windowWidth * 0.05,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: 0,
  },
  modalView: {
    //margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    paddingTop: 0,
    alignItems: 'center',
  },
  modal: {
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //borderStyle: 'solid',
    width: windowWidth * 0.45,
    height: windowHeight * 0.2,
    alignItems: 'center',
  },
  btnClose: {
    position: 'absolute',
    top: windowWidth * 0.025,
    left: windowWidth * 0.45,
    height: 20,
  },
});
