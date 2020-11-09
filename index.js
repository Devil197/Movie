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
LogBox.ignoreAllLogs(true);

const channel = {
  id: 'movie0103',
  name: 'Movie',
  description: 'movie mobile app description',
};

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}
StatusBar.setBarStyle('dark-content');
// Orientation.lockToPortrait();
AppRegistry.registerHeadlessTask('SomeTaskName', () => SomeTaskName);
AppRegistry.registerComponent(appName, () => App);
