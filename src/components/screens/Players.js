import React, { useRef, useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    Image,
    FlatList,
    Dimensions,
    Animated,
    StyleSheet,
} from "react-native";

import TrackPlayer, {
    Capability,
    useTrackPlayerEvents,
    usePlaybackState,
    TrackPlayerEvents,
    STATE_PLAYING,
    Event,
} from 'react-native-track-player';
import { Appbar, Card, RadioButton, Modal, Portal, Provider } from 'react-native-paper';
import { ptColor } from '../../constants/styles';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY } from '../../constants/constants';
import { Icon as IconElement } from 'react-native-elements';
import SliderComp from "../views/SliderComp";
import Controller from '../views/Controller';
import { getAllMusicByChannelId } from '../../Redux/actions/musicActions'
const { width, height } = Dimensions.get("window");
import { MySpinner } from '../views'

export default function Players({ navigation, route }) {

    const { index, list } = route.params
    console.log("LIST: ", list);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(true);
    const slider = useRef(null);
    const [songIndex, setSongIndex] = useState(index);
    const isPlayerReady = useRef(false);
    // for tranlating the album art
    const position = useRef(Animated.divide(scrollX, width)).current;
    const [musicData, setMusicData] = useState(list);
    const isItFromUser = useRef(true);
    const playbackState = usePlaybackState();

    const index1 = useRef(0)

    useEffect(() => {
        //setSongIndex(index);
        //setMusicData(list);

        scrollX.addListener(({ value }) => {
            const val = Math.round(value / width);
            setSongIndex(val);
        });

        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (e) => {
            console.log('8888 -> e : ', e);
            // let state = await TrackPlayer.getState();
            // TrackPlayer.skip((index + 1) + "");
            let trackId = await TrackPlayer.getCurrentTrack();
            let trackObject = await TrackPlayer.getTrack(trackId);
            console.log('9999 -> trackId : ', trackId);
            console.log('9999 -> trackObject : ', trackObject);

        })

        TrackPlayer.setupPlayer().then(async () => {
            console.log('Player Ready');
            await TrackPlayer.reset();
            await TrackPlayer.add(musicData);
            isPlayerReady.current = true;
            TrackPlayer.play()
            await TrackPlayer.updateOptions({
                stopWithApp: false,
                alwaysPauseOnInterruption: true,
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
            })
        });


        return () => {
            scrollX.removeAllListeners();
        };
    }, []);

    useEffect(() => {

        if (isPlayerReady.current) {
            TrackPlayer.skip(musicData[songIndex].id)
        }

    }, [songIndex]);

    function Header() {
        const _goBack = () => {
            navigation.goBack()
            TrackPlayer.pause()
        };
        return (
            <Appbar.Header
                style={{ backgroundColor: '#fafafa', elevation: 0, justifyContent: 'space-between' }}>
                <Appbar.Action
                    onPress={_goBack}
                    icon={() => (
                        <IconElement name="chevron-left" type="feather" color={ptColor.black} size={18 * WIDTH_SCALE} />
                    )}
                    color={ptColor.black}
                    size={24}
                />
                <Text style={{ fontSize: 18 * WIDTH_SCALE }}></Text>
                <View style={{ width: '10%' }} />
            </Appbar.Header>
        )
    }

    const exitPlayer = async () => {
        try {
            await TrackPlayer.stop();
        } catch (error) {
            console.error('exitPlayer', error);
        }
    };
    const goNext = async () => {
        slider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
        await TrackPlayer.play();
        TrackPlayer.skipToNext();
    };
    const goPrv = async () => {
        slider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
        await TrackPlayer.play();
    };

    const renderItem = ({ index, item }) => {
        return (
            <Animated.View
                style={{
                    alignItems: "center",
                    width: width,
                    transform: [
                        {
                            translateX: Animated.multiply(
                                Animated.add(position, -index),
                                -100
                            ),
                        },
                    ],
                }}
            >
                <Animated.Image
                    source={{ uri: item.artwork }}
                    style={{ width: 300, height: 250, borderRadius: 5 }}
                />
            </Animated.View>
        );
    };

    return (
        <SafeAreaView >
            <Header />
            <SafeAreaView style={styles.container}>
                <SafeAreaView style={{ height: 250 }}>
                    <Animated.FlatList
                        ref={slider}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        data={musicData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                    />
                </SafeAreaView>
                <View>
                    <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{musicData[songIndex].title}</Text>
                    <Text style={styles.artist} ellipsizeMode='tail' numberOfLines={1}>{musicData[songIndex].artist}</Text>
                </View>

                <SliderComp />
                <Controller onNext={goNext} onPrv={goPrv} />
            </SafeAreaView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        textTransform: 'capitalize',
        color: '#000',
    },
    artist: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000',
        textTransform: 'capitalize',
    },
    container: {
        justifyContent: 'space-evenly',
        height: height,
        maxHeight: 600,
        alignItems: 'center',
    },
});