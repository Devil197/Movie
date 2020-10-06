import React ,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {store} from '../../Redux/store'
import { persistStore } from 'redux-persist';

export default function Splash() {
    useEffect(()=>{
        persistStore(store, null, async () => {})
        setTimeout(3000,)
    })
    return (
        <View>
            <Text>Splash</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
