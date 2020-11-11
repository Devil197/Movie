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
  ToastAndroid,
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
import { REDUX } from '../../Redux/store/types';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}


export const channel = {
  id: 'movie0103',
  name: 'Movie',
  description: 'movie mobile app description',
};
export default function Splash({ navigation }) {
  const dispatch = useDispatch()
  const [isShowIntroduce, setIsShowIntroduce] = useState();


  useEffect(() => {
    let unsubscribe = null;
    async function initApplicationData() {

      let fcmToken = null;
      try {
        await requestUserPermission();
        fcmToken = await messaging().getToken();
        messaging().subscribeToTopic('N-M-M');
      } catch (error) { }

      await messaging().onMessage(async (remoteMessage) => {
        console.log('29148 : unsubscribe -> remoteMessage', remoteMessage);
        if (remoteMessage && remoteMessage.notification && Platform.OS === 'android') {
          console.log('29148 : unsubscribe -> remoteMessage', remoteMessage);
          const movie_id = remoteMessage.notification.body.split('/')
          PushNotification.localNotification({
            /* Android Only Properties */
            ignoreInForeground: true, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
            channelId: channel.id, // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
            /* iOS and Android properties */
            priority: 'high',
            bigPictureUrl: remoteMessage.notification.android.imageUrl,
            title: remoteMessage.notification.title + 'abdddd', // (optional)
            message: movie_id[0], // (required)
            number: 1,
            showWhen: true,
            messageId: movie_id[1],
            id: remoteMessage.ttl,
            group: 'Movie',
            when: moment().valueOf(),
          });
        }
      })

      await persistStore(store, null, async () => {
        console.log('1001 store', store.getState().notificationReducer.listMovie);
        const isLogin = store.getState().userReducer.loggedIn
        await getValueToShowIntroduceOrNot((isShow) => {

          if (isShow === false) {
            if (isLogin) {
              navigation.navigate(ROUTE_KEY.BottomNavigation)
            } else {
              navigation.navigate(ROUTE_KEY.Login)
            }
          }
          setIsShowIntroduce(isShow);
        });
      });

      setTimeout(() => {
        PushNotification.configure({
          onRegister: function (token) {
            console.log('TOKEN:', token);
          },
          onNotification: async function (notification) {
            console.log('1002 onNotification ', notification);
            const movieNotification = {
              name: notification.title,
              userInteraction: notification.userInteraction,
              cover_image: notification.largeIconUrl,
              movie_id: notification.data.movie_id,
              type: notification.data.type,
              des: notification.message,
              create_at: moment().format('YYYY-MM-DD HH:mm:ss')
            };

            if (notification.userInteraction) {
              dispatch({
                type: REDUX.UPDATE_NOTIFICATION,
                payload: movieNotification
              })
              navigation.navigate(ROUTE_KEY.Details, { _id: movieNotification.movie_id })
            } else {
              dispatch({
                type: REDUX.ADD_MOVIE_NOTIFICATION,
                payload: movieNotification
              })
              ToastAndroid.show(
                'vừa nhận thông báo có phim mới ' + movieNotification.name,
                ToastAndroid.SHORT,
              );
            }
          },

          onAction: function (notification) {
            console.log('1002 Long ACTION:', notification);
          },
        });
      }, 1000);

      PushNotification.createChannel(
        {
          channelId: channel.id, // (required)
          channelName: channel.name, // (required)
          channelDescription: channel.description, // (optional) default: undefined.
        },
        (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
    initApplicationData()


    return () => console.log('29148 : Splash -> unsubscribe');

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
