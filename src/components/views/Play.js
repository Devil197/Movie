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
import { set } from 'react-native-reanimated';
import YouTube, {
    YouTubeStandaloneIOS,
    YouTubeStandaloneAndroid,
} from 'react-native-youtube';
import {WIDTH_SCALE,HEIGHT_SCALE,WIDTH,HEIGHT} from '../../constants/constants'
const Play = ({_id}) =>{

    const [isReadly, setIsReadly] = useState(false);
    const [status, setStatus] = useState(null);
    const [quality, setQuality] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLooping, setIsLooping] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);
    const [containerMounted, setContainerMounted] = useState(false);
    const [containerWidth, setContainerWidth] = useState();



    return (
        <View style={styles.container}>
              {containerMounted && (
        //    <YouTube
        //         ref={component => {
        //             this._youTubeRef = component    }}
        //         // You must have an API Key for the player to load in Android
        //         apiKey="YOUR_API_KEY"  
        //         // Un-comment one of videoId / videoIds / playlist.
        //         // You can also edit these props while Hot-Loading in development mode to see how
        //         // it affects the loaded native module
        //         videoId={_id}
        //         // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}  
        //         // playlistId="PLF797E961509B4EB5"
        //         play={isPlaying}
        //         loop={isLooping}
        //         fullscreen={fullscreen}
        //         controls={1}
        //         style={[
        //             {
        //                 height: PixelRatio.roundToNearestPixel(
        //                     containerWidth / (16 / 9)
        //                 ),
        //             },
        //             styles.player,
        //         ]}
        //         onError={e => setError(e.error)}
        //         onReady={e => setisReady(true)}
        //         onChangeState={e => setStatus(e.state)}
        //         onChangeQuality={e => setQuality(e.quality)}
        //         onChangeFullscreen={e =>
        //           setFullscreen(e.isFullscreen)
        //         }
        //         onProgress={e =>
        //             setDuration(e.duration),
        //             setCurrentTime(e.currentTime)
        //         }
        //     />
        <YouTube
            videoId="KVZ-P-ZI6W4" // The YouTube video ID
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={e => setIsReadly(true)}
            onChangeState={e => setStatus(e.state)}
            onChangeQuality={e => setQuality(e.quality)}
            onError={e => setError(e.error)}
            style={{ alignSelf: 'stretch', height: 300 }}
/>
            )}
        </View>
    )
    
}
export default Play;
const styles = StyleSheet.create({
    container:{
        width: WIDTH,
        height: 200* HEIGHT_SCALE,
    },
    player: {
        alignSelf: 'stretch',
        marginVertical: 10,
    },
})
