
import React, { PureComponent } from 'react';
//Import React
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full 
import { WIDTH, WIDTH_SCALE, HEIGHT } from '../../constants/constants'
import { onChange } from 'react-native-reanimated';


interface PickItemProps {
  onChange: (value: Boolean) => {};
  typePlay?: Boolean

}

class App extends PureComponent<PickItemProps> {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
      video_id: 'https://r7---sn-8pxuuxa-nbozl.googlevideo.com/videoplayback?expire=1602765717&ei=Ne-HX8mZHYrV4-EP8K6BuAY&ip=128.199.92.238&id=o-ACkwMuOvTkOmnFIy6yMdkbEJ2AIl5_bo4PLvcMmS3-Do&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=428472856&ratebypass=yes&dur=5250.983&lmt=1595593160316501&fvip=3&fexp=9466588,23915654&beids=9466588&c=WEB&txp=5531422&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMfggt2DBIgWyWfwB-iZC5LBWrrCQ0j3v4zWwZAtPmyJAiBE35lLBdWKECF9b9masLqTEdmHGt_1UAfRE_YUfkh4Dg==&title=best-music-2020-mix-best-of-edm-best-gaming-music-trap-rap-bass-dubstep-electro-house&redirect_counter=1&rm=sn-nposk7s&req_id=8af79051c830a3ee&cms_redirect=yes&ipbypass=yes&mh=s7&mip=27.74.244.88&mm=31&mn=sn-8pxuuxa-nbozl&ms=au&mt=1602743928&mv=m&mvi=7&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgHJ9grhuXcMHLNVl4bnRVhUpIaIDz7co3fUCB8d2sUT0CIGr6VJT6mtUG7LAaL0xrot70nFy_iaSJ5Cq4ievBE8Et'
    };
  }

  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };

  onLoad = data => this.setState({ duration: data.duration, isLoading: false });

  onLoadStart = data => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => { };

  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });

  render() {
    const { onChange, typePlay } = this.props
    let typeVideo = typePlay

    const onFullScreen = () => {
      if (this.state.screenType == 'cover') {
        this.setState({ screenType: 'contain' })
        typeVideo = true
        onChange(true)
        console.log('type video ',typeVideo);
      } else {
        typeVideo=false
        this.setState({ screenType: 'cover' });
        onChange(false)
        console.log('type video ',typeVideo);
      }
    };
    return (
      <View style={{ width:WIDTH}} >
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={typeVideo}
          fullscreenOrientation={typeVideo}
          source={{ uri: this.state.video_id }}
          style={{ 
            width:WIDTH,
            height:typeVideo? HEIGHT: HEIGHT*0.4,
            backgroundColor:'red',
            alignItems:'center',
            justifyContent:'center'
           }}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    flex: 1,
    width: WIDTH
  },
});
export default App;
