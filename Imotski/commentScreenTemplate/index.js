import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

//Dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//comment navigation
import {createStackNavigator} from '@react-navigation/stack';

//bottom sheet modal
import {useNavigation} from '@react-navigation/core';

import LottieView from 'lottie-react-native';

//async storage to get token
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeProvider} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Svg, {G, Path} from 'react-native-svg';
import {useTheme} from 'styled-components';

const commentStack = createStackNavigator();

export const CommentNav = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={CommentTemplate}
      />
    </commentStack.Navigator>
  );
};

export const CommentTemplate = ({waveColor, category, bgCommColor, name}) => {
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const [alertModal, setAlertModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitComment = async () => {
    //navigation.navigate('Blue Lake Info');
    setIsLoading(true);
    await fetch('http://192.168.1.2:5000/createcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
      body: JSON.stringify({
        body: input,
        catg: category,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          //alert('There was an error posting the review. Please try again!');
          setIsLoading(false);
          setIsError(true);
          setAlertModal(true);
          setShowMessage(false);
        } else {
          //alert('You have successfully posted a review. Thank You!');
          setInput('');
          setAlertModal(true);
          setShowMessage(true);
          setIsError(false);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  /*  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);
 */

  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <View
          style={{
            backgroundColor: bgCommColor,
            //paddingTop: windowHeight * 0.05,
            height: windowHeight * 0.3,
          }}>
          {/*  <View style={{marginTop: windowWidth * 0.1}}>
            <TouchableOpacity
              style={styles.arrowLeftIcon}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              height: 'auto',
              width: windowWidth * 0.6,
              marginVertical: windowWidth * 0.1,
            }}>
            <TouchableOpacity
              style={styles.arrowLeftIcon}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
            </TouchableOpacity>
            <Text style={styles.txtSignUp}>
              {`Write Your review for ${name}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: windowWidth,
            aspectRatio: 375 / 180,
            height: 'auto',
            backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
          }}>
          <Svg
            style={styles.waves}
            width={'100%'}
            height={'100%'}
            viewBox={`0 0 375 180`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <G filter="url(#filter0_i_718_2)">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
                fill={waveColor}
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
              />
            </G>
          </Svg>
        </View>

        <View
          style={{
            backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
            height: windowHeight,
            //flex: 1,
            bottom: windowWidth * 0.35,
          }}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
              },
            ]}>
            <TextInput
              style={[styles.commentBox, {color: colors.PRIMARY_TEXT_COLOR}]}
              keyboardType={'default'}
              multiline={true}
              placeholder="Write your experience"
              placeholderTextColor={'grey'}
              onChangeText={text => setInput(text)}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                setInput('');
                submitComment();
              }}
              value={input}
            />
            <View>
              <TouchableOpacity
                style={styles.btnLogout}
                onPress={submitComment}>
                <Text style={styles.textBtnLogout}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            transparent={true}
            visible={alertModal}
            statusBarTranslucent
            style={styles.alertModal}>
            <View style={styles.centeredView}>
              <View
                style={[
                  styles.alertModalContainer,
                  {backgroundColor: colors.MODAL_BACKGROUND_COLOR},
                ]}>
                {showMessage ? (
                  <>
                    <View style={styles.alertIcon}>
                      {/* <FontAwesomeIcon
                        icon={faCheckCircle}
                        color={'green'}
                        size={40}
                      /> */}
                      <LottieView
                        source={require('../assets/5449-success-tick.json')}
                        autoPlay
                        loop
                        style={{height: windowHeight * 0.08}}
                      />
                    </View>
                    <View style={styles.alertMessage}>
                      <Text
                        style={{
                          color: 'green',
                          fontSize: 25,
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        Success!{' '}
                      </Text>
                      <Text style={[styles.alertText, {color: '#468C4D'}]}>
                        {`Your review has been successfully published!`}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.closeBtn,
                        {backgroundColor: 'green', shadowColor: 'green'},
                      ]}
                      onPress={() => setAlertModal(false)}>
                      <Text style={styles.closeBtnTxt}>Continue</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    {isError && (
                      <>
                        <View style={styles.alertIcon}>
                          {/* <FontAwesomeIcon
                        icon={faTimesCircle}
                        color={'red'}
                        size={40}
                      /> */}
                          <LottieView
                            source={require('../assets/97562-error.json')}
                            autoPlay
                            loop
                            style={{height: windowHeight * 0.08}}
                          />
                        </View>
                        <View
                          style={[
                            styles.alertMessage,
                            {backgroundColor: colors.MODAL_BACKGROUND_COLOR},
                          ]}>
                          <Text
                            style={{
                              color: 'red',
                              fontSize: 25,
                              fontWeight: 'bold',
                            }}>
                            {' '}
                            Oh no!{' '}
                          </Text>
                          <Text style={styles.alertText}>
                            {' '}
                            There was error while posting a review. Please try
                            again!{' '}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.closeBtn}
                          onPress={() => setAlertModal(false)}>
                          <Text style={styles.closeBtnTxt}>Try again</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
          </Modal>
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
        </View>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    borderColor: '#A8A8A8',
    borderRadius: 10,
    borderWidth: 1,
    width: windowWidth * 0.8,
    color: 'black',
    //height: windowHeight * 0.4,
    paddingBottom: windowHeight * 0.2,
  },
  container: {
    //width: windowWidth,
    //flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    height: 'auto',
    /* borderColor: 'red',
    borderWidth: 1, */
  },
  reviewContainer: {
    alignItems: 'center',
    flex: 1,
    //marginTop: windowWidth * 0.2,
    //bottom: windowWidth * 0.3,
  },
  waves: {
    bottom: windowHeight * 0.2,
  },
  reviewTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    //alignItems: 'center',
    //position: 'absolute',
    marginTop: windowWidth * 0.055,
  },
  arrowLeftIcon: {
    //position: 'absolute',
    marginTop: windowWidth * 0.04,
    marginHorizontal: windowWidth * 0.05,
    height: 'auto',
    width: 'auto',
  },
  btnLogout: {
    borderColor: '#A8A8A8',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    width: windowWidth * 0.4,
    height: 57,
    marginVertical: windowWidth * 0.1,
  },
  textBtnLogout: {
    textAlign: 'center',
    color: '#A8A8A8',
    fontSize: 16,
  },
  alertModal: {
    width: windowWidth,
    height: windowHeight,
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
    width: windowWidth * 0.7,
    height: windowHeight * 0.35,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  alertIcon: {
    flex: 0.7,
    justifyContent: 'flex-start',
    bottom: windowWidth * 0.05,
  },
  alertMessage: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    textAlign: 'center',
    color: '#FF413A',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: windowWidth * 0.03,
  },
  closeBtn: {
    backgroundColor: 'red',
    width: windowWidth * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    flex: 0.7,
    marginBottom: windowWidth * 0.1,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'red',
  },
  closeBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  txtSignUp: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    //marginLeft: windowWidth * 0.05,
    //top: windowHeight * 0.08,
    width: 'auto',
    height: 'auto',
    //textAlign: 'justify',
    paddingTop: windowWidth * 0.02,
    padding: windowWidth * 0.05,
    /* borderColor: 'red',
    borderWidth: 1, */
  },
});
