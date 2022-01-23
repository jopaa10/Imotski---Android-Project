import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

//map view for specific region
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps';

//fetch route for drawing route from current position to destination
import {FetchRoute} from '../routeMap/fetchRoute';

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

  console.log(currentCoord);

  /* const handleLocationPermission = async () => {
    let permissionsCheck = '';

    if (Platform.OS === 'android') {
      permissionsCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        permissionsCheck === RESULTS.BLOCKED ||
        permissionsCheck === RESULTS.DENIED
      ) {
        const permissionsRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionsRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted')
          : console.warn('Location permission denied.');
      }
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  useEffect(() => {
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
  }, []); */

  //console.log(destinationPoint);

  useEffect(() => {
    if (currentCoord && destinationPoint) {
      console.log(currentCoord);
      FetchRoute(currentCoord, destinationPoint).then(results => {
        setPolylineCoordinates(results);
        console.log(results.length);
        setRoute(results.length);
        mapRef.current.fitToCoordinates(results, {
          edgePadding: {left: 20, right: 20, top: 40, bottom: 60},
        });
      });
    }
  }, [currentCoord, destinationPoint]);

  return (
    <View style={styles.container}>
      {currentCoord && (
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
      )}
    </View>
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
  destinationPoint: {
    height: 30,
    width: 30,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
});
