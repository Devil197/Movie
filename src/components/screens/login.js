import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import Icons from 'react-native-vector-icons/EvilIcons';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {LoginGoogle} from '../../Redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux';
const LOGIN_LOGO_HEIGHT = 80;

export default function Login() {
  const dispatch = useDispatch();
  const transformerY = new Animated.Value(0);

  Animated.timing(
    transformerY,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.cubic,
    },
    {useNativeDriver: false},
  ).start();

  const anim = transformerY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -LOGIN_LOGO_HEIGHT],
  });

  const onLoginFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(async (data) => {
            let token = data.accessToken.toString();
            let urlGet = `https://graph.facebook.com/v6.0/me?fields=id%2Cname%2Cpicture%7Burl%7D,email&access_token=${token}`;
            console.log(urlGet);
            // let getData = await Axios.get(urlGet);
            // let LoginFace = await FetchLogin(null,null,'social',token,'FB');

            //console.log(LoginFace.data);

            // if(LoginFace.data) {
            //   let dataUser = {
            //     Name : LoginFace.data.FirstName + LoginFace.data.LastName,
            //     userName : LoginFace.data.UserName  ,
            //     email : LoginFace.data.Email,
            //     id : LoginFace.data.Id,
            //     avatar : getData.data.picture.data.url
            //   }
            //   await AsyncStorage.setItem('token', token);
            //   await AsyncStorage.setItem('user',JSON.stringify(dataUser)
          });
        }
      },
    );
  };



  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>LOGO</Text>
      </View>
      <Animated.View
        style={[styles.loginContainer, {transform: [{translateY: anim}]}]}>
        <Pressable onPress={() => onLoginFacebook()}>
          <View style={styles.childLoginContainer}>
            <Icons name="sc-facebook" size={30} color={'#FFF'} />
          </View>
        </Pressable>
        <View style={{width: 50}} />
        <Pressable
          onPress={() => {
            LoginGoogle(dispatch);
          }}>
          <View style={styles.childLoginContainer}>
            <Icons name="sc-google-plus" size={30} color={'#FFF'} />
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    width: '100%',
    height: LOGIN_LOGO_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomColor: '#FFF',
    borderBottomWidth: 0.5,
    marginBottom: -LOGIN_LOGO_HEIGHT,
  },
  childLoginContainer: {
    padding: 10,
    borderWidth: 0.8,
    borderRadius: 15,
    borderColor: '#FFF',
  },
});
