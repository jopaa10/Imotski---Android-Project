import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

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

//fontawesome
import {
  faClock,
  faDirections,
  faFlagCheckered,
  faInfoCircle,
  faRoute,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

//google key
import {GOOGLE_KEY} from '@env';

//fetch route
import {FetchRoute} from '../routeMap/fetchRoute';
import {ThemeProvider} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const KayakMap = () => {
  const [startPoint] = useState({
    latitude: 43.4518312,
    longitude: 17.1756394,
  });
  const [finishPoint] = useState({
    latitude: 43.416077,
    longitude: 17.219668,
  });
  const mapRef = useRef(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [currentCoord, setCurrentCoord] = useState([]);
  const [destinationPoint] = useState([43.4518312, 17.1756394]);
  let [polylineCoordinates, setPolylineCoordinates] = useState(0);
  let [route, setRoute] = useState(0);

  const [waypoints] = useState([
    {
      latitude: 43.451531,
      longitude: 17.17614,
    },
    {
      latitude: 43.450669,
      longitude: 17.176615,
    },
    {
      latitude: 43.448771,
      longitude: 17.1781,
    },
    {
      latitude: 43.432166,
      longitude: 17.18012,
    },
    {
      latitude: 43.432058,
      longitude: 17.189356,
    },
    {
      latitude: 43.429492,
      longitude: 17.200761,
    },
    {
      latitude: 43.420194,
      longitude: 17.214988,
    },
  ]);

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
      featureType: 'administrative.country',
      elementType: 'geometry',
      stylers: [
        {
          color: '#8a8442',
        },
        {
          weight: 2,
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
      //setModalIsOpen(false);
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
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              customMapStyle={
                isEnabled ? mapStyleDarkMode : mapStyleCustomeMode
              }
              ref={mapRef}
              initialRegion={{
                latitude: 43.4347607,
                longitude: 17.1964512,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              loadingEnabled={true}>
              {/* {polylineCoordinates === undefined
            ? route.length > 1 && (
                <Polyline
                  testID="route"
                  coordinates={polylineCoordinates}
                  strokeWidth={3}
                  strokeColor="red"
                />
              )
            : polylineCoordinates.length > 1 && (
                <Polyline
                  testID="route"
                  coordinates={polylineCoordinates}
                  strokeWidth={3}
                  strokeColor="red"
                />
              )} */}
              <Marker
                coordinate={{
                  latitude: startPoint.latitude,
                  longitude: startPoint.longitude,
                }}
                onPress={() => setModalIsOpen(true)}>
                <View>
                  <Image
                    source={require('../images/kayakColorIcon.png')}
                    style={styles.startPoint}
                  />
                </View>
              </Marker>
              <Marker
                coordinate={{
                  latitude: finishPoint.latitude,
                  longitude: finishPoint.longitude,
                }}
                onPress={() => setModalIsOpen(true)}>
                <View>
                  <Image
                    source={require('../images/finishIcon.png')}
                    style={[
                      styles.destinationPoint,
                      {tintColor: colors.PRIMARY_TEXT_COLOR},
                    ]}
                  />
                </View>
              </Marker>
              <MapViewDirections
                origin={startPoint}
                destination={finishPoint}
                apikey={GOOGLE_KEY}
                strokeWidth={3}
                strokeColor="blue"
                waypoints={waypoints}
                mode="WALKING"
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  setRouteDistance(result.distance);
                  setRouteDuration(result.duration);

                  if (result.distance) {
                    setModalIsOpen(true);
                  }
                }}
              />
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
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              customMapStyle={
                isEnabled ? mapStyleDarkMode : mapStyleCustomeMode
              }
              showsUserLocation={true}
              initialRegion={{
                latitude: 43.4347607,
                longitude: 17.1964512,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              loadingEnabled={true}>
              <Marker
                coordinate={{
                  latitude: startPoint.latitude,
                  longitude: startPoint.longitude,
                }}
                onPress={() => setModalIsOpen(true)}>
                <View>
                  <Image
                    source={require('../images/kayakColorIcon.png')}
                    style={styles.startPoint}
                  />
                </View>
              </Marker>
              <Marker
                coordinate={{
                  latitude: finishPoint.latitude,
                  longitude: finishPoint.longitude,
                }}
                onPress={() => setModalIsOpen(true)}>
                <View>
                  <Image
                    source={require('../images/finishIcon.png')}
                    style={styles.destinationPoint}
                  />
                </View>
              </Marker>
              <MapViewDirections
                origin={startPoint}
                destination={finishPoint}
                apikey={GOOGLE_KEY}
                strokeWidth={3}
                strokeColor="blue"
                waypoints={waypoints}
                mode="WALKING"
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  setRouteDistance(result.distance);
                  setRouteDuration(result.duration);

                  if (result.distance) {
                    setModalIsOpen(true);
                  }
                }}
              />
            </MapView>
          )}

          <Modal
            isVisible={modalIsOpen}
            onSwipeComplete={() => setModalIsOpen(false)}
            swipeDirection="down"
            statusBarTranslucent
            deviceHeight={windowHeight}
            onBackdropPress={() => setModalIsOpen(false)}
            style={{margin: 0}}>
            <View style={styles.centeredView}>
              <View
                style={[
                  styles.modalView,
                  {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
                ]}>
                <View
                  style={{
                    marginTop: 5,
                    height: 'auto',
                    marginHorizontal: windowWidth * 0.04,
                    marginBottom: windowWidth * 0.1,
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
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 10,
                        height: 'auto',
                      }}>
                      <View
                        style={{
                          width: windowWidth * 0.65,
                          flexDirection: 'row',
                          paddingTop: 10,
                          height: 'auto',
                        }}>
                        <Text
                          style={[
                            styles.placeName,
                            {
                              paddingTop: 10,
                              paddingLeft: 5,
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: colors.PRIMARY_TEXT_COLOR,
                            },
                          ]}>
                          Kayak Tour on river Vrljika
                        </Text>
                      </View>

                      <TouchableOpacity onPress={getUserCurrentCoordinates}>
                        <View style={styles.directionsStyle}>
                          <View
                            style={{
                              alignItems: 'center',
                            }}>
                            <FontAwesomeIcon
                              icon={faDirections}
                              size={25}
                              style={{marginTop: 5}}
                              color={colors.DIRECTION_ICON_COLOR}
                            />
                            <Text
                              style={{
                                color: colors.PRIMARY_TEXT_COLOR,
                              }}>
                              Directions
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 'auto',
                      //marginBottom: windowHeight * 0.25,
                      /* borderColor: 'red',
                      borderWidth: 1, */
                    }}>
                    <View style={styles.startDestinationPointContainer}>
                      <View style={{flexDirection: 'row', paddingTop: 15}}>
                        <Image
                          source={require('../images/kayakColorIcon.png')}
                          style={styles.kayakIconStart}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {
                              paddingTop: 5,
                              paddingLeft: 5,
                              color: colors.PRIMARY_TEXT_COLOR,
                            },
                          ]}>
                          Izvor rijeke Vrljike
                        </Text>
                      </View>
                    </View>

                    <View style={styles.startDestinationPointContainer}>
                      <View style={{flexDirection: 'row', paddingTop: 10}}>
                        <FontAwesomeIcon
                          icon={faFlagCheckered}
                          size={20}
                          color={colors.FONTAWESOME_ICON_COLOR}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {color: colors.PRIMARY_TEXT_COLOR},
                          ]}>
                          ??ogi??a Most - Zmijavci
                        </Text>
                      </View>
                    </View>

                    <View style={styles.startDestinationPointContainer}>
                      <View style={{flexDirection: 'row', paddingTop: 10}}>
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
                          {routeDuration} min
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', paddingTop: 10}}>
                        <FontAwesomeIcon
                          icon={faRoute}
                          size={20}
                          color={colors.FONTAWESOME_ICON_COLOR}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {color: colors.PRIMARY_TEXT_COLOR},
                          ]}>
                          {routeDistance} km
                        </Text>
                      </View>
                    </View>

                    <View style={styles.infoContainer}>
                      <View style={{flexDirection: 'row', paddingTop: 10}}>
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          size={20}
                          color={colors.FONTAWESOME_ICON_COLOR}
                        />
                        <Text
                          style={[
                            styles.startDestinationPoint,
                            {color: colors.PRIMARY_TEXT_COLOR},
                          ]}>
                          The directions do not follow the river, they are
                          similar so you can get an idea of where the route is
                          going approximately
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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
  startPoint: {
    height: 30,
    width: 30,
    backgroundColor: '#a2cffc',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
  },
  destinationPoint: {
    height: 30,
    width: 30,
    //backgroundColor: '#000000c0',
    //borderRadius: 50,
    //borderColor: '#fff',
    //borderWidth: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalView: {
    height: 'auto',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  startDestinationPointContainer: {
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.02,
  },
  btnCloseModal: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoContainer: {
    //paddingTop: windowHeight * 0.05,
    width: windowWidth * 0.8,
    marginLeft: 20,
    height: 'auto',
  },

  startDestinationPoint: {
    paddingLeft: 10,
  },
  horizontalLine: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  /*  directionsStyle: {
    flexDirection: 'column',
    marginRight: windowWidth * 0.4,
    alignItems: 'flex-end',
  }, */
  kayakIconStart: {
    height: 25,
    width: 25,
  },
  placeNameContainer: {
    paddingHorizontal: 20,
    width: 'auto',
    height: 'auto',
  },
  placeName: {
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    //width: windowWidth * 0.65,
  },
  directionsStyle: {
    flexDirection: 'column',
    //marginRight: windowWidth * 0.4,
    alignItems: 'flex-end',
    width: windowWidth * 0.2,
  },
});
