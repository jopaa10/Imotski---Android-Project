import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Modal} from 'react-native';

//blue lake template
import {TemplateInfo} from '../infoTemplate';

//moment converter
import moment from 'moment-timezone';

import {ScrollView} from 'react-native-gesture-handler';
import FutureWeather from '../blueLakeInfo/futureWeather';
import Next48Hours from './next48hours';
//import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

//dimension
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//weather api
import {WEATHER_API} from '@env';

export const WeatherTemplate = ({
  city,
  sight,
  image,
  weatherLat,
  weatherLong,
  navigate,
  txtColor,
  navigateBack,
}) => {
  const [weatherData, setweatherData] = useState({
    uvIndex: null,
    humidity: null,
    sunset: null,
    sunrise: null,
  });

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //weatherIcons.map(item => console.log(item.icon));

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherLat}&lon=${weatherLong}&units=metric&appid=${WEATHER_API}`,
    )
      .then(res => res.json())
      .then(data => {
        //console.log(moment(data.hourly[26].dt * 1000).format('HH:mm'));

        //console.log(data);

        if (data) {
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

          setIsLoading(false);
        }
      });
  };

  return (
    <>
      <TemplateInfo
        image={image}
        city={city}
        sight={sight}
        title={'Weather info'}
        details={
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
        navigateBack={navigateBack}
        weather={
          <>
            {/* <View
              style={{
                bottom: windowWidth * 0.3,
              }}>
              <Next48Hours
                navigate={navigate}
                today={'Next 48 hours'}
                followingDays={'Next 7 days >'}
                txtColor={txtColor}
                weatherData={weatherData}
              />
            </View> */}
            {/*  <ScrollView horizontal={true} style={styles.hourWeatherView}>
              <FutureWeather weatherData={data} />
            </ScrollView> */}
          </>
        }
        color={'grey'}
        color2={'grey'}
        color3={'grey'}
      />
      <Modal
        visible={isLoading}
        deviceHeight={'auto'}
        transparent={true}
        style={{height: windowHeight}}
        statusBarTranslucent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LottieView
              source={require('../assets/98267-bicycle.json')}
              autoPlay
              style={{height: windowHeight * 0.15}}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  hourWeatherView: {
    width: windowWidth,
    height: 'auto',
    //bottom: windowWidth * 0.2,
    paddingVertical: windowWidth * 0.05,
    //paddingTop: windowWidth * 0.08,
    /* borderColor: 'red',
    borderWidth: 1, */
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: 0,
  },
  modalView: {
    //margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    paddingTop: 0,
    alignItems: 'center',
  },
  modal: {
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //borderStyle: 'solid',
    width: windowWidth * 0.45,
    height: windowHeight * 0.2,
    alignItems: 'center',
  },
});
