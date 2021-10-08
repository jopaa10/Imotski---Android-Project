import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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

//waves
import Waves from '../wavesTemplate';
import {ScrollView} from 'react-native-gesture-handler';

//async storage to get token
import AsyncStorage from '@react-native-async-storage/async-storage';

const commentStack = createStackNavigator();

export const CommentNav = () => {
  return (
    <commentStack.Navigator>
      <commentStack.Screen
        name="Comment Section"
        options={{headerShown: false}}
        component={CommentScreen}
      />
    </commentStack.Navigator>
  );
};

export const CommentScreen = () => {
  const [input, setInput] = useState('');
  const navigation = useNavigation();

  const submitComment = async () => {
    //navigation.navigate('Blue Lake Info');
    await fetch('http://192.168.1.2:5000/createcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
      body: JSON.stringify({
        body: input,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert('There was an error posting the review. Please try again!');
        } else {
          alert('You have successfully posted a review. Thank You!');
        }
      })
      .catch(error => {
        console.log(error);
      });
    //setInput('');
  };

  return (
    <>
      <ScrollView
        style={{backgroundColor: 'white', height: windowHeight, flex: 1}}>
        <Waves />
        <Pressable
          style={styles.arrowLeftIcon}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
        </Pressable>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}> REVIEW - BLUE LAKE </Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.commentBox}
            keyboardType={'default'}
            multiline={true}
            onChangeText={text => setInput(text)}
            blurOnSubmit={true}
            onSubmitEditing={() => {
              setInput('');
              submitComment();
            }}
            value={input}
            placeholder={'Write your experience'}
          />
          <View>
            <Pressable style={styles.btnLogout} onPress={submitComment}>
              <Text style={styles.textBtnLogout}>Done</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowWidth * 0.1,
  },
  reviewContainer: {
    alignItems: 'center',
    flex: 1,
    //marginTop: windowWidth * 0.2,
    bottom: windowWidth * 0.3,
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
    position: 'absolute',
    marginTop: windowWidth * 0.055,
    marginHorizontal: windowWidth * 0.05,
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
});
