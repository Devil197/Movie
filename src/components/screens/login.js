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
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

const LOGIN_LOGO_HEIGHT = 80;

GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
GoogleSignin.configure({
  webClientId:
    '835610037209-t6p9r8dedt7e7m8hh302br39es9ctfe7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

export default function login() {
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

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

      // if (LoginGoogle) {
      //   let dataUser = {
      //     Name: LoginGoogle.data.FirstName + LoginGoogle.data.LastName,
      //     userName: LoginGoogle.data.UserName,
      //     email: LoginGoogle.data.Email,
      //     id: LoginGoogle.data.Id,
      //     avatar: userInfo.user.photo,
      //   };

      //await AsyncStorage.setItem('token', userInfo.idToken);
      //await AsyncStorage.setItem('user', JSON.stringify(dataUser));

      // dispatch(
      //   loginAction({
      //     token: userInfo.idToken,
      //     logged: true,
      //     user: dataUser,
      //   }),
      // );
      // navigation.navigate('BottomTab');

      //   console.log(dataUser);
      // } else {
      //   GoogleSignin.signOut();
      // }
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('oke SIGN_IN_CANCELLED');
        GoogleSignin.signOut();
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('oke IN_PROGRESS');
        GoogleSignin.signOut();
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('oke PLAY_SERVICES_NOT_AVAILABLE');
        GoogleSignin.signOut();
      } else {
        console.log('oke oke');
        GoogleSignin.signOut();
      }
    }
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
            onSignIn();
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
