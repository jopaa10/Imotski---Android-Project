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
import {SafeAreaView} from 'react-native-safe-area-context';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//animatable
import * as Animatable from 'react-native-animatable';
import {SwiperTemplate} from '../swiperTemplate';

//stack nav
import {createStackNavigator} from '@react-navigation/stack';

//stack screens
import {DvaOkaInfo} from '../dvaOkaInfo';
import {BadnjeviceInfo} from '../badnjeviceInfo';
import {GreenCathedralInfo} from '../zelenaKatedralaInfo';

//stack navigator
const ProlozacStack = createStackNavigator();

//places which user can visited - Imotski screen
export const ProlozacInfo = () => (
  <ProlozacStack.Navigator>
    <ProlozacStack.Screen
      name="Explore Prolozac"
      component={Prolozac}
      options={{headerShown: false}}
    />
    <ProlozacStack.Screen
      name="Green Cathedral Info"
      component={GreenCathedralInfo}
      options={{headerShown: false}}
    />
    <ProlozacStack.Screen
      name="Dva oka Info"
      component={DvaOkaInfo}
      options={{headerShown: false}}
    />
    <ProlozacStack.Screen
      name="Badnjevice Canjon Info"
      component={BadnjeviceInfo}
      options={{headerShown: false}}
    />
  </ProlozacStack.Navigator>
);

export const Prolozac = () => {
  const navigation = useNavigation();
  const [displayAnimation, setDisplayAnimation] = useState('flex');

  const DATA = [
    {
      key: 1,
      name: 'Green Cathedral',
      image: require('../images/zelenaKatedrala.jpg'),
      screen: 'Green Cathedral Info',
      bgColor: '#a69244',
      fontAwColor: '#a69244',
      fontAwBgColor: 'white',
      display: displayAnimation,
    },
    {
      key: 2,
      name: 'Dva Oka',
      image: require('../images/dvaOkaH.jpg'),
      screen: 'Dva oka Info',
      bgColor: '#866926',
      fontAwColor: 'white',
      fontAwBgColor: '#866926',
      display: 'none',
    },
    {
      key: 3,
      name: 'Badnjevice Kanjon',
      image: require('../images/badnjevice.jpg'),
      screen: 'Badnjevice Canjon Info',
      bgColor: '#adbab3',
      fontAwBgColor: '#adbab3',
      fontAwColor: 'white',
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
