/**
 * @format
 */

import { AppRegistry, LogBox, Platform, StatusBar, Text, TextInput } from 'react-native';
// import Orientation from 'react-native-orientation-locker';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

console.disableYellowBox = true;

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}
StatusBar.setBarStyle('dark-content');
// Orientation.lockToPortrait();
AppRegistry.registerComponent(appName, () => App);
