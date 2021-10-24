import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Activities = () => {
  const activitiesData = [
    {
      bgClr: '#E9FCFE',
      img: require('../images/kayakIcon.jpg'),
      txt: 'Kayaking',
    },
    {
      bgClr: '#EBFDE1',
      img: require('../images/bikeIcon.jpg'),
      txt: 'Bike',
    },
    {
      bgClr: '#FFF1F1',
      img: require('../images/walkIcon.png'),
      txt: 'Walking',
    },
    {
      bgClr: '#FFFDED',
      img: require('../images/quadIcon.jpg'),
      txt: 'Quad',
    },
    {
      bgClr: '#F1FFFF',
      img: require('../images/swimIcon.png'),
      txt: 'Swimming',
    },
  ];

  return (
    <ScrollView horizontal={true} style={styles.containerHorizontalIcons}>
      {activitiesData.map(item => {
        return (
          <View key={Math.random().toString(36).substr(2, 9)}>
            <View
              style={[styles.containerIcons, {backgroundColor: item.bgClr}]}>
              <Image source={item.img} style={styles.icons} />
            </View>
            <Text style={styles.txtExploreActions}>{item.txt}</Text>
          </View>
        );
      })}
      {/* <View>
        <View style={styles.containerIcons}>
          <Image
            source={require('../images/kayakIcon.jpg')}
            style={styles.icons}
          />
        </View>
        <Text style={styles.txtExploreActions}>Kayaking</Text>
      </View>
      <View>
        <View style={[styles.containerIcons, {backgroundColor: '#EBFDE1'}]}>
          <Image
            source={require('../images/bikeIcon.jpg')}
            style={styles.icons}
          />
        </View>
        <Text style={styles.txtExploreActions}>Bike</Text>
      </View>
      <View>
        <View style={[styles.containerIcons, {backgroundColor: '#FFF1F1'}]}>
          <Image
            source={require('../images/walkIcon.png')}
            style={styles.icons}
          />
        </View>
        <Text style={styles.txtExploreActions}>Walking</Text>
      </View>
      <View>
        <View style={[styles.containerIcons, {backgroundColor: '#FFFDED'}]}>
          <Image
            source={require('../images/quadIcon.jpg')}
            style={styles.icons}
          />
        </View>
        <Text style={styles.txtExploreActions}>Quad</Text>
      </View>
      <View>
        <View style={[styles.containerIcons, {backgroundColor: '#F1FFFF'}]}>
          <Image
            source={require('../images/swimIcon.png')}
            style={styles.icons}
          />
        </View>
        <Text style={styles.txtExploreActions}>Swimming</Text>
      </View> */}
    </ScrollView>
  );
};
export default Activities;

const styles = StyleSheet.create({
  containerIcons: {
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: windowWidth * 0.1,
    backgroundColor: '#E9FCFE',
    width: windowWidth * 0.25,
    height: windowHeight * 0.12,
    alignItems: 'center',
    elevation: 5,
  },
  icons: {
    width: 70,
    height: 70,
  },
  txtExploreActions: {
    color: 'black',
    marginVertical: windowWidth * 0.05,
    textAlign: 'center',
  },
  containerHorizontalIcons: {
    marginBottom: windowWidth * 0.2,
  },
});
