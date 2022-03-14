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
  FlatList,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

//Dimensions
const windowWidth = Dimensions.get('window').width;

//navigation
import {useNavigation} from '@react-navigation/core';

//top tab bar navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//pages for top tabs
import {BlueLakeInfo} from '../blueLakeInfo';
import {Gallery} from '../blueLakeInfo/gallery';
import {ReviewScreen} from '../reviewScreen';

//redux
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@react-navigation/native';
import {useTheme} from 'styled-components';

/* const TopTabs = createMaterialTopTabNavigator();

export const blueLakeTopTabsNav = () => {
  return (
    <TopTabs.Navigator
      initialRouteName="Overview"
      screenOptions={{
        tabBarStyle: styles.topTabsNav,
        swipeEnabled: false,
        tabBarScrollEnabled: false,
        lazy: true,
      }}>
      <TopTabs.Screen name="Overview" component={BlueLakeInfo} />
      <TopTabs.Screen name="Gallery" component={Gallery} />
      <TopTabs.Screen name="Review" component={ReviewScreen} />
    </TopTabs.Navigator>
  );
}; */

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <ScrollView
          style={{backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR}}>
          <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
          <View>
            <Image style={styles.image} source={props.image} />
            <Pressable
              style={styles.arrowLeftIcon}
              onPress={() => navigation.navigate('Explore Imotski')}>
              <FontAwesomeIcon color="white" icon={faArrowLeft} size={20} />
            </Pressable>
            <Text style={styles.txtCity}>{props.city}</Text>
            <Text style={styles.txtBlueLake}>
              <FontAwesomeIcon color={'white'} icon={faMapMarkerAlt} />{' '}
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
            <Text style={[styles.txtTitle, {color: colors.PRIMARY_TEXT_COLOR}]}>
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
        </ScrollView>
      </ThemeProvider>
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
  image: {
    width: windowWidth,
    height: 340,
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
