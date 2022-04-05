import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Divider} from 'react-native-elements';

//map view for specific region
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';

//permissions for location
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

//geolocation
import Geolocation from 'react-native-geolocation-service';

//route directions
import MapViewDirections from 'react-native-maps-directions';

//modal
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../constants/global';

//fetch route
import {FetchRoute} from '../routeMap/fetchRoute';

//fontawesome
import {
  faClock,
  faDirections,
  faMoneyBill,
  faTimesCircle,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ThemeProvider} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

//google key
import {GOOGLE_KEY} from '@env';

export const QuadMap = () => {
  const [quadFirstPoint] = useState({
    latitude: 43.44691,
    longitude: 17.217308,
  });
  const [quadSecondPoint] = useState({
    latitude: 43.430869,
    longitude: 17.156876,
  });
  const mapRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [location, setLocation] = useState(null);
  const [currentCoord, setCurrentCoord] = useState([]);
  const [destinationPoint, setDestinationPoint] = useState([]);
  let [polylineCoordinates, setPolylineCoordinates] = useState(0);
  let [route, setRoute] = useState(0);

  const [isEnabled, setIsEnabled] = useState(false);

  const mapStyleDarkMode = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ];

  const mapStyleCustomeMode = [];

  const openModal = (title, destinationCoords) => {
    setModalIsOpen(true);
    setModalTitle(title);
    setDestinationPoint(destinationCoords);
  };

  const getUserCurrentCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        setCurrentCoord([latitude, longitude]);
        //console.log(latitude, longitude);
        setModalIsOpen(false);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const handleLocationPermission = () => {
    let permissionsCheck = '';

    if (Platform.OS === 'android') {
      permissionsCheck = check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        permissionsCheck === RESULTS.BLOCKED ||
        permissionsCheck === RESULTS.DENIED
      ) {
        const permissionsRequest = request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionsRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted')
          : console.warn('Location permission denied.');
      }
    }

    console.log(location);

    if (currentCoord && destinationPoint) {
      setModalIsOpen(false);
      console.log(currentCoord);
      FetchRoute(currentCoord, destinationPoint).then(results => {
        setPolylineCoordinates(results);
        //console.log(results);
        //setRoute(results.length);
        mapRef.current.fitToCoordinates(results, {
          edgePadding: {left: 20, right: 20, top: 40, bottom: 60},
        });
      });
    }
  };

  useEffect(async () => {
    handleLocationPermission();

    const getTheme = await AsyncStorage.getItem('theme');

    if (getTheme === 'dark') {
      setIsEnabled(true);
    } else if (getTheme === 'light') {
      setIsEnabled(false);
    }
  }, []);

  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          {location !== undefined ? (
            <MapView
              testID="map"
              ref={mapRef}
              style={styles.map}
              customMapStyle={
                isEnabled ? mapStyleDarkMode : mapStyleCustomeMode
              }
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              initialRegion={{
                latitude: 43.4571647,
                longitude: 17.1839588,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.1,
              }}
              loadingEnabled={true}>
              <Marker
                coordinate={{
                  latitude: quadFirstPoint.latitude,
                  longitude: quadFirstPoint.longitude,
                }}
                onPress={() => {
                  openModal('Pro Paradise', quadFirstPoint);
                }}>
                <View style={{borderColor: 'rgba(0,0,0,0)', borderWidth: 1}}>
                  <Image
                    source={require('../images/quadIcon.jpg')}
                    style={[
                      styles.quadPoint,
                      {tintColor: colors.PRIMARY_TEXT_COLOR},
                    ]}
                  />
                </View>
              </Marker>
              <Marker
                coordinate={{
                  latitude: quadSecondPoint.latitude,
                  longitude: quadSecondPoint.longitude,
                }}
                onPress={() => {
                  openModal('Vinarija Matkovic', quadSecondPoint);
                }}>
                <View style={{borderColor: 'transparent', borderWidth: 1}}>
                  <Image
                    source={require('../images/quadIcon.jpg')}
                    style={[
                      styles.quadPoint,
                      {tintColor: colors.PRIMARY_TEXT_COLOR},
                    ]}
                  />
                </View>
              </Marker>
              <MapViewDirections
                origin={location}
                destination={destinationPoint}
                apikey={GOOGLE_KEY}
                strokeWidth={3}
                strokeColor="red"
                mode="DRIVING"
              />
            </MapView>
          ) : (
            <MapView
              testID="map"
              customMapStyle={
                isEnabled ? mapStyleDarkMode : mapStyleCustomeMode
              }
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              initialRegion={{
                latitude: 43.4571647,
                longitude: 17.1839588,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.1,
              }}
              loadingEnabled={true}>
              <Marker
                coordinate={{
                  latitude: quadFirstPoint.latitude,
                  longitude: quadFirstPoint.longitude,
                }}
                onPress={() => {
                  openModal('Pro Paradise', quadFirstPoint);
                }}>
                <View style={{borderColor: 'rgba(0,0,0,0)', borderWidth: 1}}>
                  <Image
                    source={require('../images/quadIcon.jpg')}
                    style={styles.quadPoint}
                  />
                </View>
              </Marker>
              <Marker
                coordinate={{
                  latitude: quadSecondPoint.latitude,
                  longitude: quadSecondPoint.longitude,
                }}
                onPress={() => {
                  openModal('Vinarija Matkovic', quadSecondPoint);
                }}>
                <View style={{borderColor: 'transparent', borderWidth: 1}}>
                  <Image
                    source={require('../images/quadIcon.jpg')}
                    style={styles.quadPoint}
                  />
                </View>
              </Marker>
            </MapView>
          )}
        </View>

        <Modal
          isVisible={modalIsOpen}
          onSwipeComplete={() => setModalIsOpen(false)}
          swipeDirection="down"
          statusBarTranslucent
          deviceHeight={windowHeight}
          style={{margin: 0}}>
          <View style={styles.centeredView}>
            <View
              style={{
                top: windowWidth * 0.1,
                alignItems: 'center',
                zIndex: 1,
                height: 'auto',
              }}>
              <Image
                source={require('../images/quadBikeIcon.png')}
                style={styles.imageModal}
              />
            </View>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR,
                },
              ]}>
              <View
                style={{
                  height: 'auto',
                  width: 'auto',
                  marginTop: windowWidth * 0.12,
                }}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => setModalIsOpen(false)}>
                  <View
                    style={{
                      height: 'auto',
                      width: 'auto',
                    }}>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size={20}
                      color={colors.FONTAWESOME_ICON_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 'auto',
                  //marginTop: 5,
                  //bottom: windowWidth * 0.4,
                  paddingBottom: windowHeight * 0.05,
                }}>
                <TouchableOpacity>
                  <View style={styles.btnCloseModal}>
                    <Text
                      style={[
                        styles.horizontalLine,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      _____
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.placeNameContainer}>
                  <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <Text
                      style={[
                        styles.placeName,
                        {
                          paddingTop: 10,
                          paddingLeft: 10,
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginBottom: windowWidth * 0.05,
                          color: colors.PRIMARY_TEXT_COLOR,
                        },
                      ]}>
                      Rent a Quad - {modalTitle}
                    </Text>
                  </View>
                </View>

                <Divider />

                <View style={styles.startDestinationPointContainer}>
                  <View
                    style={{
                      flexDirection: 'column',
                      paddingTop: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 15,
                        justifyContent: 'space-between',
                        marginLeft: windowWidth * 0.02,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <FontAwesomeIcon
                          icon={faUserAlt}
                          size={20}
                          color={colors.FONTAWESOME_ICON_COLOR}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {color: colors.PRIMARY_TEXT_COLOR},
                          ]}>
                          2 Persons
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: windowWidth * 0.06,
                        }}>
                        <FontAwesomeIcon
                          icon={faDirections}
                          size={20}
                          color={colors.FONTAWESOME_ICON_COLOR}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {color: colors.PRIMARY_TEXT_COLOR},
                          ]}>
                          Red, Blue, Green lake
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 15,
                        justifyContent: 'space-between',
                        marginBottom: windowWidth * 0.05,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: windowWidth * 0.02,
                        }}>
                        <FontAwesomeIcon
                          icon={faClock}
                          size={20}
                          color={colors.FONTAWESOME_ICON_COLOR}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {color: colors.PRIMARY_TEXT_COLOR},
                          ]}>
                          cca 2-3 h
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: windowWidth * 0.25,
                        }}>
                        <FontAwesomeIcon
                          icon={faMoneyBill}
                          size={20}
                          color={colors.FONTAWESOME_ICON_COLOR}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {color: colors.PRIMARY_TEXT_COLOR},
                          ]}>
                          cca 100 €
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Divider />
                <View style={styles.infoContainer}>
                  <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <Text
                      style={[
                        styles.startDestinationPoint,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      Experience and feel the beautiful Imotski and Imotski
                      region completely by visiting as many as 8 lakes and the
                      river Vrljika by riding a Quad motor. For you, family or
                      friends, we organize a Quad tour throughout the area
                      lasting about 4 hours.
                    </Text>
                  </View>
                </View>

                <TouchableOpacity onPress={getUserCurrentCoordinates}>
                  <View style={styles.proceed}>
                    <Text style={styles.proceedButton}>Directions</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeNameContainer: {
    paddingHorizontal: 20,
  },
  placeName: {
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    width: windowWidth * 0.8,
  },
  quadPoint: {
    height: 40,
    width: 40,
    borderRadius: 5,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    //marginTop: 20,
  },
  modalView: {
    height: 'auto',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    /* borderColor: 'green',
    borderWidth: 2, */
    /* shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, */
  },
  imageModal: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    zIndex: 999,
    alignItems: 'center',
  },
  startDestinationPointContainer: {
    paddingHorizontal: 20,
  },
  btnCloseModal: {
    //position: 'absolute',
    //top: windowHeight * 0.02,
    //left: windowWidth * 0.78,
    //zIndex: 999,
    alignItems: 'center',
  },
  btnClose: {
    //position: 'absolute',
    //top: windowHeight * 0.02,
    right: windowWidth * 0.1,
    //zIndex: 999,
    alignItems: 'flex-end',
  },
  infoContainer: {
    //paddingTop: windowHeight * 0.05,
    width: windowWidth * 0.8,
    marginLeft: 20,
  },

  startDestinationPoint: {
    paddingLeft: 5,
  },

  routeTitle: {
    position: 'absolute',
    bottom: windowWidth * 0.95,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  routeTextDetails: {
    paddingHorizontal: 20,
    //paddingTop: windowWidth * 0.15,
    fontSize: 15,
    textAlign: 'justify',
  },

  proceed: {
    alignItems: 'center',
  },
  proceedButton: {
    backgroundColor: '#1F83BB',
    height: 40,
    width: windowWidth * 0.5,
    borderRadius: 10,
    marginTop: windowWidth * 0.04,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    paddingVertical: 5,
  },
});
