import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import {
    WIDTH_SCALE,
    HEIGHT_SCALE,
    WIDTH,
    HEIGHT,
    STATUS_BAR_CURRENT_HEIGHT,
    HEADER_HEIGHT,
} from '../../constants/constants';
export default function Controller({ onNext, onPrv }) {
    const playbackState = usePlaybackState();
    const [isPlaying, setIsPlaying] = useState('paused')
    useEffect(() => {
        if (playbackState === 3 || playbackState === "playing") {
            setIsPlaying('playing')
        } else if (playbackState === 2 || playbackState === "paused") {
            setIsPlaying('paused')
        } else {
            setIsPlaying('loading')
        }
    }, [playbackState])

    const renderPlayPauseBtn = () => {
        switch (isPlaying) {
            case 'playing':
                return <Icon name="pause" size={45} />
            case 'paused':
                return <Icon name="play-arrow" size={45} />

            default:
                return <ActivityIndicator size={45} color="#353b48" />
        }
    }
    const onPlayPause = () => {

        // console.log('222222 -> state: ', playbackState);
        if (playbackState === 3 || playbackState === "playing") {
            TrackPlayer.pause()
        } else if (playbackState === 2 || playbackState === "paused") {
            TrackPlayer.play()
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPrv}>
                <Icon name="skip-previous" size={45} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayPause}>
                {renderPlayPauseBtn()}

            </TouchableOpacity>
            <TouchableOpacity onPress={onNext}>
                <Icon name="skip-next" size={45} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 0.6 * WIDTH
    },
});