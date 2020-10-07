import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import AppNavigator from './AppNavigator';
import {MySpinner} from './components/views';
import {store} from './Redux/store';
import AsyncStorage from '@react-native-community/async-storage';
import userReducer from './Redux/reducers/userReducer';
import {MenuProvider} from 'react-native-popup-menu';

export default function App() {
  return (
    <StoreProvider store={store}>
      <MySpinner />
      <AppNavigator />
    </StoreProvider>
  );
}
