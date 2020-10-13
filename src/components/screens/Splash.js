import React ,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {store} from '../../Redux/store'
import { persistStore } from 'redux-persist';
import {ROUTE_KEY} from '../../constants/constants'
export default function Splash({navigation}) {
    useEffect(()=>{
        persistStore(store, null, async () => {})
        setTimeout(function(){navigation.navigate(ROUTE_KEY.Login)}, 1000*1);
    })
    return (
        <View>
            <Text>Splash</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
