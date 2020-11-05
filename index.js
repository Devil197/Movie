/**
 * @format
 */

import {
  AppRegistry,
  LogBox,
  Platform,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
} from 'react-native';
// import Orientation from 'react-native-orientation-locker';
//import App from './src/App';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
LogBox.ignoreAllLogs(true);

const channel = {
  id: 'movie0103',
  name: 'Movie',
  description: 'movie mobile app description',
};

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('1001 -> noti ne` : ', remoteMessage);
  ToastAndroid.show(
    'chay setBackgroundMessageHandler NE NHA' + remoteMessage &&
      remoteMessage.notification &&
      Platform.OS === 'android'
      ? remoteMessage.notification.title
      : '',
    ToastAndroid.SHORT,
  );

  PushNotification.localNotification({
    title: remoteMessage.data.movie_name,
    message: 'abc',
    channelId: 'movie0103',
    id: moment().seconds(),
    largeIconUrl: remoteMessage.data.photo,
  });
});

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}
StatusBar.setBarStyle('dark-content');
// Orientation.lockToPortrait();
AppRegistry.registerComponent(appName, () => App);
