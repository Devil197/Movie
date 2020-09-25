import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
    configureFonts,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import AppNavigator from './AppNavigator'
import { store } from './Redux/store';
export default function App() {
    return (
        <StoreProvider store={store}>
            <AppNavigator />
        </StoreProvider>
    )
}

