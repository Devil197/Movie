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
});

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}
StatusBar.setBarStyle('dark-content');
// Orientation.lockToPortrait();
AppRegistry.registerComponent(appName, () => App);
