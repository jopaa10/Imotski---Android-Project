import {faCloud} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

//waves template
import Waves from '../wavesTemplate';
import NextDaysTemplateItem from './nextdaysTemplate';

export const NextDaysForecast = () => {
  const [dailyData, setDailyData] = useState([]);

  const dailyWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=43.4506&lon=17.2100&units=metric&appid=e903bab07386bca9e1753e78018f8091`,
    )
      .then(res => res.json())
      .then(data => {
        setDailyData(data.daily);
      });
  };

  useEffect(() => {
    dailyWeather();
  }, []);

  const weekForecast = [
    {
      key: 1,
      day: 'Monday',
      temp: '30°C',
    },
    {
      key: 2,
      day: 'Monday',
      temp: '30°C',
    },
    {
      key: 3,
      day: 'Monday',
      temp: '30°C',
    },
    {
      key: 4,
      day: 'Monday',
      temp: '30°C',
    },
    {
      key: 5,
      day: 'Monday',
      temp: '30°C',
    },
    {
      key: 6,
      day: 'Monday',
      temp: '30°C',
    },
    {
      key: 7,
      day: 'Monday',
      temp: '30°C',
    },
  ];

  return (
    <ScrollView style={[styles.container, {flexDirection: 'column'}]}>
      <Waves title={'WEATHER FORECAST - BLUE LAKE'} navigate={'Weather Data'} />
      <View>
        <Text style={styles.titleNextDaysForecast}>Next 7 days forecast</Text>
      </View>
      <NextDaysTemplateItem weatherData={dailyData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleNextDaysForecast: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 30,
  },
});
