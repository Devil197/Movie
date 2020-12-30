import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants'
import { Fonts } from '../../utils/Fonts'
import { SkypeIndicator } from 'react-native-indicators';
import { pFonts, ptColor } from '../../constants/styles'
import { ROUTE_KEY, STATUS_BAR_CURRENT_HEIGHT } from '../../constants/constants';
import MyHighLightButton from './MyHighLightButton';

const ViewMoreItem = React.memo(({ params, navigation }) => {
    const item = params.item;
    return (
        <MyHighLightButton
            onPress={() => navigation.push(ROUTE_KEY.Details, { _id: item._id })}
            style={{
                flexDirection: 'row',
                paddingHorizontal: 10 * WIDTH_SCALE,
                backgroundColor: '#fff',
                marginBottom: 20
            }}>
            <Image
                source={{ uri: item.cover_img }}
                style={{
                    flex: 1.2,
                    height: WIDTH * 0.42,
                    width: WIDTH * 0.4,
                    resizeMode: 'cover'
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
                IMDB: {item.score.toFixed(1)}/10</Text>

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
                    }}>{item.name}</Text>

                {item.duration < 60 ?
                    <Text style={styles.timeStyles}>
                        {item.duration} phút</Text> :
                    <Text style={styles.timeStyles}>
                        {Math.floor(item.duration / 60)} giờ {(item.duration % 60)} phút</Text>}

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
                    }}>MỚI</Text>

                <Text
                    style={styles.timeStyles}
                >Năm: {item.years}</Text>

                <Text
                    style={styles.timeStyles}
                >Quốc gia: {item.country}</Text>

            </View>
        </MyHighLightButton >
    )
})

export default ViewMoreItem

const styles = StyleSheet.create({
    timeStyles: {
        fontFamily: Fonts.SansLight,
        fontSize: 16 * WIDTH_SCALE,
        marginTop: 5 * WIDTH_SCALE,
    }
})
