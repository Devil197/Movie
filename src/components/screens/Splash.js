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
import { getNewNotification, setNewNotification, clearNewNotification } from '../../utils/asyncStorage'

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

  // const showNotification = (noti) => {
  //   console.log('1001 notification aaa', noti);
  //   PushNotification.localNotification({
  //     title: noti?.notification?.title,
  //     message: noti?.notification?.body,
  //     channelId: 'movie0103',
  //     bigPictureUrl: noti.notification?.android?.imageUrl

  //   });
  // };

  useEffect(() => {
    messaging().subscribeToTopic('N-M-M').then(res => console.log('ok topic'))

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {

        console.log("1001 NOTIFICATION:", notification);
        const movie_id = notification.message.split('/')
        if (notification.userInteraction) {
          navigation.navigate(ROUTE_KEY.Details, { _id: movie_id[1] })
        }
      },
      onAction: function (notification) {
        console.log("1001 ACTION:", notification.action);
        Alert.alert('chayj ne')
        console.log("1001 NOTIFICATION:", notification);
        const movie_id = notification.message.split('/')
        navigation.navigate(ROUTE_KEY.Details, { _id: movie_id[1] })
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    const channel = {
      id: 'movie0103',
      name: 'Movie',
      description: 'movie mobile app description',
    };


    PushNotification.createChannel({
      channelId: channel.id,
      channelDescription: channel.description,
      channelName: channel.name
    }, () => console.log('1001 create channel ne`!'))

    messaging()
      .getInitialNotification()
      .then(response => {
        console.log('Message handled in the getInitialNotification!', response);
        if (response) showNotification(response);
      });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('Message handled in the quit state!', remoteMessage);
      showNotification(remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // When app in foreground
      console.log('Message handled in the foregroud!', remoteMessage);
      showNotification(remoteMessage);
    });

    return () => {
      return unsubscribe;
    };

  }, [])

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
