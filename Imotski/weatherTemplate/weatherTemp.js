import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

//blue lake template
import {TemplateInfo} from '../infoTemplate';

//moment converter
import moment from 'moment-timezone';

import {ScrollView} from 'react-native-gesture-handler';
import FutureWeather from '../blueLakeInfo/futureWeather';
import Next48Hours from './next48hours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const WeatherTemplate = ({
  city,
  sight,
  image,
  weatherLat,
  weatherLong,
  navigate,
  txtColor,
}) => {
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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherLat}&lon=${weatherLong}&units=metric&appid=e903bab07386bca9e1753e78018f8091`,
    )
      .then(res => res.json())
      .then(data => {
        //console.log(moment(data.hourly[26].dt * 1000).format('HH:mm'));

        console.log(data.weather);

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
        image={image}
        city={city}
        sight={sight}
        weather={
          <>
            <Next48Hours
              navigate={navigate}
              today={'Next 48 hours'}
              followingDays={'Next 7 days >'}
              txtColor={txtColor}
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
    height: windowHeight * 0.26,
    bottom: windowWidth * 0.25,
    paddingTop: windowWidth * 0.08,
  },
});
