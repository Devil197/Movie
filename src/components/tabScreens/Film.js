import React, { useState } from 'react';
import { Text, View,StyleSheet,Image ,Dimensions} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components"
import { Fonts } from '../../utils/Fonts';
import Category from './Category';

const { width } = Dimensions.get('window')

const Menu = [

    "Action",
    "Adventure",
    "Casual",
    "Indie",
    "Multiplayer",
    "Racing",
    "RPG",
    "Simulation",
    "Sports",
    "Strategy"
]

const films =[
    {
       "title":"Maou Gakuin no Futekigousha",
       "thumb":"https://img.anime47.com/imgur/xVuhyWc.jpg"
    },
    {
       "title":"Peter Grill to Kenja no Jikan",
       "thumb":"https://img.anime47.com/imgur/6hhR2bl.jpg"
    },
    {
       "title":"Dokyuu Hentai HxEros",
       "thumb":"https://img.anime47.com/imgur/gEfsKK8.jpg"
    },
    {
       "title":"Honey And Clover",
       "thumb":"https://img.anime47.com/imgur/G8UWSl5.jpg"
    },
    {
       "title":"Toaru Kagaku no Railgun T",
       "thumb":"https://img.anime47.com/imgur/UdJIai4.jpg"
    },
    {
       "title":"Shokugeki no Souma: Gou no Sara",
       "thumb":"https://img.anime47.com/imgur/mFpZYeU.jpg"
    },
    {
       "title":"Biệt Đội Lính Cứu Hỏa Phần 2",
       "thumb":"https://img.anime47.com/imgur/UekNDIr.jpg"
    },
    {
       "title":"Kanojo, Okarishimasu",
       "thumb":"https://img.anime47.com/imgur/KKrknWT.jpg"
    },
    {
       "title":"Yahari Ore no Seishun Love Comedy wa Machigatteiru. Kan",
       "thumb":"https://img.anime47.com/imgur/zoArbgQ.jpg"
    },
    {
       "title":"Bakugan Battle Brawlers: Gundalian Invaders",
       "thumb":"https://img.anime47.com/imgur/gJCtnmU.jpg"
    },
    {
       "title":"Zenonzard The Animation",
       "thumb":"https://img.anime47.com/imgur/hXqO7Wo.jpg"
    },
    {
       "title":"Houkago Teibou Nisshi",
       "thumb":"https://img.anime47.com/imgur/n9Lu06d.jpg"
    },
    {
       "title":"Gibiate",
       "thumb":"https://img.anime47.com/imgur/uvDAjQA.jpg"
    },
    {
       "title":"Deca-Dence",
       "thumb":"https://img.anime47.com/imgur/4A8EO07.jpg"
    },
    {
       "title":"Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season",
       "thumb":"https://img.anime47.com/imgur/9HpTWLd.jpg"
    },
    {
       "title":"Muhyo to Rouji no Mahouritsu Soudan Jimusho 2nd Season",
       "thumb":"https://img.anime47.com/imgur/lmSfOTV.jpg"
    },
    {
       "title":"Strike Witches - 501 Butai Hasshin Shimasu! Gekijouban",
       "thumb":"https://img.anime47.com/imgur/ulpwpBa.jpg"
    },
    {
       "title":"Healin' Good♡Precure",
       "thumb":"https://img.anime47.com/imgur/K8216JX.jpg"
    },
    {
       "title":"Ahiru no Sora",
       "thumb":"https://img.anime47.com/imgur/68adU8B.png"
    },
    {
       "title":"Jojos Bizarre Adventure",
       "thumb":"https://img.anime47.com/imgur/idpm6J0.jpg"
    },
    {
       "title":"Maou Gakuin no Futekigousha",
       "thumb":"https://img.anime47.com/imgur/xVuhyWc.jpg"
    },
    {
       "title":"Peter Grill to Kenja no Jikan",
       "thumb":"https://img.anime47.com/imgur/6hhR2bl.jpg"
    },
    {
       "title":"Dokyuu Hentai HxEros",
       "thumb":"https://img.anime47.com/imgur/gEfsKK8.jpg"
    },
    {
       "title":"Kanojo, Okarishimasu",
       "thumb":"https://img.anime47.com/imgur/KKrknWT.jpg"
    },
    {
       "title":"Deca-Dence",
       "thumb":"https://img.anime47.com/imgur/4A8EO07.jpg"
    },
    {
       "title":"Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season",
       "thumb":"https://img.anime47.com/imgur/9HpTWLd.jpg"
    },
    {
       "title":"The God of High School",
       "thumb":"https://img.anime47.com/imgur/A9txARE.jpg"
    },
    {
       "title":"Sword Art Online: Alicization - Đại Chiến Underworld 2",
       "thumb":"https://img.anime47.com/imgur/dcfyjSL.png"
    },
    {
       "title":"Lapis Re:LiGHTs",
       "thumb":"https://img.anime47.com/imgur/o6Ghr0q.jpg"
    },
    {
       "title":"Ore wo Suki nano wa Omae dake ka yo: Oretachi no Game Set",
       "thumb":"https://img.anime47.com/imgur/DlO2bxC.jpg"
    },
    {
       "title":"Ninja Collection",
       "thumb":"https://img.anime47.com/imgur/TJFUev7.jpg"
    },
    {
       "title":"Uzaki-chan wa Asobitai!",
       "thumb":"https://img.anime47.com/imgur/BMSYbHI.jpg"
    },
    {
       "title":"Monster Musume no Oishasan",
       "thumb":"https://img.anime47.com/imgur/5Ebljox.jpg"
    },
    {
       "title":"Nakitai Watashi wa Neko wo Kaburu",
       "thumb":"https://img.anime47.com/imgur/x47Eo0U.jpg"
    },
    {
       "title":"Baki 2nd Season",
       "thumb":"https://img.anime47.com/imgur/X4reTK5.jpg"
    },
    {
       "title":"Heya Camp△: Sauna to Gohan to Miwa Bike Bluray",
       "thumb":"https://img.anime47.com/imgur/xtfuN49.jpg"
    },
    {
       "title":"BanG Dream! Garupa☆Pico: Oomori",
       "thumb":"https://img.anime47.com/imgur/mjFb7f6.jpg"
    },
    {
       "title":"Evangelion: 3.0+1.0",
       "thumb":"https://img.anime47.com/imgur/N82fZGy.jpg"
    },
    {
       "title":"Given Movie",
       "thumb":"https://img.anime47.com/imgur/eWSn0n5.jpg"
    },
    {
       "title":"Omoi, Omoware, Furi, Furare",
       "thumb":"https://img.anime47.com/imgur/zzWrp7B.jpg"
    },
    {
       "title":"Shokugeki no Souma: Gou no Sara",
       "thumb":"https://img.anime47.com/imgur/mFpZYeU.jpg"
    },
    {
       "title":"Houkago Teibou Nisshi",
       "thumb":"https://img.anime47.com/imgur/n9Lu06d.jpg"
    },
    {
       "title":"Fruits Basket 2nd Season",
       "thumb":"https://img.anime47.com/imgur/dZligE2.jpg"
    },
    {
       "title":"No Guns Life 2nd Season",
       "thumb":"https://img.anime47.com/imgur/gpMeLAe.jpg"
    },
    {
       "title":"Fugou Keiji: Balance:Unlimited",
       "thumb":"https://img.anime47.com/imgur/1VtjNKS.jpg"
    },
    {
       "title":"Yu☆Gi☆Oh!: Sevens",
       "thumb":"https://img.anime47.com/imgur/HJ7Hzot.jpg"
    },
    {
       "title":"Gundam Build Divers Re:Rise 2nd Season",
       "thumb":"https://img.anime47.com/imgur/3iLjAgi.jpg"
    },
    {
       "title":"Shadowverse (TV)",
       "thumb":"https://img.anime47.com/imgur/LIhTVQ3.jpg"
    },
    {
       "title":"Strike the Blood Ⅳ",
       "thumb":"https://img.anime47.com/imgur/6HN03r0.jpg"
    },
    {
       "title":"Digimon Adventure:",
       "thumb":"https://img.anime47.com/imgur/YBBv2AF.jpg"
    },
    {
       "title":"Bungou to Alchemist: Shinpan no Haguruma",
       "thumb":"https://img.anime47.com/imgur/Q3H9AkY.jpg"
    },
    {
       "title":"Tamayomi",
       "thumb":"https://img.anime47.com/imgur/H4DlQ8x.jpg"
    },
    {
       "title":"Kitsutsuki Tanteidokoro",
       "thumb":"https://img.anime47.com/imgur/zl1K5v2.jpg"
    },
    {
       "title":"Argonavis from BanG Dream!",
       "thumb":"https://img.anime47.com/imgur/oka7Tnh.jpg"
    },
    {
       "title":"Shachou, Battle no Jikan Desu!",
       "thumb":"https://img.anime47.com/imgur/7HMZh0l.jpg"
    },
    {
       "title":"Princess Connect! Re:Dive",
       "thumb":"https://img.anime47.com/imgur/iObbi16.jpg"
    },
    {
       "title":"Gleipnir",
       "thumb":"https://img.anime47.com/imgur/WSgvXYV.jpg"
    },
    {
       "title":"Tsugu Tsugumomo",
       "thumb":"https://img.anime47.com/imgur/WfBhJ4s.jpg"
    },
    {
       "title":"Kaguya-sama wa Kokurasetai?: Tensai-tachi no Renai Zunousen",
       "thumb":"https://img.anime47.com/imgur/Cqh26UT.jpg"
    },
    {
       "title":"Mashin Eiyuuden Wataru: Nana Tamashii no Ryuujinmaru",
       "thumb":"https://img.anime47.com/imgur/utr2mVW.jpg"
    },
    {
       "title":"Honey And Clover",
       "thumb":"https://img.anime47.com/imgur/G8UWSl5.jpg"
    },
    {
       "title":"Toaru Kagaku no Railgun T",
       "thumb":"https://img.anime47.com/imgur/UdJIai4.jpg"
    },
    {
       "title":"Shokugeki no Souma: Gou no Sara",
       "thumb":"https://img.anime47.com/imgur/mFpZYeU.jpg"
    },
    {
       "title":"Biệt Đội Lính Cứu Hỏa Phần 2",
       "thumb":"https://img.anime47.com/imgur/UekNDIr.jpg"
    },
    {
       "title":"Kanojo, Okarishimasu",
       "thumb":"https://img.anime47.com/imgur/KKrknWT.jpg"
    },
    {
       "title":"Yahari Ore no Seishun Love Comedy wa Machigatteiru. Kan",
       "thumb":"https://img.anime47.com/imgur/zoArbgQ.jpg"
    },
    {
       "title":"Bakugan Battle Brawlers: Gundalian Invaders",
       "thumb":"https://img.anime47.com/imgur/gJCtnmU.jpg"
    },
    {
       "title":"Zenonzard The Animation",
       "thumb":"https://img.anime47.com/imgur/hXqO7Wo.jpg"
    },
    {
       "title":"Houkago Teibou Nisshi",
       "thumb":"https://img.anime47.com/imgur/n9Lu06d.jpg"
    },
    {
       "title":"Gibiate",
       "thumb":"https://img.anime47.com/imgur/uvDAjQA.jpg"
    },
    {
       "title":"Muhyo to Rouji no Mahouritsu Soudan Jimusho 2nd Season",
       "thumb":"https://img.anime47.com/imgur/lmSfOTV.jpg"
    },
    {
       "title":"Strike Witches - 501 Butai Hasshin Shimasu! Gekijouban",
       "thumb":"https://img.anime47.com/imgur/ulpwpBa.jpg"
    },
    {
       "title":"Healin' Good♡Precure",
       "thumb":"https://img.anime47.com/imgur/K8216JX.jpg"
    },
    {
       "title":"Ahiru no Sora",
       "thumb":"https://img.anime47.com/imgur/68adU8B.png"
    },
    {
       "title":"Jojos Bizarre Adventure",
       "thumb":"https://img.anime47.com/imgur/idpm6J0.jpg"
    },
    {
       "title":"Black Clover",
       "thumb":"https://img.anime47.com/imgur/3RPi4eW.jpg"
    },
    {
       "title":"Fruits Basket 2nd Season",
       "thumb":"https://img.anime47.com/imgur/dZligE2.jpg"
    },
    {
       "title":"Ookami-san wa Taberaretai",
       "thumb":"https://img.anime47.com/imgur/6ggTOxg.jpg"
    },
    {
       "title":"Pokemon (2019)",
       "thumb":"https://img.anime47.com/imgur/x0pSTVc.jpg"
    },
    {
       "title":"Anime Music Video",
       "thumb":"https://s2.vndb.org/cv/40/28440.jpg"
    },
    {
       "title":"Jinzo Ningen Hakaider",
       "thumb":"https://img.anime47.com/imgur/MMB5qVh.jpg"
    },
    {
       "title":"Dororo Live Action",
       "thumb":"https://img.anime47.com/imgur/KEjAtax.jpg"
    },
    {
       "title":"Kamen Rider Build the Movie: Be the One",
       "thumb":"https://img.anime47.com/imgur/37dJSuy.jpg"
    },
    {
       "title":"Mình Muốn Ăn Tụy Của Cậu",
       "thumb":"https://img.anime47.com/imgur/o9yXo3d.jpg"
    },
    {
       "title":"Lão Hạc Siêu Nhân",
       "thumb":"https://img.anime47.com/imgur/DXanldC.jpg"
    },
    {
       "title":"Sukina Hito Ga Iru Koto",
       "thumb":"https://img.anime47.com/imgur/Qh1cv42.jpg"
    },
    {
       "title":"Yêu Lại Từ Đầu",
       "thumb":"https://img.anime47.com/imgur/neNvweM.jpg"
    },
    {
       "title":"Kuzu no Honkai: Ước nguyện của kẻ cặn bã",
       "thumb":"https://img.anime47.com/imgur/Mx1IyzW.jpg"
    }
 ]

const Film = ({ params, }) => {
    const [selectedCategory, setSelectedCategory] = useState('Action')

    const changeCategory = (c) => {
        setSelectedCategory(c)
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity >
                <View style={styles.item} >
                    <Image source={{ uri: item.thumb }} style={styles.itemImg} />
                    <Text 
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.itemTitle}
                   

                  >{item.title}</Text>
                    
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexGrow: 0 }}>
                {
                    Menu.map((c, i) => {
                        return (
                            // TouchableOpacity
                            <TouchableOpacity key={i} onPress={() => changeCategory(c)} style={{ padding: 16, }}>


                                <CategoryName selected={selectedCategory === c ? true : false} >{c}</CategoryName>


                                {selectedCategory === c && <CategoryBar />}

                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>

            <View>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    numColumns={3}
                    data={films}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => renderItem(item)}
                />
            </View>
        </Container>
    )
}
export default Film;
const Container = styled.ScrollView`
    flex:1;
    background-color:#fff
`
const CategoryName = styled.Text`
  color:${props => props.selected ? "#819ee5" : "#9a9a9a"};
  
  font-family:${props => props.selected ? "ProductSans-Bold" : "ProductSans-Regular"};


`
const CategoryBar = styled.View`
    background-color:#819ee5;
    width:60%;
    height:4px;
    border-radius:8px;
    margin-top:8px
`

const styles = StyleSheet.create({
    item: {

        width: width / 3,
        height: width / 3+70,
        padding: 8,
        marginBottom: 8


    },
    itemImg: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 8,
        marginBottom:8

    }

    ,itemTitle:{
       fontFamily:Fonts.Sans,
       fontSize:13,
       color:"#000",
       marginBottom:8
    }
});