import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Picker,
    ToastAndroid,
    ProgressBarAndroid,
} from 'react-native';
import {
    WIDTH,
    HEIGHT,
    WIDTH_SCALE,
    HEIGHT_SCALE,
} from '../../constants/constants';
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';

export interface PData  {
    id: String
}




const url =
    'https://r7---sn-42u-nbosl.googlevideo.com/videoplayback?expire=1602357368&ei=GLSBX5L7L8WYvgTexJmYCA&ip=128.199.92.238&id=o-AJ6BSXXjbM3WIZfn4XV6Gta1f0RQ0cNAUKzRK_J09dJj&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=428472856&ratebypass=yes&dur=5250.983&lmt=1595593160316501&fvip=3&fexp=23915654&c=WEB&txp=5531422&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAKHRVVmY51zQ6DVX7GXimp7q25sTrUMg-4DQrcn1rXmpAiByKOchAgoTAbZzl-byjghyVvYT5XZDKqML09I7O08KyQ==&title=best-music-2020-mix-best-of-edm-best-gaming-music-trap-rap-bass-dubstep-electro-house&redirect_counter=1&rm=sn-nposk7s&req_id=da3084b38f60a3ee&cms_redirect=yes&ipbypass=yes&mh=s7&mip=58.186.197.29&mm=31&mn=sn-42u-nbosl&ms=au&mt=1602335690&mv=m&mvi=7&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgC_T7a0WqiNH8hRF3i8odyfP8Y5ijtDlcBUMta0JR_hQCIDEGasPf8tAihzfwpAOHRRHOu_Lnu7OU9o9sixWHHUy2';

export default class Player extends React.PureComponent<PData> {
    constructor(props) {
        super(props);

        // init state variables
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            pickerValueHolder: '1.0',
            pausedText: false,
            hideControls: false,
        };

        this.video = Video;
    }

    // load video event
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    // video is playing
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    // video ends
    onEnd = () => {
        this.setState({ paused: true, pausedText: 'Play' });
        this.video.seek(0);
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return (
                parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
            );
        }
        return 0;
    }

    onChangeRate(itemValue, itemIndex) {
        var rate = parseFloat(itemValue);
        this.setState({ pickerValueHolder: itemValue, rate: rate });
    }

    // pressing on 'play' button
    onPressBtnPlay() {
        var playVideo = false;
        if (!this.state.paused) {
            playVideo = true;

            // always show controls
            if (this.timeoutHandle) clearTimeout(this.timeoutHandle);
        } else {
            playVideo = false;

            // hide controls after 5s
            this.timeoutHandle = setTimeout(() => {
                this.setState({ hideControls: true });
            }, 5000);
        }
        this.setState({ paused: !this.state.paused, pausedText: playVideo });
    }

    // on press video event
    onPressVideo() {
        // showing controls if they don't show
        if (this.state.hideControls) {
            this.setState({ hideControls: false });
            this.timeoutHandle = setTimeout(() => {
                this.setState({ hideControls: true });
            }, 8000);
        }
    }

    // parse seconds to time (hour:minute:second)
    parseSecToTime(sec) {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const { id } = this.props
        console.log('id: ', id);
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.fullScreen}
                    onPress={() => this.onPressVideo()}>
                    <Video
                        ref={(ref: Video) => {
                            this.video = ref;
                        }}
                        /* For ExoPlayer */
                        source={{ uri: url }}
                        // source={require('./videos/tom_and_jerry_31.mp4')}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                        controls={true}
                        fullscreen={true}
                    />
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    playButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    controls: {
        opacity: 0.7,
        borderRadius: 5,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
        color: 'white',
    },
    playControl: {
        zIndex: 99,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    trackingControls: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        margin: 10 * WIDTH_SCALE,
        zIndex: 999,
        flexDirection: 'row'
    },
    generalControls: {
        flex: 1,
        zIndex: 999,
    },
});
