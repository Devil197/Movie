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

import TrackPlayer, { Event } from 'react-native-track-player';
// import songs from "../../constants/data/song";
import Controller from "./Controller";

const { width, height } = Dimensions.get("window");

export default function Players({ songs }) {
    const scrollX = useRef(new Animated.Value(0)).current;

    const slider = useRef(null);
    const [songIndex, setSongIndex] = useState(0);
    const isPlayerReady = useRef(false);
    // for tranlating the album art
    const position = useRef(Animated.divide(scrollX, width)).current;

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
        });

        return () => {
            scrollX.removeAllListeners();
        };
    }, []);

    useEffect(() => {
        if (isPlayerReady) {
            TrackPlayer.skip(songs[songIndex].id)
        }

    }, [songIndex]);

    const goNext = () => {
        slider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    };
    const goPrv = () => {
        slider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
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
                    source={{ uri: item.thumb }}
                    style={{ width: 100, height: 100, borderRadius: 5 }}
                />
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={{ height: 100 }}>
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

            <Controller onNext={goNext} onPrv={goPrv} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        textAlign: "center",
        textTransform: "capitalize",
    },
    artist: {
        fontSize: 18,
        textAlign: "center",
        textTransform: "capitalize",
    },
    container: {
        flex: 1,
    },
});