import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';

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

const Next48Hours = ({
  weatherData,
  navigate,
  today,
  followingDays,
  txtColor,
}) => {
  const navigation = useNavigation();

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
        <View style={styles.container}>
          {weatherDataArray.map((item, index) => (
            <>
              <View key={index} style={styles.viewWeatherInfo}>
                <FontAwesomeIcon
                  key={index}
                  icon={item.icon}
                  size={40}
                  color={theme.FONTAWESOME_ICON_COLOR}
                />
                <Text
                  style={[
                    styles.textWeatherInfo,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.weatherInfo,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {item.weatherD}
                </Text>
              </View>
            </>
          ))}
        </View>
        <View style={styles.containerWeatherByHour}>
          <Text style={[styles.todayW, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {today}
          </Text>
          <Pressable onPress={() => navigation.navigate(navigate)}>
            <Text style={[styles.followingDaysW, {color: txtColor}]}>
              {followingDays}
            </Text>
          </Pressable>
        </View>
      </ThemeProvider>
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
    color: 'black',
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
