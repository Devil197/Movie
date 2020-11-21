import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import {
    height,
    HEIGHT,
    HEIGHT_SCALE,
    WIDTH,
    WIDTH_SCALE,
} from '../../constants/constants';

const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
}

export default function SliderComp() {
    const { position, duration } = useProgress();
    const handleChange = (val) => {
        console.log(val);
        TrackPlayer.seekTo(val)

    }
    return (
        <View>
            <Slider
                style={{ width: 0.9 * WIDTH, height: 0.03 * HEIGHT, marginHorizontal: 10 * WIDTH_SCALE }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor="#353b48"
                maximumTrackTintColor="#000000"
                onSlidingComplete={handleChange}
                thumbTintColor='#353b48'
            />
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{formatTime(position)}</Text>
                <Text style={styles.timer}>{formatTime(duration)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timer: {
        fontSize: 16,
    },
})
