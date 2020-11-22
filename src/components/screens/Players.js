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
// import songs from "../../constants/data/song";
import SliderComp from "../views/SliderComp";
import Controller from '../views/Controller';
const { width, height } = Dimensions.get("window");

export default function Players({ navigation, route }) {
    function Header() {
        const _goBack = () => navigation.goBack();
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
                <Text style={{ fontSize: 18 * WIDTH_SCALE }}>Setting</Text>
                <View style={{ width: '10%' }} />
            </Appbar.Header>
        )
    }

    const scrollX = useRef(new Animated.Value(0)).current;

    const slider = useRef(null);
    const [songIndex, setSongIndex] = useState(0);
    const isPlayerReady = useRef(false);
    // for tranlating the album art
    const position = useRef(Animated.divide(scrollX, width)).current;

    const isItFromUser = useRef(true);
    const playbackState = usePlaybackState();
    const { index, songs } = route.params
    useEffect(() => {

        scrollX.addListener(({ value }) => {
            const val = Math.round(value / width);

            setSongIndex(val);
        });
        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (e) => {
            console.log('8888 -> e : ', e);
        })
        TrackPlayer.setupPlayer().then(async () => {
            console.log('Player Ready');
            await TrackPlayer.reset();
            await TrackPlayer.add(songs);
            isPlayerReady.current = true;
            // TrackPlayer.play()
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
    // useEffect(() => {
    //     // position.addListener(({ value }) => {
    //     //   console.log(value);
    //     // });

    //     scrollX.addListener(({ value }) => {
    //         const val = Math.round(value / width);

    //         setSongIndex(val);
    //     });

    //     TrackPlayer.setupPlayer().then(async () => {
    //         // The player is ready to be used
    //         console.log('Player ready');
    //         // add the array of songs in the playlist
    //         await TrackPlayer.reset();
    //         await TrackPlayer.add(songs);
    //         TrackPlayer.play();
    //         isPlayerReady.current = true;

    //         await TrackPlayer.updateOptions({
    //             stopWithApp: false,
    //             alwaysPauseOnInterruption: true,
    //             capabilities: [
    //                 Capability.Play,
    //                 Capability.Pause,
    //                 Capability.SkipToNext,
    //                 Capability.SkipToPrevious,
    //             ],
    //         });
    //         //add listener on track change
    //         TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (e) => {
    //             console.log('song ended', e);

    //             const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id

    //             console.log('track id', trackId, 'index', index.current);

    //             if (trackId !== index.current) {
    //                 setSongIndex(trackId);
    //                 isItFromUser.current = false;

    //                 if (trackId > index.current) {
    //                     goNext();
    //                 } else {
    //                     goPrv();
    //                 }
    //                 setTimeout(() => {
    //                     isItFromUser.current = true;
    //                 }, 200);
    //             }

    //             // isPlayerReady.current = true;
    //         });

    //         //monitor intterupt when other apps start playing music
    //         TrackPlayer.addEventListener(Event.RemoteDuck, (e) => {
    //             // console.log(e);
    //             if (e.paused) {
    //                 // if pause true we need to pause the music
    //                 TrackPlayer.pause();
    //             } else {
    //                 TrackPlayer.play();
    //             }
    //         });
    //     });

    //     return () => {
    //         scrollX.removeAllListeners();
    //         TrackPlayer.destroy();

    //         // exitPlayer();
    //     };
    // }, []);
    // useEffect(() => {
    //     if (isPlayerReady.current && isItFromUser.current) {
    //         TrackPlayer.skip(songs[songIndex].id)
    //             .then((_) => {
    //                 console.log('changed track');
    //             })
    //             .catch((e) => console.log('error in changing track ', e));
    //     }
    //     index.current = songIndex;
    // }, [songIndex]);
    useEffect(() => {
        if (isPlayerReady.current) {
            TrackPlayer.skip(songs[songIndex].id)
        }

    }, [songIndex]);
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
    };
    const goPrv = async () => {
        slider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
        await TrackPlayer.play();
    };
    // const goNext = async () => {
    //     slider.current.scrollToOffset({
    //         offset: (index.current + 1) * width,
    //     });

    //     await TrackPlayer.play();
    // };
    // const goPrv = async () => {
    //     slider.current.scrollToOffset({
    //         offset: (index.current - 1) * width,
    //     });

    //     await TrackPlayer.play();
    // };

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
                    source={{ uri: item.thumb }}
                    style={{ width: 320, height: 320, borderRadius: 5 }}
                />
            </Animated.View>
        );
    };

    return (
        <SafeAreaView >
            <Header />
            <SafeAreaView style={styles.container}>
                <SafeAreaView style={{ height: 320 }}>
                    <Animated.FlatList
                        ref={slider}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        data={songs}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                    />
                </SafeAreaView>
                <View>
                    <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{songs[songIndex].title}</Text>
                    <Text style={styles.artist}>{songs[songIndex].id}</Text>
                </View>
                <SliderComp />
                <Controller onNext={goNext} onPrv={goPrv} />
            </SafeAreaView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
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