import {faCloud, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

//waves template
import Waves from '../wavesTemplate';
import NextDaysTemplateItem from '../blueLakeInfo/nextdaysTemplate';

//svg
import Svg, {Defs, G, Path} from 'react-native-svg';

//dimensions
import {windowHeight, windowWidth} from '../constants/global';

import {ThemeProvider, useNavigation} from '@react-navigation/native';

//redux
import {useSelector} from 'react-redux';

export const NextSevenDaysForecastTemplate = ({
  placeTempLat,
  placeTempLong,
  bgColor,
}) => {
  const [dailyData, setDailyData] = useState([]);
  const navigation = useNavigation();

  const dailyWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${placeTempLat}&lon=${placeTempLong}&units=metric&appid=e903bab07386bca9e1753e78018f8091`,
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

  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        style={[
          styles.container,
          {
            flexDirection: 'column',
            backgroundColor: theme.SECUNDARY_BACKGROUND_COLOR,
          },
        ]}>
        {/* <Waves navigate={'Weather Data'} /> */}
        <View
          style={{
            height: windowHeight * 0.32,
            backgroundColor: bgColor,
          }}>
          <TouchableOpacity
            style={styles.arrowLeftIcon}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
          </TouchableOpacity>
          <Text style={styles.titleNextDaysForecast}>Next 7 days forecast</Text>
        </View>
        <Svg
          style={styles.waves}
          width="375"
          height={windowHeight * 0.21}
          viewBox={`0 0 375 ${windowHeight * 0.21}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <G filter="url(#filter0_i_718_2)">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
              fill={theme.SECUNDARY_BACKGROUND_COLOR}
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
            />
          </G>
        </Svg>
        <View style={styles.nextSevenDaysForecast}>
          <NextDaysTemplateItem weatherData={dailyData} />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: windowHeight,
  },
  titleNextDaysForecast: {
    fontSize: 20,
    fontWeight: 'bold',
    //padding: 30,
    color: 'white',
    width: windowWidth * 0.7,
    marginLeft: windowWidth * 0.07,
    marginTop: windowWidth * 0.05,
  },
  waves: {
    bottom: windowHeight * 0.2,
    //height: windowHeight * 0.2,
  },
  arrowLeftIcon: {
    marginTop: windowWidth * 0.15,
    marginHorizontal: windowWidth * 0.05,
  },
  nextSevenDaysForecast: {
    bottom: windowWidth * 0.35,
  },
});
