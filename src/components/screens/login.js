import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ImageBackground,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
  Image,
} from 'react-native';
import Icons from 'react-native-vector-icons/EvilIcons';
import {
  LoginGoogle,
  LoginFacebook,
  _addApiLoginFacebook,
  _addApiLoginGoogle,
} from '../../Redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../utils/Fonts';
import { ROUTE_KEY } from '../../constants/constants';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { MySpinner, MyHighLightButton } from '../views';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import { ptColor } from '../../constants/styles';

const LOGIN_LOGO_HEIGHT = 80;
const IMAGE = {
  uri:
    'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/kevin-mueller-0ytwNH74s3A-unsplash.jpg?alt=media&token=14251aed-7d13-44af-a015-929e4d0d4144',
};

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userReducer?.loggedIn);
  console.log(isLogin);

  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    MySpinner.show();
    if (isLogin) {
      navigation.push(ROUTE_KEY.BottomNavigation);
      MySpinner.hide();
    } else {
      MySpinner.hide();
    }
  }, [isLogin]);

  const loginFacebook = () => {
    LoginFacebook().then((res) => {
      console.log('1001 res=> login face ', res);
      _addApiLoginFacebook(res, dispatch);
    });
  };

  const loginGoogle = () => {
    LoginGoogle().then((res) => {
      console.log('1001 res=> login go ', res);
      _addApiLoginGoogle(res, dispatch);
    });
  };


  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/gea_logo.png')}
        style={{ height: HEIGHT * 0.3, width: WIDTH * 0.8, resizeMode: 'stretch', marginTop: HEIGHT * 0.13 }} />

      <View style={styles.headerTitleContainer}>
        <Text style={styles.title1}>Welcome To</Text>
        <View style={{ height: 10 * WIDTH_SCALE }} />
        <Text style={styles.title2}>GEA</Text>
      </View>

      <View style={styles.loginContainer}>
        <MyHighLightButton onPress={loginFacebook}>
          <View style={styles.buttonFB}>
            <Icons name="sc-facebook" size={24} color="#fff" />
            <View style={{ width: 10 }} />
            <Text style={styles.titleBtnFB}>Sign In With Facebook</Text>
          </View>
        </MyHighLightButton>

        <View style={{ height: 15 }} />

        <MyHighLightButton onPress={loginGoogle}>
          <View style={styles.buttonGG}>
            <Icons name="sc-google-plus" size={24} color="#fff" />
            <View style={{ width: 10 }} />
            <Text style={styles.titleBtnFB}>Sign In With Google</Text>
          </View>
        </MyHighLightButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    color: ptColor.gray2,
    fontSize: 20 * WIDTH_SCALE,
    fontFamily: Fonts.SansLight,
  },
  title2: {
    color: ptColor.black,
    fontSize: 30 * WIDTH_SCALE,
    fontFamily: Fonts.SansBold,
  },
  loginContainer: {
    width: WIDTH,
    height: HEIGHT * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFB: {
    flexDirection: 'row',
    backgroundColor: '#4267B2',
    height: 45,
    width: WIDTH * 0.6,
    borderRadius: 45 / 2,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    alignItems: 'center',
  },
  buttonGG: {
    flexDirection: 'row',
    backgroundColor: '#a81a13',
    height: 45,
    width: WIDTH * 0.6,
    borderRadius: 45 / 2,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    alignItems: 'center',
  },
  titleBtnFB: {
    color: '#fff',
    fontFamily: Fonts.SansLight,
  },
});
