import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Platform} from 'react-native';

//map view for specific region
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps';

//permissions for location
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

//geolocation
import Geolocation from 'react-native-geolocation-service';

//fetch route for drawing route from current position to destination
import {FetchRoute} from './fetchRoute';

export const RouteMap = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 43.4506,
    longitude: 17.21,
  });
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const mapRef = useRef(null);

  const handleLocationPermission = async () => {
    let permissionsCheck = '';

    if (Platform.OS === 'android') {
      permissionsCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionsCheck === RESULTS.DENIED) {
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
  }, []);

  useEffect(() => {
    if (location && destination) {
      FetchRoute(
        location.latitude,
        location.longitude,
        destination.latitude,
        destination.longitude,
      ).then(results => {
        setPolylineCoordinates(results);
        console.log(results);
        mapRef.current.fitToCoordinates(results, {
          edgePadding: {left: 20, right: 20, top: 40, bottom: 60},
        });
      });
    }
  }, [location, destination]);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          ref={mapRef}
          paddingAdjustmentBehavior="automatic"
          loadingEnabled={true}
          loadingIndicatorColor="#fcb103">
          {/* {polylineCoordinates.length > 1 && (
            <Polyline
              testID="route"
              coordinates={polylineCoordinates}
              strokeWidth={3}
              strokeColor="F4E22C"
            />
          )}

          {polylineCoordinates.length > 1 && (
            <Marker
              testID="destination-marker"
              coordinate={polylineCoordinates[polylineCoordinates.length - 1]}
            />
          )} */}
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
});
