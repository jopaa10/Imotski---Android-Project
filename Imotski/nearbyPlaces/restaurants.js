import React, {useState, useEffect} from 'react';
import {View, Text, Platform, Image} from 'react-native';

//location
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

//explore imotski - home page template
import {TemplateExploreImotski} from '../exploreImotskiTemplate';
import Activities from '../Explore Imotski/activities';

//images
import NearbyPlacesByImages from './nearbyPlacesByImages';

export const Restaurants = () => {
  const [location, setLocation] = useState(null);
  const [currentCoord, setCurrentCoord] = useState([]);
  const [nearbyCoffeesPhotos, setNearbyCoffeesPhotos] = useState([]);

  const handleLocationPermission = async () => {
    let permissionCheck = '';

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted')
          : console.warn('Location permission denied');
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

        setCurrentCoord({lat: latitude, lng: longitude});
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
  }, []);

  const handleRestaurantsSearch = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&keyword=restaurants&location=${currentCoord.lat},${currentCoord.lng}&radius=6000&key=AIzaSyBWeAUtDlbMRmnqsLSvQVbO7BsQzxGQDpo`,
    )
      .then(res => res.json())
      .then(data => {
        setNearbyCoffeesPhotos(data.results);
      });
  };

  useEffect(() => {
    if (currentCoord) {
      console.log(currentCoord);
      handleRestaurantsSearch();
    }
  }, [currentCoord]);

  return (
    <>
      <TemplateExploreImotski
        nearbyPlaces={
          <ScrollView horizontal={true}>
            <NearbyPlacesByImages
              imageData={nearbyCoffeesPhotos}
              userCurrentCoord={currentCoord}
            />
            {/* <Text>{item.geometry.location.lat}</Text>  */}
          </ScrollView>
        }
        activity={<Activities />}
      />
    </>
  );
};
