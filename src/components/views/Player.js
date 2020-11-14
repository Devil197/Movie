import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { WIDTH, HEIGHT } from '../../constants/constants';

const Player = React.memo(({ url, fullScreen, height }) => {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [full, setFull] = useState(false);
  //   const onStateChange = useCallback((state) => {
  //     if (state === 'ended') {
  //       setPlaying(false);
  //       Alert.alert('video has finished playing!');
  //     }
  //   }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <YoutubePlayer
      ref={videoRef}
      // height={full ? HEIGHT : HEIGHT * 0.3}
      height={height}
      play={playing}
      videoId={url}
    // onFullScreenChange={(e) => {
    //   fullScreen(!e);
    //   setFull(e);
    // }}
    />
  );
});
export default Player;
