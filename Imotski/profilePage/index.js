import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

//navigation
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

//svg, path
import Svg, {Path} from 'react-native-svg';

//Dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//stack navigation
import {createStackNavigator} from '@react-navigation/stack';
import {SignInNav} from '../userPage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarAlt,
  faEnvelope,
  faLock,
  faMapMarkedAlt,
  faPen,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {ScrollView} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';

const ProfileStackNav = createStackNavigator();

export const ProfilePageNav = () => {
  return (
    <ProfileStackNav.Navigator>
      <ProfileStackNav.Screen
        name="User"
        component={SignInNav}
        options={{headerShown: false}}
      />
    </ProfileStackNav.Navigator>
  );
};

export const ProfilePage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
  });

  let [profilePic, setProfilePic] = useState(null);
  const [url, setUrl] = useState('');
  let [updatePhoto, setUpdatePhoto] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [showUploadBtn, setShowUploadBtn] = useState(true);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);

  useEffect(async () => {
    await fetch('http://192.168.1.2:5000/protected', {
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserData({
          name: data.userData.name,
          surname: data.userData.surname,
          email: data.userData.email,
          daysOfStaying: data.userData.daysOfStaying,
          placeOfResidence: data.userData.placeOfResidence,
        });
      });

    if (url) {
      fetch('http://192.168.1.2:5000/newprofilepic', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
        body: JSON.stringify({
          pic: url,
        }),
      })
        .then(res => res.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            console.log(
              'there was error while uploading a profile pic to mongodb',
            );
          } else {
            console.log('Profile pic successfully uploaded to mongodb');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    getProfilePic();
  }, [url]);

  const uploadProfilePic = async () => {
    await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
      .then(res => {
        console.log(res[0]);
        setProfilePic((profilePic = res[0]));
        setShowUploadBtn(!showUploadBtn);
        setShowUpdateBtn(!showUpdateBtn);
        //console.log(profilePic);
      })
      .catch(error => {
        console.log(error);
      });

    if (profilePic != null) {
      const data = new FormData();
      const fileToUpload = profilePic;
      data.append('file', fileToUpload);
      data.append('upload_preset', 'imotski-app');
      data.append('cloud_name', 'jopaa10');

      fetch('https://api.cloudinary.com/v1_1/jopaa10/image/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.url);
          setUrl(data.url);
          //setShowUploadBtn(!showUploadBtn);
        });
    }
  };

  const getProfilePic = async () => {
    await fetch('http://192.168.1.2:5000/profilepic', {
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })
      .then(res => res.json())
      .then(photo => {
        console.log(photo.result);

        if (photo.result === null || photo.result === undefined) {
          setUserPic(
            'https://res.cloudinary.com/jopaa10/image/upload/v1632343549/userPhoto_ch87iu.jpg',
          );
          //setShow(!showProfilePic);
        } else {
          setUserPic(photo.result.pic);
        }
      });
  };

  const updateProfilePic = async () => {
    await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
      .then(res => {
        console.log(res[0]);
        setUpdatePhoto((updatePhoto = res[0]));
        //console.log(updatePhoto);
      })
      .catch(error => {
        console.log(error);
      });

    if (updatePhoto != null) {
      const data = new FormData();
      const fileToUpload = updatePhoto;
      data.append('file', fileToUpload);
      data.append('upload_preset', 'imotski-app');
      data.append('cloud_name', 'jopaa10');

      fetch('https://api.cloudinary.com/v1_1/jopaa10/image/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(async data => {
          //console.log(data.url);
          await fetch('http://192.168.1.11:5000/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then(res => res.json())
            .then(result => {
              console.log(result.pic);
              setUserPic(result.pic);
            })
            .catch(error => {
              console.log(error);
            });
        });
    }
  };

  const handleLogOut = () => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.navigate('User');
    });
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'grey'}}>
        <View style={styles.containerWhite} />
        <View>
          <Svg
            style={styles.waves}
            viewBox={`0 0 ${windowWidth} 154`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 0L17.2987 9.05882C33.2667 18.1176 66.5333 34.7255 99.8 54.3529C133.067 73.9804 166.333 96.6274 199.6 99.6471C232.867 102.667 266.133 86.0588 299.4 63.4118C332.667 40.7647 365.933 12.0784 399.2 19.6275C432.467 28.6863 465.733 73.9804 483.032 96.6274L499 119.275V154H483.032C465.733 154 432.467 154 399.2 154C365.933 154 332.667 154 299.4 154C266.133 154 232.867 154 199.6 154C166.333 154 133.067 154 99.8 154C66.5333 154 33.2667 154 17.2987 154H0V0Z"
              fill="#1F83BB"
            />
            <Image source={{uri: userPic}} style={styles.userProfilePic} />
          </Svg>
        </View>

        {showUploadBtn && (
          <Pressable onPress={uploadProfilePic} style={styles.updateBtn}>
            <View>
              <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
            </View>
          </Pressable>
        )}
        {showUpdateBtn && (
          <Pressable onPress={updateProfilePic} style={styles.updateBtn}>
            <View>
              <FontAwesomeIcon icon={faPen} size={20} color={'white'} />
            </View>
          </Pressable>
        )}

        <View style={styles.containerBlue}>
          <View
            style={[styles.viewUserInfo, {marginBottom: windowWidth * 0.05}]}>
            <FontAwesomeIcon
              icon={faUser}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Name</Text>
            <Text style={styles.textName1}>
              {' '}
              {`${userData.name} ${userData.surname}`}{' '}
            </Text>
          </View>
          <View style={styles.viewUserInfo}>
            <FontAwesomeIcon
              icon={faMapMarkedAlt}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Place of residence</Text>
            <Text style={styles.textName1}> {userData.placeOfResidence} </Text>
            <Pressable style={styles.editBtn}>
              <FontAwesomeIcon icon={faPen} color={'white'} size={16} />
            </Pressable>
          </View>
          <View style={styles.viewUserInfo}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Days of staying</Text>
            <Text style={styles.textName1}> {userData.daysOfStaying} </Text>
            <View style={styles.editBtn}>
              <FontAwesomeIcon icon={faPen} color={'white'} size={16} />
            </View>
          </View>
          <View
            style={[styles.viewUserInfo, {marginBottom: windowWidth * 0.05}]}>
            <FontAwesomeIcon
              icon={faEnvelope}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Email</Text>
            <Text style={styles.textName1}> {userData.email} </Text>
          </View>
          <View style={styles.viewUserInfo}>
            <FontAwesomeIcon
              icon={faLock}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>New password</Text>
            <Text style={styles.textName1}> ****** </Text>
            <View style={styles.editBtn}>
              <FontAwesomeIcon icon={faPen} color={'white'} size={16} />
            </View>
          </View>
        </View>
        <View style={{backgroundColor: '#1F83BB', alignItems: 'center'}}>
          <Pressable style={styles.btnLogout} onPress={handleLogOut}>
            <Text style={styles.textBtnLogout}>LOGOUT</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerWhite: {
    position: 'absolute',
    width: windowWidth,
    backgroundColor: 'white',
    height: windowHeight * 0.5,
    justifyContent: 'center',
  },
  coverText: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 16,
    paddingBottom: windowWidth * 0.4,
  },
  waves: {
    width: windowWidth,
    height: 154,
    marginTop: windowWidth * 0.35,
  },
  userProfilePic: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    borderRadius: Math.round(windowWidth + windowHeight) / 2,
    borderColor: '#DADADA',
    borderWidth: 1,
    backgroundColor: 'white',
    marginLeft: windowWidth * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBlue: {
    backgroundColor: '#1F83BB',
    marginTop: 0,
    height: 'auto',
  },
  viewUserInfo: {
    width: windowWidth * 0.7,
    marginLeft: windowWidth * 0.1,
    bottom: windowWidth * 0.09,
  },
  textUserInfo: {
    marginLeft: windowWidth * 0.08,
    color: 'white',
    fontSize: 12,
  },
  textName1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.07,
  },
  editBtn: {
    width: windowWidth * 0.85,
    alignItems: 'flex-end',
    bottom: windowWidth * 0.09,
  },
  btnLogout: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    width: windowWidth * 0.4,
    height: 57,
    marginBottom: windowWidth * 0.2,
  },
  textBtnLogout: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  updateBtn: {
    //flex: 1,
    position: 'absolute',
    top: windowWidth * 0.56,
    left: windowWidth * 0.33,
  },
});
