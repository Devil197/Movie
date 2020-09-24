/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from './src/components/screens/login';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => Home);
