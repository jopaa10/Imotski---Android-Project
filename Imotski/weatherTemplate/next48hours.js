import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSun, faCloudSun, faWater} from '@fortawesome/free-solid-svg-icons';

//navigation
import {useNavigation} from '@react-navigation/core';
import {ThemeProvider} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//redux
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';

import * as Animatable from 'react-native-animatable';

const Next48Hours = ({
  weatherData,
  navigate,
  today,
  followingDays,
  txtColor,
}) => {
  const navigation = useNavigation();

  const {colors} = useTheme();

  const weatherDataArray = [
    {
      icon: faSun,
      text: 'UV Index',
      weatherD: weatherData.uvIndex,
    },
    {
      icon: faCloudSun,
      text: 'Sunrise',
      weatherD: weatherData.sunrise,
    },
    {
      icon: faWater,
      text: 'Humidty',
      weatherD: weatherData.humidity,
    },
    {
      icon: faCloudSun,
      text: 'Sunset',
      weatherD: weatherData.sunset,
    },
  ];

  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <>
      <ThemeProvider>
        <View
          style={[
            styles.container,
            /* {
              backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
            }, */
          ]}>
          {weatherDataArray.map((item, index) => (
            <>
              <Animatable.View
                duration={600}
                delay={700 + index * 100}
                animation="bounceIn"
                key={index}
                style={styles.viewWeatherInfo}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: windowHeight * 0.1,
                    width: windowWidth * 0.3,
                  }}>
                  <FontAwesomeIcon
                    key={index}
                    icon={item.icon}
                    size={40}
                    color={colors.FONTAWESOME_ICON_COLOR}
                  />
                  <Text
                    style={[
                      styles.textWeatherInfo,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    {item.text}
                  </Text>
                  <Text
                    style={[
                      styles.weatherInfo,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    {item.weatherD}
                  </Text>
                </View>
              </Animatable.View>
            </>
          ))}
        </View>
        <View style={styles.containerWeatherByHour}>
          <Text style={[styles.todayW, {color: colors.PRIMARY_TEXT_COLOR}]}>
            {today}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
            <Text style={[styles.followingDaysW, {color: txtColor}]}>
              {followingDays}
            </Text>
          </TouchableOpacity>
        </View>
      </ThemeProvider>
    </>
  );
};

export default Next48Hours;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    //bottom: windowWidth * 0.05,
    //backgroundColor: 'white',
    justifyContent: 'space-evenly',
    /*  borderWidth: 2,
    borderColor: 'red', */
  },
  containerWeatherByHour: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    height: 'auto',
    //bottom: windowWidth * 0.4,
    marginHorizontal: windowWidth * 0.1,
    paddingVertical: windowWidth * 0.05,
    //marginBottom: windowWidth * 0.1,
    justifyContent: 'space-around',
    /* borderWidth: 2,
    borderColor: 'red', */
  },
  viewWeatherInfo: {
    //flex: 1,
    flexDirection: 'column',
    width: windowWidth * 0.35,
    //right: windowWidth * 0.05,
    //marginRight: 20,
    alignItems: 'center',
    /* borderWidth: 2,
    borderColor: 'red', */
    paddingTop: windowWidth * 0.02,
    height: windowHeight * 0.15,
  },
  textWeatherInfo: {
    //bottom: windowWidth * 0.1,
    marginLeft: windowWidth * 0.01,
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    /* borderColor: 'purple',
    borderWidth: 2, */
    height: windowHeight * 0.04,
    width: windowWidth * 0.2,
  },
  weatherInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    right: windowWidth * 0.2,
    marginTop: windowWidth * 0.05,
    /* borderColor: 'purple',
    borderWidth: 2, */
    width: windowWidth * 0.2,
    textAlign: 'center',
  },
  todayW: {
    fontSize: 15,
    fontWeight: 'bold',
    //marginRight: 20,
    //bottom: windowWidth * 0.03,
  },
  followingDaysW: {
    fontSize: 15,
    color: '#1F83BB',
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.3,
    //paddingTop: windowWidth * 0.05,
    //bottom: windowWidth * 0.03,
  },
  hourWeatherView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    bottom: windowWidth * 0.2,
  },
  viewWeatherTemp: {
    width: 50,
    height: 200,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  hour: {
    marginTop: 20,
    fontSize: 15,
    bottom: windowWidth * 0.06,
  },
  temp: {
    fontSize: 13,
    marginTop: 20,
  },
  imageIcons: {
    width: 100,
    height: 50,
  },
});
