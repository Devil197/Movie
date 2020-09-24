import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
    configureFonts,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
  } from 'react-native-paper';
import AppNavigator from './AppNavigator'
export default function App() {
    return (
        <AppNavigator/>
    )
}

const styles = StyleSheet.create({})
