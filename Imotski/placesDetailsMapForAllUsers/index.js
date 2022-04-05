import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
  StatusBar,
} from 'react-native';

//map view for specific region
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';

//permissions for location
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

//swipe modal
import Modal from 'react-native-modal';

//geocoder
import Geocoder from 'react-native-geocoding';

//geolocation
import Geolocation from 'react-native-geolocation-service';

//fetch route
import {FetchRoute} from '../routeMap/fetchRoute';

import {windowHeight, windowWidth} from '../constants/global';
import PlaceWorkTime from './placeWorkTime';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBuilding,
  faMapMarkerAlt,
  faStar,
  faDirections,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from 'styled-components';

import {GOOGLE_KEY} from '@env';

Geocoder.init(GOOGLE_KEY);

const MarkedPlaces = () => {
  const [coordsData, setCoordData] = useState();
  const [placeWorkTime, setPlaceWorkTime] = useState([]);
  let [placeDetails, setPlacesDetails] = useState({
    rating: '',
    type: '',
    name: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const [location, setLocation] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState([]);
  const [currentCoord, setCurrentCoord] = useState([]);
  let [polylineCoordinates, setPolylineCoordinates] = useState(0);
  const mapRef = useRef(null);

  let [route, setRoute] = useState(0);

  const getCoordsOnClick = event => {
    //console.log(event.nativeEvent.placeId);

    setCoordData(event.nativeEvent.coordinate);

    setDestinationPoint([
      event.nativeEvent.coordinate.latitude,
      event.nativeEvent.coordinate.longitude,
    ]);

    if (event.nativeEvent.placeId != undefined) {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${event.nativeEvent.placeId}&key=${GOOGLE_KEY}`,
      )
        .then(res => res.json())
        .then(data => {
          console.log(data.result.opening_hours);
          setPlacesDetails({
            type: data.result.types[0],
            rating: data.result.rating,
            name: data.result.name,
          });

          setPlaceWorkTime(data.result.opening_hours);

          setModalIsOpen(true);
        });

      /*  if (placeWorkTime != null || placeWorkTime != undefined) {
            setModalIsOpen(true);
          } 
        });*/
    }

    //Alert.alert(`Did you have visited ${event.nativeEvent.name}`);
  };

  //console.log(destinationPoint);

  const getUserCurrentCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        setCurrentCoord([latitude, longitude]);
        //console.log(latitude, longitude);
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
        console.log(results);
        setRoute(results.length);
        mapRef.current.fitToCoordinates(results, {
          edgePadding: {left: 20, right: 20, top: 40, bottom: 60},
        });
      });
    }
  };

  useEffect(async () => {
    getUserCurrentCoordinates();

    const getTheme = await AsyncStorage.getItem('theme');

    console.log(getTheme);

    if (getTheme === 'dark') {
      setIsEnabled(true);
    } else if (getTheme === 'light') {
      setIsEnabled(false);
    }
  }, []);

  const {colors} = useTheme();

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent />
        {location !== undefined ? (
          <MapView
            testID="map"
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={isEnabled ? mapStyleDarkMode : mapStyleCustomeMode}
            showsUserLocation={true}
            initialRegion={{
              latitude: 43.4471,
              longitude: 17.214,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0214,
            }}
            onPoiClick={getCoordsOnClick}
            loadingEnabled={true}>
            {coordsData != null && <Marker coordinate={coordsData} />}
            {polylineCoordinates === undefined
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
                )}
          </MapView>
        ) : (
          <MapView
            testID="map"
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={isEnabled ? mapStyleDarkMode : mapStyleCustomeMode}
            showsUserLocation={true}
            initialRegion={{
              latitude: 43.4471,
              longitude: 17.214,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0214,
            }}
            onPoiClick={handleLocationPermission}>
            {coordsData != null && <Marker coordinate={coordsData} />}
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
            style={[
              styles.modalView,
              {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
            ]}>
            <View
              style={{
                height: 'auto',
                marginTop: 5,
                /* borderColor: 'green',
                borderWidth: 2, */
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
                    /* borderColor: 'red',
                    borderWidth: 1, */
                  }}>
                  <View
                    style={{
                      width: windowWidth * 0.65,
                      flexDirection: 'row',
                      paddingTop: 10,
                      height: 'auto',
                    }}>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      size={20}
                      style={{marginTop: 5}}
                      color="red"
                    />
                    <Text
                      style={[
                        styles.placeName,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      {placeDetails.name}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={handleLocationPermission}>
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
                        <Text style={{color: colors.PRIMARY_TEXT_COLOR}}>
                          Directions
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.placeDetailsContainer}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    size={20}
                    color={colors.PRIMARY_TEXT_COLOR}
                  />
                  <Text
                    style={[
                      styles.placeRating,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    {placeDetails.type}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                  <FontAwesomeIcon icon={faStar} size={20} color="#F5D402" />
                  <Text
                    style={[
                      styles.placeRating,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    {placeDetails.rating}
                  </Text>
                </View>
              </View>
              <View style={styles.workingTimeContainer}>
                <Text
                  style={[
                    styles.workingTimeStyle,
                    {color: colors.PRIMARY_TEXT_COLOR},
                  ]}>
                  Working time:
                </Text>
                <PlaceWorkTime workDay={placeWorkTime} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* <Modal
        isVisible={directionModal}
        onSwipeComplete={() => setDirectionModal(false)}
        swipeDirection="down"
        statusBarTranslucent
        deviceHeight={windowHeight}
        style={{margin: 0}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Get coordinates</Text>
            <Pressable onPress={getUserCurrentCoordinates}>
              <Text>Yes</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  placeNameContainer: {
    paddingHorizontal: 20,
    width: 'auto',
    //flex: 1,
    //justifyContent: 'space-between',
    height: 'auto',
  },
  placeName: {
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    //width: windowWidth * 0.5,
  },
  placeDetailsContainer: {
    paddingHorizontal: 20,
  },
  btnCloseModal: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  workingTimeContainer: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: 20,
  },
  workingTimeStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeRating: {
    paddingLeft: 5,
  },
  horizontalLine: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  directionsStyle: {
    flexDirection: 'column',
    //marginRight: windowWidth * 0.4,
    alignItems: 'flex-end',
    width: windowWidth * 0.2,
    /* borderColor: 'red',
    borderWidth: 1, */
  },
});

export default MarkedPlaces;
