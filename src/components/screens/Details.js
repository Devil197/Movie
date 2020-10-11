import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    Platform,
    FlatList,
    Image
} from 'react-native';

import { getFullMovie } from '../../Redux/actions/movieAction'
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT } from '../../constants/constants'
import Icon from 'react-native-vector-icons/Ionicons';
import YouTube from 'react-native-youtube';
import { MySpinner } from '../views';
export default function Details({ navigation, route }) {
    // video ====
    const [height, setHeight] = useState();
    const [trailer, setTrailer] = useState('')

    //=====
    const _id = route.params._id;
    console.log("hhh", _id);
    const [dataMovie, setDataMovie] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        getFullMovie(_id).then((fullMovie) => {

            console.log('0001 ', fullMovie);
            setDataMovie(fullMovie);
            console.log('trailer : ', fullMovie.movie[0].trailer);
            setTrailer(fullMovie?.movie[0]?.trailer)
            setLoading(false);
        }).catch((err) => console.log("Failed", err))

    }, [])
    console.log("yyyyy", dataMovie?.movie[0].trailer)
    if (loading) {
        MySpinner.show();
        return (
            <View style={{ flex: 1, width: WIDTH, height: HEIGHT, position: 'absolute', zIndex: 9999 }} />
        )
    } else {
        MySpinner.hide()
    }
    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>

                <View style={styles.boxHeader}>
                    <Icon name="chevron-back" size={30} color="#fff" />
                    <Text style={{ color: '#fff' }}>Back</Text>
                </View>

                <View style={styles.header1}></View>

                <Image source={{ uri: dataMovie?.movie[0].cover_img }} style={styles.imageHeader} />

                <View style={styles.header2}>

                    <View style={styles.boxContent}>
                        <Text style={{ fontWeight: 'bold' }}>{dataMovie?.movie[0].name}</Text>
                        <Text>{dataMovie?.category[0].name}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="ios-calendar-outline" size={20} color="#000" />
                            <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].duration}</Text>
                        </View>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].directer}</Text>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].country}</Text>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].episode}</Text>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].status}</Text>
                    </View>

                </View>

            </View>

            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Overview</Text>
                <Text style={{ margin: 10 * WIDTH_SCALE }}>{dataMovie?.movie[0].introduction}</Text>
            </View>

            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Cast</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {dataMovie?.cast.map((c, i) => {
                        return (
                            <TouchableOpacity style={styles.touchopa}>
                                <Image source={{ uri: c.cover_img }} style={styles.imageCast} />
                                <Text color="#333">{c.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Trailer</Text>
                <YouTube
                    apiKey="AIzaSyCpU2RlaMjkFN0461dZRv2zfnQEXzUuz6U"
                    videoId={trailer}
                    controls={2}
                    play={false}
                    style={{ alignSelf: 'stretch', height: 250 * WIDTH_SCALE }}
                    onReady={() => {
                        setHeight(221);
                    }}
                />
            </View>
            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Phim liên quan : </Text>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c8d6e5',
    },
    // header
    boxHeader: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 40 * WIDTH_SCALE,
        left: 20 * WIDTH_SCALE,
        zIndex: 1,
    },
    imageHeader: {
        width: 150 * WIDTH_SCALE,
        height: 200 * HEIGHT_SCALE,
        position: 'absolute',
        top: 170 * WIDTH_SCALE,
        left: 20 * WIDTH_SCALE,
        zIndex: 1
    },
    header1: {
        width: WIDTH,
        height: 200 * HEIGHT_SCALE,
        backgroundColor: '#222f3e',
    },
    header2: {
        width: WIDTH,
        height: 200 * HEIGHT_SCALE,
        backgroundColor: '#fff',
    },
    boxContent: {
        position: 'absolute',
        right: 0,
        width: WIDTH - 200,
        alignItems: 'flex-start',
        padding: 5 * WIDTH_SCALE,
    },
    //content 
    content: {
        backgroundColor: '#fff',
        marginTop: 5 * WIDTH_SCALE,
    },
    //cast
    touchopa: {
        margin: 5 * WIDTH_SCALE,
    },
    imageCast: {
        width: 150 * WIDTH_SCALE,
        height: 200 * HEIGHT_SCALE,
    }
})
