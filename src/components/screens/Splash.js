import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {store} from '../../Redux/store';
import {persistStore} from 'redux-persist';
import {ROUTE_KEY} from '../../constants/constants';
import {styles} from '../../constants/style/styles';
import {useDispatch, useSelector} from 'react-redux';
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
import {SkypeIndicator} from 'react-native-indicators';
import {ptColor} from '../../constants/styles';

const IMAGE = {
  uri:
    'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/kevin-mueller-0ytwNH74s3A-unsplash.jpg?alt=media&token=14251aed-7d13-44af-a015-929e4d0d4144',
};

import {getValueToShowIntroduceOrNot} from '../../utils/IsShowIntroduce';

export default function Splash({navigation}) {
  const isLogin = useSelector((state) => state.userReducer?.loggedIn);
  const user = useSelector((state) => state.userReducer);

  const [isShowIntroduce, setIsShowIntroduce] = useState();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

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
    persistStore(store, null, async () => {});
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
      } catch (error) {}
      PushNotification.createChannel(
        {
          channelId: 'movie0103',
          channelName: 'Movie',
          vibrate: true,
          soundName: 'default',
        },
        (created) => console.log(`100 createChannel returned '${created}'`),
      );
      console.log('1001 fcmToken', fcmToken);

      messaging().onMessage(async (listener) => {
        PushNotification.localNotification({
          title: listener.data.movie_name,
          message: 'abc',
          channelId: 'movie0103',
          id: moment().seconds(),
          largeIconUrl: listener.data.photo,
        });
      });
    }

    initApplicationData();
    return () => {
      console.log('1001 : Splash -> unsubscribe', unsubscribe);

      // unsubscribe();
      // Linking.removeEventListener('url', handleOpenURL);

      // messaging().unsubscribeFromTopic('test');
    };
  }, []);

  if (isShowIntroduce === true) {
    return <Introduce turnOffIntroduce={() => setIsShowIntroduce(false)} />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGE} style={styles.image_background}>
        <View style={{width: 60, height: 60, borderRadius: 20}}>
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

const myStyles = StyleSheet.create({
  logo: {
    height: HEIGHT / 4,
    width: WIDTH,
    resizeMode: 'contain',
  },
});
