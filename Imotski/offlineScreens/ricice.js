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

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleDown, faReply} from '@fortawesome/free-solid-svg-icons';

//useNav hookd
import {useNavigation} from '@react-navigation/core';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//animatable
import * as Animatable from 'react-native-animatable';
import {SwiperTemplate} from '../swiperTemplate';

//stack navigator
import {createStackNavigator} from '@react-navigation/stack';

//stack navigator
const RiciceStack = createStackNavigator();

//stack screens
import {GreenLakeInfo} from '../greenLakeInfo';
import {GalipovacInfo} from '../galipovacInfo';

//places which user can visited - Imotski screen
export const RiciceInfo = () => (
  <RiciceStack.Navigator>
    <RiciceStack.Screen
      name="Explore Ricice"
      component={Ricice}
      options={{headerShown: false}}
    />
    <RiciceStack.Screen
      name="Green Lake Info"
      component={GreenLakeInfo}
      options={{headerShown: false}}
    />
    <RiciceStack.Screen
      name="Galipovac Info"
      component={GalipovacInfo}
      options={{headerShown: false}}
    />
  </RiciceStack.Navigator>
);

export const Ricice = () => {
  const navigation = useNavigation();
  const [displayAnimation, setDisplayAnimation] = useState('flex');

  const DATA = [
    {
      key: 1,
      name: 'Green Lake',
      image: require('../images/greenLake.jpg'),
      screen: 'Green Lake Info',
      bgColor: '#6ba4a1',
      fontAwColor: 'white',
      fontAwBgColor: '#6ba4a1',
      display: displayAnimation,
    },
    {
      key: 2,
      name: 'Galipovac',
      image: require('../images/galipovacView.jpg'),
      screen: 'Galipovac Info',
      bgColor: 'rgb(126,150,85)',
      fontAwColor: 'white',
      fontAwBgColor: 'rgb(126,150,85)',
      display: 'none',
    },
  ];

  return (
    <>
      <SwiperTemplate
        content={DATA.map((item, index, indexAnimated) => (
          <>
            <View key={index}>
              <Image style={styles.image} source={item.image} />
              <View
                style={{
                  width: windowWidth,
                }}>
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
            </View>
            <Animatable.View
              key={indexAnimated}
              animation={'bounce'}
              easing={'ease-out'}
              iterationCount={3}
              onAnimationEnd={() => setDisplayAnimation('none')}
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
        ))}
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
