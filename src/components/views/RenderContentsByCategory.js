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

export default function RenderContentsByCategory({ categoryId, navigation }) {

    const [movieList, setmovieList] = useState()
    const [ratingList, setRatingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleAPI_getMoviesByCategory()
    }, [categoryId])

    const handleAPI_getMoviesByCategory = async () => {
        await getMovieByCategories(categoryId).then(result => {
            //console.log("RESULT1: ", result?.items);
            let array = [];

            result?.items.forEach(element => {

                getEvalByMovieId(element?.movie_id?._id).then(result => {
                    setRatingList(ratingList => [...ratingList, result?.number])
                })

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
            <View
                style={{
                    width: WIDTH,
                    height: HEIGHT * 0.3,
                    padding: 10 * WIDTH_SCALE,
                    marginBottom: 5,
                }}>
                <Image
                    source={{ uri: item.cover_img }}
                    style={{
                        width: WIDTH * 0.33,
                        height: '90%',
                        zIndex: 10,
                        borderRadius: 8 * WIDTH_SCALE,
                        position: 'absolute',
                        top: "5%",
                        left: '9%',
                        borderColor: '#fff',
                        borderWidth: 0.5 * WIDTH_SCALE
                    }}
                />
                <View style={{ flex: 0.8 }} />
                <View
                    style={{
                        flex: 1.2,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 8 * WIDTH_SCALE,
                        alignItems: 'flex-end',
                        padding: 10 * WIDTH_SCALE,
                    }}
                >

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 20 * WIDTH_SCALE,
                            fontFamily: Fonts.SansMedium,
                            marginBottom: 5 * WIDTH_SCALE,
                        }}>{handleMovieName(item.name)}</Text>

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 16 * WIDTH_SCALE,
                            fontFamily: Fonts.SansLight
                        }}>{item.years}</Text>

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 16 * WIDTH_SCALE,
                            fontFamily: Fonts.SansLight
                        }}>{item.country}</Text>

                    {ratingList !== undefined ?
                        ratingList.map((val, ind) => {
                            if (ind === index) {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}>
                                        <StarRating
                                            activeOpacity={1}
                                            starStyle={{ width: 22 * WIDTH_SCALE }}
                                            starSize={18}
                                            fullStarColor={'red'}
                                            disabled={false}
                                            maxStars={5}
                                            rating={val}
                                            emptyStarColor={'#f1c40f'}
                                        />
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontSize: 16 * WIDTH_SCALE,
                                                fontFamily: Fonts.SansLight
                                            }}> {val}</Text>
                                    </View>
                                )
                            }
                        }) : null}

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 16 * WIDTH_SCALE,
                            fontFamily: Fonts.SansLight
                        }}>{item.language}</Text>

                </View>
            </View>
        )
    }

    //Hàm này cắt phần [Anime] ở đầu tên ra. Chỉ lấy tên phim
    const handleMovieName = (name) => {
        let lastCharSplitIndex = name.indexOf(']');
        let mainName = name.slice(lastCharSplitIndex + 1, name.length);
        if (mainName.indexOf(' ') === 0) {
            return mainName.slice(1, mainName.length);
        }
        return mainName
    }

    //Hàm này chỉ lấy phần [Anime]. 2 cái này t bỏ như ở trang Home.
    const handleMainCatOfMovie = (name) => {
        let firtChar = name.indexOf('[');
        let lastCharSplitIndex = name.indexOf(']');
        if (firtChar === -1 || lastCharSplitIndex === -1) {
            return 'Movie';
        }
        return name.slice(firtChar + 1, lastCharSplitIndex)
    }

    const loadingComponent = () => {
        return (
            <View style={{
                flex: 1,
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                width: WIDTH,
                height: HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}>
                <View style={{ width: 60, height: 60, borderRadius: 20 }}>
                    <SkypeIndicator
                        color={ptColor.appColor}
                        style={{
                            padding: 20 * WIDTH_SCALE,
                            backgroundColor: 'rgba(166, 164, 164, 0.4)',
                            borderRadius: 10,
                        }}
                        size={40 * WIDTH_SCALE}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: 15 * WIDTH_SCALE }}>
            {movieList !== undefined ?
                <FlatList
                    data={movieList}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
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
