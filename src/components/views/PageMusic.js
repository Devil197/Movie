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
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import { ROUTE_KEY } from '../../constants/constants';
import { getAllMusicByChannelId } from '../../Redux/actions/musicActions'


export default function PageMusic({ channel_Id }) {
    const navigation = useNavigation();
    const playerRef = useRef();

    const [musicData, setMusicData] = useState();
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
    const [musicArray, setMusicArray] = useState([]);

    useEffect(() => {
        handleAPI_getAllMusicByChannelId();
    }, []);

    const handleAPI_getAllMusicByChannelId = async () => {
        await getAllMusicByChannelId(channel_Id)
            .then((result) => {
                //console.log("MUSIC DATA: ", result?.snippet);
                setMusicData(result?.snippet);
                result?.snippet.map((val, ind) => {
                    let newArray = {
                        id: val?._id,
                        url: val?.info?.link,
                        title: val?.info?.title,
                        artist: 'No Artist In API!',
                        artwork: val?.info?.thumbnails?.default?.url
                    }
                    setMusicArray(musicArray => [...musicArray, newArray])
                })
            })
            .catch((err) => console.log(err));
        setLoading(false);
    }

    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity
                style={[styles.row, { margin: 5, marginTop: 10 }]}
                onPress={() =>
                    navigation.push(ROUTE_KEY.Players,
                        {
                            index: index,
                            list: musicArray
                        })
                }
            >
                <View style={{ flexDirection: "row" }}>
                    <Image style={styles.imageC} source={{ uri: item.artwork }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: 0.6 * WIDTH }}>
                        <Text style={styles.groupItemText} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.groupItemText} ellipsizeMode='tail' numberOfLines={1}>{item.artist}</Text>
                    </View>
                </View>

                <IconElement
                    name="ellipsis-vertical-outline"
                    type='ionicon'
                    color="#999999"
                    size={16 * WIDTH_SCALE}
                    style={{ marginHorizontal: 20 * WIDTH_SCALE }} />

            </TouchableOpacity >
        )
    }

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={musicArray}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
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
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
    },

    groupItemText: {
        marginHorizontal: 16 * WIDTH_SCALE,
        fontSize: 12 * WIDTH_SCALE,
        fontFamily: Fonts.SansMedium,
    },

});
