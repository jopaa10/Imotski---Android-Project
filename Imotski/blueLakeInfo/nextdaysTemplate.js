import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import moment from 'moment-timezone';

//redux
import {ThemeProvider} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';

const NextDaysTemplateItem = ({weatherData}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      {weatherData && weatherData.length > 0 ? (
        weatherData.map(
          (weatherData, idx) =>
            idx !== 0 && <NextDaysTemplate key={idx} data={weatherData} />,
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const NextDaysTemplate = ({data}) => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.weekView}>
        <View style={styles.textView}>
          <Text style={[styles.textDay, {color: colors.PRIMARY_TEXT_COLOR}]}>
            {moment(data.dt * 1000).format('dddd')}
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.textTemp, {color: colors.PRIMARY_TEXT_COLOR}]}>
            {data.temp.day}
            {'°C'}
          </Text>
        </View>
        <View style={styles.textView}>
          <Image
            style={styles.weekIcon}
            source={{
              uri:
                'http://openweathermap.org/img/wn/' +
                data.weather[0].icon +
                '@2x.png',
            }}
          />
        </View>
      </View>
    </ThemeProvider>
  );
};
export default NextDaysTemplateItem;

const styles = StyleSheet.create({
  weekView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDay: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  textTemp: {
    marginVertical: 10,
    fontSize: 14,
    color: 'black',
  },
  weekIcon: {
    textAlignVertical: 'center',
    width: 50,
    height: 50,
  },
});
