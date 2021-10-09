import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

//blue lake template
import {TemplateInfo} from '../infoTemplate';

//Dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ReviewScreen = () => {
  return (
    <>
      <TemplateInfo
        image={require('../images/blueLakeArticle.jpg')}
        city={'Imotski'}
        sight={'Blue Lake'}
        color={'grey'}
        color2={'grey'}
        color3={'black'}
        review={
          <>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewImageContainer}>
                <Image
                  style={styles.reviewImage}
                  source={require('../images/blueLakeArticle.jpg')}
                />
              </View>
              <View style={styles.reviewText}>
                <Text style={styles.reviewNameContainer}>John</Text>
                <Text style={styles.reviewCommentContainer}>
                  bsdjknnsdkksddsksdls nbjksvkfjsljsckn jks b
                </Text>
                <Text style={styles.reviewDateContainer}>March 23, 2018</Text>
              </View>
            </View>

            <View style={styles.reviewContainer}>
              <View style={styles.reviewImageContainer}>
                <Image
                  style={styles.reviewImage}
                  source={require('../images/blueLakeArticle.jpg')}
                />
              </View>
              <View style={styles.reviewText}>
                <Text style={styles.reviewNameContainer}>John</Text>
                <Text style={styles.reviewCommentContainer}>
                  bsdjknnsdkksddsksdls nbjksvkfjsljsckn jks b
                </Text>
                <Text style={styles.reviewDateContainer}>March 23, 2018</Text>
              </View>
            </View>

            <View style={styles.reviewContainer}>
              <View style={styles.reviewImageContainer}>
                <Image
                  style={styles.reviewImage}
                  source={require('../images/blueLakeArticle.jpg')}
                />
              </View>
              <View style={styles.reviewText}>
                <Text style={styles.reviewNameContainer}>John</Text>
                <Text style={styles.reviewCommentContainer}>
                  bsdjknnsdkksddsksdls nbjksvkfjsljsckn jks b
                </Text>
                <Text style={styles.reviewDateContainer}>March 23, 2018</Text>
              </View>
            </View>
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    bottom: windowWidth * 0.3,
    width: windowWidth,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  reviewImageContainer: {
    width: windowWidth * 0.15,
    paddingVertical: windowWidth * 0.05,
  },
  reviewImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    borderRadius: Math.round((windowWidth + windowHeight) / 2),
  },
  reviewText: {
    width: windowWidth * 0.6,
    height: 'auto',
    paddingVertical: windowWidth * 0.05,
  },
  reviewNameContainer: {
    //paddingTop: windowWidth * 0.02,
  },
  reviewCommentContainer: {
    width: windowWidth * 0.6,
    alignItems: 'center',
    paddingTop: windowWidth * 0.05,
  },
  reviewDateContainer: {
    color: 'rgba(0,0,0,0.3)',
    paddingTop: windowWidth * 0.05,
    paddingBottom: windowWidth * 0.05,
  },
});
