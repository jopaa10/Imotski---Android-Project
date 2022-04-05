import React, {useRef, useState, useEffect} from 'react';
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

//google api
const GOOGLE_MAPS_APIKEY = 'AIzaSyBWeAUtDlbMRmnqsLSvQVbO7BsQzxGQDpo';

//route directions
import MapViewDirections from 'react-native-maps-directions';

//modal
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BikeScreen = () => {
  const viewRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [image, setImage] = useState('');
  const [time, setTime] = useState(null);
  const [distance, setDistance] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

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

      distance: 23.63,
      time: 1 + 'h' + 15 + 'min',
      weight: 'hill',
      image: require('../images/prolozacLake.png'),
      title: 'Blato Route',
      description: `The route has its beginning next to the "Green Cathedral" from where it goes to one of the sources of the river Vrljika, two lakes, the so-called. "Two eyes", and then continues on the asphalt road in a westerly direction to Donji Prološac, Badnjevica canyon and further to Prološki Blato. From Prološki Blato, continue along the macadam road to the south and through the field you reach Čujić Luka, a small group of stone houses whose position and decoration remind you of how and what people used to live in this area. `,
    },
    {
      key: 2,
      initialRegion: {
        latitude: 43.4630502,
        longitude: 17.2048572,
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

      distance: 16.7,
      time: 'cca ' + 1 + 'h',
      weight: 'hill',
      image: require('../images/ecoVillageGrabovci.jpeg'),
      title: 'Eco tour of Grabovci village',
      description:
        'This circular asphalt route starts and finishes at the entrance of Modro lake. Enjoy the wonderful views over Modro and Crveno lakes, as you go uphill towards the road that leads you towards Gornji Proložac, as well as the field of Imotski and Biokovo mountain. After further 2 kilometres, you will come up to Podi plateau and the eco village of Grabovci, where you can see the birth house of a Croatian poet and politician Vlado Gotovac. Enjoy a homemade meal and recharge your batteries at the family farm Grabovac. The rest of the route is an easy downhill ride through Glavina Gornja, above the Modro lake, through the city streets to get back to the starting point – the entrance to Modro lake.',
    },
    {
      key: 3,
      initialRegion: {
        latitude: 43.5310747,
        longitude: 16.9650453,
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

      distance: 34.8,
      time: 3 + 'h' + 30 + 'min',
      weight: 'hill',
      image: require('../images/lovrecStecak.jpg'),
      title: 'Lovrec Route',
      description: `The parking lot near the Hotel "Zdilar" is the starting point of another exclusively asphalt route that follows the road through Proložac Donji towards Lovreć via Dolić Draga. The road passes on the northern side above Lake Galipovac, from where there is a beautiful view of the Imotski field and Prološko Blato. After the village of Nikolići and the connection to the state road DC60, the route turns east and after a short descent along the state road you come to a small necropolis Mramori composed of several medieval stećak tombstones right next to the road.`,
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

      longitudeDelta: 0.3,

      distance: 47.1,
      time: 'cca ' + 6 + 'h',
      weight: 'hill',
      image: require('../images/bikeRoute.jpg'),
      title: 'Poljica, Krstatice, Runovici',
    },
    {
      key: 5,

      initialRegion: {
        latitude: 43.4664309,
        longitude: 17.2269359,
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

      distance: 18.2,
      time: 1 + 'h' + 15 + 'min',
      weight: 'hill',
      image: require('../images/imotskiRoute.jpg'),
      title: 'Imotski Cap Route',
      description: `The beginning of this route is in Prološac Gornji in front of the birthplace of Vlado Gotovac, a Croatian poet and politician, and next to the restaurant "Grabovac". On a macadam road between old stone houses and then through untouched nature, the route leads us in an easterly direction to Gornji Vinjani. Asphalt road through the hamlets of Montenegro and Markota returns to the hamlet of Đuzeli, from where the forest pathleads back to the catering facility OPG "Grabovac". The route is ideal for driving on hot summer evenings when a light breeze is constantly blowing over the entire Imotski "cap".`,
    },
    {
      key: 6,

      initialRegion: {
        latitude: 43.4134706,
        longitude: 17.2309197,
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

      distance: 20.8,
      time: 45 + 'min',
      weight: 'straight',
      image: require('../images/vrljikaRoute.jpg'),
      title: 'Back to past',
      description: `The beginning of the route is in Zmijavac in front of the old mill on Đogića dam. The route goes along beautiful macadam downstream along the river Vrljika, over the Zmijavački bridge to Runovići, from where the asphalt road crosses the entire field to the hamlet of Rudeži in Vinjani Donji. The route goes around the necropolis with stećak tombstones from the Middle Ages and continues in a westerly direction and back to the Vrljica River and returns on macadam to the Bublin Bridge, where the asphalt begins again. After the bridge, the route turns right towards the archeological site of the early Christian basilica from the 5th century and returns back over the Dikovača hill and another medieval necropolis to the starting point.`,
    },
    {
      key: 7,

      initialRegion: {
        latitude: 43.4549336,
        longitude: 17.1998652,
      },

      startPoint: {
        latitude: 43.44624,
        longitude: 17.21587,
      },

      finishPoint: {
        latitude: 43.44624,
        longitude: 17.21587,
      },

      waypoints: [
        /* {
          latitude: 43.44648,
          longitude: 17.21634,
        },*/
        {
          latitude: 43.4464,
          longitude: 17.21625,
        },
        {
          latitude: 43.45771,
          longitude: 17.18935,
        },
        {
          latitude: 43.47564,
          longitude: 17.16643,
        },
        {
          latitude: 43.46847,
          longitude: 17.16769,
        },
        {
          latitude: 43.46363,
          longitude: 17.15602,
        },
        {
          latitude: 43.450013,
          longitude: 17.171958,
        },
        {
          latitude: 43.43936,
          longitude: 17.18435,
        },
        {
          latitude: 43.44374,
          longitude: 17.19437,
        },
        {
          latitude: 43.44573,
          longitude: 17.20686,
        },
        {
          latitude: 43.44527,
          longitude: 17.21772,
        },
        {
          latitude: 43.44618,
          longitude: 17.21599,
        },
        {
          latitude: 43.449017,
          longitude: 17.211402,
        },
        {
          latitude: 43.449206,
          longitude: 17.225321,
        },
        {
          latitude: 43.450822,
          longitude: 17.224168,
        },
        {
          latitude: 43.450222,
          longitude: 17.219353,
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

      distance: 24.2,
      time: 2 + 'h',
      weight: 'hill',
      image: require('../images/blueLakeRoute.jpg'),
      title: 'Over Red and Blue Lake',
      description: `The route named after the most famous pearls of Imotski Krajina, Blue and Red Lakes has its beginning in the city center, on the so-called. "Old Station", ie Dr. Franjo Tudjman Square. Continuing through the central city street - Šetalište Stjepana Radića, exit onto Put Gaja in the direction of Posušje, from where it turns left below the Džardina sinkhole towards the macadam road above the Blue and Red Lakes. Returning to the asphalt ascent above Crveni Lake and passing the school in the area of Brlog in Gornji Prološac, the route follows a macadam descent which is partly technically more demanding but therefore offers a beautiful view of Imotski field, Badnjevica canyon and mountains Biokovo and Zavelim. Further down through the vineyard "Old Roman Road" route leads us to the canyon Badnjevica after which the asphalt-macadam combination of the base goes to the archaeological site Opačac (medieval Franciscan monastery) and "Our Lady's Church", ie the church of St. Mary. Then, through the complex of mills "Perinuša", you take the macadam field road to the asphalt ascent through Glavina Donja and return to the starting point of the route along the longest city street.`,
    },
    {
      key: 8,

      initialRegion: {
        latitude: 43.4655741,
        longitude: 17.1594716,
      },

      startPoint: {
        latitude: 43.4483,
        longitude: 17.21001,
      },

      finishPoint: {
        latitude: 43.4483,
        longitude: 17.21001,
      },

      waypoints: [
        {
          latitude: 43.44832,
          longitude: 17.20997,
        },
        {
          latitude: 43.46621,
          longitude: 17.17989,
        },
        {
          latitude: 43.49511,
          longitude: 17.13658,
        },
        {
          latitude: 43.48185,
          longitude: 17.12855,
        },
        {
          latitude: 43.48265,
          longitude: 17.08356,
        },
        {
          latitude: 43.46438,
          longitude: 17.09535,
        },
        {
          latitude: 43.44998,
          longitude: 17.12078,
        },
        {
          latitude: 43.44201,
          longitude: 17.1698,
        },
        {
          latitude: 43.44508,
          longitude: 17.20145,
        },
        {
          latitude: 43.44577,
          longitude: 17.21018,
        },
        {
          latitude: 43.44487,
          longitude: 17.21835,
        },
        {
          latitude: 43.44753,
          longitude: 17.21148,
        },
        {
          latitude: 43.4483,
          longitude: 17.21001,
        },
        /* {
          latitude: 43.449206,
          longitude: 17.225321,
        },
        {
          latitude: 43.450822,
          longitude: 17.224168,
        },
        {
          latitude: 43.450222,
          longitude: 17.219353,
        }, */
      ],

      longitudeDelta: 0.2,

      distance: 33.9,
      time: 3 + 'h' + 15 + 'min',
      weight: 'hill',
      image: require('../images/galipovacRoute.jpg'),
      title: 'Over Galipovac',
      description: 'There is no description at this time',
    },
    {
      key: 9,

      initialRegion: {
        latitude: 43.4512326,
        longitude: 17.1910417,
      },

      startPoint: {
        latitude: 43.46838,
        longitude: 17.15425,
      },

      finishPoint: {
        latitude: 43.46838,
        longitude: 17.15425,
      },

      waypoints: [
        {
          latitude: 43.46838,
          longitude: 17.15424,
        },
        {
          latitude: 43.45305,
          longitude: 17.15198,
        },
        {
          latitude: 43.4429,
          longitude: 17.14727,
        },
        {
          latitude: 43.43289,
          longitude: 17.19407,
        },
        {
          latitude: 43.42049,
          longitude: 17.2245,
        },
        {
          latitude: 43.4376,
          longitude: 17.21019,
        },
        {
          latitude: 43.44358,
          longitude: 17.19547,
        },
        {
          latitude: 43.45031,
          longitude: 17.17834,
        },
        {
          latitude: 43.45694,
          longitude: 17.17119,
        },
        {
          latitude: 43.46339,
          longitude: 17.16061,
        },
        {
          latitude: 43.466,
          longitude: 17.15557,
        },
        {
          latitude: 43.46746,
          longitude: 17.15497,
        },
        {
          latitude: 43.468212,
          longitude: 17.153085,
        },

        {
          latitude: 43.464957,
          longitude: 17.151979,
        },
        {
          latitude: 43.463753,
          longitude: 17.15531,
        },
        /*{
          latitude: 43.450222,
          longitude: 17.219353,
        }, */

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

      longitudeDelta: 0.12,

      distance: 21.7,
      time: 1 + 'h' + 15 + 'min',
      weight: 'hill',
      image: require('../images/vrljikaRoute.jpg'),
      title: 'The heart of the field',
      description: `This exclusively asphalt route, starting in the center of Prološac Donji, goes through Lug, Šumet, "Perinuša", Kamenmost to the 11 km distant bridge on Bublin in Zmijavci. From the Bublin Bridge, the route turns towards the central part of the Imotski field, and across Glavina Donja and past the hotels "Zdilar" and the "Green Cathedral" it extends towards the center of Prološac, where it began.`,
    },
    {
      key: 10,

      initialRegion: {
        latitude: 43.4396179,
        longitude: 17.0084972,
      },

      startPoint: {
        latitude: 43.39689,
        longitude: 17.05624,
      },

      finishPoint: {
        latitude: 43.39689,
        longitude: 17.05624,
      },

      waypoints: [
        {
          latitude: 43.39691,
          longitude: 17.05621,
        },
        {
          latitude: 43.41045,
          longitude: 17.02817,
        },
        {
          latitude: 43.43248,
          longitude: 16.95217,
        },
        {
          latitude: 43.45543,
          longitude: 16.92203,
        },
        {
          latitude: 43.48026,
          longitude: 16.97347,
        },
        {
          latitude: 43.46834,
          longitude: 17.04068,
        },
        {
          latitude: 43.45087,
          longitude: 17.04193,
        },
        {
          latitude: 43.43474,
          longitude: 17.06609,
        },
        {
          latitude: 43.41979,
          longitude: 17.09524,
        },
        {
          latitude: 43.40357,
          longitude: 17.07649,
        },
        {
          latitude: 43.39915,
          longitude: 17.06641,
        },
        {
          latitude: 43.39691,
          longitude: 17.05621,
        },
        /* {
          latitude: 43.468212,
          longitude: 17.153085,
        },

        {
          latitude: 43.464957,
          longitude: 17.151979,
        },
        {
          latitude: 43.463753,
          longitude: 17.15531,
        }, */
        /*{
          latitude: 43.450222,
          longitude: 17.219353,
        }, */
      ],

      longitudeDelta: 0.25,

      distance: 45.8,
      time: 'cca ' + 6 + 'h',
      weight: 'hill',
      image: require('../images/bikeRoute.jpg'),
      title: 'Zagvozd, Sestanovac Route',
      description: 'There is no description at this time',
    },
    {
      key: 11,

      initialRegion: {
        latitude: 43.4612884,
        longitude: 17.0778139,
      },

      startPoint: {
        latitude: 43.4522,
        longitude: 17.17674,
      },

      finishPoint: {
        latitude: 43.4522,
        longitude: 17.17674,
      },

      waypoints: [
        {
          latitude: 43.45267,
          longitude: 17.17569,
        },
        {
          latitude: 43.48302,
          longitude: 17.12165,
        },
        {
          latitude: 43.48398,
          longitude: 17.08143,
        },
        {
          latitude: 43.478773,
          longitude: 17.017473,
        },
        {
          latitude: 43.475966,
          longitude: 17.022777,
        },
        {
          latitude: 43.475422,
          longitude: 17.02518,
        },
        {
          latitude: 43.49504,
          longitude: 17.03806,
        },
        {
          latitude: 43.4647,
          longitude: 17.05002,
        },
        {
          latitude: 43.45847,
          longitude: 17.07988,
        },
        {
          latitude: 43.460406,
          longitude: 17.092327,
        },
        {
          latitude: 43.44156,
          longitude: 17.15405,
        },
        {
          latitude: 43.44936,
          longitude: 17.17863,
        },
        {
          latitude: 43.45213,
          longitude: 17.17681,
        },

        /*{
          latitude: 43.39691,
          longitude: 17.05621,
        }, */
      ],

      longitudeDelta: 0.25,

      distance: 34.8,
      time: 'cca ' + 5 + 'h',
      weight: 'hill',
      image: require('../images/bikeRoute.jpg'),
      title: 'Lovrec, Lokvicic, Prolozac',
      description: 'There is no description at this time',
    },
  ];

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
                showsUserLocation={true}
                customMapStyle={
                  isEnabled ? mapStyleDarkMode : mapStyleCustomeMode
                }
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
                      source={require('../images/bikeIconStartFInish.jpg')}
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

                {/*                 <Image
                  source={require('../images/hillsIcon.jpg')}
                  style={styles.iconModal}
                /> */}
              </View>

              {/* <ScrollView>
                <Text style={styles.routeTextDetails}>{description}</Text>
              </ScrollView> */}
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
    color: 'black',
    //fontWeight: 'bold',
  },
  bikeRouteInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: windowWidth * 0.03,
    textAlign: 'center',
    color: 'black',
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
    top: windowWidth * 0.82,
    left: windowWidth * 0.65,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
  },
});
