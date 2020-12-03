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

            <TouchableOpacity style={{

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
