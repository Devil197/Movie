import React from 'react';
import { Text, View, ScrollView, TextInput, Dimensions, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { MySpinner, MyHighLightButton } from '../views';
import { ROUTE_KEY } from '../../constants/constants';
import { styles } from '../../constants/style/styles';

import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT } from '../../constants/constants';

var { height, width } = Dimensions.get('window');
const TRACKS = [
    {
        title: 'Top 100 bài hát nhạc trẻ hay nhất',
        artist: 'Various Artists',
        albumArtUrl: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4",
        audioUrl: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FPh%C3%ADa%20Sau%20M%E1%BB%99t%20C%C3%B4%20G%C3%A1i_Soobin%20Ho%C3%A0ng%20S%C6%A1n_-1075771528.mp3?alt=media&token=34e80d45-6af9-47b1-b347-1ca180493163",
    },
    {
        title: 'Top 100 nhạc Electronic/Dance Âu Mỹ hay nhất',
        artist: 'Various Artists',
        albumArtUrl: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Finyoureyes.png?alt=media&token=5893b4b9-d4fc-4636-82a9-f3eee0fb36b5",
        audioUrl: 'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FIn_Your_Eyes_-_DG812_-_v_2%5B1%5D.mp3?alt=media&token=e16c90d4-4df3-4b87-937c-1dcbbf04733b',
    },
    {
        title: 'Top 100 Pop Âu Mỹ hay nhất',
        artist: 'Various Artists',
        albumArtUrl: 'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fintheend.png?alt=media&token=5e1e60a2-46d6-4394-b116-851c735ce89d',
        audioUrl: 'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FLinkin_Park_-_In_The_End_(Mellen_Gi_%26_Tommee_Profitt_Remix)_v2%5B1%5D.mp3?alt=media&token=34597cf8-fa16-4959-9513-7bea40576efe',
    },
    {
        title: 'Top 100 bài hát nhạc trẻ hay nhất',
        artist: 'Various Artists',
        albumArtUrl: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4",
        audioUrl: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FPh%C3%ADa%20Sau%20M%E1%BB%99t%20C%C3%B4%20G%C3%A1i_Soobin%20Ho%C3%A0ng%20S%C6%A1n_-1075771528.mp3?alt=media&token=34e80d45-6af9-47b1-b347-1ca180493163",
    },

];
export default function Music({ navigation, route }) {
    const shadowStyle = {
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: 'red',
        shadowOffset: { width: -1, height: -1 }
    }
    return (

        <ScrollView style={styles.containerMusic}>
            <View style={[styles.header, shadowStyle]}>
                <Icon name={'ios-search-outline'} size={20} style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Search..."
                    placeholderTextColor='#FAFAFF'
                />
            </View>

            <Swiper style={{ height: width / 1.8, backgroundColor: '#fff' }} showsButtons={false} autoplay={true} autoplayTimeout={4} showsVerticalScrollIndicator={false}>
                <Image resizeMode="stretch" style={{ height: width / 1.8, }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4" }} />
                <Image resizeMode="stretch" style={{ height: width / 1.8, }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Finyoureyes.png?alt=media&token=5893b4b9-d4fc-4636-82a9-f3eee0fb36b5" }} />
                <Image resizeMode="stretch" style={{ height: width / 1.8, }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fintheend.png?alt=media&token=5e1e60a2-46d6-4394-b116-851c735ce89d" }} />
                <Image resizeMode="stretch" style={{ height: width / 1.8, }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4" }} />
            </Swiper>

            <View>
                <Text style={styles.box1}>MUSIC OF THE WEEK</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image resizeMode='stretch' style={styles.imageBox1} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fsong-vn-2x.jpg?alt=media&token=b6937dbd-1df9-47fe-97d5-0fd82af6015f" }} />
                    <Image resizeMode='stretch' style={styles.imageBox1} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fmv-vn-2x.jpg?alt=media&token=edaa5d0e-c3fb-4cfa-be18-3c64d40cf605" }} />

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image resizeMode='stretch' style={styles.imageBox1} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fweb_song_usuk.png?alt=media&token=c2ddd3a5-3540-4f5c-be1e-fc160950f843" }} />
                    <Image resizeMode='stretch' style={styles.imageBox1} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fweb_song_kpop.png?alt=media&token=21df81b9-a54b-436b-8d59-63f461e5930d" }} />
                </View>
            </View>

            <View>
                <Text style={styles.box1}>TOP 100</Text>
                <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
                    {
                        TRACKS.map((c, i) => {
                            return (
                                <MyHighLightButton style={styles.box} key={i}>
                                    <Image style={styles.image_box} source={{ uri: c.albumArtUrl }} />
                                    <Text style={{ fontSize: 14, color: '#FAFAFF' }} numberOfLines={1} ellipsizeMode='tail'>
                                        {c.title}
                                    </Text>
                                    <Text style={{ opacity: 0.5, color: '#FAFAFF', fontSize: 12 }}>{c.artist}</Text>
                                    <View style={styles.box_icon}>
                                        <Icon name={'play'} size={15} />
                                    </View>
                                </MyHighLightButton>
                            );
                        })
                    }
                </ScrollView>
            </View>

            <View>
                <Text style={styles.box1}>ALBUM HOT</Text>
                <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
                    {
                        TRACKS.map((c, i) => {
                            return (
                                <MyHighLightButton style={styles.box} key={i}>
                                    <Image style={styles.image_box} source={{ uri: c.albumArtUrl }} />
                                    <Text style={{ fontSize: 14, color: '#FAFAFF' }} numberOfLines={1} ellipsizeMode='tail'>
                                        {c.title}
                                    </Text>
                                    <Text style={{ opacity: 0.5, color: '#FAFAFF', fontSize: 12 }}>{c.artist}</Text>
                                    <View style={styles.box_icon}>
                                        <Icon name={'play'} size={15} />
                                    </View>
                                </MyHighLightButton>
                            );
                        })
                    }
                </ScrollView>
            </View>
            
            <View>
                <Text style={styles.box1}>TOPICS AND CATEGORIES</Text>
                <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
                    {
                        TRACKS.map((c, i) => {
                            return (
                                <MyHighLightButton style={styles.box} key={i}>
                                    <Image style={styles.image_box} source={{ uri: c.albumArtUrl }} />
                                    <Text style={{ opacity: 0.5, color: '#FAFAFF', fontSize: 12 }}>{c.artist}</Text>
                                </MyHighLightButton>
                            );
                        })
                    }
                </ScrollView>
            </View>

         
        </ScrollView>
    );

}  
