import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSun, faCloudSun, faWater} from '@fortawesome/free-solid-svg-icons';

//navigation
import {useNavigation} from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Next48Hours = ({weatherData, navigate, today, followingDays}) => {
  const navigation = useNavigation();

  const weatherDataArray = [
    {
      key: 1,
      icon: faSun,
      text: 'UV Index',
      weatherD: weatherData.uvIndex,
    },
    {
      key: 2,
      icon: faCloudSun,
      text: 'Sunrise',
      weatherD: weatherData.sunrise,
    },
    {
      key: 3,
      icon: faWater,
      text: 'Humidty',
      weatherD: weatherData.humidity,
    },
    {
      key: 4,
      icon: faCloudSun,
      text: 'Sunset',
      weatherD: weatherData.sunset,
    },
  ];

  return (
    <>
      <View style={styles.container}>
        {weatherDataArray.map(item => (
          <>
            <View style={styles.viewWeatherInfo}>
              <FontAwesomeIcon icon={item.icon} size={40} />
              <Text style={styles.textWeatherInfo}>{item.text}</Text>
              <Text style={styles.weatherInfo}>{item.weatherD}</Text>
            </View>
          </>
        ))}
      </View>
      <View style={styles.containerWeatherByHour}>
        <Text style={styles.todayW}>{today}</Text>
        <Pressable onPress={() => navigation.navigate(navigate)}>
          <Text style={styles.followingDaysW}>{followingDays}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Next48Hours;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 'auto',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    bottom: windowWidth * 0.25,
    alignItems: 'center',
  },
  containerWeatherByHour: {
    flexDirection: 'row',
    width: windowWidth,
    height: 'auto',
    bottom: windowWidth * 0.28,
    marginLeft: windowWidth * 0.1,
  },
  viewWeatherInfo: {
    width: windowWidth * 0.45,
    right: windowWidth * 0.05,
    alignItems: 'center',
  },
  textWeatherInfo: {
    bottom: windowWidth * 0.1,
    left: windowWidth * 0.15,
    fontSize: 12,
    textAlign: 'center',
  },
  weatherInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    left: windowWidth * 0.15,
    bottom: windowWidth * 0.1,
  },
  todayW: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 20,
  },
  followingDaysW: {
    fontSize: 15,
    color: '#1F83BB',
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.3,
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
