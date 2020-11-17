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
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import SomeTaskName from './src/Headless/SomeTaskName'
import TrackPlayer from 'react-native-track-player'
LogBox.ignoreAllLogs(true);

const channel = {
  id: 'movie0103',
  name: 'Movie',
  description: 'movie mobile app description',
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotification({
    title: remoteMessage?.notification?.title,
    message: remoteMessage?.notification?.body,
    channelId: channel.id,
    bigPictureUrl: remoteMessage?.notification?.android?.imageUrl
  });
});

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}
StatusBar.setBarStyle('dark-content');
// Orientation.lockToPortrait();
AppRegistry.registerHeadlessTask('SomeTaskName', () => SomeTaskName);
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));