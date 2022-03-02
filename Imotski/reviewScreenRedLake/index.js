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

export const ReviewScreenRedLake = () => {
  const [reviewData, setReviewData] = useState([]);
  const navigation = useNavigation();

  const getReviewData = () => {
    fetch('http://192.168.1.2:5000/allcomments', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.comments);
        //setReviewData(data.comments);

        const placeFilter = data.comments.filter(
          places => places.catg === 'red lake',
        );

        console.log(placeFilter);
        setReviewData(placeFilter);
        navigation.navigate('Review');

        //console.log(data.comments);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReviewData();
  }, []);

  console.log(reviewData.length);

  return (
    <>
      <TemplateInfo
        image={require('../images/redLake.jpg')}
        city={'Imotski'}
        sight={'Red Lake'}
        color={'grey'}
        color2={'grey'}
        color3={'black'}
        review={
          <>
            {reviewData.length < 1 ? (
              <View style={styles.reviewContainer}>
                <View style={styles.reviewImageContainer}>
                  <Image
                    style={styles.reviewImage}
                    source={require('../images/redLakeH.jpg')}
                  />
                </View>
                <View style={styles.reviewText}>
                  <Text style={styles.reviewNameContainer}>Petar</Text>
                  <Text style={styles.reviewCommentContainer}>
                    There is no reviews at this moment!
                  </Text>
                  <Text style={styles.reviewDateContainer}>2021-10-10</Text>
                </View>
              </View>
            ) : (
              reviewData.map(item => {
                return (
                  <View key={item._id} style={styles.reviewContainer}>
                    <View style={styles.reviewImageContainer}>
                      <Image
                        style={styles.reviewImage}
                        source={{
                          uri: item.postedBy.photo,
                        }}
                      />
                    </View>
                    <View style={styles.reviewText}>
                      <Text style={styles.reviewNameContainer}>
                        {item.postedBy.name}
                      </Text>
                      <Text style={styles.reviewCommentContainer}>
                        {item.body}
                      </Text>
                      <Text style={styles.reviewDateContainer}>
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
