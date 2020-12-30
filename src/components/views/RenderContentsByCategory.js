import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ImageBackground, Image } from 'react-native'
import {
    getAllMovie,
    getCartoon,
    getCast,
    getMovieByCreatAt,
    getMovieByScore,
    getMovieByCategories,
    getMovieById,
} from '../../Redux/actions/movieAction';
import { getEvalByMovieId } from '../../Redux/actions/evalAction';
import {
    WIDTH_SCALE,
    HEIGHT_SCALE,
    WIDTH,
    HEIGHT,
    STATUS_BAR_CURRENT_HEIGHT,
    HEADER_HEIGHT,
} from '../../constants/constants';
import { ROUTE_KEY } from '../../constants/constants';
import { ptColor } from '../../constants/styles';
import { Fonts } from '../../utils/Fonts';
import { SkypeIndicator } from 'react-native-indicators';
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RenderContentsByCategory({ categoryId, navigation }) {

    const [movieList, setmovieList] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleAPI_getMoviesByCategory()
    }, [categoryId])

    const handleAPI_getMoviesByCategory = async () => {
        await getMovieByCategories(categoryId).then(result => {
            //console.log("RESULT1: ", result?.items);
            let array = [];

            result?.items.forEach(element => {

                let temp = {
                    _id: element?.movie_id?._id,
                    name: element?.movie_id?.name,
                    cover_img: element?.movie_id?.cover_img,
                    country: element?.movie_id?.country,            // <<======== Movie details
                    years: element?.movie_id?.years,
                    language: element?.movie_id?.language,
                }
                array.push(temp);
            });

            if (array !== undefined) {
                setmovieList(array)
                setLoading(false);
            }

        })
    }

    const renderItem = ({ item, index }) => {
        return (

            <TouchableOpacity
                onPress={() => navigation.push(ROUTE_KEY.Details, { _id: item._id })}
                style={{
                    width: WIDTH / 2,
                    height: WIDTH / 1.5,
                }}>
                <View style={{
                    flex: 1,
                    padding: 8,


                }}>
                    <Image source={{ uri: item.cover_img }}

                        style={{
                            flex: 1, borderRadius: 4,

                        }}
                    />

                    <Text style={{ fontSize: 14, fontFamily: Fonts.SansMedium, marginVertical: 8 }}
                        numberOfLines={1}

                    >{item.name}</Text>
                </View>


            </TouchableOpacity>
        )
    }

    const loadingComponent = () => {
        return (
            <View style={{
                position: 'absolute',
                width: WIDTH,
                height: HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                bottom: HEIGHT * 0.5
            }}>
                <View style={{ width: 40, height: 40, borderRadius: 20 }}>
                    <SkypeIndicator
                        color={ptColor.appColor}
                        style={{
                            padding: 15 * WIDTH_SCALE,
                            backgroundColor: 'rgba(164, 164, 164, 0.4)',
                            borderRadius: 30,
                        }}
                        size={30 * WIDTH_SCALE}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, }}>
            {movieList !== undefined ?
                <FlatList
                    style={{ marginTop: 16 }}
                    data={movieList}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}

                /> :
                loadingComponent()
            }

            {/* LOADING SƯƠNG SƯƠNG */}
            {
                loading ?
                    loadingComponent()
                    : null
            }

        </View>
    )
}
