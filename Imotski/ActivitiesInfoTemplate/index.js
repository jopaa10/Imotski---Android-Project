import React, {useState} from 'react';
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

//Dimensions
const windowWidth = Dimensions.get('window').width;

//navigation
import {useNavigation} from '@react-navigation/core';
import {ThemeProvider} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {SharedElement} from 'react-navigation-shared-element';
import {windowHeight} from '../constants/global';

const ActivitiesInfoTemplate = props => {
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
  ];

  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <ScrollView
          style={{backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR}}>
          <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
          <View>
            <SharedElement id={props.id}>
              <Image
                style={styles.image}
                source={props.image}
                resizeMode="cover"
              />
            </SharedElement>
            <Pressable
              style={styles.arrowLeftIcon}
              onPress={() => navigation.navigate('Explore Imotski')}>
              <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
            </Pressable>
            <Text style={styles.txtCity}>{props.city}</Text>
            <Text style={styles.txtBlueLake}>
              <FontAwesomeIcon color={'white'} icon={faMapMarkerAlt} />
              {props.sight}
            </Text>
          </View>

          <View
            style={[
              styles.container,
              {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
            ]}>
            <View style={styles.horizontalTabs}>
              {DATA.map((item, index) => (
                <>
                  <Pressable
                    key={index}
                    onPress={() => navigation.navigate(item.navigate)}>
                    <Text style={{color: item.color}}>{item.title}</Text>
                  </Pressable>
                </>
              ))}
            </View>
            <Text style={[styles.txtTitle, {color: colors.PRIMARY_TEXT_COLOR}]}>
              {' '}
              {props.title}
            </Text>
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
              <Text
                style={[styles.txtInfoBL, {color: colors.PRIMARY_TEXT_COLOR}]}>
                {props.details}
              </Text>
            </View>
          </View>
        </ScrollView>
      </ThemeProvider>
    </>
  );
};

/* ActivitiesInfoTemplate.sharedElements = route => {
  //const {item} = route.params;
  console.log(route.params.id);
  return [
    {
      id: route.params.id,
      animation: 'fade-in',
      resize: 'clip',
    },
  ];
}; */

export default ActivitiesInfoTemplate;

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
    bottom: windowWidth * 0.12,
    width: windowWidth,
    height: 'auto',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    /* borderColor: 'black',
    borderWidth: 1, */
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
    marginHorizontal: 15,
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  txtInfoBL: {
    //flex: 1,
    textAlign: 'justify',
    marginTop: 10,
    fontSize: 15,
    marginHorizontal: 20,
    //marginVertical: 20,
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
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
