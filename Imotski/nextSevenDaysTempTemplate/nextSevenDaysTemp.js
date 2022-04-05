import {faCloud, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
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
import {useTheme} from 'styled-components';
import Animated from 'react-native-reanimated';

import * as Animatable from 'react-native-animatable';

export const NextSevenDaysForecastTemplate = ({
  placeTempLat,
  placeTempLong,
  bgColor,
}) => {
  const [dailyData, setDailyData] = useState([]);
  const navigation = useNavigation();

  const {colors} = useTheme();

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
            backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
          },
        ]}>
        {/* <Waves navigate={'Weather Data'} /> */}
        <View
          style={{
            height: windowHeight * 0.28,
            backgroundColor: bgColor,
          }}>
          <View
            style={{
              height: 'auto',
              /* borderColor: 'red',
              borderWidth: 2, */
              paddingBottom: windowWidth * 0.05,
            }}>
            <TouchableOpacity
              style={styles.arrowLeftIcon}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
            </TouchableOpacity>
            <Animatable.Text
              animation={'bounceIn'}
              delay={700}
              duration={600}
              style={styles.titleNextDaysForecast}>
              Next 7 days forecast
            </Animatable.Text>
          </View>
        </View>

        <View
          style={{
            /* borderColor: 'blue',
            borderWidth: 2, */
            bottom: windowWidth * 0.3,
            height: 'auto',
          }}>
          <View
            style={{
              width: windowWidth,
              aspectRatio: 375 / 180,
              height: 'auto',
              /* borderColor: 'red',
              borderWidth: 1, */
            }}>
            <Svg
              style={styles.waves}
              width={'100%'}
              height={'100%'}
              viewBox={`0 0 375 180`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <G filter="url(#filter0_i_718_2)">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-120 216L-94.375 184.436C-68.75 152.871 -17.5 89.7421 33.75 79.2206C85 68.6991 122.074 105.524 173.324 89.7421C224.574 73.9599 290 5.57019 341.25 0.309446C392.5 -4.9513 443.75 58.1776 469.375 89.7421L495 121.307V216H469.375C443.75 216 392.5 216 341.25 216C290 216 238.75 216 187.5 216C136.25 216 85 216 33.75 216C-17.5 216 -68.75 216 -94.375 216H-120Z"
                  fill={colors.SECUNDARY_BACKGROUND_COLOR}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-138 216L-112.375 184.436C-86.75 152.871 -35.5 89.7421 15.75 79.2206C67 68.6991 104.074 105.524 155.324 89.7421C206.574 73.9599 272 5.57019 323.25 0.309446C374.5 -4.9513 425.75 58.1776 451.375 89.7421L477 121.307V216H451.375C425.75 216 374.5 216 323.25 216C272 216 220.75 216 169.5 216C118.25 216 67 216 15.75 216C-35.5 216 -86.75 216 -112.375 216H-138Z"
                />
              </G>
            </Svg>
          </View>
          <View
            animation={'fadeInRight'}
            duration={700}
            style={styles.nextSevenDaysForecast}>
            <NextDaysTemplateItem weatherData={dailyData} />
          </View>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'white',
    height: windowHeight,
    width: windowWidth,
    /* borderColor: 'red',
    borderWidth: 1, */
  },
  titleNextDaysForecast: {
    fontSize: 20,
    fontWeight: 'bold',
    //padding: 30,
    color: 'white',
    width: windowWidth * 0.7,
    marginLeft: windowWidth * 0.07,
    marginVertical: windowWidth * 0.05,
  },
  waves: {
    //bottom: windowHeight * 0.18,
    //height: windowHeight * 0.2,
  },
  arrowLeftIcon: {
    marginTop: windowWidth * 0.13,
    marginHorizontal: windowWidth * 0.05,
  },
  nextSevenDaysForecast: {
    bottom: windowWidth * 0.05,
    //marginBottom: windowWidth * 0.3,
    //marginTop: windowWidth * 0.05,
    height: 'auto',
    /* borderColor: 'red',
    borderWidth: 1, */
    backgroundColor: 'white',
  },
});
