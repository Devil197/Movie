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
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import { setNewNotification } from './src/utils/asyncStorage'
LogBox.ignoreAllLogs(true);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  ToastAndroid.show(
    'chay setBackgroundMessageHandler NE NHA' + remoteMessage &&
      remoteMessage.notification &&
      Platform.OS === 'android'
      ? remoteMessage.notification.title
      : '',
    ToastAndroid.SHORT,
  );
  console.log('29148 : setBackgroundMessageHandler -> remoteMessage', remoteMessage);

  if (remoteMessage && remoteMessage.notification && Platform.OS === 'android') {
    const listnoti = await getNotificationList();
    console.log('29148 : !__DEV__&& -> listnoti', listnoti);
    const newList = [...listnoti, remoteMessage];
    console.log('29148 : !__DEV__&& -> newList', newList);
    await setNotificationList(newList);
  }
});
if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}
StatusBar.setBarStyle('dark-content');

AppRegistry.registerComponent(appName, () => App);
