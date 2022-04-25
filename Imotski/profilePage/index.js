import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

//navigation
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

//svg, path
import Svg, {Path} from 'react-native-svg';

//stack navigation
import {createStackNavigator} from '@react-navigation/stack';
import {SignInNav} from '../userPage';

import {useFocusEffect} from '@react-navigation/native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarAlt,
  faEnvelope,
  faLock,
  faMapMarkedAlt,
  faPen,
  faPlus,
  faTimesCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import {ScrollView} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import {UserContext} from '../App';

//dimensions
import {windowHeight, windowWidth} from '../constants/global';

//google login
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//dialog
import Dialog from 'react-native-dialog';

//dark mode
import {ThemeProvider} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';

//animation
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

//dimension
const HEADER_HEIGHT = 400;

const ProfileStackNav = createStackNavigator();

export const ProfilePageNav = () => {
  return (
    <ProfileStackNav.Navigator>
      <ProfileStackNav.Screen
        name="Profile Page"
        component={SignInNav}
        options={{headerShown: false}}
      />
    </ProfileStackNav.Navigator>
  );
};

export const ProfilePage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
  });

  const [url, setUrl] = useState('');
  let [updatePhoto, setUpdatePhoto] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [showUpdateBtn, setShowUpdateBtn] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [dialogDays, setDialogDays] = useState(false);
  const [infoData, setInfoData] = useState(false);
  const {state, dispatch} = useContext(UserContext);

  const [city, setCity] = useState('');
  const [days, setDays] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState('');

  useEffect(async () => {
    await fetch('http://localhost:5000/protected', {
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUserData({
          name: data.userData.name,
          surname: data.userData.surname,
          email: data.userData.email,
          daysOfStaying: data.userData.daysOfStaying,
          placeOfResidence: data.userData.placeOfResidence,
        });
        setUserPic(data.userData.photo);
      });

    if (url) {
      fetch('http://192.168.1.2:5000/newprofilepic', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
        body: JSON.stringify({
          photo: url,
        }),
      })
        .then(res => res.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            console.log(
              'there was error while uploading a profile pic to mongodb',
            );
          } else {
            console.log('Profile pic successfully uploaded to mongodb');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [url, infoData]);

  const updateProfilePic = async () => {
    await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
      .then(res => {
        // console.log(res[0]);
        setUpdatePhoto((updatePhoto = res[0]));
        setIsLoading(true);
        //console.log(updatePhoto);
      })
      .catch(error => {
        console.log(error);
      });

    if (updatePhoto) {
      const data = new FormData();
      const fileToUpload = updatePhoto;
      data.append('file', fileToUpload);
      data.append('upload_preset', 'imotski-app');
      data.append('cloud_name', 'jopaa10');

      fetch('https://api.cloudinary.com/v1_1/jopaa10/image/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(async data => {
          console.log(data.url);
          await fetch('http://192.168.1.2:5000/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
            },
            body: JSON.stringify({
              photo: data.url,
            }),
          })
            .then(res => res.json())
            .then(result => {
              //console.log(result.photo);
              setUserPic(result.photo);
              setIsLoading(false);
            })
            .catch(error => {
              console.log(error);
            });
        });
    }
  };

  const handleLogOut = async () => {
    /* AsyncStorage.removeItem('token').then(() => {
      dispatch({type: 'CLEAR'});
      navigation.navigate('User');
    }); */

    const token = await AsyncStorage.removeItem('token');
    //const user = await AsyncStorage.removeItem('user');

    GoogleSignin.signOut();

    dispatch({type: 'USER', payload: token});
    navigation.navigate('Sign In');

    //console.log(token);
  };

  const submitPlace = () => {
    if (city === '') {
      setError(true);
      setErrorName(
        'Please add place of residence during Your vacations. Thank You!',
      );
      setIsLoading(false);
      setDialog(false);
    } else {
      setIsLoading(true);
      setDialog(false);
      fetch('http://192.168.1.2:5000/addplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state,
        },
        body: JSON.stringify({
          placeOfResidence: city,
        }),
      })
        .then(res => res.json())
        .then(async data => {
          //console.log(data);
          console.log(data.result.placeOfResidence, city);

          if (data.result.placeOfResidence === city) {
            await fetch('http://192.168.1.2:5000/protected', {
              headers: {
                Authorization:
                  'Bearer ' + (await AsyncStorage.getItem('token')),
              },
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                setUserData({
                  name: data.userData.name,
                  surname: data.userData.surname,
                  email: data.userData.email,
                  daysOfStaying: data.userData.daysOfStaying,
                  placeOfResidence: data.userData.placeOfResidence,
                });
                setUserPic(data.userData.photo);
                setIsLoading(false);
              });
          }

          setCity('');
        });
    }
  };

  const submitDays = () => {
    if (days === null) {
      setError(true);
      setErrorName(
        'Please add number of days while You are on vacations. Thank You!',
      );
      setIsLoading(false);
      setDialogDays(false);
    } else {
      //console.log(inputTextDays);
      setDialogDays(false);
      setIsLoading(true);

      fetch('http://192.168.1.2:5000/daysofstaying', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state,
        },
        body: JSON.stringify({
          daysOfStaying: days,
        }),
      })
        .then(res => res.json())
        .then(async data => {
          //console.log(data.result.daysOfStaying, days);

          if (data.result.daysOfStaying === days) {
            await fetch('http://192.168.1.2:5000/protected', {
              headers: {
                Authorization:
                  'Bearer ' + (await AsyncStorage.getItem('token')),
              },
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                setUserData({
                  name: data.userData.name,
                  surname: data.userData.surname,
                  email: data.userData.email,
                  daysOfStaying: data.userData.daysOfStaying,
                  placeOfResidence: data.userData.placeOfResidence,
                });
                setUserPic(data.userData.photo);
                setIsLoading(false);
              });
          }
        });
    }

    setDays(null);
  };

  const offset = useRef(new Animated.Value(0)).current;
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Animated.ScrollView
          style={{
            height: 'auto',
            backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {useNativeDriver: true},
          )}>
          <View
            style={[
              styles.containerWhite,
              {
                backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
                /* borderWidth: 1,
                borderColor: 'black', */
              },
            ]}>
            <Animated.View style={styles.wavesView(offset)}>
              <View
                style={{
                  width: windowWidth,
                  aspectRatio: 375 / 150,
                  height: 'auto',
                  //backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
                  /*  borderColor: 'red',
                  borderWidth: 2, */
                }}>
                <Svg
                  style={styles.waves}
                  width={'100%'}
                  height={'100%'}
                  viewBox={`0 0 375 150`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 0L17.2987 9.05882C33.2667 18.1176 66.5333 34.7255 99.8 54.3529C133.067 73.9804 166.333 96.6274 199.6 99.6471C232.867 102.667 266.133 86.0588 299.4 63.4118C332.667 40.7647 365.933 12.0784 399.2 19.6275C432.467 28.6863 465.733 73.9804 483.032 96.6274L499 119.275V154H483.032C465.733 154 432.467 154 399.2 154C365.933 154 332.667 154 299.4 154C266.133 154 232.867 154 199.6 154C166.333 154 133.067 154 99.8 154C66.5333 154 33.2667 154 17.2987 154H0V0Z"
                    fill={colors.PRIMARY_BACKGROUND_COLOR}
                  />
                </Svg>

                <View
                  style={{
                    /* borderColor: 'red',
                  borderWidth: 2, */
                    height: 'auto',
                    width: windowWidth * 0.3,
                    alignItems: 'center',
                    marginHorizontal: windowWidth * 0.15,
                    bottom: windowHeight * 0.2,
                  }}>
                  <View
                    style={{
                      height: 'auto',
                      width: 'auto',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'space-around',
                    }}>
                    <Image
                      source={{uri: userPic}}
                      style={styles.userProfilePic}
                    />
                    {showUpdateBtn && (
                      <TouchableOpacity
                        onPress={updateProfilePic}
                        style={styles.updateBtn}>
                        <View
                          style={{
                            width: '100%',
                            height: 'auto',
                          }}>
                          <FontAwesomeIcon
                            icon={faPen}
                            size={20}
                            color={colors.TEXT_COLOR}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>

          <View
            style={[
              styles.containerBlue,
              {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
            ]}>
            <View>
              <View style={styles.viewUserInfo}>
                <View style={styles.icon}>
                  <FontAwesomeIcon icon={faUser} size={22} color={'white'} />
                </View>
                <View
                  style={{
                    //top: windowWidth * 0.04,
                    marginTop: windowWidth * 0.04,
                    marginLeft: windowWidth * 0.08,
                  }}>
                  <Text style={styles.textUserInfo}>Name</Text>
                  <Text style={styles.textName1}>
                    {`${userData.name} ${userData.surname}`}
                  </Text>
                </View>
              </View>
              <View style={styles.viewUserInfo}>
                <View style={styles.icon}>
                  <FontAwesomeIcon
                    icon={faMapMarkedAlt}
                    size={22}
                    color={'white'}
                  />
                </View>
                <View
                  style={{
                    //top: windowWidth * 0.04,
                    marginTop: windowWidth * 0.04,
                    marginLeft: windowWidth * 0.08,
                  }}>
                  <Text style={styles.textUserInfo}>Place of residence</Text>
                  <Text style={styles.textName1}>
                    {userData.placeOfResidence}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => setDialog(true)}>
                  <FontAwesomeIcon icon={faPen} color={'white'} size={16} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewUserInfo}>
                <View style={styles.icon}>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size={22}
                    color={'white'}
                  />
                </View>
                <View
                  style={{
                    //top: windowWidth * 0.04,
                    marginLeft: windowWidth * 0.08,
                    marginTop: windowWidth * 0.04,
                  }}>
                  <Text style={styles.textUserInfo}>Days of staying</Text>
                  <Text style={styles.textName1}>
                    {' '}
                    {userData.daysOfStaying}{' '}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => setDialogDays(true)}>
                  <FontAwesomeIcon icon={faPen} color={'white'} size={16} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewUserInfo}>
                <View style={styles.icon}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={22}
                    color={'white'}
                  />
                </View>
                <View
                  style={{
                    //top: windowWidth * 0.04,
                    marginTop: windowWidth * 0.04,
                    marginLeft: windowWidth * 0.08,
                  }}>
                  <Text style={styles.textUserInfo}>Email</Text>
                  <Text style={styles.textName1}> {userData.email} </Text>
                </View>
              </View>
              <View style={styles.viewUserInfo}>
                <View style={styles.icon}>
                  <FontAwesomeIcon icon={faLock} size={22} color={'white'} />
                </View>
                <View
                  style={{
                    //top: windowWidth * 0.04,
                    marginTop: windowWidth * 0.04,
                    marginLeft: windowWidth * 0.08,
                  }}>
                  <Text style={styles.textUserInfo}>New password</Text>
                  <Text style={styles.textName1}> ****** </Text>
                </View>
                <View style={styles.editBtn}>
                  <FontAwesomeIcon icon={faPen} color={'white'} size={16} />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
                alignItems: 'center',
                paddingBottom: windowWidth * 0.01,
                height: 'auto',
                marginTop: windowWidth * 0.1,
              }}>
              <View style={{paddingTop: 20}}>
                <TouchableOpacity
                  style={styles.btnLogout}
                  onPress={handleLogOut}>
                  <Text style={styles.textBtnLogout}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.ScrollView>

        <View>
          <Dialog.Container
            visible={dialog}
            contentStyle={{backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR}}>
            <Dialog.Title style={{color: colors.TEXT_COLOR}}>
              Place of residence
            </Dialog.Title>
            <Dialog.Description style={{color: colors.TEXT_COLOR}}>
              Please input Your place of staying while You are on vacations
            </Dialog.Description>
            <Dialog.Input
              placeholder="HINT: Imotski"
              value={city}
              style={{color: colors.TEXT_COLOR}}
              onChangeText={text => setCity(text)}
            />
            <Dialog.Button
              style={{color: colors.DIALOG_BUTTON_COLOR}}
              label="Cancel"
              onPress={() => {
                setDialog(false);
                setCity('');
              }}
            />
            <Dialog.Button
              style={{color: colors.DIALOG_BUTTON_COLOR}}
              label="OK"
              onPress={submitPlace}
            />
          </Dialog.Container>
        </View>

        <Dialog.Container
          visible={dialogDays}
          contentStyle={{
            backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
          }}>
          <Dialog.Title style={{color: colors.TEXT_COLOR}}>
            Days of staying
          </Dialog.Title>
          <Dialog.Description style={{color: colors.TEXT_COLOR}}>
            Please input Your days of staying while You are on vacations
          </Dialog.Description>
          <Dialog.Input
            placeholder="HINT: 5"
            value={days}
            style={{color: colors.TEXT_COLOR}}
            onChangeText={text => setDays(text)}
          />
          <Dialog.Button
            style={{color: colors.DIALOG_BUTTON_COLOR}}
            label="Cancel"
            onPress={() => {
              setDialogDays(false);
              setCity('');
            }}
          />
          <Dialog.Button
            style={{color: colors.DIALOG_BUTTON_COLOR}}
            label="OK"
            onPress={submitDays}
          />
        </Dialog.Container>

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
  containerWhite: {
    //position: 'absolute',
    width: windowWidth,
    backgroundColor: 'white',
    height: windowHeight * 0.4,
    justifyContent: 'flex-end',
  },
  coverText: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 16,
    paddingBottom: windowWidth * 0.4,
  },

  wavesView: offset => ({
    width: '100%',
    //top: windowHeight * 0.4,
    top: offset,
    /* borderColor: 'red',
    borderWidth: 1, */
    transform: [
      {
        translateY: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [
            -HEADER_HEIGHT / 2,
            0,
            -HEADER_HEIGHT,
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

  waves: {
    //width: windowWidth,
    //height: windowHeight * 0.23,
    //top: windowWidth * 0.28,
  },

  userProfilePic: {
    width: 100,
    height: 100,
    borderRadius: Math.round(windowWidth + windowHeight) / 2,
    borderColor: '#DADADA',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  containerBlue: {
    //marginTop: windowWidth * 0.05,
    backgroundColor: '#1F83BB',
    //bottom: windowHeight * 0.014,
    //paddingTop: windowWidth * 0.15,
    height: 'auto',
    zIndex: -1,
  },
  viewUserInfo: {
    width: windowWidth * 0.8,
    marginTop: windowWidth * 0.05,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: windowWidth * 0.1,
    //bottom: windowWidth * 0.05,
    /*  borderColor: 'red',
    borderWidth: 2, */
  },
  textUserInfo: {
    //marginLeft: windowWidth * 0.08,
    color: 'white',
    fontSize: 12,
    /* borderColor: 'green',
    borderWidth: 2, */
  },
  textName1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    //marginLeft: windowWidth * 0.08,
  },
  editBtn: {
    //width: windowWidth * 0.6,
    alignItems: 'flex-start',
    //bottom: windowWidth * 0.09,
    /*  borderColor: 'yellow',
    borderWidth: 1, */
    marginLeft: windowWidth * 0.05,
    marginTop: windowWidth * 0.04,
  },
  btnLogout: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    width: windowWidth * 0.4,
    height: 57,
    marginBottom: windowWidth * 0.2,
  },
  textBtnLogout: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  updateBtn: {
    right: windowWidth * 0.02,
    //flex: 1,
    //position: 'absolute',
    bottom: windowWidth * 0.03,
    //left: windowWidth * 0.3,
  },

  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    //margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    paddingTop: 0,
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
    padding: 10,
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
  icon: {
    //width: windowWidth * 0.85,
    alignItems: 'flex-start',
    //top: windowWidth * 0.14,
    marginVertical: windowWidth * 0.04,
  },
});
