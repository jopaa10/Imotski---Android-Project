import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

//drawer components
import {DrawerItem} from '@react-navigation/drawer';

//svg
import Svg, {Path} from 'react-native-svg';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUserAlt,
  faFlag,
  faInfo,
  faPhoneAlt,
  faAdjust,
} from '@fortawesome/free-solid-svg-icons';
import {UserContext} from '../App';
import {windowHeight, windowWidth} from '../constants/global';

export const DrawerContent = props => {
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  const {state, dispatch} = useContext(UserContext);

  if (state) {
    fetch('http://192.168.1.3:5000/protected', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + state,
      },
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setUserImage(data.userData.photo);
        setUserName(data.userData.name);
      });
  }

  return (
    <>
      <View style={styles.whiteContainer}>
        {!state ? (
          <>
            <TouchableOpacity onPress={() => props.navigation.navigate('User')}>
              <Image
                style={styles.image}
                source={require('../images/userPhoto.jpg')}
              />
              <Text style={styles.loginTxt}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Profile Page')}>
              <Image source={{uri: userImage}} style={styles.image} />
              <Text style={styles.loginTxt}>{userName}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Svg
        width="252"
        height="130"
        viewBox="0 0 252 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 76.8649L10.5833 62.1051C21.1667 47.3454 42.3333 17.8259 63.5 6.01806C84.6667 -5.78974 105.833 0.114158 127 20.7778C148.167 41.4415 169.333 76.8649 190.5 85.7207C211.667 94.5766 232.833 76.8649 243.417 68.009L254 59.1532V130H243.417C232.833 130 211.667 130 190.5 130C169.333 130 148.167 130 127 130C105.833 130 84.6667 130 63.5 130C42.3333 130 21.1667 130 10.5833 130H0L0 76.8649Z"
          fill="#1F83BB"
        />
      </Svg>

      <View style={styles.blueContainer}>
        <View style={{bottom: windowWidth * 0.09}}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate('Explore Imotski')}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faHome}
              color={'#fff'}
              size={20}
            />

            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate('Biokovo')}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faFlag}
              color={'#fff'}
              size={20}
            />
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate('User')}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faUserAlt}
              color={'#fff'}
              size={20}
            />
            <Text style={styles.text}>User</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.container, {marginTop: windowWidth * 0.1}]}
            onPress={() => props.navigation.navigate('Profile Page')}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faPhoneAlt}
              color={'#fff'}
              size={20}
            />
            <Text style={styles.text}>Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate('Profile Page')}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faInfo}
              color={'#fff'}
              size={20}
            />
            <Text style={styles.text}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.container, {marginTop: windowWidth * 0.1}]}
            onPress={() => props.navigation.navigate('Profile Page')}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faAdjust}
              color={'#fff'}
              size={20}
            />
            <Text style={styles.text}>Dark Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  blueContainer: {
    height: windowHeight,
    backgroundColor: '#1F83BB',
  },
  container: {
    height: windowHeight * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: windowWidth * 0.1,
  },
  text: {
    color: 'white',
    marginLeft: windowWidth * 0.05,
    fontSize: 16,
  },
  whiteContainer: {
    backgroundColor: 'white',
    height: windowHeight * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.12,
    borderRadius: Math.round((windowWidth + windowHeight) / 2),
    borderWidth: 1,
  },
  loginTxt: {
    color: '#828282',
    textAlign: 'center',
    paddingTop: windowWidth * 0.02,
  },
});
