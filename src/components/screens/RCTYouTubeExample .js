/*This is an Example of YouTube integration in React Native*/
import React from 'react';
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
import YouTube, {
    YouTubeStandaloneIOS,
    YouTubeStandaloneAndroid,
} from 'react-native-youtube';
import ShowMore from 'react-native-show-more-button';
import { Avatar } from 'react-native-paper';
// import keyAPI
import api_key from '../../Config/keyapi'
// firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default class RCTYouTubeExample extends React.Component {
    state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: true,
        isLooping: true,
        duration: 0,
        currentTime: 0,
        fullscreen: false,
        containerMounted: false,
        containerWidth: null,
        // data
        key: this.props.route.params.videoId,
        title: this.props.route.params.title,
        time: this.props.route.params.time,
        channelTitle: this.props.route.params.channelTitle,
        description: this.props.route.params.description,
        channelId: this.props.route.params.channelId,
        data: null,
        userID: '',
    };
    componentDidMount() {
        this.readdataVCS();
        this.getUserInfo();
    }

    getUserInfo = async () => {
        try {
            let userInfo = await auth().currentUser;
            this.setState({ userID: userInfo.uid });
            if (this.state.userID != null) {
                this.addStory();
            }
        } catch (error) {
            console.log('failxxxxxxxxxxxxx');
        }
    }

    // lịch sử
    addStory() {
        database().ref('/History/' + this.state.userID).push().set({
            userID: this.state.userID,
            videoID: this.state.key,
            title: this.state.title, 
            channelId:this.state.channelId,
            description: this.state.description,
            time: this.state.time,
            channelTitle: this.state.channelTitle,
        });
    }

    readdataVCS() {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.state.channelId}&key=` + api_key.key)
            .then(res => res.json())
            .then(data => {
                this.setState({ data: data.items });
            })
    }
    render() {
        return (
            <ScrollView
                style={styles.container}
                onLayout={({
                    nativeEvent: {
                        layout: { width },
                    },
                }) => {
                    if (!this.state.containerMounted)
                        this.setState({ containerMounted: true });
                    if (this.state.containerWidth !== width)
                        this.setState({ containerWidth: width });
                }}>
                {this.state.containerMounted && (
                    <YouTube
                        ref={component => {
                            this._youTubeRef = component;
                        }}
                        // You must have an API Key for the player to load in Android
                        apiKey="YOUR_API_KEY"
                        // Un-comment one of videoId / videoIds / playlist.
                        // You can also edit these props while Hot-Loading in development mode to see how
                        // it affects the loaded native module
                        videoId={this.state.key}
                        // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
                        // playlistId="PLF797E961509B4EB5"
                        play={this.state.isPlaying}
                        loop={this.state.isLooping}
                        fullscreen={this.state.fullscreen}
                        controls={1}
                        style={[
                            {
                                height: PixelRatio.roundToNearestPixel(
                                    this.state.containerWidth / (16 / 9)
                                ),
                            },
                            styles.player,
                        ]}
                        onError={e => this.setState({ error: e.error })}
                        onReady={e => this.setState({ isReady: true })}
                        onChangeState={e => this.setState({ status: e.state })}
                        onChangeQuality={e => this.setState({ quality: e.quality })}
                        onChangeFullscreen={e =>
                            this.setState({ fullscreen: e.isFullscreen })
                        }
                        onProgress={e =>
                            this.setState({
                                duration: e.duration,
                                currentTime: e.currentTime,
                            })
                        }
                    />
                )}
                <View style={styles.Description}>
                    <Text style={styles.titleVideo} numberOfLines={4}>{this.state.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Avatar.Image size={30} source={{ uri: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-0/p206x206/97529486_597107687827917_3257644346538721280_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=ebaRmTB9vasAX8AZBBe&_nc_ht=scontent.fsgn5-5.fna&_nc_tp=6&oh=3917edef1391705df705f85f8d99de25&oe=5F427C97' }} style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                        <Text style={styles.channelTitle}>{this.state.channelTitle}</Text>
                    </View>
                    <ShowMore height={0} buttonColor={"#0048ff"} showMoreText="HIỂN THỊ THÊM" showLessText="ẨN BỚT">
                        <Text>{this.state.description}</Text>
                    </ShowMore>

                    <FlatList
                        vertical
                        showsHorizontalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.imageBg}
                                    onPress={() => this.props.navigation.navigate('VideoScreen', { videoId: item.id.videoId, title: item.snippet.title, time: item.snippet.publishedAt, channelTitle: item.snippet.channelTitle, description: item.snippet.description })}
                                >
                                    <Image source={{ uri: `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg` }}
                                        style={styles.itemImage} />
                                    <View>
                                        <View>
                                            <Text style={styles.itemName} numberOfLines={2}>{item.snippet.title}</Text>
                                            <Text style={styles.itemChannel}>{item.snippet.channelTitle}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}
const W = Dimensions.get('window').width
const H = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'blue',
    },
    buttonTextSmall: {
        fontSize: 15,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    player: {
        alignSelf: 'stretch',
        marginVertical: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    Description: {
        padding: 10,
        backgroundColor: '#fff',
    },
    linearGradient: {
        height: H,
    },
    titleVideo: {
        fontSize: 21,
        fontWeight: '700',
    },
    channelTitle: {
        marginBottom: 20,
        paddingTop: 20,
        fontSize: 18,
        marginLeft: 10,
        color: 'gray'
    },
    linearGradient: {
        height: H,
    },
    imageBg: {
        flex: 1,
        overflow: 'hidden',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    itemImage: {
        width: (W),
        height: 220,
        backgroundColor: '#EEEEEE',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        width: W - 20
    },
    itemDescription: {
        color: '#eee',
        fontWeight: '600',
        fontSize: 14,
    },
});