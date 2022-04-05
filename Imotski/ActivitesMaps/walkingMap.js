import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

//map view for specific region
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

//get dimensions for different smartphones
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//swiper
import Swiper from 'react-native-swiper';

//route directions
import MapViewDirections from 'react-native-maps-directions';

//modal
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from 'styled-components';

//google key
import {GOOGLE_KEY} from '@env';

export const WalkingMap = () => {
  const viewRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [image, setImage] = useState('');
  const [time, setTime] = useState(null);
  const [distance, setDistance] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

  const DATA = [
    {
      key: 1,
      initialRegion: {
        latitude: 43.4899845,
        longitude: 17.1392723,
      },
      startPoint: {
        latitude: 43.49561,
        longitude: 17.13442,
      },
      finishPoint: {
        latitude: 43.4699,
        longitude: 17.15378,
      },

      waypoints: [
        {
          latitude: 43.49569,
          longitude: 17.13475,
        },
        {
          latitude: 43.49304,
          longitude: 17.14055,
        },
        {
          latitude: 43.49124,
          longitude: 17.14576,
        },
        {
          latitude: 43.48891,
          longitude: 17.15083,
        },
        {
          latitude: 43.48705,
          longitude: 17.15161,
        },
        {
          latitude: 43.48425,
          longitude: 17.15421,
        },
        {
          latitude: 43.48257,
          longitude: 17.15547,
        },
        {
          latitude: 43.47937,
          longitude: 17.15717,
        },
        {
          latitude: 43.47556,
          longitude: 17.15687,
        },
        {
          latitude: 43.47273,
          longitude: 17.15512,
        },
        {
          latitude: 43.47145,
          longitude: 17.15516,
        },
        {
          latitude: 43.47041,
          longitude: 17.15426,
        },
        {
          latitude: 43.47,
          longitude: 17.15389,
        },
      ],

      longitudeDelta: 0.1,

      distance: 4.68,
      time: 2 + 'h',
      weight: 'medium',
      image: require('../images/badnjeviceCanyon.jpg'),
      title: 'Badnjevice',
      description: `This route revealing some of the natural attractions of Central Dalmatia leads to Badnjevice Canyon in the northern part of Imotska Krajina. This canyon connects Ričice Lake with the village of Proložac. The River Suvaja, which flows through Badnjevice, features a system of stone barriers in the lower part of its canyon. This is a significant architectural feat from the period of the Second Austrian Administration in Dalmatia (1813-1918) which strived to reduce the damaging effects of torrents on local agriculture, which depended on the fertile soil in the nearby Imotski Plain. Above the aforementioned river and on the western side of Badnjevice Canyon, there lies the fort of the same name (14th-15th century) that stands out because of its construction on multiple levels among the cliffs of the canyon. `,
    },
    {
      key: 2,
      initialRegion: {
        latitude: 43.4522466,
        longitude: 17.2017649,
      },

      startPoint: {
        latitude: 43.44843,
        longitude: 17.2111,
      },

      finishPoint: {
        latitude: 43.44849,
        longitude: 17.21108,
      },

      waypoints: [
        {
          latitude: 43.44821,
          longitude: 17.21221,
        },
        {
          latitude: 43.44988,
          longitude: 17.21388,
        },
        {
          latitude: 43.44964,
          longitude: 17.211,
        },
        {
          latitude: 43.44808,
          longitude: 17.20846,
        },
        {
          latitude: 43.447896,
          longitude: 17.213963,
        },

        {
          latitude: 43.447494,
          longitude: 17.214098,
        },
        {
          latitude: 43.447405,
          longitude: 17.21288,
        },
        {
          latitude: 43.45601,
          longitude: 17.201,
        },

        {
          latitude: 43.45163,
          longitude: 17.20573,
        },
        {
          latitude: 43.45536,
          longitude: 17.20321,
        },
        {
          latitude: 43.45668,
          longitude: 17.19935,
        },
        {
          latitude: 43.45485,
          longitude: 17.19653,
        },
        {
          latitude: 43.45006,
          longitude: 17.20125,
        },
        {
          latitude: 43.44807,
          longitude: 17.20832,
        },
        {
          latitude: 43.44836,
          longitude: 17.21055,
        },
        {
          latitude: 43.44855,
          longitude: 17.21103,
        },
      ],

      longitudeDelta: 0.02,

      distance: 5.26,
      time: 1 + 'h' + 30 + 'min',
      weight: 'medium',
      image: require('../images/imotskiRoute.jpg'),
      title: 'A Town on Stone and Water',
      description:
        'The Blue and Red Lakes (Modro i Crveno jezero) are located in the immediate vicinity of Imotski. These are karst phenomena of the Dalmatian Hinterland created after the collapse of vast underground caves. The Blue Lake is associated with tales of fairies and the famous legend of Hasanaginica, sung in the ballad of the same name (first written down in 1774, and one of the most translated folk ballads in the world). An integral part of this geomorphological monument is the Topana Fortress, which lies on the cliff above the Blue Lake. It was built on several levels, with layers from the 14th to 18th century still visible today, as well as several older layers that have been archaeologically preserved. The Red Lake, the deepest lake in Europe (a karst sinkhole deeper than 500 m, with a water level varying between 285 and 320 m) lies 1.5 km north-west of Imotski. The lake gets its name from the red-coloured, almost vertical cliffs surrounding it. A legend about the formation of the lake has it that the castle of a rich and arrogant man called Gavan collapsed and created an abyss as a punishment from God. The Blue and Red Lakes have been protected geomorphological monuments since 1964.',
    },
  ];

  const openModal = (index, image, time, distance, title, description) => {
    setModal(true);
    setDistance(distance);
    setTime(time);
    setImage(image);
    setModalIndex(index);
    setTitle(title);
    setDescription(description);
  };

  useEffect(async () => {
    const getTheme = await AsyncStorage.getItem('theme');

    if (getTheme === 'dark') {
      setIsEnabled(true);
    } else if (getTheme === 'light') {
      setIsEnabled(false);
    }
  }, []);

  const {colors} = useTheme();

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
          <>
            <View key={index} style={styles.container}>
              <MapView
                testID="map"
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={
                  isEnabled ? mapStyleDarkMode : mapStyleCustomeMode
                }
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
                  apikey={GOOGLE_KEY}
                  strokeWidth={3}
                  strokeColor="red"
                  waypoints={item.waypoints}
                  mode="WALKING"
                />
                <Marker
                  coordinate={{
                    latitude: item.finishPoint.latitude,
                    longitude: item.finishPoint.longitude,
                  }}
                  onPress={() => {
                    openModal(
                      index,
                      item.image,
                      item.distance,
                      item.time,
                      item.title,
                      item.description,
                    );
                  }}>
                  <View>
                    <Image
                      source={require('../images/walkingIcon.png')}
                      style={styles.destinationPoint}
                    />
                  </View>
                </Marker>
              </MapView>
              <View
                style={[
                  styles.bikeRouteDetails,
                  {backgroundColor: colors.MODAL_BACKGROUND_COLOR},
                ]}>
                <View style={styles.bikeRouteDetailsColumn}>
                  <View style={styles.bikeSingleDetail}>
                    <Text
                      style={[
                        styles.bikeRouteTitle,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      Distance
                    </Text>
                    <Text
                      style={[
                        styles.bikeRouteInfo,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      {item.distance} km
                    </Text>
                  </View>
                  <View style={styles.bikeSingleDetail}>
                    <Text
                      style={[
                        styles.bikeRouteTitle,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      Time
                    </Text>
                    <Text
                      style={[
                        styles.bikeRouteInfo,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      {item.time}
                    </Text>
                  </View>
                  <View style={styles.bikeSingleDetail}>
                    <Text
                      style={[
                        styles.bikeRouteTitle,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      Weight
                    </Text>
                    <Text
                      style={[
                        styles.bikeRouteInfo,
                        {color: colors.PRIMARY_TEXT_COLOR},
                      ]}>
                      {item.weight}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        ))}
      </Swiper>

      <Modal
        key={modalIndex}
        statusBarTranslucent={true}
        propagateSwipe
        deviceHeight={'auto'}
        animationIn={'zoomIn'}
        animationInTiming={700}
        isVisible={modal}
        style={{height: windowHeight}}
        onBackdropPress={() => setModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: 'auto',
                width: windowWidth * 0.9,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  zIndex: 999,
                  height: 'auto',
                  /* borderColor: 'red',
                  borderWidth: 1,
                  backgroundColor: 'green', */
                  justifyContent: 'center',
                  zIndex: 1,
                }}>
                <View
                  style={{
                    zIndex: 1,
                    alignItems: 'center',
                    width: windowWidth,
                    height: 'auto',
                    /* borderColor: 'red',
                    borderWidth: 1, */
                    top: windowWidth * 0.08,
                  }}>
                  <Text style={styles.routeTitle}>{title}</Text>
                  <View style={styles.btnClose}>
                    <TouchableOpacity onPress={() => setModal(false)}>
                      <FontAwesomeIcon
                        icon={faTimes}
                        color={'rgba(255, 255, 255, 1)'}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.bikeDetailsContainer}>
                  <Text style={[styles.bikeRouteTitle, {color: 'white'}]}>
                    Distance
                  </Text>
                  <Text style={[styles.bikeRouteTitle, {color: 'white'}]}>
                    Time
                  </Text>
                </View>
                <View style={styles.bikeSingleDetailsContainer}>
                  <Text
                    style={[
                      styles.bikeRouteTitle,
                      {color: 'white', fontSize: 20},
                    ]}>
                    {time} km
                  </Text>
                  <Text
                    style={[
                      styles.bikeRouteTitle,
                      {color: 'white', fontSize: 20},
                    ]}>
                    {distance}
                  </Text>
                </View>
                <Image source={image} style={styles.imageModal} />

                {/* <Image
                  source={require('../images/hillsIcon.jpg')}
                  style={styles.iconModal}
                /> */}
              </View>
            </View>

            <View
              style={[
                styles.textModalContainer,
                {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
              ]}>
              <ScrollView style={{flex: 1, marginTop: 0, margin: 10}}>
                <Text
                  style={[
                    styles.routeTextDetails,
                    {color: colors.FONTAWESOME_ICON_COLOR},
                  ]}>
                  {description}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  dots: {
    width: 12,
    borderRadius: 12 / 2,
    height: 12,
    backgroundColor: 'white',
  },
  destinationPoint: {
    height: 30,
    width: 30,
  },
  bikeRouteDetails: {
    backgroundColor: 'white',
    width: windowWidth * 0.9,
    height: 'auto',
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowWidth * 0.2,
    flexDirection: 'column',
    borderRadius: 10,
    elevation: 10,
  },
  bikeRouteDetailsColumn: {
    flexDirection: 'row',
    marginBottom: 10,
    /*  borderColor: 'red',
    borderWidth: 1, */
  },
  bikeSingleDetail: {
    flex: 1,
    justifyContent: 'space-between',
    /* borderWidth: 1,
    borderColor: 'black', */
    alignItems: 'center',
    height: 'auto',
  },
  bikeRouteTitle: {
    fontSize: 16,
    paddingTop: windowWidth * 0.03,
    textAlign: 'center',
  },
  bikeRouteInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: windowWidth * 0.03,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  modalView: {
    height: windowHeight * 0.8,
    //backgroundColor: 'white',
    width: windowWidth * 0.9,
    marginBottom: windowWidth * 0.15,
    //bottom: windowWidth * 0.1,
  },
  imageModal: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.4,
    borderRadius: 10,
    //bottom: windowWidth * 0.27,
  },
  routeTextDetails: {
    paddingHorizontal: 20,
    paddingTop: windowWidth * 0.15,
    fontSize: 15,
    textAlign: 'justify',
    color: 'black',
  },
  btnClose: {
    right: windowWidth * 0.1,
    //marginRight: windowWidth * 0.05,
    height: 'auto',
    width: 'auto',
    alignSelf: 'flex-end',
  },
  textModalContainer: {
    backgroundColor: 'white',
    height: windowHeight * 0.5,
    bottom: windowWidth * 0.1,
    borderRadius: 10,

    //alignSelf: 'center',
  },
  routeTitle: {
    position: 'absolute',
    zIndex: 1,
    //top: windowWidth * 0.08,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    width: windowWidth * 0.5,
  },
  bikeDetailsContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: windowWidth * 0.7,
    bottom: windowWidth * 0.12,
    height: windowHeight * 0.15,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    zIndex: 999,
    //paddingTop: 10,

    /* borderColor: 'red',
    borderWidth: 1, */
  },
  bikeSingleDetailsContainer: {
    width: windowWidth * 0.7,
    bottom: windowWidth * 0.2,
    position: 'absolute',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    zIndex: 999,
  },
  iconModal: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: windowWidth * 0.5,
    left: windowWidth * 0.65,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
  },
});
