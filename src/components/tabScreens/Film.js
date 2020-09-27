import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components"
import { FilmItem } from '../views/index'
import { films, menu } from '../../constants/data/fakeData'
films.length = 6

const Film = () => {
   const [selectedCategory, setSelectedCategory] = useState('Action')
   const changeCategory = (c) => {
      setSelectedCategory(c)
   }

   return (
      <Container
         horizontal={false}
         showsVerticalScrollIndicator={false}
      >
         <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexGrow: 0 }}>
            {
               menu.map((c, i) => {
                  return (
                     <TouchableOpacity key={i} onPress={() => changeCategory(c)} style={{ padding: 16, }}>
                        <CategoryName>{c}</CategoryName>
                        {selectedCategory === c && <CategoryBar />}
                     </TouchableOpacity>
                  )
               })
            }
         </ScrollView>

         <FlatList
            showsVerticalScrollIndicator={true}
            numColumns={3}
            data={films}
            keyExtractor={(item) => String(item.id)}
            renderItem={item => <FilmItem item={item} />}
         />

      </Container>
   )
}
export default Film;

const Container = styled.ScrollView`
    flex:1;
    background-color:#fff
`
const CategoryName = styled.Text`
    color:#000;
    font-family:"ProductSans-Medium"

`
const CategoryBar = styled.View`
    background-color:#819ee5;
    width:60%;
    height:4px;
    border-radius:8px;
    margin-top:8px
`

