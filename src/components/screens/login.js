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
  Image, StatusBar,
  SafeAreaView
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
import { SkypeIndicator } from 'react-native-indicators';
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
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (isLogin) {
      navigation.push(ROUTE_KEY.Home);
    } else {
      setLoading(false)
    }
  }, [isLogin]);

  const loginFacebook = () => {
    LoginFacebook().then((res) => {
      console.log('1001 res => login FB: ', res);
      _addApiLoginFacebook(res, dispatch);
    });
  };

  const loginGoogle = () => {
    LoginGoogle().then((res) => {
      console.log('1001 res => login GG: ', res);
      _addApiLoginGoogle(res, dispatch);
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={{ width: 40, height: 40, borderRadius: 20 }}>
          <SkypeIndicator
            color={ptColor.appColor}
            style={{
              padding: 16 * WIDTH_SCALE,
              backgroundColor: 'rgba(166, 164, 164, 0.4)',
              borderRadius: 10,
            }}
            size={20 * WIDTH_SCALE}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 25 : 0 }}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/icons/login_bg.jpg')}
        style={styles.container}>
        <Image
          source={require('../../assets/icons/LOGO.png')}
          style={{
            resizeMode: 'contain',
            marginTop: HEIGHT * 0.1 * WIDTH_SCALE,
            height: WIDTH * 0.2,
            width: WIDTH * 0.2,
          }} />

        <View style={styles.headerTitleContainer}>
          {/* <Text style={styles.title1}>Hấp dẫn nhất</Text>
          <Text style={styles.title2}>Tiết kiệm nhất</Text> */}
        </View>

        <View style={styles.loginContainer}>
          <MyHighLightButton onPress={loginFacebook}>
            <View style={styles.buttonFB}>
              <Icons name="sc-facebook" size={24} color="#fff" />
              <View style={{ width: 10 }} />
              <Text style={styles.titleBtnFB}>Đăng nhập với Facebook</Text>
            </View>
          </MyHighLightButton>

          <View style={{ height: 15 }} />

          <MyHighLightButton onPress={loginGoogle}>
            <View style={styles.buttonFB}>
              <Icons name="sc-google-plus" size={24} color="#fff" />
              <View style={{ width: 10 }} />
              <Text style={styles.titleBtnFB}>Đăng nhập với Google</Text>
            </View>
          </MyHighLightButton>
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
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title1: {
    color: ptColor.white,
    fontSize: 25 * WIDTH_SCALE,
    fontFamily: Fonts.SansBold,
    textAlign: 'center'
  },
  title2: {
    color: ptColor.white,
    fontSize: 25 * WIDTH_SCALE,
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
    backgroundColor: 'transparent',
    height: 45,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    width: WIDTH * 0.8,
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
    fontFamily: Fonts.SansMedium,
  },
});
