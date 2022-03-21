import React, {useRef, useEffect, useState, Anima} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  AnimatedLayout,
  Layout,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleDown, faReply} from '@fortawesome/free-solid-svg-icons';

//useNav hookd
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Carousel from 'react-native-reanimated-carousel';

//swiper
import Swiper from 'react-native-swiper';

//animatable
import * as Animatable from 'react-native-animatable';
import {SwiperTemplate} from '../swiperTemplate';
import {SharedElement} from 'react-navigation-shared-element';

export const Imotski = () => {
  const navigation = useNavigation();
  const [displayAnimation, setDisplayAnimation] = useState('flex');

  const DATA = [
    {
      key: 1,
      name: 'Blue Lake',
      image: require('../images/blueLake.jpg'),
      screen: 'Blue Lake Info',
      bgColor: '#1F83BB',
      fontAwColor: '#1F83BB',
      fontAwBgColor: 'white',
      display: displayAnimation,
    },
    {
      key: 2,
      name: 'Red Lake',
      image: require('../images/redLake.jpg'),
      screen: 'Red Lake Info',
      bgColor: '#CA9A8C',
      fontAwColor: 'white',
      fontAwBgColor: '#CA9A8C',
      display: 'none',
    },
    {
      key: 3,
      name: 'Fortress Topana',
      image: require('../images/fortressImotski.jpg'),
      screen: 'Fortress Topana Info',
      bgColor: '#7d8572',
      fontAwBgColor: '#7d8572',
      fontAwColor: 'white',
      display: 'none',
    },
  ];

  return (
    <>
      <SwiperTemplate
        content={DATA.map((item, index, indexAnimated = 4) => {
          return (
            <>
              <View key={index}>
                <SharedElement id={`item.${item.key}.image`}>
                  <Image style={styles.image} source={item.image} />
                </SharedElement>
                <View
                  style={{
                    width: windowWidth,
                  }}>
                  <Text style={styles.txt}>{item.name}</Text>
                  <TouchableOpacity
                    style={[styles.btn, {backgroundColor: item.bgColor}]}
                    onPress={() =>
                      navigation.navigate(item.screen, {
                        screen: item.screen,
                        params: {
                          screen: 'Overview',
                          params: {
                            image: item.image,
                            id: `item.${item.key}.image`,
                          },
                        },
                      })
                    }>
                    <Text style={styles.txtBtn}>Explore</Text>
                  </TouchableOpacity>
                  <Pressable
                    style={[
                      styles.btnCircle,
                      {backgroundColor: item.fontAwBgColor},
                    ]}
                    onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                      icon={faReply}
                      style={[styles.btnCircleIcon, {color: item.fontAwColor}]}
                      size={30}
                    />
                  </Pressable>
                </View>
              </View>
              <Animatable.View
                key={indexAnimated}
                animation={'bounce'}
                easing={'ease-out'}
                iterationCount={'infinite'}
                onAnimationEnd={() => {
                  setDisplayAnimation('none');
                }}
                style={{
                  bottom: windowHeight * 0.4,
                  alignItems: 'center',
                  display: item.display,
                }}>
                <FontAwesomeIcon
                  icon={faAngleDoubleDown}
                  color={'white'}
                  size={40}
                />
                <Text style={{color: 'white'}}>Swipe down for more</Text>
              </Animatable.View>
            </>
          );
        })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  /* container: {
    width: windowWidth,
    flex: 1,
    height: windowHeight,
  }, */
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    position: 'absolute',
    bottom: windowWidth * 0.3,
    marginLeft: windowWidth * 0.1,
    color: 'white',
    fontSize: 24,
  },
  btn: {
    width: windowWidth * 0.6,
    height: 40,
    position: 'absolute',
    bottom: windowWidth * 0.15,
    backgroundColor: '#1F83BB',
    marginLeft: windowWidth * 0.1,
    borderRadius: 10,
  },
  txtBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  btnCircle: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: windowWidth * 0.15,
    right: windowWidth * 0.1,
    width: 45,
    borderRadius: 45 / 2,
    height: 40,
  },
  btnCircleIcon: {
    color: '#1F83BB',
    marginHorizontal: 8,
    marginVertical: 5,
  },
  dots: {
    /* position: 'absolute',
    top: windowWidth * 0.1, */
    width: 12,
    borderRadius: 12 / 2,
    height: 12,
    backgroundColor: 'white',
    /* right: windowWidth * 0.05, */
  },
});
