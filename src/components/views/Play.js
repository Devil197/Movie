import React, { useState } from 'react'
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
import YouTube from 'react-native-youtube';

export default function Play({ video_Id }) {
  const [player, setPlayer] = useState(false)
  const [fullscreen, setFullCreen] = useState(false)
  const [containerWidth, setContainerWidth] = useState()
  const [onError, setOnError] = useState()
  const [isReady, setIsReady] = useState(false)
  const [status, setStatus] = useState()
  const [quality, setQuality] = useState()
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  return (
    <View style={{ flex: 1 }}>
      <YouTube
        ref={component => {
          this._youTubeRef = component;
        }}

        videoId={video_Id}
        play={player}
        fullscreen={fullscreen}
        controls={1}
        style={[
          {
            height: PixelRatio.roundToNearestPixel(
              containerWidth / (16 / 9)
            ),
          },
          styles.player,
        ]}
        onError={e => setOnError(e.error)}
        onReady={e => setIsReady(true)}
        onChangeState={e => setStatus(e.state)}
        onChangeQuality={e => setQuality(e.quality)}
        onChangeFullscreen={e =>
          setFullCreen(e.isFullscreen)
        }
        onProgress={e => {
          setDuration(e.duration)
          setCurrentTime(e.currentTime)
        }
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
})
