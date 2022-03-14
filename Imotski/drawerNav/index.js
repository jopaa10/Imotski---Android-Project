import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';

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
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import {UserContext} from '../App';

//dimensions
import {windowHeight, windowWidth} from '../constants/global';

//theme elements
import styled, {ThemeProvider, useTheme} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {switchTheme} from '../reducers/themeActions';
import {lightTheme, darkTheme} from '../DarkMode/Theme';

//local storage for theme
import AsyncStorage from '@react-native-async-storage/async-storage';

//switch dark mode
import SwitchWithIcons from 'react-native-switch-with-icons';

export const DrawerContent = props => {
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  const {state} = useContext(UserContext);

  //const [isDarkTheme, setDarkTheme] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const theme = useSelector(state => state.themeReducer.theme);
  const dispatch = useDispatch();

  const {colors} = useTheme();

  const [bgColor, setBgColor] = useState(colors.PRIMARY_BACKGROUND_COLOR);
  const [bgColorWhite, setBgWhiteColor] = useState(
    colors.SECUNDARY_BACKGROUND_COLOR,
  );

  const toggleSwitchDark = async () => {
    setIsEnabled(true);
    dispatch(switchTheme(darkTheme));
    await AsyncStorage.setItem('theme', darkTheme.mode);

    //setBgColor(colors.PRIMARY_BACKGROUND_COLOR);
    //setBgWhiteColor(colors.SECUNDARY_BACKGROUND_COLOR);
  };

  const toggleSwitchLight = async () => {
    setIsEnabled(false);
    dispatch(switchTheme(lightTheme));
    await AsyncStorage.setItem('theme', lightTheme.mode);

    //setBgColor(colors.PRIMARY_BACKGROUND_COLOR);
    //setBgWhiteColor(colors.SECUNDARY_BACKGROUND_COLOR);
  };

  if (state) {
    fetch('http://192.168.1.2:5000/protected', {
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

  //console.log(theme);

  useEffect(async () => {
    const getTheme = await AsyncStorage.getItem('theme');

    console.log(getTheme);

    if (getTheme === 'dark') {
      setIsEnabled(true);
    } else if (getTheme === 'light') {
      setIsEnabled(false);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <View
          style={[
            styles.whiteContainer,
            {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
          ]}>
          {!state ? (
            <>
              <TouchableOpacity
                style={{bottom: windowWidth * 0.05}}
                onPress={() => props.navigation.navigate('Sign In')}>
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
                style={{bottom: windowWidth * 0.05}}
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
          style={{bottom: windowWidth * 0.25}}
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 76.8649L10.5833 62.1051C21.1667 47.3454 42.3333 17.8259 63.5 6.01806C84.6667 -5.78974 105.833 0.114158 127 20.7778C148.167 41.4415 169.333 76.8649 190.5 85.7207C211.667 94.5766 232.833 76.8649 243.417 68.009L254 59.1532V130H243.417C232.833 130 211.667 130 190.5 130C169.333 130 148.167 130 127 130C105.833 130 84.6667 130 63.5 130C42.3333 130 21.1667 130 10.5833 130H0L0 76.8649Z"
            fill={colors.PRIMARY_BACKGROUND_COLOR}
          />
        </Svg>

        <View
          style={[
            styles.blueContainer,
            {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
          ]}>
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
              onPress={() => props.navigation.navigate('MarkedPlaces')}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faFlag}
                color={'#fff'}
                size={20}
              />
              <Text style={styles.text}>Info</Text>
            </TouchableOpacity>
            {!state ? (
              <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate('Sign In')}>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faUserAlt}
                  color={'#fff'}
                  size={20}
                />
                <Text style={styles.text}>User</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate('Profile Page')}>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faUserAlt}
                  color={'#fff'}
                  size={20}
                />
                <Text style={styles.text}>User</Text>
              </TouchableOpacity>
            )}

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

            <View
              style={[
                styles.container,
                {marginTop: windowWidth * 0.1, marginLeft: windowWidth * 0.1},
              ]}>
              {/*  <FontAwesomeIcon
              style={styles.icon}
              icon={faAdjust}
              color={'#fff'}
              size={20}
            /> */}

              {theme.mode === 'light' && isEnabled === false ? (
                <>
                  {/* <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    style={[styles.icon, {marginLeft: windowWidth * 0.07}]}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitchDark}
                    value={isEnabled}
                  /> */}

                  <FontAwesomeIcon icon={faAdjust} color={'#fff'} size={20} />
                  <Text style={[styles.text]}>Dark Mode</Text>

                  <View style={{marginLeft: windowWidth * 0.08}}>
                    <SwitchWithIcons
                      value={isEnabled}
                      onValueChange={toggleSwitchDark}
                      iconColor={{
                        true: 'rgb(247, 202, 0)',
                        false: 'rgb(9, 33, 71)',
                      }}
                      icon={{
                        true: require('../images/sunIcon.png'),
                        false: require('../images/moonIcon.png'),
                      }}
                    />
                  </View>
                </>
              ) : (
                <>
                  {/* <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    style={[styles.icon, {marginLeft: windowWidth * 0.07}]}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitchLight}
                    value={isEnabled}
                    
                  /> */}
                  <FontAwesomeIcon icon={faAdjust} color={'#fff'} size={20} />
                  <Text style={[styles.text]}>Light Mode</Text>

                  <View style={{marginLeft: windowWidth * 0.08}}>
                    <SwitchWithIcons
                      value={isEnabled}
                      onValueChange={toggleSwitchLight}
                      iconColor={{
                        true: 'rgb(247, 202, 0)',
                        false: 'rgb(9, 33, 71)',
                      }}
                      icon={{
                        true: require('../images/sunIcon.png'),
                        false: require('../images/moonIcon.png'),
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  blueContainer: {
    height: windowHeight,
    backgroundColor: 'white',
    bottom: windowWidth * 0.25,
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
    height: windowHeight * 0.37,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: windowWidth * 0.01,
    borderColor: 'black',
    borderWidth: 1,
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
