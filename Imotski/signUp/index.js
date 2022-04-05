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
import {
  faArrowLeft,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

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
        <Animated.ScrollView
          style={[
            styles.container,
            {
              backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
            },
          ]}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {useNativeDriver: true},
          )}>
          {/* <Waves navigate={'User'} /> */}
          <View
            style={{
              height: windowHeight * 0.3,
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

            <Animated.View style={styles.wavesView(offset)}>
              <View
                style={{
                  width: windowWidth,
                  aspectRatio: 375 / 200,
                  height: 'auto',
                  //backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
                }}>
                <Svg
                  style={styles.waves}
                  width={'100%'}
                  height={'100%'}
                  viewBox={`0 0 375 200`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
                    fill="white"
                  />
                </Svg>
              </View>
            </Animated.View>
          </View>

          <View style={styles.signUpScreen}>
            <View>
              <Animatable.Text
                animation={'fadeInLeft'}
                delay={500}
                style={styles.txtWelcome}>
                Fill in your information in order to use all features
              </Animatable.Text>
              <View
                style={{
                  bottom: windowHeight * 0.1,
                }}>
                <View style={styles.viewField}>
                  <View
                    style={{
                      //flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Animatable.View animation={'fadeInRight'} delay={500}>
                      <Text
                        animation={'fadeInRight'}
                        delay={500}
                        style={styles.placeholder}>
                        Name
                      </Text>
                      <TextInput
                        style={[
                          styles.inputField,
                          {
                            width: windowWidth * 0.7,
                            marginTop: 0,
                            //marginRight: windowWidth * 0.05,
                            borderColor: borderErrorColor,
                            zIndex: -1,
                          },
                        ]}
                        keyboardType="ascii-capable"
                        value={name}
                        onChangeText={text => setName(text)}
                      />
                    </Animatable.View>
                  </View>
                </View>

                <View style={styles.viewField}>
                  <View
                    style={{
                      //flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Animatable.View animation={'fadeInLeft'} delay={503}>
                      <Text
                        animation={'fadeInLeft'}
                        delay={503}
                        style={styles.placeholder}>
                        Surname
                      </Text>
                      <TextInput
                        style={[
                          styles.inputField,
                          {
                            width: windowWidth * 0.7,
                            marginTop: 0,
                            //marginRight: windowWidth * 0.05,
                            borderColor: borderErrorColor,
                            zIndex: -1,
                          },
                        ]}
                        keyboardType="ascii-capable"
                        value={surname}
                        onChangeText={text => setSurname(text)}
                      />
                    </Animatable.View>
                  </View>
                </View>

                <View style={styles.viewField}>
                  <View
                    style={{
                      //flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Animatable.View animation={'fadeInRight'} delay={506}>
                      <Text
                        animation={'fadeInRight'}
                        delay={506}
                        style={styles.placeholder}>
                        Email
                      </Text>
                      <TextInput
                        style={[
                          styles.inputField,
                          {
                            width: windowWidth * 0.7,
                            marginTop: 0,
                            //marginRight: windowWidth * 0.05,
                            borderColor: borderErrorColor,
                            zIndex: -1,
                          },
                        ]}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                      />
                    </Animatable.View>
                  </View>
                </View>

                <View style={styles.viewField}>
                  <View
                    style={{
                      //flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Animatable.View animation={'fadeInLeft'} delay={509}>
                      <Text
                        animation={'fadeInLeft'}
                        delay={509}
                        style={styles.placeholder}>
                        Password
                      </Text>
                      <TextInput
                        style={[
                          styles.inputField,
                          {
                            width: windowWidth * 0.7,
                            marginTop: 0,
                            //marginRight: windowWidth * 0.05,
                            borderColor: borderErrorColor,
                            zIndex: -1,
                          },
                        ]}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                      />
                    </Animatable.View>
                  </View>
                </View>

                <View style={styles.viewField}>
                  <View
                    style={{
                      //flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Animatable.Text animation={'fadeInRight'} delay={512}>
                      Days of staying
                    </Animatable.Text> */}
                    <Animatable.View animation={'fadeInRight'} delay={509}>
                      <Text
                        style={{
                          top: '25%',
                          zIndex: 10,
                          fontSize: 10,
                          elevation: 5,
                          marginLeft: windowWidth * 0.05,
                          color: '#A8A8A8',
                        }}>
                        Days of staying
                      </Text>
                      <TextInput
                        style={[
                          styles.inputField,
                          {
                            width: windowWidth * 0.3,
                            marginTop: 0,
                            marginRight: windowWidth * 0.05,
                            borderColor: borderErrorColor,
                            zIndex: -1,
                          },
                        ]}
                        keyboardType="number-pad"
                        value={daysOfStaying}
                        onChangeText={text => setDaysOfStaying(text)}
                      />
                    </Animatable.View>

                    <Animatable.View animation={'fadeInLeft'} delay={509}>
                      <Text
                        style={{
                          top: '25%',
                          zIndex: 10,
                          fontSize: 10,
                          elevation: 5,
                          marginLeft: windowWidth * 0.08,
                          color: '#A8A8A8',
                        }}>
                        Place of Residence
                      </Text>
                      <TextInput
                        style={[
                          styles.inputField,
                          {
                            width: windowWidth * 0.3,
                            marginTop: 0,
                            marginLeft: windowWidth * 0.05,
                            borderColor: borderErrorColor,
                          },
                        ]}
                        keyboardType="default"
                        value={placeOfResidence}
                        onChangeText={text => setPlaceOfResidence(text)}
                      />
                    </Animatable.View>
                  </View>
                </View>

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
                    marginTop: windowWidth * 0.15,
                  }}>
                  <Text style={styles.txtAlreadyMember}>Already a member?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Sign In')}>
                    <Text style={styles.txtSignIn}>Sign In</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            </View>
          </View>

          <Modal
            visible={isLoading}
            style={{height: windowHeight}}
            statusBarTranslucent={true}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, {paddingTop: 35}]}>
                <LottieView
                  source={require('../assets/98267-bicycle.json')}
                  autoPlay
                  style={{height: windowHeight * 0.15}}
                />
              </View>
            </View>
          </Modal>
        </Animated.ScrollView>

        <Modal
          statusBarTranslucent
          transparent={true}
          visible={isError}
          style={styles.alertModal}>
          <View style={styles.centeredView}>
            <View style={styles.alertModalContainer}>
              <>
                <TouchableOpacity
                  style={styles.alertIcon}
                  onPress={() => setIsError(false)}>
                  <View>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      color={'black'}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.alertMessage}>
                  <LottieView
                    source={require('../assets/14651-error-animation.json')}
                    autoPlay
                    style={{height: windowHeight * 0.15}}
                  />
                  <Text style={styles.alertText}>{error}</Text>
                </View>
              </>
            </View>
          </View>
        </Modal>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'red',
    height: 'auto',
    /* borderColor: 'red',
    borderWidth: 2, */
  },
  signUpScreen: {
    //flex: 4,
    height: 'auto',
    marginTop: windowWidth * 0.2,
  },
  txtSignUp: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: windowHeight * 0.01,
  },
  txtWelcome: {
    color: '#A8A8A8',
    fontSize: 14,
    //paddingLeft: 30,
    paddingTop: windowHeight * 0.01,
    bottom: windowHeight * 0.08,
    alignItems: 'flex-start',
    /* borderColor: 'red',
    borderWidth: 2, */
    width: windowWidth,
    paddingHorizontal: windowWidth * 0.05,
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
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: windowWidth * 0.05,
    width: windowWidth * 0.9,
    alignContent: 'center',
    //alignItems: 'center',
    marginTop: windowWidth * 0.1,
    /* borderColor: 'red',
    borderWidth: 2, */
    alignItems: 'center',
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
    /* shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,*/
    elevation: 5,
    paddingLeft: windowWidth * 0.05,
    //paddingVertical: 1,
    /* borderColor: 'green',
    borderWidth: 1, */
  },
  placeholder: {
    //textAlignVertical: 'top',
    top: '25%',
    zIndex: 10,
    fontSize: 10,
    elevation: 5,
    marginLeft: windowWidth * 0.05,
    color: '#A8A8A8',
  },

  proceed: {
    alignItems: 'center',
    elevation: 5,
    marginTop: windowWidth * 0.05,
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
    bottom: windowHeight * 0.08,
  },
  wavesView: offset => ({
    width: '100%',
    /*  borderColor: 'red',
    borderWidth: 2, */
    top: offset,
    transform: [
      {
        translateY: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [
            -HEADER_HEIGHT / 2,
            0,
            -HEADER_HEIGHT * 0.8,
            HEADER_HEIGHT * 0.3,
          ],
        }),
      },
      {
        scale: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [2, 1, 1, 1],
        }),
      },
    ],
  }),
  arrowLeftIcon: {
    marginTop: windowWidth * 0.12,
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
    padding: 30,
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

  alertModalContainer: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.3,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  alertIcon: {
    //flex: 1,
    //justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.05,
    marginTop: windowWidth * 0.05,
  },
  alertMessage: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowWidth * 0.1,
  },
  alertText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: windowWidth * 0.03,
  },
  closeBtn: {
    backgroundColor: '#1F83BB',
    width: windowWidth * 0.5,
    borderRadius: 10,
    alignItems: 'center',
    flex: 0.7,
    marginBottom: windowWidth * 0.1,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#1F83BB',
    bottom: windowWidth * 0.025,
  },
  closeBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
