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
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../App';

//waves
import Waves from '../wavesTemplate';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';

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

    fetch('http://192.168.1.2:5000/signin', {
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
              <Svg
                style={styles.waves}
                width={windowWidth}
                height={windowHeight * 0.23}
                viewBox={`0 0 ${windowWidth} ${windowHeight * 0.23}`}
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
            <View
              style={{
                bottom: windowWidth * 0.4,
              }}>
              <Animatable.Text
                animation={'fadeInRight'}
                delay={498}
                style={styles.txtGoogleLogin}>
                Login via Google
              </Animatable.Text>
            </View>

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
            <Divider style={{bottom: windowWidth * 0.3}} />
            <View style={styles.signInScreen}>
              <View
                style={{
                  bottom: windowWidth * 0.05,
                }}>
                <View
                  style={{
                    bottom: windowWidth * 0.05,
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
                  <Animatable.Text
                    animation={'fadeInRight'}
                    delay={500}
                    style={styles.placeholderEmail}>
                    Email
                  </Animatable.Text>
                  <Animatable.View
                    animation={'fadeInRight'}
                    delay={500}
                    style={styles.viewEmailPass}>
                    <TextInput
                      style={styles.inputEmailPass}
                      keyboardType="email-address"
                      value={email}
                      onChangeText={text => setEmail(text)}
                    />
                  </Animatable.View>
                  <Animatable.Text
                    animation={'fadeInLeft'}
                    delay={501}
                    style={styles.placeholderPassword}>
                    Password
                  </Animatable.Text>
                  <Animatable.View
                    animation={'fadeInLeft'}
                    delay={501}
                    style={styles.viewEmailPass}>
                    <TextInput
                      style={styles.inputEmailPass}
                      secureTextEntry={true}
                      value={password}
                      onChangeText={text => setPassword(text)}
                    />
                  </Animatable.View>

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
                  <View style={styles.modal}>
                    <LottieView
                      source={require('../assets/98267-bicycle.json')}
                      autoPlay
                      style={{height: windowHeight * 0.2}}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </Animated.ScrollView>
          <Modal
            visible={error}
            style={{height: windowHeight}}
            transparent={true}
            onRequestClose={() => setError(false)}
            statusBarTranslucent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => setError(false)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    color={'rgba(0,0,0,0.8)'}
                    size={20}
                  />
                </TouchableOpacity>
                <LottieView
                  source={require('../assets/14651-error-animation.json')}
                  autoPlay
                  style={{height: windowHeight * 0.18}}
                />
                <Text style={{color: 'black'}}>{errorName}</Text>
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
    height: windowHeight * 0.58,
  },
  signInScreen: {
    height: windowHeight * 0.64,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: windowWidth * 0.05,
    bottom: windowHeight * 0.12,
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
    bottom: windowWidth * 0.38,
  },
  txtGoogleLogin: {
    color: '#A8A8A8',
    fontSize: 14,
    paddingLeft: 30,
    //marginTop: windowWidth * 0.1,
  },
  googleLogo: {
    marginVertical: windowWidth * 0.02,
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
  waves: {
    bottom: windowHeight * 0.18,
    height: windowHeight * 0.24,
  },
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
    zIndex: 1,
  },
  btnClose: {
    position: 'absolute',
    top: windowWidth * 0.025,
    left: windowWidth * 0.52,
    height: 20,
  },
});
