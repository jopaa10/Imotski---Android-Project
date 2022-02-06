import React, {useRef, useEffect, useState} from 'react';
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

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faReply} from '@fortawesome/free-solid-svg-icons';

//useNav hookd
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Swiper from 'react-native-swiper';

export const Imotski = () => {
  const navigation = useNavigation();
  const viewRef = useRef(null);
  const textRef = useRef(null);

  const [ref, setViewRef] = useState(null);

  //measure where is second view
  const [measureView, setMeasure] = useState({
    width: null,
    height: null,
  });

  let index = 0;

  const DATA = [
    {
      key: 1,
      name: 'Blue Lake',
      image: require('../images/blueLake.jpg'),
      screen: 'Blue Lake Info',
      ref: null,
      bgColor: '#1F83BB',
      fontAwColor: '#1F83BB',
      fontAwBgColor: 'white',
    },
    {
      key: 2,
      name: 'Red Lake',
      image: require('../images/redLake.jpg'),
      screen: 'Red Lake Info',
      ref: viewRef,
      bgColor: '#CA9A8C',
      fontAwColor: 'white',
      fontAwBgColor: '#CA9A8C',
    },
    {
      key: 3,
      name: 'Fortress Topana',
      image: require('../images/topanaFortressH.jpg'),
      screen: '',
      ref: viewRef,
      bgColor: '#CA9A8C',
    },
  ];

  /*   const scrollToView = index => {
    //console.log(index);
    ref.scrollTo({
      x: 0,
      y: windowHeight * index,
      animated: true,
    });
  }; */

  /* const scrollUpDown = index => {
    console.log(index);

    if (index === 3) {
      ref.scrollTo({
        x: 0,
        y: windowHeight * (index - 2),
        animated: true,
      });
    }
    if (index === 1) {
      ref.scrollTo({
        x: 0,
        y: windowHeight * (index - 1),
        animated: true,
      });
    } else {
      ref.scrollTo({
        x: 0,
        y: windowHeight * (index - 1),
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (viewRef.current && textRef.current) {
      textRef.current.measureLayout(viewRef.current, (width, height) => {
        setMeasure({width: width, height: height});
      });
    }
  }, [measureView]); */

  return (
    <>
      <Swiper
        horizontal={false}
        loop={false}
        showsHorizontalScrollIndicator={true}
        paginationStyle={{
          justifyContent: 'flex-start',
          paddingTop: windowWidth * 0.22,
        }}
        dot={
          <View
            style={{
              backgroundColor: '#fff',
              width: 9,
              height: 9,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#8E8E8E',
              width: 9,
              height: 9,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }>
        {DATA.map((item, index) => (
          <View key={index}>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.txt}>{item.name}</Text>
            <Pressable
              style={[styles.btn, {backgroundColor: item.bgColor}]}
              onPress={() => navigation.navigate(item.screen)}>
              <Text style={styles.txtBtn}>Explore</Text>
            </Pressable>
            <Pressable
              style={[styles.btnCircle, {backgroundColor: item.fontAwBgColor}]}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon
                icon={faReply}
                style={[styles.btnCircleIcon, {color: item.fontAwColor}]}
                size={30}
              />
            </Pressable>
          </View>
        ))}
      </Swiper>
      {/*  <ScrollView ref={ref => setViewRef(ref)}>
        {DATA.map(
          (item, i) => (
            (index = i),
            (
              <TouchableOpacity onPress={() => scrollToView(item.key)}>
                <View key={index} ref={item.ref}>
                  <Image style={styles.image} source={item.image} />

                   <TouchableOpacity
                    style={[
                      styles.dots,
                      {
                        backgroundColor: item.bgDot,
                      },
                    ]}
                    onPress={() => scrollUpDown((index = 1))}
                  />

                  <TouchableOpacity
                    style={[
                      styles.dots,
                      {
                        backgroundColor: item.bgDot2,
                        //top: windowWidth * 0.15,
                      },
                    ]}
                    onPress={() => scrollUpDown((index = 2))}
                  />

                  <TouchableOpacity
                    style={[
                      styles.dots,
                      {
                        backgroundColor: item.bgDot3,
                        //top: windowWidth * 0.2,
                      },
                    ]}
                    onPress={() => scrollUpDown((index = 3))}
                  /> 

                  <Text style={styles.txt}>{item.name}</Text>
                  <Pressable
                    style={[styles.btn, {backgroundColor: item.bgColor}]}
                    onPress={() => navigation.navigate(item.screen)}>
                    <Text style={styles.txtBtn}>Explore</Text>
                  </Pressable>
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
              </TouchableOpacity>
            )
          ),
        )}
      </ScrollView> */}
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
    bottom: windowWidth * 0.25,
    marginLeft: windowWidth * 0.1,
    color: 'white',
    fontSize: 24,
  },
  btn: {
    width: windowWidth * 0.6,
    height: 40,
    position: 'absolute',
    bottom: windowWidth * 0.1,
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
    bottom: windowWidth * 0.1,
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
