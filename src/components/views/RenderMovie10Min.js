import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { WIDTH, HEIGHT, WIDTH_SCALE } from '../../constants/constants'
import { Fonts } from '../../utils/Fonts'

export default function RenderMovie10Min({ data, navigation, numberItem }) {
    //console.log("DATA IN FLATLIST COMP: ", data);

    const handleMovieName = (name) => {
        let lastCharSplitIndex = name.indexOf(']');
        let mainName = name.slice(lastCharSplitIndex + 1, name.length);
        if (mainName.indexOf(' ') === 0) {
            return mainName.slice(1, mainName.length);
        }
        return mainName
    }

    const renderView = ({ item, index }) => {
        if (item.duration === 10) {
            return (
                <View
                    style={{
                        width: WIDTH,
                        height: WIDTH * 0.5,
                        marginTop: 15 * WIDTH_SCALE,
                        paddingBottom: 10 * WIDTH_SCALE,
                    }}>
                    <Image
                        source={{ uri: item.cover_img }}
                        style={{
                            width: WIDTH * 0.3,
                            height: '90%',
                            borderRadius: 8 * WIDTH_SCALE,
                            left: 30 * WIDTH_SCALE,
                            position: 'absolute',
                            zIndex: 11,
                        }}
                        resizeMode={'cover'}
                    />
                    <View style={{ height: '30%' }} />
                    <View
                        style={{
                            height: '70%',
                            width: '92.5%',
                            //backgroundColor: '#f0ab0a',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            left: 15 * WIDTH_SCALE,
                            borderRadius: 8 * WIDTH_SCALE,
                            flexDirection: 'row',
                        }}>
                        <View style={{ flex: 1 }} />
                        <View
                            style={{
                                flex: 1.5,
                                paddingTop: 15 * WIDTH_SCALE,
                            }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontFamily: Fonts.SansLight,
                                    fontSize: 18 * WIDTH_SCALE,
                                }}
                            >{handleMovieName(item.name)}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

    return (
        <FlatList
            data={data}
            keyExtractor={item => item._id}
            renderItem={renderView}
            scrollEventThrottle={16}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
        />
    )
}
