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

import { getFullMovie } from '../../Redux/actions/movieAction'
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT } from '../../constants/constants'
import Icon from 'react-native-vector-icons/Ionicons';

import { MySpinner,MyHighLightButton } from '../views';
import { ROUTE_KEY } from '../../constants/constants';
import {Play, Player} from '../views';
import {ptColor} from '../../constants/styles';
import Orientation from 'react-native-orientation';
import Header from '../views/HeaderMovie';
export default function Details({ navigation, route }) {
    // video ====
    const [height, setHeight] = useState();
    const [trailer, setTrailer] = useState('')

    //=====
    const _id = route.params._id;
    console.log("hhh", _id);
    const [dataMovie, setDataMovie] = useState();
    const [loading, setLoading] = useState(true);
    const [fullScreen, setFullScreen] = useState(false);
    const url = 'aF8U_uSsXSA';
    const initial = Orientation.getInitialOrientation();
    useEffect(() => {
        MySpinner.show();
        getFullMovie(_id).then((fullMovie) => {

            console.log('0001 ', fullMovie);
            setDataMovie(fullMovie);
            console.log('trailer : ', fullMovie.movie[0].trailer);
            setTrailer(fullMovie?.movie[0]?.trailer)
            setLoading(false);
        }).catch((err) => console.log("Failed", err))

    }, [])
    console.log("yyyyy", dataMovie?.movie[0].trailer)
    if (loading) {
        MySpinner.show();
        return (
            <View style={{ flex: 1, width: WIDTH, height: HEIGHT, position: 'absolute', zIndex: 9999 }} />
        )
    } else {
        MySpinner.hide()
    }

    const onFullScreen = (fullScreen) => {
        if (fullScreen) {
          Orientation.lockToPortrait();
          setFullScreen(false);
        } else {
          Orientation.lockToLandscape();
          setFullScreen(true);
        }
      };

    return (
        <ScrollView style={styles.container}>
                <Header
                    backdrop={dataMovie?.movie[0].cover_img}
                    poster={dataMovie?.movie[0].cover_img}
                    title={dataMovie?.movie[0].name}
                    genres={dataMovie?.category[0]?.name}
                    release_date={dataMovie?.movie[0].duration}
                    runtime={dataMovie?.movie[0].episode}
                    status={dataMovie?.movie[0].status}
                    vote_average={3 * 10}
                    directer = {dataMovie?.movie[0].directer}
                />
                {/* <MyHighLightButton style={styles.boxHeader} onPress={()=> navigation.goBack()}>
                    <Icon name="chevron-back" size={30} color="#fff" />
                    <Text style={{ color: '#fff' }}>Back</Text>
                </MyHighLightButton> */}

                {/* <View style={styles.header1}>
                  
                </View> */}

             
                {/* {!fullScreen ? ( */}
                    <View style={{marginTop: 0, flex: 3}}>
                {/* <View style={styles.header2}>

                    <Image source={{ uri: dataMovie?.movie[0].cover_img }} style={styles.imageHeader} />

                    <View style={styles.boxContent}>
                        <Text style={{ fontWeight: 'bold' }}>{dataMovie?.movie[0].name}</Text>
                        <Text>{dataMovie?.category[0]?.name}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="ios-calendar-outline" size={20} color="#000" />
                            <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].duration}</Text>
                        </View>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].directer}</Text>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].country}</Text>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].episode}</Text>
                        <Text style={{ marginLeft: 5 * WIDTH_SCALE }}>{dataMovie?.movie[0].status}</Text>
                        <MyHighLightButton style={{marginTop:10*WIDTH_SCALE, width: 80 * WIDTH_SCALE, height: 40 * WIDTH_SCALE, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center',borderRadius:15*WIDTH_SCALE }} onPress={() => navigation.push(ROUTE_KEY.Videos, { _id: _id })}>
                            <Text style={{color:'white'}}>Xem Phim</Text>
                        </MyHighLightButton>
                    </View>

                </View> */}

            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Overview</Text>
                <Text style={{ margin: 10 * WIDTH_SCALE }}>{dataMovie?.movie[0].introduction}</Text>
            </View>

            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Cast</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {dataMovie?.cast.map((c, i) => {
                        return (
                            <MyHighLightButton style={styles.touchopa}>
                                <Image source={{ uri: c.cover_img }} style={styles.imageCast} />
                                <Text color="#333">{c.name}</Text>
                            </MyHighLightButton>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Trailer</Text>
                <View style={styles.header1}>
                    <Player url={url} fullScreen={onFullScreen} />  
                </View>
                
            </View>
            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', color: '#e55039', margin: 10 * WIDTH_SCALE }}>Phim liên quan : </Text>

            </View>
            </View>
               {/* ) : null} */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c8d6e5',
    },
    // header
    boxHeader: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 40 * WIDTH_SCALE,
        left: 20 * WIDTH_SCALE,
        zIndex: 1,
    },
    imageHeader: {
        width: 0.42 * WIDTH,
        height: 0.26 * HEIGHT,
        margin: 5 * WIDTH_SCALE

    },
    header1: {
        width: WIDTH,
        height: 0.28 * HEIGHT,
        backgroundColor: '#222f3e',
        flex: 1,
        margin: 0,
        overflow: 'hidden',
        backgroundColor: ptColor.divider,
    },
    header2: {
        width: WIDTH,
        height: 200 * HEIGHT_SCALE,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    boxContent: {
        width: WIDTH - 200,
        alignItems: 'flex-start',
        paddingLeft: 30 * WIDTH_SCALE,
    },
    //content 
    content: {
        backgroundColor: '#fff',
        marginTop: 5 * WIDTH_SCALE,
    },
    //cast
    touchopa: {
        margin: 5 * WIDTH_SCALE,
    },
    imageCast: {
        width: 150 * WIDTH_SCALE,
        height: 200 * HEIGHT_SCALE,
    }
})
