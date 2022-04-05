import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

const HEADER_HEIGHT = windowHeight * 0.5;

import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

//navigation
import {useNavigation} from '@react-navigation/core';

//redux
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@react-navigation/native';
import {useTheme} from 'styled-components';

import {windowHeight, windowWidth} from '../constants/global';
import {SharedElement} from 'react-navigation-shared-element';

export const TemplateInfo = props => {
  const navigation = useNavigation();

  const DATA = [
    {
      index: 1,
      navigate: 'Overview',
      title: 'Overview',
      color: props.color,
    },

    {
      index: 2,
      navigate: 'Gallery',
      title: 'Gallery',
      color: props.color2,
    },

    {
      index: 3,
      navigate: 'Review',
      title: 'Review',
      color: props.color3,
    },
  ];
  const theme = useSelector(state => state.themeReducer.theme);

  const {colors} = useTheme();

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <>
      <View>
        <ThemeProvider theme={theme}>
          <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
          <Animated.ScrollView
            style={{
              backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
            }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: true},
            )}>
            <SharedElement id={props.id}>
              <View
              /* style={{
                marginTop: -1000,
                paddingTop: 1000,
                alignItems: 'center',
                overflow: 'hidden',
              }} */
              >
                <Animated.Image
                  style={styles.image(offset)}
                  source={props.image}
                  resizeMode={'cover'}
                />

                <TouchableOpacity
                  style={styles.arrowLeftIcon}
                  onPress={() => navigation.navigate(props.navigateBack)}>
                  <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
                </TouchableOpacity>
                <Text style={styles.txtCity}>{props.city}</Text>
                <Text style={styles.txtBlueLake}>
                  <FontAwesomeIcon color={'white'} icon={faMapMarkerAlt} />{' '}
                  {props.sight}
                </Text>
              </View>
            </SharedElement>
            <View
              style={[
                styles.container,
                {
                  backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
                },
              ]}>
              <View style={styles.horizontalTabs}>
                {DATA.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    active={item}
                    onPress={() => {
                      navigation.navigate(item.navigate);
                    }}>
                    <Animatable.Text
                      animation="bounceIn"
                      duration={600}
                      delay={600 + index * 100}
                      style={[
                        styles.horizotalTab,
                        {
                          color: item.color,
                        },
                      ]}>
                      {item.title}
                    </Animatable.Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Animatable.Text
                delay={600}
                animation="slideInUp"
                style={[styles.txtTitle, {color: colors.PRIMARY_TEXT_COLOR}]}>
                {props.title}
              </Animatable.Text>
              <View
                style={{
                  width: windowWidth * 0.9,
                  /* borderColor: 'purple',
                  borderWidth: 2, */
                  marginHorizontal: windowWidth * 0.05,
                  height: 'auto',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
                }}>
                <Animatable.Text
                  delay={700}
                  animation="slideInUp"
                  style={[
                    styles.txtInfoBL,
                    {color: colors.PRIMARY_TEXT_COLOR},
                  ]}>
                  {props.details}
                </Animatable.Text>
              </View>
            </View>
            <View
              style={{
                width: windowWidth,
                flex: 1,
                flexDirection: 'row',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                //marginHorizontal: windowWidth * 0.05,
                marginBottom: windowWidth * 0.05,
              }}>
              {props.gallery}
            </View>
            <View
              style={{
                height: 'auto',
                /* borderColor: 'red',
                borderWidth: 1, */
              }}>
              {props.weather}
            </View>
            {props.review}
          </Animated.ScrollView>
        </ThemeProvider>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //bottom: windowWidth * 0.1,
    width: windowWidth,
    height: 'auto',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    /* borderColor: 'red',
    borderWidth: 1, */
  },
  horizontalTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-around',
    marginVertical: windowWidth * 0.01,
    paddingTop: windowHeight * 0.01,
    /* borderColor: 'red',
    borderWidth: 1, */
    height: windowHeight * 0.1,
  },
  txtTitle: {
    fontSize: 22,
    //marginTop: 20,
    marginHorizontal: 20,
    bottom: windowWidth * 0.05,
  },
  txtInfoBL: {
    color: 'black',
    flex: 1,
    textAlign: 'justify',
    //marginTop: 10,
    fontSize: 15,
    //marginHorizontal: 20,
    //marginVertical: 20,
    marginBottom: windowHeight * 0.1,
    //bottom: windowWidth * 0.05,
  },
  image: offset => ({
    width: '100%',
    height: HEADER_HEIGHT,
    top: offset,
    transform: [
      {
        translateY: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [
            -HEADER_HEIGHT / 2,
            0,
            -HEADER_HEIGHT * 0.1,
            HEADER_HEIGHT * 0.5,
          ],
        }),
      },
      {
        scale: offset.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: [2, 1.2, 0.9, 0.25],
        }),
      },
    ],
  }),
  txtCity: {
    position: 'absolute',
    bottom: windowWidth * 0.18,
    marginLeft: windowWidth * 0.08,
    color: 'white',
    fontSize: 25,
  },
  txtBlueLake: {
    position: 'absolute',
    bottom: windowWidth * 0.1,
    marginLeft: windowWidth * 0.06,
    color: 'white',
    fontSize: 15,
  },
  arrowLeftIcon: {
    position: 'absolute',
    marginTop: windowWidth * 0.12,
    marginHorizontal: 20,
  },
  horizotalTab: {
    fontSize: 15,
    marginBottom: windowHeight * 0.03,
  },
});
