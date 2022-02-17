import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';

//map view for specific region
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//swiper
import Swiper from 'react-native-swiper';

//google api
const GOOGLE_MAPS_APIKEY = 'AIzaSyBWeAUtDlbMRmnqsLSvQVbO7BsQzxGQDpo';

//route directions
import MapViewDirections from 'react-native-maps-directions';

export const BikeScreen = () => {
  const viewRef = useRef(null);

  /* const [startPoint] = useState({
    latitude: 43.45504,
    longitude: 17.17302,
  });
  const [finishPoint] = useState({
    latitude: 43.45507,
    longitude: 17.17301,
  }); */

  /*   const [waypoints] = useState([
    {
      latitude: 43.45504,
      longitude: 17.17302,
    },
    {
      latitude: 43.46195,
      longitude: 17.15672,
    },
    {
      latitude: 43.46604,
      longitude: 17.15039,
    },
    {
      latitude: 43.47074,
      longitude: 17.15484,
    },
    {
      latitude: 43.46905,
      longitude: 17.14219,
    },
    {
      latitude: 43.47418,
      longitude: 17.12659,
    },
    {
      latitude: 43.45384,
      longitude: 17.11573,
    },
    {
      latitude: 43.44866,
      longitude: 17.12418,
    },
    {
      latitude: 43.44332,
      longitude: 17.14694,
    },

    {
      latitude: 43.45077,
      longitude: 17.15771,
    },
    {
      latitude: 43.443,
      longitude: 17.17459,
    },
    {
      latitude: 43.45225,
      longitude: 17.17669,
    },

    {
      latitude: 43.45507,
      longitude: 17.17301,
    },
    
  ]); */

  const DATA = [
    {
      key: 1,
      initialRegion: {
        latitude: 43.4571954,
        longitude: 17.1556607,
      },
      startPoint: {
        latitude: 43.45507,
        longitude: 17.17301,
      },
      finishPoint: {
        latitude: 43.45507,
        longitude: 17.17301,
      },

      waypoints: [
        {
          latitude: 43.45504,
          longitude: 17.17302,
        },
        {
          latitude: 43.46195,
          longitude: 17.15672,
        },
        {
          latitude: 43.46604,
          longitude: 17.15039,
        },
        {
          latitude: 43.47074,
          longitude: 17.15484,
        },
        {
          latitude: 43.46905,
          longitude: 17.14219,
        },
        {
          latitude: 43.47418,
          longitude: 17.12659,
        },
        {
          latitude: 43.45384,
          longitude: 17.11573,
        },
        {
          latitude: 43.44866,
          longitude: 17.12418,
        },
        {
          latitude: 43.44332,
          longitude: 17.14694,
        },
        {
          latitude: 43.45077,
          longitude: 17.15771,
        },
        {
          latitude: 43.443,
          longitude: 17.17459,
        },
        {
          latitude: 43.45225,
          longitude: 17.17669,
        },

        {
          latitude: 43.45507,
          longitude: 17.17301,
        },
      ],

      longitudeDelta: 0.1,
    },
    {
      key: 2,
      initialRegion: {
        latitude: 43.44847,
        longitude: 17.21107,
      },

      startPoint: {
        latitude: 43.44847,
        longitude: 17.21107,
      },

      finishPoint: {
        latitude: 43.44847,
        longitude: 17.21107,
      },

      waypoints: [
        {
          latitude: 43.44847,
          longitude: 17.21107,
        },
        {
          latitude: 43.44824,
          longitude: 17.21011,
        },
        {
          latitude: 43.45367,
          longitude: 17.19479,
        },
        /*  {
          latitude: 43.47074,
          longitude: 17.15484,
        }, */
        {
          latitude: 43.47411,
          longitude: 17.17878,
        },
        {
          latitude: 43.48919,
          longitude: 17.19508,
        },
        {
          latitude: 43.48845,
          longitude: 17.19841,
        },
        {
          latitude: 43.46218,
          longitude: 17.2133,
        },
        {
          latitude: 43.44917,
          longitude: 17.22083,
        },
        {
          latitude: 43.4452,
          longitude: 17.223,
        },
        {
          latitude: 43.44756,
          longitude: 17.21186,
        },
        {
          latitude: 43.44773,
          longitude: 17.21085,
        },
        {
          latitude: 43.44847,
          longitude: 17.21107,
        },
      ],

      longitudeDelta: 0.1,
    },
    {
      key: 3,
      initialRegion: {
        latitude: 43.5138875,
        longitude: 16.9317051,
      },

      startPoint: {
        latitude: 43.50347,
        longitude: 16.94882,
      },

      finishPoint: {
        latitude: 43.50347,
        longitude: 16.94882,
      },

      waypoints: [
        {
          latitude: 43.490042,
          longitude: 16.982179,
        },

        {
          latitude: 43.493016,
          longitude: 16.97678,
        },
        {
          latitude: 43.48968,
          longitude: 16.9826,
        },
        {
          latitude: 43.481434,
          longitude: 17.004926,
        },
        {
          latitude: 43.483037,
          longitude: 17.010723,
        },
        {
          latitude: 43.47547,
          longitude: 17.01722,
        },
        {
          latitude: 43.53491,
          longitude: 17.02525,
        },
        {
          latitude: 43.55801,
          longitude: 17.00111,
        },
        {
          latitude: 43.55058,
          longitude: 16.95329,
        },
        {
          latitude: 43.54419,
          longitude: 16.90378,
        },
        {
          latitude: 43.52917,
          longitude: 16.89087,
        },
        {
          latitude: 43.5177,
          longitude: 16.9222,
        },
        {
          latitude: 43.50969,
          longitude: 16.93965,
        },
        {
          latitude: 43.50347,
          longitude: 16.94882,
        },
      ],

      longitudeDelta: 0.25,
    },
    {
      key: 4,

      initialRegion: {
        latitude: 43.43001,
        longitude: 17.16475,
      },

      startPoint: {
        latitude: 43.43001,
        longitude: 17.16475,
      },

      finishPoint: {
        latitude: 43.43001,
        longitude: 17.16463,
      },

      waypoints: [
        {
          latitude: 43.42894,
          longitude: 17.16399,
        },
        {
          latitude: 43.41565,
          longitude: 17.17965,
        },
        {
          latitude: 43.40475,
          longitude: 17.21257,
        },
        {
          latitude: 43.37008,
          longitude: 17.26749,
        },
        {
          latitude: 43.3573,
          longitude: 17.26033,
        },
        {
          latitude: 43.34812,
          longitude: 17.24995,
        },
        {
          latitude: 43.34098,
          longitude: 17.22504,
        },
        {
          latitude: 43.35716,
          longitude: 17.17351,
        },
        {
          latitude: 43.38744,
          longitude: 17.1257,
        },
        {
          latitude: 43.40517,
          longitude: 17.08286,
        },
        {
          latitude: 43.42493,
          longitude: 17.12959,
        },
        {
          latitude: 43.43223,
          longitude: 17.14073,
        },
        {
          latitude: 43.4304,
          longitude: 17.15884,
        },
        {
          latitude: 43.43001,
          longitude: 17.16463,
        },
      ],

      longitudeDelta: 0.4,
    },
    {
      key: 5,

      initialRegion: {
        latitude: 43.49231,
        longitude: 17.2004,
      },

      startPoint: {
        latitude: 43.49231,
        longitude: 17.2004,
      },

      finishPoint: {
        latitude: 43.49231,
        longitude: 17.2004,
      },

      waypoints: [
        {
          latitude: 43.49231,
          longitude: 17.20039,
        },
        {
          latitude: 43.48891,
          longitude: 17.2128,
        },
        {
          latitude: 43.48037,
          longitude: 17.23741,
        },
        {
          latitude: 43.4696,
          longitude: 17.244642,
        },
        {
          latitude: 43.46133,
          longitude: 17.25388,
        },
        {
          latitude: 43.44995,
          longitude: 17.26033,
        },
        {
          latitude: 43.4745,
          longitude: 17.21878,
        },
        {
          latitude: 43.48232,
          longitude: 17.20836,
        },
        {
          latitude: 43.48581,
          longitude: 17.20063,
        },
        {
          latitude: 43.49012,
          longitude: 17.19666,
        },
        {
          latitude: 43.49155,
          longitude: 17.1983,
        },
        {
          latitude: 43.49218,
          longitude: 17.20002,
        },
        /* {
          latitude: 43.43223,
          longitude: 17.14073,
        },
        {
          latitude: 43.4304,
          longitude: 17.15884,
        },
        {
          latitude: 43.43001,
          longitude: 17.16463,
        }, */
      ],

      longitudeDelta: 0.1,
    },
    {
      key: 6,

      initialRegion: {
        latitude: 43.41607,
        longitude: 17.21972,
      },

      startPoint: {
        latitude: 43.41607,
        longitude: 17.21972,
      },

      finishPoint: {
        latitude: 43.41607,
        longitude: 17.21972,
      },

      waypoints: [
        {
          latitude: 43.41556,
          longitude: 17.21995,
        },
        {
          latitude: 43.39314,
          longitude: 17.23781,
        },
        {
          latitude: 43.40028,
          longitude: 17.25322,
        },
        {
          latitude: 43.432457,
          longitude: 17.246933,
        },
        {
          latitude: 43.433859,
          longitude: 17.246747,
        },
        {
          latitude: 43.427513,
          longitude: 17.200639,
        },
        {
          latitude: 43.43137,
          longitude: 17.20596,
        },
        {
          latitude: 43.434128,
          longitude: 17.24593,
        },
        {
          latitude: 43.42289,
          longitude: 17.21152,
        },
        {
          latitude: 43.41741,
          longitude: 17.21186,
        },
        {
          latitude: 43.4184,
          longitude: 17.21568,
        },
        {
          latitude: 43.41516,
          longitude: 17.2153,
        },
        {
          latitude: 43.41482,
          longitude: 17.21827,
        },
        {
          latitude: 43.41605,
          longitude: 17.21973,
        },
        /* {
          latitude: 43.39164,
          longitude: 17.23841,
        },
        {
          latitude: 43.3907,
          longitude: 17.23932,
        },
        {
          latitude: 43.38862,
          longitude: 17.24183,
        }, */
        /* {
          latitude: 43.43223,
          longitude: 17.14073,
        },
        {
          latitude: 43.4304,
          longitude: 17.15884,
        },
        {
          latitude: 43.43001,
          longitude: 17.16463,
        }, */
      ],

      longitudeDelta: 0.1,
    },
  ];

  return (
    <>
      <Swiper
        horizontal={true}
        loop={false}
        paginationStyle={{
          justifyContent: 'center',
          paddingTop: windowWidth * 0.2,
        }}
        showsButtons={true}
        dot={
          <View
            style={{
              backgroundColor: '#fff',
              width: 9,
              height: 9,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#8E8E8E',
              width: 9,
              height: 9,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }>
        {DATA.map((item, index) => (
          <View key={index} style={styles.container}>
            <MapView
              testID="map"
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              initialRegion={{
                latitude: item.initialRegion.latitude,
                longitude: item.initialRegion.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: item.longitudeDelta,
              }}
              loadingEnabled={true}>
              <MapViewDirections
                origin={item.startPoint}
                destination={item.finishPoint}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="red"
                waypoints={item.waypoints}
                mode="DRIVING"
              />
              <Marker
                coordinate={{
                  latitude: item.finishPoint.latitude,
                  longitude: item.finishPoint.longitude,
                }}>
                <View>
                  <Image
                    source={require('../images/bikeIconStartFInish.jpg')}
                    style={styles.destinationPoint}
                  />
                </View>
              </Marker>
            </MapView>
          </View>
        ))}
      </Swiper>
      {/* <View style={styles.container}>
        <MapView
          testID="map"
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: startPoint.latitude,
            longitude: startPoint.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled={true}>
          <MapViewDirections
            origin={startPoint}
            destination={finishPoint}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="red"
            waypoints={waypoints}
            mode="DRIVING"
          />
        </MapView>
      </View> */}
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
  dots: {
    /* position: 'absolute',
    top: windowWidth * 0.1, */
    width: 12,
    borderRadius: 12 / 2,
    height: 12,
    backgroundColor: 'white',
    /* right: windowWidth * 0.05, */
  },
  destinationPoint: {
    height: 30,
    width: 30,
    //backgroundColor: '#000000c0',
    //borderRadius: 50,
    //borderColor: '#fff',
    //borderWidth: 2,
  },
});
