import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import React from 'react';

import moment from 'moment-timezone';

const FutureWeather = ({weatherData}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {weatherData && weatherData.length > 0 ? (
        weatherData.map(
          (weatherData, idx) =>
            idx !== 0 && <FutureWeatherItem key={idx} data={weatherData} />,
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FutureWeatherItem = ({data}) => {
  return (
    <View style={styles.viewWeatherTemp}>
      <Text style={styles.hour}>{moment(data.dt * 1000).format('HH:mm')}</Text>

      <Image
        source={{
          uri:
            'http://openweathermap.org/img/wn/' +
            data.weather[0].icon +
            '@2x.png',
        }}
        style={styles.imageIcons}
      />
      <Text style={styles.temp}>{data.temp + '°C'}</Text>
    </View>
  );
};

export default FutureWeather;

const styles = StyleSheet.create({
  tomorrowW: {
    fontSize: 15,
    color: '#8E8E8E',
  },
  followingDaysW: {
    fontSize: 15,
    color: '#1F83BB',
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.22,
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
