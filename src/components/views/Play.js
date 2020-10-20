import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert,
    Modal,
    BackHandler,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native'

import { Container, View, Button, Icon, List, ListItem } from 'native-base';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { onChange } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../../constants/constants'

interface PlayInterFacce {
    onChange: (value: Boolean) => {};
}

export default class Player extends PureComponent<PlayInterFacce> {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
    }


    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'cover',
        duration: 0.0,
        currentTime: 0.0,
        active: false,
        modalVisible: false,
        fullScreen: true,
    };

    onLoad(data) {
        this.setState({ duration: data.duration });
    }

    onProgress(data) {
        this.setState({ currentTime: data.currentTime });
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    renderRateControl(rate) {
        const isSelected = (this.state.rate == rate);

        return (
            <ListItem>
                <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
                    <Text style={{ fontWeight: isSelected ? "bold" : "normal" }}>
                        {rate}x
</Text>
                </TouchableOpacity>
            </ListItem>
        )
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode == resizeMode);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({ resizeMode: resizeMode })
            }}>
                <Text style={[styles.controlOption, {
                    fontWeight: isSelected ? "bold" :
                        "normal"
                }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    fullScreen = () => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation == 'LANDSCAPE') {
                Orientation.lockToPortrait();
                this.props.onChange(true)
            } else {
                Orientation.lockToLandscape();
                this.props.onChange(false)
            }
        });

    }

    backAction = () => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation == 'LANDSCAPE') {
                Orientation.lockToPortrait();
            }
        });
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    render() {
        const { modalVisible, paused } = this.state
        const url = `https://r7---sn-42u-nboss.googlevideo.com/videoplayback?expire=1603049159&ei=Z0KMX97vAcOSvQTKtYyoBw&ip=128.199.92.238&id=o-AG03LyW8iTnYSxbDQpHytaaRpS7-QZhnluMtVgPHJk-E&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=434815153&ratebypass=yes&dur=5250.983&lmt=1602936227702124&fvip=3&fexp=23915654&c=WEB&txp=5531422&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgEZOXbdOj_8tAYDxPoJdwJz1UnzH6wKmkkBnhCFDhkM8CIEKaHh9ytwqII_YJbfGcpF7D9NY6i3THRXNEM9Pm-Lae&title=best-music-2020-mix-best-of-edm-best-gaming-music-trap-rap-bass-dubstep-electro-house&redirect_counter=1&rm=sn-nposs7s&req_id=a764be79b145a3ee&cms_redirect=yes&ipbypass=yes&mh=s7&mip=113.23.111.154&mm=31&mn=sn-42u-nboss&ms=au&mt=1603029046&mv=m&mvi=7&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgDdmnQfQSo6Y9Ac00dYfff29ZVfndqubY8wsjnus_KA4CIQDtDlIpDbPXgMpj8CKVNJoXWuuUpCKwM7wrpyFe0c3A-A%3D%3D`
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />

                <Video source={{ uri: url }}
                    style={styles.fullScreen}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    resizeMode={this.state.resizeMode}
                    onLoad={this.onLoad}
                    onProgress={this.onProgress}
                    onEnd={() => { alert('Done!') }}
                    controls
                    repeat={true} />
                <View style={[{ left: 0 }, styles.rateControl]}>
                    <Button
                        transparent
                        onPress={() => {
                            this.fullScreen();
                        }}
                    >
                        <Icon type="FontAwesome5" name="compress" style={{
                            color: "#fff",
                            fontSize: 15
                        }} />
                    </Button>
                </View>
                <View style={styles.rateControl}>
                    <Button
                        transparent
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        <Icon type="FontAwesome5" name="ellipsis-v" style={{
                            color:
                                "#fff", fontSize: 15
                        }} />
                    </Button>
                </View>
                {/* <View style={styles.controls}>
<View style={styles.generalControls}>

<View style={styles.resizeModeControl}>
{this.renderResizeModeControl('cover')}
{this.renderResizeModeControl('contain')}
{this.renderResizeModeControl('stretch')}
</View>
</View>

<View style={styles.trackingControls}>
<View style={styles.progress}>
<View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
<View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
</View>
</View>
</View> */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.closeModal}>
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Icon name="close" />
                                </Button>
                            </View>
                            <View>
                                <Text style={{
                                    textAlign: 'center', fontWeight: 'bold'
                                }}>Play Rate</Text>
                                <List style={{
                                    flexDirection: 'row', justifyContent:
                                        'space-between', alignItems: 'center'
                                }}>
                                    {this.renderRateControl(0.25)}
                                    {this.renderRateControl(0.5)}
                                    {this.renderRateControl(1.0)}
                                    {this.renderRateControl(1.5)}
                                    {this.renderRateControl(2.0)}
                                </List>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * .6,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
        zIndex: 99999
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        // flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        right: 10
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    centeredView: {
        flex: 1,
        marginTop: '22%'
    },
    modalView: {
        width: '100%',
        padding: '5%',
        backgroundColor: "white",
        position: 'absolute',
        bottom: 10,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    closeModal: {
        alignItems: 'flex-end',
        margin: -10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});