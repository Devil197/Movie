import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
 import { FilmFollowItem } from '../views/index'
import { films, menu } from '../../constants/data/fakeData'
import { Fonts } from '../../utils/Fonts';
films.length = 6

const Follow = () => {
  
   return (
      <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" />
         <View style={styles.topContainer}>
            <Text style={styles.pageTitle}>Follow</Text>
         </View>

         <FlatList
            showsVerticalScrollIndicator={true}
            numColumns={3}
            data={films}
            keyExtractor={(item) => String(item.id)}
            renderItem={item => <FilmFollowItem item={item} />}
         />

      </View>
   )
}
export default Follow;

const styles = StyleSheet.create({
   container:{
      flex:1,
      backgroundColor:"#fff"
       
   },
   topContainer:{
      padding:16,
   
   },
   pageTitle:{
      fontSize:20,
      fontFamily:Fonts.SansMedium,
      textAlign:"center"
   }
});

