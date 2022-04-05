import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

//map view for specific region
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps';
import {useTheme} from 'styled-components';
import {windowWidth} from '../constants/global';

//fetch route for drawing route from current position to destination
import {FetchRoute} from '../routeMap/fetchRoute';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

import * as geolib from 'geolib';

export const placeDetails = ({route}) => {
  const [location, setLocation] = useState(null);
  const [destinationPoint] = useState([route.params.lat, route.params.lng]);
  const [currentCoord, setCurrentCoord] = useState([
    route.params.userCoord.lat,
    route.params.userCoord.lng,
  ]);
  let [polylineCoordinates, setPolylineCoordinates] = useState(0);
  const mapRef = useRef(null);

  let [routes, setRoute] = useState(0);

  const [distance, setDistance] = useState(0);

  //console.log(currentCoord);

  //let geoLib = require('geo-lib');

  useEffect(() => {
    if (currentCoord && destinationPoint) {
      console.log(currentCoord);
      FetchRoute(currentCoord, destinationPoint).then(results => {
        setPolylineCoordinates(results);
        //console.log(results.length);
        setRoute(results.length);
        let result = geolib.getDistance(currentCoord, destinationPoint);
        setDistance(result);

        mapRef.current.fitToCoordinates(results, {
          edgePadding: {left: 20, right: 20, top: 40, bottom: 60},
        });
      });
    }
  }, [currentCoord, destinationPoint]);

  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      {currentCoord && (
        <>
          <View style={styles.containerDetails}>
            <MapView
              testID="map"
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              initialRegion={{
                latitude: route.params.userCoord.lat,
                longitude: route.params.userCoord.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              loadingEnabled={true}>
              {polylineCoordinates === undefined
                ? routes.length > 1 && (
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
              {polylineCoordinates === undefined
                ? routes.length > 1 && (
                    <Marker
                      testID="destination-marker"
                      coordinate={
                        polylineCoordinates[polylineCoordinates.length - 1]
                      }
                    />
                  )
                : polylineCoordinates.length > 1 && (
                    <Marker
                      testID="destination-marker"
                      coordinate={
                        polylineCoordinates[polylineCoordinates.length - 1]
                      }
                    />
                  )}
            </MapView>
            <View
              style={[
                styles.placeRouteDetails,
                {backgroundColor: colors.MODAL_BACKGROUND_COLOR},
              ]}>
              <View style={styles.placeRouteDetailsColumn}>
                <View style={styles.placeSingleDetail}>
                  <Text
                    style={[
                      styles.placeRouteTitle,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    Distance
                  </Text>
                  <Text
                    style={[
                      styles.placeRouteInfo,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    {distance / 1000} km
                  </Text>
                </View>
                <View style={styles.placeSingleDetail}>
                  <Text
                    style={[
                      styles.placeRouteTitle,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    Rating
                  </Text>
                  <Text
                    style={[
                      styles.placeRouteInfo,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    <FontAwesomeIcon icon={faStar} color={'#D9B204'} />{' '}
                    {route.params.rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  containerDetails: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  destinationPoint: {
    height: 30,
    width: 30,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
  placeRouteDetails: {
    backgroundColor: 'white',
    width: windowWidth * 0.9,
    height: 'auto',
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowWidth * 0.2,
    flexDirection: 'column',
    borderRadius: 10,
    elevation: 10,
    //justifyContent: 'flex-end',
  },
  placeRouteDetailsColumn: {
    flexDirection: 'row',
    marginBottom: 10,
    /*  borderColor: 'red',
    borderWidth: 1, */
  },
  placeSingleDetail: {
    flex: 1,
    justifyContent: 'space-between',
    /* borderWidth: 1,
    borderColor: 'black', */
    alignItems: 'center',
    height: 'auto',
  },
  placeRouteTitle: {
    fontSize: 16,
    paddingTop: windowWidth * 0.03,
    textAlign: 'center',
  },
  placeRouteInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: windowWidth * 0.03,
    textAlign: 'center',
  },
});
