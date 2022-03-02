import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import moment from 'moment-timezone';

const NextDaysTemplateItem = ({weatherData}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      {weatherData && weatherData.length > 0 ? (
        weatherData.map(
          (weatherData, idx) =>
            idx !== 0 && (
              <NextDaysTemplateRedLake key={idx} data={weatherData} />
            ),
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const NextDaysTemplateRedLake = ({data}) => {
  return (
    <View style={styles.weekView}>
      <View style={styles.textView}>
        <Text style={styles.textDay}>
          {moment(data.dt * 1000).format('dddd')}
        </Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.textTemp}>
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
  },
  textTemp: {
    marginVertical: 10,
    fontSize: 14,
  },
  weekIcon: {
    textAlignVertical: 'center',
    width: 50,
    height: 50,
  },
});
