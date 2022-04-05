import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../App';

//waves
import Waves from '../wavesTemplate';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

//dimensions
import {windowHeight, windowWidth} from '../constants/global';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

//svg
import Svg, {Defs, G, Path} from 'react-native-svg';

//divider
import {Divider} from 'react-native-elements/dist/divider/Divider';

//redux
import {useSelector} from 'react-redux';

//theme provider
import {ThemeProvider, useTheme} from 'styled-components';

import LottieView from 'lottie-react-native';

//modal
//import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
//import {TouchableOpacity} from 'react-native-gesture-handler';

//dimension
const HEADER_HEIGHT = 350;

export const SignIn = props => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState({});

  const {colors} = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState(null);

  //console.log(state);

  const handleSubmit = async () => {
    setIsLoading(true);

    fetch('http://localhost:5000/signin', {
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
          //alert(data.error);
          setIsLoading(false);
          setErrorName(data.error);
          setError(true);
          setEmail('');
          setPassword('');
        } else {
          try {
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            dispatch({type: 'USER', payload: data.token});
            navigation.navigate('Profile Page');
            setIsLoading(false);
            setEmail('');
            setPassword('');
          } catch (e) {
            console.log(e);
            setIsLoading(false);
            setError(true);
          }
        }
      });
  };

  GoogleSignin.configure({
    webClientId:
      '235557348041-ejo2smfsfc77lgo7prmognfevgqf8o1s.apps.googleusercontent.com',
  });

  const responseErrorGoogle = response => {
    console.log(response);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      setIsLoading(true);
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(userInfo);
      responseSuccessGoogle(userInfo);
      isSignedIn();
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setIsLoading(false);
        setError(true);
        //console.log(error.message);
        setErrorName(error.message);
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
        setIsLoading(true);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
        setError(true);
      } else {
        console.log('Some Other Error Happened');
        setError(true);
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsLoading(true);
    if (!!isSignedIn) {
      getCurrentUserInfo();
      setIsLoading(false);
    } else {
      console.log('Please Login');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
      setError(false);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
        setError(true);
      }
    }
  };

  const responseSuccessGoogle = userInfo => {
    //console.log(response);
    setIsLoading(true);
    fetch('http://192.168.1.2:5000/googlelogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleId: userInfo.idToken,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        await AsyncStorage.setItem('token', data.token);
        dispatch({type: 'USER', payload: data.token});
        //console.log(data.token);
        navigation.navigate('Profile Page');
        setIsLoading(false);
      });
  };

  const theme = useSelector(state => state.themeReducer.theme);
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
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
              height: windowHeight * 0.28,
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
              style={styles.txtSignIn}>
              {' '}
              Sign In
            </Animatable.Text>
          </View>
          <Animated.View style={styles.wavesView(offset)}>
            <View
              style={{
                width: windowWidth,
                aspectRatio: 375 / 216,
                height: 'auto',
                backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
              }}>
              <Svg
                style={styles.waves}
                width={'100%'}
                height={'100%'}
                viewBox={`0 0 375 216`}
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
            </View>
          </Animated.View>

          <View
            style={{
              bottom: windowHeight * 0.25,
              flexDirection: 'column',
              width: windowWidth,
              flex: 1,
              backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
              alignItems: 'center',
            }}>
            <Animatable.Text
              animation={'fadeInRight'}
              delay={498}
              style={styles.txtGoogleLogin}>
              Login via Google
            </Animatable.Text>

            <Animatable.View
              animation={'fadeInRight'}
              delay={498}
              style={styles.googleLoginView}>
              {/* <Pressable onPress={signIn}>
              <FontAwesomeIcon
                style={styles.googleLogo}
                icon={faGoogle}
                size={25}
                color={'#1F83BB'}
              />
            </Pressable> */}
              <GoogleSigninButton
                style={styles.googleLogo}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
              />
            </Animatable.View>
          </View>
          <Divider style={{bottom: windowHeight * 0.15}} />

          <View
            style={[
              styles.signInScreen,
              {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
            ]}>
            <View
              style={{
                bottom: windowWidth * 0.05,
              }}>
              <View
                style={{
                  bottom: windowWidth * 0.08,
                }}>
                <Animatable.Text
                  animation={'fadeInLeft'}
                  delay={499}
                  style={styles.txtWelcome}>
                  Welcome back
                </Animatable.Text>
              </View>
              <View
                style={{
                  bottom: windowWidth * 0.1,
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
                        style={styles.placeholderEmail}>
                        Email
                      </Text>
                      <TextInput
                        style={[
                          styles.inputEmailPass,
                          {
                            width: windowWidth * 0.7,
                            marginTop: 0,
                            //marginRight: windowWidth * 0.05,
                            //borderColor: borderErrorColor,
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
                    <Animatable.View animation={'fadeInLeft'} delay={501}>
                      <Text
                        animation={'fadeInLeft'}
                        delay={501}
                        style={styles.placeholderEmail}>
                        Password
                      </Text>
                      <TextInput
                        style={[
                          styles.inputEmailPass,
                          {
                            width: windowWidth * 0.7,
                            marginTop: 0,
                            //marginRight: windowWidth * 0.05,
                            //borderColor: borderErrorColor,
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

                <Animatable.View
                  animation={'fadeInRight'}
                  delay={502}
                  style={styles.proceed}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.proceedButton}>Proceed</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
              <Animatable.View
                animation={'fadeInLeft'}
                delay={503}
                style={{
                  marginTop: windowWidth * 0.03,
                }}>
                <Text style={styles.txtNewMember}>New member?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Sign Up')}>
                  <Text style={styles.txtSignUp}>Sign Up</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </View>
          <Modal
            visible={isLoading}
            deviceHeight={'auto'}
            transparent={true}
            style={{height: windowHeight}}
            statusBarTranslucent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
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
          visible={error}
          style={styles.alertModal}>
          <View style={styles.centeredView}>
            <View style={styles.alertModalContainer}>
              <>
                <TouchableOpacity
                  style={styles.alertIcon}
                  onPress={() => setError(false)}>
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
                  <Text style={styles.alertText}>{errorName}</Text>
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
    backgroundColor: 'white',
    height: 'auto',
  },
  signInScreen: {
    height: 'auto',
    //flex: 1,
    //justifyContent: 'flex-start',
    paddingTop: windowWidth * 0.05,
    bottom: windowHeight * 0.1,
    backgroundColor: 'white',
    /* borderColor: 'black',
    borderWidth: 1, */
    //paddingBottom: windowHeight * 0.2,
  },
  txtSignIn: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: windowHeight * 0.01,
  },
  txtWelcome: {
    color: '#A8A8A8',
    fontSize: 14,
    paddingLeft: 30,
    marginTop: windowWidth * 0.1,
  },
  txtNewMember: {
    color: '#A8A8A8',
    fontSize: 12,
    paddingLeft: 30,
    //paddingTop: windowWidth * 0.01,
  },
  txtSignUp: {
    color: '#1F83BB',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 30,
    marginVertical: windowWidth * 0.02,
  },
  viewEmailPass: {
    alignItems: 'center',
  },
  inputEmailPass: {
    backgroundColor: 'white',
    color: 'black',
    height: 56,
    width: windowWidth * 0.7,
    borderRadius: 20,
    marginTop: windowWidth * 0.1,
    fontWeight: 'bold',
    /* shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5, */
    elevation: 5,
    paddingLeft: windowWidth * 0.05,
    /* paddingVertical: 1, */
  },
  placeholderEmail: {
    top: '25%',
    zIndex: 10,
    fontSize: 10,
    elevation: 5,
    marginLeft: windowWidth * 0.05,
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
    elevation: 5,
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
  },
  containerGoogleLoginOrSignUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: windowWidth * 0.1,
  },
  googleLoginView: {
    //marginRight: 30,
    alignItems: 'center',
    top: windowWidth * 0.01,
    //marginHorizontal: windowWidth * 0.05,
  },
  txtGoogleLogin: {
    color: '#A8A8A8',
    fontSize: 15,
    paddingLeft: 30,
    marginBottom: windowWidth * 0.05,
    alignItems: 'flex-start',
    width: windowWidth,
  },
  googleLogo: {
    marginVertical: windowWidth * 0.02,
  },
  wavesView: offset => ({
    width: '100%',
    top: offset,
    transform: [
      {
        translateY: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [
            -HEADER_HEIGHT / 2,
            0,
            -HEADER_HEIGHT * 0.85,
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
  waves: {
    bottom: windowHeight * 0.185,

    //height: 'auto',
    //width: windowWidth,
  },
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
    zIndex: 1,
  },
  btnClose: {
    position: 'absolute',
    top: windowWidth * 0.025,
    left: windowWidth * 0.5,
    height: 20,
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
});
