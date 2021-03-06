import {faInfoCircle, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//navigation
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//sign in and sign up screens
import {SignIn} from '../signIn';
import {SignUp} from '../signUp';
import {ProfilePage, ProfilePageNav} from '../profilePage';

//storage for saving user token
import AsyncStorage from '@react-native-async-storage/async-storage';

const signInStack = createStackNavigator();

export const SignInNav = () => {
  const [isLogged, setIsLogged] = useState(false);

  const detectLogin = () => {
    const token = AsyncStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };

  console.log(isLogged);

  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <>
      <signInStack.Navigator>
        {isLogged === true ? (
          <>
            <signInStack.Screen
              name="Profile Page"
              component={ProfilePage}
              options={{headerShown: false}}
            />
            <signInStack.Screen
              name="Sign In"
              component={SignIn}
              options={{headerShown: false}}
            />
            <signInStack.Screen
              name="Sign Up"
              component={SignUp}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <signInStack.Screen
              name="Sign In"
              component={SignIn}
              options={{headerShown: false}}
            />
            <signInStack.Screen
              name="Sign Up"
              component={SignUp}
              options={{headerShown: false}}
            />
          </>
        )}
      </signInStack.Navigator>
    </>
  );
};

export const UserFirstPage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{backgroundColor: '#1F83BB'}}>
      <View>
        <Image
          style={styles.image}
          source={require('../images/biokovo2.jpg')}
        />
        <Text style={styles.place}>Imotski</Text>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          style={styles.icon}
          color={'white'}
          size={15}
        />
        <Text style={styles.mountain}>Biokovo</Text>
      </View>
      <View style={styles.container}>
        <FontAwesomeIcon
          style={styles.iconInfo}
          icon={faInfoCircle}
          color={'white'}
          size={18}
        />
        <Text style={styles.textFeatures}>
          To use all features, sign in/sign up
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.text}>SIGN IN</Text>
        </Pressable>
        <Pressable
          style={[styles.button, {marginBottom: windowWidth * 0.2}]}
          onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.text}>SIGN UP</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  place: {
    position: 'absolute',
    color: 'white',
    fontSize: 25,
    top: windowWidth * 0.2,
    paddingLeft: 20,
  },
  mountain: {
    position: 'absolute',
    color: 'white',
    fontSize: 17,
    top: windowWidth * 0.3,
    paddingLeft: 35,
  },
  icon: {
    position: 'absolute',
    top: windowWidth * 0.305,
    paddingLeft: 45,
  },
  textFeatures: {
    color: 'white',
    fontSize: 15,
  },
  iconInfo: {
    top: windowWidth * 0.05,
    right: windowWidth * 0.35,
  },
  container: {
    flex: 1,
    backgroundColor: '#1F83BB',
    width: windowWidth,
    height: 'auto',
    alignItems: 'center',
    paddingTop: windowWidth * 0.1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: windowWidth * 0.05,
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.6,
  },
  button: {
    backgroundColor: 'white',
    width: windowWidth * 0.6,
    height: 50,
    borderRadius: 20,
    marginTop: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 5,
  },
});
