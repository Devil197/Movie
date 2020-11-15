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
import { ROUTE_KEY, typeNotification } from '../../constants/constants';
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
import { getItemsFollowByUserId } from '../../Redux/actions/followAction';

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

      PushNotification.createChannel(
        {
          channelId: channel.id, // (required)
          channelName: channel.name, // (required)
          channelDescription: channel.description, // (optional) default: undefined.
        },
        (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );

      await messaging().onMessage(async (remoteMessage) => {
        // console.log('29148 : unsubscribe -> remoteMessage', remoteMessage);

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
            title: remoteMessage.notification.title, // (optional)
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
        const userRedux = store.getState().userReducer
        const dataFollowRedux = await store.getState().followReducer.list
        console.log('1001 redux', dataFollowRedux);
        await getValueToShowIntroduceOrNot((isShow) => {

          if (isShow === false) {
            if (userRedux.loggedIn) {
              navigation.navigate(ROUTE_KEY.BottomNavigation)
            } else {
              navigation.navigate(ROUTE_KEY.Login)
            }
          }
          setIsShowIntroduce(isShow);
        });
        // notification  video
        await dataFollowRedux.map((e) => {
          return messaging().subscribeToTopic(e._id.toString())
          // return console.log('1001 movie id ', e.movie_id);
        })


        // async function pushNotificationsFollowInitApp() {
        //   try {
        //     const dataFollowRedux = await store.getState().followReducer.list
        //     const followApi = await getItemsFollowByUserId(userRedux.userInfo._id)
        //     dataFollowRedux.map((e, i) => {
        //       const itemFollowFind = followApi.items.find(e1 => e1.movie_id._id === e._id)
        //       console.log('1001 itemFollowFind', itemFollowFind);
        //       if (itemFollowFind.movie_id.status !== e.status) {
        //         PushNotification.localNotification(
        //           {
        //             /* Android Only Properties */
        //             ignoreInForeground: true, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        //             channelId: channel.id, // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        //             invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        //             /* iOS and Android properties */
        //             priority: 'high',
        //             bigPictureUrl: e.cover_image,
        //             title: e.name + 'tập ' + itemFollowFind.movie_id.status, // (optional)
        //             message: ' cập nhật vào lúc ' + moment(itemFollowFind.movie_id.update_at).format('YYYY-MM-DD HH:mm'), // (required)
        //             number: 1,
        //             showWhen: true,
        //             id: 1,
        //             group: 'Movie',
        //             when: moment().valueOf(),
        //           }
        //         )
        //       }
        //     })

        //   } catch { e => console.log(e) }
        // }

        // pushNotificationsFollowInitApp()

      });

      setTimeout(() => {
        PushNotification.configure({
          onRegister: function (token) {
            console.log('TOKEN:', token);
          },
          onNotification: async function (notification) {
            console.log('1002 onNotification ', notification);
            if (notification.data.type === typeNotification.VIDEO) {
              console.log('1001 data ne` đã chạy', notification.userInteraction);
            } else if (notification.data.type === typeNotification.MOVIE) {
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
            }
          },
          onAction: function (notification) {
            console.log('1002 Long ACTION:', notification);
          },
          permissions: {
            alert: true,
            badge: true,
            sound: true,
          },

          // Should the initial notification be popped automatically
          // default: true
          popInitialNotification: true,

          /**
           * (optional) default: true
           * - Specified if permissions (ios) and token (android and ios) will requested or not,
           * - if not, you must call PushNotificationsHandler.requestPermissions() later
           * - if you are not using remote notification or do not have Firebase installed, use this:
           *     requestPermissions: Platform.OS === 'ios'
           */
          requestPermissions: true,
        });
      }, 1000);
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
