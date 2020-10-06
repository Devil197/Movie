import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import Icons from 'react-native-vector-icons/EvilIcons';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {LoginGoogle} from '../../Redux/actions/userAction';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../../utils/Fonts';

const LOGIN_LOGO_HEIGHT = 80;
const IMAGE = {
  uri:
    'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/kevin-mueller-0ytwNH74s3A-unsplash.jpg?alt=media&token=14251aed-7d13-44af-a015-929e4d0d4144',
};

GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
GoogleSignin.configure({
  webClientId:
    '835610037209-t6p9r8dedt7e7m8hh302br39es9ctfe7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

export default function Login() {
  const dispatch = useDispatch();

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

            console.log(data);

            // let token = data.accessToken.toString();
            // let urlGet = `https://graph.facebook.com/v6.0/me?fields=id%2Cname%2Cpicture%7Burl%7D,email&access_token=${token}`;

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

  const onLoginGoogle = async () => {
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
      <ImageBackground source={IMAGE} style={styles.imageBackground}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title1}>Welcome To</Text>
          <Text style={styles.title2}>GEA</Text>
        </View>

        <View style={styles.loginContainer}>

          <TouchableWithoutFeedback onPress={() => onLoginFacebook()}>
            <View style={styles.buttonFB}>
              <Icons name="sc-facebook" size={24} color="#fff" />
              <View style={{width: 10}} />
              <Text style={styles.titleBtnFB}>Sign In With Facebook</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{height: 15}} />

          <TouchableWithoutFeedback onPress={() => onLoginGoogle()}>
            <View style={styles.buttonGG}>
              <Icons name="sc-google-plus" size={24} color="#fff" />
              <View style={{width: 10}} />
              <Text style={styles.titleBtnFB}>Sign In With Google</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  headerTitleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: Fonts.SansLight,
  },
  title2: {
    color: '#fff',
    fontSize: 20,
    fontFamily: Fonts.SansBold,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFB: {
    flexDirection: 'row',
    backgroundColor: '#4267B2',
    height: 45,
    width: '55%',
    borderRadius: 20,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    alignItems: 'center',
  },
  buttonGG: {
    flexDirection: 'row',
    backgroundColor: '#a81a13',
    height: 45,
    width: '55%',
    borderRadius: 20,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    alignItems: 'center',
  },
  titleBtnFB: {
    color: '#fff',
    fontFamily: Fonts.SansLight,
  },


});
