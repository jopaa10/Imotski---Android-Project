import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

//fontawesome icon
import {
  faSun,
  faCloudSun,
  faWater,
  faCloud,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

//blue lake template
import {TemplateInfo} from '../infoTemplate';

//moment converter
import moment from 'moment-timezone';

//kelvin to celsius
import kelvinToCelsius from 'kelvin-to-celsius';

import {ScrollView} from 'react-native-gesture-handler';
import FutureWeather from './futureWeather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Weather = () => {
  const [weatherData, setweatherData] = useState({
    uvIndex: null,
    humidity: null,
    sunset: null,
    sunrise: null,
  });
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

  const [weatherByHour, setWeatherByHour] = useState([]);
  const [data, setData] = useState([]);

  //weatherIcons.map(item => console.log(item.icon));

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=43.4506&lon=17.2100&units=metric&appid=e903bab07386bca9e1753e78018f8091`,
    )
      .then(res => res.json())
      .then(data => {
        //console.log(moment(data.hourly[26].dt * 1000).format('HH:mm'));

        for (let i = 0; i < data.hourly.length; i++) {
          const storageData = [
            ...data.hourly,
            {
              index: i,
              dt: data.hourly[i].dt,
              temp: data.hourly[i].temp,
            },
          ];

          setWeatherByHour(storageData);
        }

        setData(data.hourly);

        setweatherData({
          uvIndex: data.current.uvi,
          humidity: data.current.humidity,
          sunset: moment
            .tz(data.current.sunset * 1000, data.timezone)
            .format('HH:mm'),
          sunrise: moment
            .tz(data.current.sunrise * 1000, data.timezone)
            .format('HH:mm'),
        });
      });
  };

  return (
    <>
      <TemplateInfo
        image={require('../images/blueLakeArticle.jpg')}
        city={'Imotski'}
        sight={'Blue Lake'}
        weather={
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
              <Text style={styles.todayW}>Today</Text>
              <Text style={styles.tomorrowW}>Tomorrow</Text>
              <Text style={styles.followingDaysW}>{'Next 7 days >'}</Text>
            </View>
            <ScrollView horizontal={true} style={styles.hourWeatherView}>
              <FutureWeather weatherData={data} />
            </ScrollView>
          </>
        }
        color={'grey'}
        color2={'grey'}
        color3={'grey'}
      />
    </>
  );
};

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
