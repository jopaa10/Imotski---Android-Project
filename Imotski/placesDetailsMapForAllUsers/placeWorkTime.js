import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'styled-components';

const PlaceWorkTime = ({workDay}) => {
  console.log(workDay);

  const {colors} = useTheme();

  return (
    <View style={{paddingTop: 5}}>
      {workDay !== undefined ? (
        workDay.weekday_text.map((item, index) => (
          <Text
            key={index}
            style={[
              styles.openingHoursText,
              {color: colors.PRIMARY_TEXT_COLOR},
            ]}>
            {item}
          </Text>
        ))
      ) : (
        <View>
          <Text style={{color: colors.PRIMARY_TEXT_COLOR}}>
            There is no working time available for this place!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  openingHours: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openingHoursText: {
    fontSize: 15,
  },
});

export default PlaceWorkTime;
