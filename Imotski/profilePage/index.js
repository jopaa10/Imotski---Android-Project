import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';

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
  faPenAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {ScrollView} from 'react-native-gesture-handler';

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

  const handleLogOut = () => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.navigate('User');
    });
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.containerWhite}>
          <Text style={styles.coverText}>ADD COVER PHOTO</Text>
        </View>
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
          </Svg>
        </View>
        <View style={styles.containerBlue}>
          <View style={styles.viewUserInfo}>
            <FontAwesomeIcon
              icon={faUser}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Name</Text>
            <Text style={styles.textName1}> Peter Pan </Text>
          </View>

          <View style={styles.viewUserInfo}>
            <FontAwesomeIcon
              icon={faMapMarkedAlt}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Place of resistance</Text>
            <Text style={styles.textName1}> Imotski </Text>
            <View style={styles.editBtn}>
              <FontAwesomeIcon icon={faPen} color={'white'} size={20} />
            </View>
          </View>
          <View style={styles.viewUserInfo}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Days of staying</Text>
            <Text style={styles.textName1}> 5 </Text>
            <View style={styles.editBtn}>
              <FontAwesomeIcon icon={faPen} color={'white'} size={20} />
            </View>
          </View>
          <View style={styles.viewUserInfo}>
            <FontAwesomeIcon
              icon={faEnvelope}
              size={22}
              color={'white'}
              style={{top: windowWidth * 0.08}}
            />
            <Text style={styles.textUserInfo}>Email</Text>
            <Text style={styles.textName1}> Peter Pan </Text>
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
              <FontAwesomeIcon icon={faPen} color={'white'} size={20} />
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
    backgroundColor: 'white',
    height: windowHeight * 0.35,
    justifyContent: 'center',
  },
  coverText: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 16,
  },
  waves: {
    width: windowWidth,
    height: 154,
  },
  containerBlue: {
    backgroundColor: '#1F83BB',
    marginTop: 0,
    height: 'auto',
    paddingTop: windowWidth * 0.1,
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
    bottom: windowWidth * 0.08,
  },
  btnLogout: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    width: windowWidth * 0.4,
    height: 60,
    marginBottom: windowWidth * 0.1,
  },
  textBtnLogout: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
