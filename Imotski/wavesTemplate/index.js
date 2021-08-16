import React from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native';

//svg, path
import Svg, {Path} from 'react-native-svg';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

//navigation
import {useNavigation} from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

const Waves = props => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Svg
        style={styles.waves}
        viewBox={`0 0 ${windowWidth} 104`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M-198 55.7773L-185.067 53.7851C-170.84 51.7929 -143.68 47.8085 -116.52 43.8242C-90.6533 39.8398 -63.4933 36.8515 -36.3333 45.8163C-9.17334 55.7773 17.9867 77.6913 45.1467 88.6483C71.0133 100.601 98.1733 100.601 125.333 96.6171C152.493 92.6327 179.653 85.66 206.813 77.6913C232.68 70.7186 259.84 62.7499 274.067 58.7655L287 55.7773V-1H274.067C259.84 -1 232.68 -1 206.813 -1C179.653 -1 152.493 -1 125.333 -1C98.1733 -1 71.0133 -1 45.1467 -1C17.9867 -1 -9.17334 -1 -36.3333 -1C-63.4933 -1 -90.6533 -1 -116.52 -1C-143.68 -1 -170.84 -1 -185.067 -1H-198V55.7773Z"
          fill="#1F83BB"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M-1 98.3424L11.0213 90.3047C24.2447 81.1187 49.4894 63.8949 74.734 58.1537C99.9787 51.2642 124.021 55.8572 149.266 66.1914C174.511 77.6739 199.755 94.8977 225 100.639C250.245 107.528 275.489 102.935 300.734 94.8977C325.979 85.7117 351.223 73.0809 375.266 60.4502C400.511 46.6712 425.755 34.0405 438.979 27.151L451 21.4097V-5H438.979C425.755 -5 400.511 -5 375.266 -5C351.223 -5 325.979 -5 300.734 -5C275.489 -5 250.245 -5 225 -5C199.755 -5 174.511 -5 149.266 -5C124.021 -5 99.9787 -5 74.734 -5C49.4894 -5 24.2447 -5 11.0213 -5H-1V98.3424Z"
          fill="#2A99D8"
        />
        <Text style={styles.titleExploreIm}>{props.title}</Text>
      </Svg>
      <Pressable
        style={styles.arrowLeftIcon}
        onPress={() => navigation.navigate(props.navigate)}>
        <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
      </Pressable>
    </View>
  );
};

export default Waves;

const styles = StyleSheet.create({
  waves: {
    width: windowWidth,
    height: 109,
    paddingTop: 0,
  },
  titleExploreIm: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowLeftIcon: {
    position: 'absolute',
    marginTop: windowWidth * 0.055,
    marginHorizontal: windowWidth * 0.05,
  },
});
