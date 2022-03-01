import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../App';

//waves
import Waves from '../wavesTemplate';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

//dimensions
import {windowHeight, windowWidth} from '../constants/global';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Svg, {Defs, G, Path} from 'react-native-svg';
import {Divider} from 'react-native-elements/dist/divider/Divider';

/* //dimension
const windowWidth = Dimensions.get('window').width; */

export const SignIn = props => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState({});

  const handleSubmit = async () => {
    fetch('http://192.168.1.3:5000/signin', {
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
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            dispatch({type: 'USER', payload: data.token});
            navigation.navigate('Profile Page');
            setEmail('');
            setPassword('');
          } catch (e) {
            console.log(e);
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
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);
      setUser(userInfo);
      responseSuccessGoogle(userInfo);
      isSignedIn();
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  const responseSuccessGoogle = userInfo => {
    //console.log(response);
    fetch('http://192.168.1.3:5000/googlelogin', {
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
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{height: windowHeight}}>
          {/* <Waves navigate={'User'} /> */}
          <View
            style={{height: windowHeight * 0.3, backgroundColor: '#1F83BB'}}>
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
            <Text style={styles.txtSignIn}> Sign In</Text>
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
                fill="white"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
              />
            </G>
          </Svg>

          <View
            style={{
              bottom: windowWidth * 0.4,
            }}>
            <Text style={styles.txtGoogleLogin}>Login via Google</Text>
          </View>

          <View style={styles.googleLoginView}>
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
          </View>
          <Divider style={{bottom: windowWidth * 0.3}} />
          <View style={styles.signInScreen}>
            <View>
              <Text style={styles.txtWelcome}>Welcome back</Text>
            </View>
            <View
              style={{
                bottom: windowWidth * 0.05,
              }}>
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
              <View style={styles.containerGoogleLoginOrSignUp}>
                <View>
                  <Text style={styles.txtNewMember}>New member?</Text>
                  <Pressable onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.txtSignUp}>Sign Up</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  signInScreen: {
    height: windowHeight * 0.6,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: windowWidth * 0.05,
    bottom: windowHeight * 0.2,
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
    paddingTop: windowWidth * 0.01,
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
  waves: {
    bottom: windowHeight * 0.2,
    height: windowHeight * 0.2,
  },
  arrowLeftIcon: {
    marginTop: windowWidth * 0.15,
    marginHorizontal: windowWidth * 0.05,
  },
});
