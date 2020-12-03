import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ImageBackground, ScrollView, Image, StyleSheet } from 'react-native'
import MyCarousel from './MyCarousel'
import { WIDTH_SCALE, HEIGHT, WIDTH, ROUTE_KEY } from '../../constants/constants'
import { Fonts } from '../../utils/Fonts'
import { ptColor } from '../../constants/styles';
import { MyHighLightButton } from '../views';

export default function FeaturesContents({ highScoreMovies, navigation }) {

    const handleMovieName = (name) => {
        let lastCharSplitIndex = name.indexOf(']');
        let mainName = name.slice(lastCharSplitIndex + 1, name.length);
        if (mainName.indexOf(' ') === 0) {
            return mainName.slice(1, mainName.length);
        }
        return mainName
    }

    const handleMainCatOfMovie = (name) => {
        let firtChar = name.indexOf('[');
        let lastCharSplitIndex = name.indexOf(']');
        if (firtChar === -1 || lastCharSplitIndex === -1) {
            return 'Movie';
        }
        return name.slice(firtChar + 1, lastCharSplitIndex)
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 * WIDTH_SCALE }}>
            <View
                style={{

                }}>
                <Text
                    style={{
                        fontFamily: Fonts.SansMedium,
                        fontSize: 20,
                        marginHorizontal: 20
                        ,
                        marginVertical: 16,

                        color: ptColor.black
                    }}>
                    REVIEW PHIM IMDB 8+</Text>

                <MyCarousel movieData={highScoreMovies} navigation={navigation} />
            </View>

            {/* PHIM XỊN TRONG NĂM */}
            <View
                style={{

                }}>

                <Text
                    style={{
                        fontFamily: Fonts.SansMedium,
                        fontSize: 20,
                        marginHorizontal: 20
                        ,
                        marginVertical: 16,

                        color: ptColor.black
                    }}>TOP REVIEW PHỔ BIẾN</Text>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={3}
                    keyExtractor={(item) => String(item._id)}
                    data={highScoreMovies}
                    renderItem={({ item, index }) => {
                        return (
                            <MyHighLightButton
                                onPress={() => navigation.push(ROUTE_KEY.Details, { _id: item._id })}
                                style={{

                                    marginLeft: index == 0 ? 20 : 0
                                    , marginRight: 20
                                }}>

                                <ImageBackground
                                    source={{ uri: item.cover_img }}
                                    style={{
                                        height: WIDTH / 1.5,
                                        width: WIDTH / 2,
                                    }}
                                    imageStyle={{
                                        borderRadius: 10 * WIDTH_SCALE,
                                        marginBottom: 5 * WIDTH_SCALE,
                                    }}
                                    resizeMode={'cover'}
                                >
                                    <Text
                                        style={{

                                            backgroundColor: 'rgba(0,0,0, 0.5)',
                                            position: 'absolute',
                                            zIndex: 12,
                                            bottom: 0,
                                            right: 0,
                                            color: '#fff',
                                            width: '100%',
                                            borderBottomLeftRadius: 10 * WIDTH_SCALE,
                                            borderBottomRightRadius: 10 * WIDTH_SCALE,
                                            fontFamily: Fonts.SansLight,
                                            fontSize: 14 * WIDTH_SCALE,
                                            padding: 8
                                        }}>{item.language}</Text>

                                    <Text
                                        style={{
                                            backgroundColor: 'rgba(0,0,0, 0.5)',
                                            position: 'absolute',
                                            zIndex: 12,
                                            top: 0,
                                            right: 0,
                                            color: '#fff',
                                            width: '100%',
                                            borderTopLeftRadius: 10 * WIDTH_SCALE,
                                            borderTopRightRadius: 10 * WIDTH_SCALE,
                                            fontFamily: Fonts.SansMedium,
                                            fontSize: 14 * WIDTH_SCALE,
                                            paddingHorizontal: 5 * WIDTH_SCALE,
                                            paddingVertical: 5 * WIDTH_SCALE,
                                            textAlign: 'center'
                                        }}
                                    >
                                        {handleMainCatOfMovie(item.name)} Of Year</Text>
                                </ImageBackground>

                                <Text
                                    style={{
                                        fontFamily: Fonts.SansMedium,
                                        fontSize: 14 * WIDTH_SCALE,
                                        paddingHorizontal: 5 * WIDTH_SCALE,
                                        marginTop: 5 * WIDTH_SCALE,
                                    }}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >
                                    {handleMovieName(item.name)}
                                </Text>

                                <View style={{ flexDirection: 'row', paddingHorizontal: 5 * WIDTH_SCALE, marginTop: 5 * WIDTH_SCALE }}>
                                    <Text style={{ fontSize: 13 * WIDTH_SCALE, fontFamily: Fonts.SansLight }}>
                                        IMDb: {item.score.toFixed(1)}
                                    </Text>
                                </View>

                            </MyHighLightButton>
                        )
                    }}
                    horizontal={true}
                />
            </View>

            {/* PHIM MOI */}
            <View style={{ marginTop: 25 * WIDTH_SCALE, marginHorizontal: 15 * WIDTH_SCALE }}>
                <View style={{
                    marginBottom: 10 * WIDTH_SCALE,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text
                        style={{
                            fontFamily: Fonts.SansBold,
                            fontSize: 18 * WIDTH_SCALE,
                            color: ptColor.black,
                            flex: 7,
                        }}>REVIEW MỚI NHẤT</Text>

                    <Text
                        style={{
                            fontFamily: Fonts.SansLight,
                            fontSize: 14 * WIDTH_SCALE,
                        }}
                    >Xem thêm..</Text>
                </View>
                <View>
                    {highScoreMovies !== undefined ?
                        highScoreMovies.map((val, ind) => {
                            if (ind < 5) {
                                return (
                                    <MyHighLightButton
                                        onPress={() => navigation.push(ROUTE_KEY.Details, { _id: val?._id })}
                                        key={val?._id}
                                        style={{
                                            flexDirection: 'row',
                                            marginVertical: 10 * WIDTH_SCALE,
                                        }}>
                                        <Image
                                            source={{ uri: val?.cover_img }}
                                            style={{
                                                flex: 1.2,
                                                height: WIDTH * 0.42,
                                                width: WIDTH * 0.4,
                                            }} />
                                        <Text
                                            style={{
                                                position: 'absolute',
                                                left: WIDTH * 0.34,
                                                bottom: 0,
                                                paddingHorizontal: 5 * WIDTH_SCALE,
                                                paddingVertical: 5 * WIDTH_SCALE,
                                                backgroundColor: '#f0ab0a',
                                                fontFamily: Fonts.SansMedium,
                                                color: '#fff',
                                            }}>
                                            IMDB: {val?.score.toFixed(1)}/10</Text>

                                        <View style={{ flex: 0.2 }} />

                                        <View
                                            style={{
                                                flex: 1.6,
                                                paddingTop: 10 * WIDTH_SCALE,
                                            }}>

                                            <Text
                                                style={{
                                                    fontFamily: Fonts.SansBold,
                                                    fontSize: 17 * WIDTH_SCALE,
                                                    marginBottom: 10 * WIDTH_SCALE,
                                                }}>{handleMovieName(val?.name)}</Text>

                                            {val?.duration < 60 ?
                                                <Text style={styles.timeStyles}>
                                                    {val?.duration} phút</Text> :
                                                <Text style={styles.timeStyles}>
                                                    {Math.floor(val?.duration / 60)} giờ {(val?.duration % 60)} phút</Text>}

                                            <Text
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    marginTop: 10 * WIDTH_SCALE,
                                                    fontFamily: Fonts.SansLight,
                                                    fontSize: 16 * WIDTH_SCALE,
                                                    color: '#fff',
                                                    paddingHorizontal: 5 * WIDTH_SCALE,
                                                    paddingVertical: 5 * WIDTH_SCALE,
                                                    backgroundColor: 'rgba(0,0,0, 0.8)',
                                                    alignSelf: 'flex-start'
                                                }}>{handleMainCatOfMovie(val?.name)}</Text>

                                            <Text
                                                style={styles.timeStyles}
                                            >Năm: {val?.years}</Text>

                                            <Text
                                                style={styles.timeStyles}
                                            >Quốc gia: {val?.country}</Text>

                                        </View>
                                    </MyHighLightButton>)
                            }
                        })
                        : null
                    }
                </View>
            </View>

        </ScrollView >
    )
}

const styles = StyleSheet.create({
    timeStyles: {
        fontFamily: Fonts.SansLight,
        fontSize: 16 * WIDTH_SCALE,
        marginTop: 5 * WIDTH_SCALE,
    }
});
