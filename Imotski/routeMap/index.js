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

//mapbox
import MapboxGL from '@react-native-mapbox-gl/maps';

//mapbox directions
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {lineString as makeLineString} from '@turf/helpers';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

//mapbox token

/* const accessToken =
  'pk.eyJ1Ijoiam9wYWExMCIsImEiOiJja3RuZHRwaHMwMXY3MnBqbTBibDZjb2JmIn0.NoaI49NCq87KwpDClETgmg';

MapboxGL.setAccessToken(accessToken); */

//set mapbox token
//const directionsClient = MapboxDirectionsFactory({accessToken});

export const RouteMap = () => {
  const [location, setLocation] = useState(null);
  const [destinationPoint] = useState([43.4506, 17.21]);
  const [currentCoord, setCurrentCoord] = useState([0, 0]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([0, 0]);
  const mapRef = useRef(null);

  /*const [route, setRoute] = useState(null);*/

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

  /* const renderAnotation = () => {
    return (
      <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={destinationPoint}>
        {/* <View style={styles.destinationPoint} /> */
  {
    /* <View>
          <FontAwesomeIcon icon={faMapMarkerAlt} color={'red'} size={25} />
        </View>
      </MapboxGL.PointAnnotation>
    );
  };  */
  }

  useEffect(() => {
    handleLocationPermission();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});

        setCurrentCoord([latitude, longitude]);
        //console.log(currentCoord);
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
    if (currentCoord && destinationPoint) {
      FetchRoute(currentCoord, destinationPoint).then(results => {
        setPolylineCoordinates(results);
        //console.log(polylineCoordinates);
        mapRef.current.fitToCoordinates(results, {
          edgePadding: {left: 20, right: 20, top: 40, bottom: 60},
        });
      });
    }
  }, [currentCoord, destinationPoint]);

  /* useEffect(() => {
    fetchRoute();
  }, [currentCoord]);

  const fetchRoute = async () => {
    const reqOptions = {
      waypoints: [{coordinates: currentCoord}, {coordinates: destinationPoint}],
      profile: 'driving-traffic',
      geometries: 'geojson',
    };

    const res = await directionsClient.getDirections(reqOptions).send();
    const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
    setRoute(newRoute);
  }; */

  return (
    <View style={styles.container}>
      {/* <MapboxGL.MapView
        style={styles.map}
        centerCoordinate={currentCoord}
        userTrackingMode={1}>
        <MapboxGL.UserLocation
          renderMode={'normal'}
          visible={true}
          onUpdate={location => {
            const currentCoords = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setCurrentCoord(currentCoords);
          }}
        />
        {route && (
          <MapboxGL.ShapeSource id="shapeSource" shape={route}>
            <MapboxGL.LineLayer
              id="lineLayer"
              style={{lineWidth: 5, lineJoin: 'bevel', lineColor: 'red'}}
            />
          </MapboxGL.ShapeSource>
        )}
        <MapboxGL.Camera
          animationMode={'flyTo'}
          followUserLocation={true}
          centerCoordinate={currentCoord}
          animationDuration={1100}
        />
        {renderAnotation()}
      </MapboxGL.MapView> */}
      {location && (
        <MapView
          testID="map"
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {polylineCoordinates.length > 1 && (
            <Polyline
              testID="route"
              coordinates={polylineCoordinates}
              strokeWidth={3}
              strokeColor="red"
            />
          )}
          {polylineCoordinates.length > 1 && (
            <Marker
              testID="destination-marker"
              coordinate={polylineCoordinates[polylineCoordinates.length - 1]}
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
