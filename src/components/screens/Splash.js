import React, { useEffect, useState, useRef } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  AppState,
  Platform,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { store } from '../../Redux/store';
import { persistStore } from 'redux-persist';
import { ROUTE_KEY } from '../../constants/constants';
import { styles } from '../../constants/style/styles';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import Introduce from './Introduce';
import AsyncStorage from '@react-native-community/async-storage';
import { SkypeIndicator } from 'react-native-indicators';
import { ptColor } from '../../constants/styles';

const IMAGE = {
  uri:
    'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/kevin-mueller-0ytwNH74s3A-unsplash.jpg?alt=media&token=14251aed-7d13-44af-a015-929e4d0d4144',
};

import { getValueToShowIntroduceOrNot } from '../../utils/IsShowIntroduce';
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
export default function Splash({ navigation }) {
  const appState = useRef(AppState.currentState);
  const isLogin = useSelector((state) => state.userReducer?.loggedIn);
  const user = useSelector((state) => state.userReducer);

  const [isShowIntroduce, setIsShowIntroduce] = useState();

  const handleUserIsLogin = () => {
    setTimeout(function () {
      if (isLogin) {
        navigation.navigate(ROUTE_KEY.BottomNavigation);
      } else {
        navigation.navigate(ROUTE_KEY.Login);
      }
    }, 3000 * 1);
  };

  useEffect(() => {
    persistStore(store, null, async () => { });
    //handleUserIsLogin();
  }, []);

  useEffect(() => {
    handleIsShowIntroduce();
  }, [isShowIntroduce]);

  const handleIsShowIntroduce = async () => {
    await getValueToShowIntroduceOrNot((isShow) => {
      console.log('IS SHOW INTRODUCE: ', isShow);
      if (isShow === false) {
        handleUserIsLogin();
      }
      setIsShowIntroduce(isShow);
    });
  };

  useEffect(() => {
    let unsubscribe = null;
    async function initApplicationData() {
      let fcmToken = null;
      try {
        await requestUserPermission();
        fcmToken = await messaging().getToken();

        messaging()
          .subscribeToTopic('N-M-M')
          .then(() => console.log('1001 Subscribed to topic!'));
      } catch (error) { }
      PushNotification.createChannel(
        {
          number: moment().milliseconds(),
          channelId: 'movie0103',
          channelName: 'Movie',
          soundName: 'default',
          group: 'Movie',
        },
        (created) => console.log(`100 createChannel returned '${created}'`),
      );

      setTimeout(() => {
        PushNotification.configure({
          onRegister: function (token) {
            console.log('TOKEN:', token);
          },

          // (required) Called when a remote is received or opened, or local notification is opened
          // Open schedule detail when click on Noti
          onNotification: async function (notification) {
            console.log('1001 notificationFICATION:', notification);
            pushNotification(notification);
          },

          // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
          onAction: function (notification) {
            console.log('1001 Long ACTION:', notification.action);
            console.log('1001 Long NOTIFICATION:', notification);
            // process the action
          },
        });
      }, 1000);
    }

    initApplicationData();
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      console.log('1001 : Splash -> unsubscribe', unsubscribe);
      AppState.removeEventListener('change', _handleAppStateChange);
      // unsubscribe();
      // Linking.removeEventListener('url', handleOpenURL);

      // messaging().unsubscribeFromTopic('test');
    };
  }, []);

  const pushNotification = async (listener) => {
    PushNotification.localNotification({
      title: listener.data.movie_name,
      message: 'abc',
      channelId: 'movie0103',
      id: moment().seconds(),
      largeIconUrl: listener.data.photo,
    });
  };

  const _handleAppStateChange = async (nextAppState) => {
    console.log('29148 : _handleAppStateChange -> nextAppState', nextAppState);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      PushNotification.popInitialNotification((notification) => {
        if (notification) {
          this.onNotification(notification);
        }
      });
    } else {
      PushNotification.popInitialNotification((notification) => {
        if (notification) {
          this.onNotification(notification);
        }
      });
    }
    appState.current = nextAppState;
  };

  if (isShowIntroduce === true) {
    return <Introduce turnOffIntroduce={() => setIsShowIntroduce(false)} />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGE} style={styles.image_background}>
        <View style={{ width: 60, height: 60, borderRadius: 20 }}>
          <SkypeIndicator
            color={ptColor.appColor}
            style={{
              padding: 16 * WIDTH_SCALE,
              backgroundColor: 'rgba(166, 164, 164, 0.4)',
              borderRadius: 10,
            }}
            size={40 * WIDTH_SCALE}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
