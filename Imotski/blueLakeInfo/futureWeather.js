import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import React from 'react';

import moment from 'moment-timezone';

//redux
import {ThemeProvider} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';

const FutureWeather = ({weatherData}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {weatherData && weatherData.length > 0 ? (
        weatherData.map(
          (weatherData, idx) =>
            idx !== 0 && (
              <FutureWeatherItem key={idx} index={idx} data={weatherData} />
            ),
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import * as Animatable from 'react-native-animatable';

const FutureWeatherItem = ({data, index}) => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <Animatable.View
      duration={600}
      delay={600 + index * 100}
      animation="fadeInRight"
      style={styles.viewWeatherTemp}>
      <Text style={[styles.hour, {color: colors.PRIMARY_TEXT_COLOR}]}>
        {moment(data.dt * 1000).format('HH:mm')}
      </Text>

      <Image
        source={{
          uri:
            'http://openweathermap.org/img/wn/' +
            data.weather[0].icon +
            '@2x.png',
        }}
        style={styles.imageIcons}
      />
      <Text style={[styles.temp, {color: colors.PRIMARY_TEXT_COLOR}]}>
        {data.temp + '°C'}
      </Text>
    </Animatable.View>
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
    width: windowWidth * 0.25,
    height: 'auto',
    alignItems: 'center',
    paddingVertical: windowWidth * 0.05,
    //marginHorizontal: 10,
    /* borderWidth: 1,
    borderColor: 'red', */
  },
  hour: {
    marginTop: windowHeight * 0.05,
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
