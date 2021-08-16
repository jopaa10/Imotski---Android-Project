import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

//blue lake template
import {TemplateInfo} from '../infoTemplate';

//moment converter
import moment from 'moment-timezone';

import {ScrollView} from 'react-native-gesture-handler';
import FutureWeather from './futureWeather';
import Next48Hours from '../weatherTemplate/next48hours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Weather = () => {
  const [weatherData, setweatherData] = useState({
    uvIndex: null,
    humidity: null,
    sunset: null,
    sunrise: null,
  });

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

        //hourly data
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
            {/*<View style={styles.container}>
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
              <Text style={styles.todayW}>Next 48 hours</Text>
              <Pressable
                onPress={() => navigation.navigate('Next Days Forecast')}>
                <Text style={styles.followingDaysW}>{'Next 7 days >'}</Text>
              </Pressable>
            </View>*/}
            <Next48Hours
              navigate={'Next Days Forecast'}
              today={'Next 48 hours'}
              followingDays={'Next 7 days >'}
              weatherData={weatherData}
            />
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
  hourWeatherView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    bottom: windowWidth * 0.2,
  },
});
