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

//Dimensions
const windowWidth = Dimensions.get('window').width;

//navigation
import {useNavigation} from '@react-navigation/core';

//redux
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@react-navigation/native';
import {useTheme} from 'styled-components';

import {windowHeight} from '../constants/global';
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

                <Pressable
                  style={styles.arrowLeftIcon}
                  onPress={() => navigation.navigate(props.navigateBack)}>
                  <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
                </Pressable>
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
                {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
              ]}>
              <View style={styles.horizontalTabs}>
                {DATA.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    active={item}
                    onPress={() => {
                      navigation.navigate(item.navigate);
                    }}>
                    <Text
                      style={[
                        styles.horizotalTab,
                        {
                          color: item.color,
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text
                style={[styles.txtTitle, {color: colors.PRIMARY_TEXT_COLOR}]}>
                {' '}
                {props.title}
              </Text>
              <Text
                style={[styles.txtInfoBL, {color: colors.PRIMARY_TEXT_COLOR}]}>
                {props.details}
              </Text>
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
            <View style={{height: 'auto'}}>{props.weather}</View>
            {props.review}
          </Animated.ScrollView>
        </ThemeProvider>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topTabsNav: {
    position: 'absolute',
    width: windowWidth,
    top: windowWidth * 0.85,
    height: 50,
    borderRadius: 10,
    color: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 0,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    bottom: windowWidth * 0.1,
    width: windowWidth,
    height: 'auto',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  horizontalTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-around',
    marginTop: 15,
  },
  txtTitle: {
    fontSize: 22,
    marginTop: 20,
    marginHorizontal: 20,
  },
  txtInfoBL: {
    color: 'black',
    flex: 1,
    textAlign: 'justify',
    marginTop: 10,
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 20,
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
    bottom: windowWidth * 0.25,
    marginLeft: windowWidth * 0.08,
    color: 'white',
    fontSize: 25,
  },
  txtBlueLake: {
    position: 'absolute',
    bottom: windowWidth * 0.18,
    marginLeft: windowWidth * 0.06,
    color: 'white',
    fontSize: 15,
  },
  arrowLeftIcon: {
    position: 'absolute',
    marginTop: windowWidth * 0.1,
    marginHorizontal: 20,
  },
  horizotalTab: {
    fontSize: 15,
  },
});
