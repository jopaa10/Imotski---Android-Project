import React, {useEffect, useState} from 'react';
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

//navigation
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';

export const ReviewScreen = ({placeCategory, city, sight, image, navigate}) => {
  const [reviewData, setReviewData] = useState([]);
  const navigation = useNavigation();

  const getReviewData = () => {
    fetch('http://192.168.1.2:5000/allcomments', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        const placeFilter = data.comments.filter(
          places => places.catg === placeCategory,
        );

        setReviewData(placeFilter);
        navigation.navigate('Review');

        console.log(data.comments);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReviewData();
  }, []);

  console.log(reviewData.length);

  const {colors} = useTheme();

  return (
    <>
      <TemplateInfo
        image={image}
        city={city}
        sight={sight}
        navigateBack={navigate}
        color={'grey'}
        color2={'grey'}
        color3={colors.PRIMARY_TEXT_COLOR}
        review={
          <>
            {reviewData.length < 1 ? (
              <View
                style={[
                  styles.reviewContainer,
                  {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
                ]}>
                <View style={styles.reviewImageContainer}>
                  <Image
                    style={styles.reviewImage}
                    source={require('../images/blueLakeArticle.jpg')}
                  />
                </View>
                <View style={styles.reviewText}>
                  <Text
                    style={[
                      styles.reviewNameContainer,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    Petar
                  </Text>
                  <Text
                    style={[
                      styles.reviewCommentContainer,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    There is no reviews at this moment!
                  </Text>
                  <Text
                    style={[
                      styles.reviewDateContainer,
                      {color: colors.PRIMARY_TEXT_COLOR},
                    ]}>
                    2021-10-10
                  </Text>
                </View>
              </View>
            ) : (
              reviewData.map(item => {
                return (
                  <View
                    key={item._id}
                    style={[
                      styles.reviewContainer,
                      {backgroundColor: colors.SECUNDARY_BACKGROUND_COLOR},
                    ]}>
                    <View style={styles.reviewImageContainer}>
                      <Image
                        style={styles.reviewImage}
                        source={{
                          uri: item.postedBy.photo,
                        }}
                      />
                    </View>
                    <View style={styles.reviewText}>
                      <Text
                        style={[
                          styles.reviewNameContainer,
                          {color: colors.PRIMARY_TEXT_COLOR},
                        ]}>
                        {item.postedBy.name}
                      </Text>
                      <Text
                        style={[
                          styles.reviewCommentContainer,
                          {color: colors.PRIMARY_TEXT_COLOR},
                        ]}>
                        {item.body}
                      </Text>
                      <Text
                        style={[
                          styles.reviewDateContainer,
                          {color: colors.PRIMARY_TEXT_COLOR},
                        ]}>
                        {item.time.substring(0, 10)}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}

            {/* <View style={styles.reviewContainer}>
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
            </View> */}
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
    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,
    backgroundColor: 'white',
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
