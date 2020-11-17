import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Animated,
    ScrollView, Button,
    FlatList,
} from 'react-native';
import {
    WIDTH_SCALE,
    HEIGHT_SCALE,
    WIDTH,
    HEIGHT,
    STATUS_BAR_CURRENT_HEIGHT,
    HEADER_HEIGHT,
} from '../../constants/constants';
import FastImage from 'react-native-fast-image';
import ProgressCircle from 'react-native-progress-circle';
import common from '../../constants/style/common';
import { ptColor } from '../../constants/styles';
import { Musicitem } from '../views/index';
import { films } from '../../constants/data/fakeData'
import {
    getMovieByCategories,
} from '../../Redux/actions/movieAction';
import { Fonts } from '../../utils/Fonts';
import { Icon as IconElement } from 'react-native-elements';
import Players from '../views/Players';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
export default function PageMusic({
    id,
    // navigation,
}) {
    const navigation = useNavigation();
    const playerRef = useRef();

    const [dataMovie, setDataMovie] = useState();
    const [loading, setLoading] = useState();

    // react native youtube 
    const videoRef = useRef();
    const [isReady, setIsReady] = useState(true);
    const [status, setStatus] = useState();
    const [quality, setQuality] = useState();

    const [error, setError] = useState();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLooping, setIsLooping] = useState(true);
    const [duration, setDration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {

        getMovieByCategories(id)
            .then((movie) => {

                // console.log('==========', movie.items[1].create_at),
                setLoading(false),
                    setDataMovie(movie);

                // setDataTrailer();
            })
            .catch((err) => console.log(err));
    }, []);
    // YouTubeStandaloneAndroid.playVideo({
    //     apiKey: 'AIzaSyAuJ3n_8KEAcR0ip82qAy816VY5sjGBi-s', // Your YouTube Developer API Key
    //     videoId: 'qSJky2QykM8', // YouTube video ID
    //     autoplay: true, // Autoplay the video
    //     startTime: 120, // Starting point of video (in seconds)
    //     lightboxMode: true,
    // })
    //     .then(() => console.log('Standalone Player Exited'))
    //     .catch(errorMessage => console.error(errorMessage));
    // console.log('222223 -> data movie by categories... : ', dataMovie);
    const renderItem = (item) => {

        return (

            <TouchableOpacity style={[styles.row, { margin: 5, marginTop: 10 }]}
            // onPress={() => console.log(item._id)}
            >
                <View style={{ flexDirection: "row" }}>
                    <Image style={styles.imageC} source={{ uri: item.item.thumb }} />

                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: 0.6 * WIDTH }}>
                        <Text style={styles.groupItemText} ellipsizeMode='tail' numberOfLines={1}>{item.item.title}</Text>
                        <Text style={styles.groupItemText} ellipsizeMode='tail' numberOfLines={1}>{item.item.id}</Text>
                    </View>
                </View>

                <IconElement name="ellipsis-vertical-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} style={{ marginHorizontal: 20 * WIDTH_SCALE }} />

            </TouchableOpacity >
        )
    }

    return (
        <ScrollView style={styles.container}>
            {/* <Text>{id}</Text> */}
            <View style={{ marginTop: 30 * WIDTH_SCALE, }}>
                {/* <View style={styles.box1}> */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    // data={dataMovie?.items}
                    data={films}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={(item) => (
                        renderItem(item)
                    )}
                />
            </View>
            <View>
                {/* <Players songs={films} /> */}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10 * WIDTH_SCALE,
        borderRadius: 10 * WIDTH_SCALE,
        // height: 0.15 * HEIGHT,
    },

    box1: {
        width: 0.95 * WIDTH,
        height: 0.55 * HEIGHT,
        backgroundColor: '#cd84f1',
        margin: 10 * WIDTH_SCALE,

    },
    box2: {
        width: 0.95 * WIDTH,
        height: 0.25 * HEIGHT,
        backgroundColor: '#cd84f1',
        margin: 10 * WIDTH_SCALE,

    },
    imageC: {
        width: 0.12 * WIDTH,
        height: 0.12 * WIDTH,
        borderRadius: 4,
        marginHorizontal: 20 * WIDTH_SCALE,
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5 * WIDTH_SCALE,
    },
    row: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "space-between",

    },

    groupItemText: {
        marginHorizontal: 16 * WIDTH_SCALE,
        fontSize: 12 * WIDTH_SCALE,
        fontFamily: Fonts.SansMedium,
    },

});
