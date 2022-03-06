import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableNativeFeedback,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Activities = () => {
  const navigation = useNavigation();

  const activitiesData = [
    {
      bgClr: '#1F83BB',
      //bgClr: '#E9FCFE',
      img: require('../images/kayakIcon.jpg'),
      txt: 'Kayaking',
      navigation: 'Kayak Screen',
    },
    {
      bgClr: '#8BCA3A',
      //bgClr: '#EBFDE1',
      img: require('../images/bikeIcon.jpg'),
      txt: 'Bike',
      navigation: 'Bike Screen',
    },
    {
      bgClr: '#ED4E4E',
      //bgClr: '#FFF1F1',
      img: require('../images/walkIcon.png'),
      txt: 'Walking',
      navigation: 'Walking Screen',
    },
  ];

  const activitiesData2 = [
    {
      bgClr: '#BB22AC',
      img: require('../images/partyIcon.png'),
      txt: 'Entertainment',
      navigation: 'Entertainment Screen',
    },
    {
      bgClr: '#D6C533',
      //bgClr: '#FFFDED',
      img: require('../images/quadIcon.jpg'),
      txt: 'Quad',
      navigation: 'Quad Screen',
    },
    {
      bgClr: '#1F83BB',
      //bgClr: '#F1FFFF',
      img: require('../images/swimIcon.png'),
      txt: 'Swimming',
      navigation: 'Swimming Screen',
    },
  ];

  return (
    <ScrollView style={styles.containerHorizontalIcons}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {activitiesData.map((item, index) => {
          return (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#00000040', false)}
              useForeground={true}
              onPress={() => navigation.navigate(item.navigation)}>
              <View
                key={index}
                style={{
                  width: windowWidth * 0.3,
                  flexDirection: 'column',
                  marginHorizontal: 5,
                }}>
                <View
                  style={[
                    styles.containerIcons,
                    {backgroundColor: item.bgClr},
                  ]}>
                  <Image source={item.img} style={styles.icons} />
                </View>
                <Text style={styles.txtExploreActions}>{item.txt}</Text>
              </View>
            </TouchableNativeFeedback>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 5,
        }}>
        {activitiesData2.map((item, index) => {
          return (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#00000040', false)}
              useForeground={true}
              onPress={() => navigation.navigate(item.navigation)}>
              <View
                key={index}
                style={{
                  width: windowWidth * 0.3,
                  flexDirection: 'column',
                }}>
                <View
                  style={[
                    styles.containerIcons,
                    {backgroundColor: item.bgClr},
                  ]}>
                  <Image source={item.img} style={styles.icons} />
                </View>

                <Text style={styles.txtExploreActions}>{item.txt}</Text>
              </View>
            </TouchableNativeFeedback>
          );
        })}
      </View>
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
    marginHorizontal: 20,
    marginTop: windowWidth * 0.07,
    backgroundColor: '#E9FCFE',
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  icons: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  txtExploreActions: {
    color: '#A8A8A8',
    marginVertical: windowWidth * 0.05,
    textAlign: 'center',
    fontSize: 12,
  },
  containerHorizontalIcons: {
    //marginBottom: windowWidth * 0.05,
    //flexDirection: 'column',
  },
});
