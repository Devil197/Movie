import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { View, Text, FlatList, Image, Animated, TouchableWithoutFeedback } from 'react-native'
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants'
import { Fonts } from '../../utils/Fonts'
import {
    getMovieByCreatAt,
} from '../../Redux/actions/movieAction';
import { SkypeIndicator } from 'react-native-indicators';
import { pFonts, ptColor } from '../../constants/styles'
import { ROUTE_KEY, STATUS_BAR_CURRENT_HEIGHT } from '../../constants/constants';
import { ViewMoreItem } from '../views'
import Icons from 'react-native-vector-icons/Feather'
const HEADER_HEIGHT = HEIGHT * 0.33 * WIDTH_SCALE;

export default function ViewMore({ route, navigation }) {

    const sort = route.params.sort;
    const [movieData, setMovieData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [limit, setLimit] = useState(8);
    const [lastMovieId, setlastMovieId] = useState()
    useEffect(() => {
        async function handleAPI_getNewestMovies() {
            //if get newest movie
            if (sort === -1) {
                await getMovieByCreatAt(limit).then(result => {
                    setMovieData(result?.items)
                    setLoading(!isLoading)
                    setlastMovieId(result?.items[result?.items.length - 1]?._id)
                })
            }
        }
        handleAPI_getNewestMovies();
        return () => console.log("clean");
    }, [limit])

    const handleEndScroll = () => {
        setLimit(limit + 5);
        setLoading(true)
    }

    const renderFooter = () => {
        return (
            isLoading ? <View style={styles.loader}>
                <SkypeIndicator
                    style={{ marginBottom: 40 * WIDTH_SCALE }}
                    color={ptColor.appColor}
                    size={20 * WIDTH_SCALE}
                />
            </View > : null
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableWithoutFeedback
                    style={{
                        height: '100%',
                        width: WIDTH * 0.1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flex: 1,
                    }}
                    onPress={() => navigation.goBack()}>
                    <Icons
                        name={'arrow-left'}
                        size={24 * WIDTH_SCALE}
                        color={ptColor.gray2} />
                </TouchableWithoutFeedback>
                <Text style={{ flex: 8, textAlign: 'center', fontSize: 18 * WIDTH_SCALE, fontFamily: Fonts.SansMedium, color: ptColor.gray2 }} >{sort == -1 ? "Phim Mới Nhất" : null}</Text>
                <TouchableWithoutFeedback
                    style={{
                        height: '100%',
                        width: WIDTH * 0.1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        flex: 1,
                        paddingRight: 15 * WIDTH_SCALE,
                    }}
                    onPress={() => navigation.navigate(ROUTE_KEY.Search)}>
                    <Icons
                        name={'search'}
                        size={24 * WIDTH_SCALE}
                        color={ptColor.gray2} />
                </TouchableWithoutFeedback>
            </View>
            <FlatList
                bounces={false}
                style={styles.container}
                data={movieData}
                keyExtractor={item => `key-${item._id}`}
                renderItem={(item) =>
                    <ViewMoreItem params={item} navigation={navigation} />
                }
                ListFooterComponent={renderFooter}
                onEndReached={handleEndScroll}
                onEndReachedThreshold={0.5}
                initialNumToRender={8}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 23 * WIDTH_SCALE,
    },
    timeStyles: {
        fontFamily: Fonts.SansLight,
        fontSize: 16 * WIDTH_SCALE,
        marginTop: 5 * WIDTH_SCALE,
    },
    header: {
        width: WIDTH,
        height: 50,
        zIndex: 11,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10 * WIDTH_SCALE
    },
    loader: {
        marginTop: 15 * WIDTH_SCALE,
    }
})