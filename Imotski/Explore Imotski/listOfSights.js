import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt, faHeart} from '@fortawesome/free-solid-svg-icons';

//navigation hook
import {useNavigation} from '@react-navigation/native';

//svg, path
import Svg, {Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;

const ListOfSights = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Imotski')}>
        <View style={[styles.container, {marginTop: windowWidth * 0.1}]}>
          <Image
            style={styles.image}
            source={require('../images/blueLakeH.jpg')}
          />
          <FontAwesomeIcon icon={faHeart} style={styles.iconHeart} size={20} />
          <View style={styles.cityContainer}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={styles.iconLocation}
              size={12}
            />
            <Text style={[styles.cityTitle, {marginLeft: 0}]}>Imotski</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Svg
        width="375"
        height="50"
        viewBox="0 15 375 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M376.555 48.8495L360.478 53.8495C345.405 59.8495 313.25 70.8495 282.099 61.8495C250.949 52.8495 219.799 21.8495 187.644 8.84946C156.493 -4.15054 125.343 -0.150543 94.1926 10.8495C62.0375 21.8495 30.8872 40.8495 15.8144 50.8495L-0.263153 59.8495V93.8495H15.8144C30.8872 93.8495 62.0375 93.8495 94.1926 93.8495C125.343 93.8495 156.493 93.8495 187.644 93.8495C219.799 93.8495 250.949 93.8495 282.099 93.8495C313.25 93.8495 345.405 93.8495 360.478 93.8495H376.555V48.8495Z"
          fill="#1F83BB"
        />
      </Svg>
      <View
        style={{
          backgroundColor: '#1F83BB',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Biokovo')}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../images/biokovo.jpg')}
            />
            <FontAwesomeIcon
              icon={faHeart}
              style={styles.iconHeart}
              size={20}
            />
            <View style={styles.cityContainer}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={styles.iconLocation}
                size={12}
              />
              <Text style={[styles.cityTitle, {marginLeft: 0}]}>Biokovo</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#1F83BB'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Prolozac')}>
          <View style={[styles.container, {marginTop: windowWidth * 0.12}]}>
            <Image
              style={styles.image}
              source={require('../images/dvaOkaH.jpg')}
            />
            <FontAwesomeIcon
              icon={faHeart}
              style={styles.iconHeart}
              size={20}
            />
            <View style={styles.cityContainer}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={styles.iconLocation}
                size={12}
              />
              <Text style={[styles.cityTitle, {marginLeft: 5}]}>Prolozac</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Svg
        width="375"
        height="50"
        viewBox="0 30 380 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M375.718 47.952L360.087 61.0087C344.456 74.0654 313.194 100.179 281.932 110.624C250.67 121.07 219.408 115.847 188.146 97.5674C156.884 79.2881 125.622 47.952 94.36 40.1179C63.098 32.2839 31.836 47.952 16.205 55.786L0.574005 63.62L0.574005 0.947815H16.205C31.836 0.947815 63.098 0.947815 94.36 0.947815C125.622 0.947815 156.884 0.947815 188.146 0.947815C219.408 0.947815 250.67 0.947815 281.932 0.947815C313.194 0.947815 344.456 0.947815 360.087 0.947815H375.718L375.718 47.952Z"
          fill="#1F83BB"
        />
      </Svg>
      <TouchableOpacity onPress={() => navigation.navigate('Ricice')}>
        <View style={[styles.container, {marginBottom: windowWidth * 0.1}]}>
          <Image
            style={styles.image}
            source={require('../images/greenLakeH.jpg')}
          />
          <FontAwesomeIcon icon={faHeart} style={styles.iconHeart} size={20} />
          <View style={styles.cityContainer}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={styles.iconLocation}
              size={12}
            />
            <Text style={[styles.cityTitle, {marginRight: 12}]}>Ricice</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    //marginBottom: 20,
    shadowColor: '#000',
    //overflow: 'hidden',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cityContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 155,
    left: 20,
    width: 85,
    height: 26,
    borderRadius: 20,
    backgroundColor: 'rgba(12, 12, 12, 0.85)',
  },
  cityTitle: {
    width: 70,
    height: 18,
    marginLeft: 5,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  iconLocation: {
    color: 'white',
    position: 'absolute',
    left: 7,
  },
  iconHeart: {
    position: 'absolute',
    color: 'white',
    left: windowWidth * 0.8,
    right: windowWidth * 0.8,
    top: 10,
  },
});

export default ListOfSights;
