import React, {useState} from 'react';
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

//create stack nav
import {createStackNavigator} from '@react-navigation/stack';

//stack screens
import {SkywalkBiokovoInfo} from '../skywalkBiokovoInfo';
import {VosacBiokovoInfo} from '../vosacBiokovoInfo';
import {StJureInfo} from '../svJureBiokovoInfo';

//stack navigator
const BiokovoStack = createStackNavigator();

//places which user can visited - Imotski screen
export const BiokovoInfo = () => (
  <BiokovoStack.Navigator>
    <BiokovoStack.Screen
      name="Explore Biokovo"
      component={Biokovo}
      options={{headerShown: false}}
    />
    <BiokovoStack.Screen
      name="Skywalk Biokovo Info"
      component={SkywalkBiokovoInfo}
      options={{headerShown: false}}
    />
    <BiokovoStack.Screen
      name="Vosac Biokovo Info"
      component={VosacBiokovoInfo}
      options={{headerShown: false}}
    />
    <BiokovoStack.Screen
      name="St Jure Biokovo Info"
      component={StJureInfo}
      options={{headerShown: false}}
    />
  </BiokovoStack.Navigator>
);

export const Biokovo = () => {
  const navigation = useNavigation();
  const [displayAnimation, setDisplayAnimation] = useState('flex');

  const DATA = [
    {
      key: 1,
      name: 'Skywalk Biokovo',
      image: require('../images/skywalkBiokovo.jpg'),
      screen: 'Skywalk Biokovo Info',
      bgColor: '#1F83BB',
      fontAwColor: '#1F83BB',
      fontAwBgColor: 'white',
      display: displayAnimation,
    },
    {
      key: 2,
      name: 'Vošac',
      image: require('../images/biokovoVosac.jpg'),
      screen: 'Vosac Biokovo Info',
      bgColor: '#CA9A8C',
      fontAwColor: 'white',
      fontAwBgColor: '#CA9A8C',
      display: 'none',
    },
    {
      key: 3,
      name: 'Saint Jure',
      image: require('../images/biokovoSvJure.jpg'),
      screen: 'St Jure Biokovo Info',
      bgColor: '#7d8572',
      fontAwBgColor: '#7d8572',
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
