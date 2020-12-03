import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, BackHandler } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from 'react-native-orientation'
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants'
import ViewPager from '@react-native-community/viewpager';
import { Card } from "react-native-paper";
import { getVideoByMovie, getMovieById } from '../../Redux/actions/movieAction'
import { pFonts, ptColor } from '../../constants/styles'
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { MyHighLightButton, MySpinner } from "../views";
import { addHistoryByMovieId } from '../../Redux/actions/historyAction'
import { useDispatch, useSelector } from 'react-redux';
import { REDUX } from "../../Redux/store/types";
const itemWidth = 40 * WIDTH_SCALE

export default function Video({ navigation, route }) {
  const dispatch = useDispatch()
  const userRedux = useSelector((state) => state.userReducer)
  const viewPagerRef = useRef()
  const _id = route.params?._id
  console.log('0909 _id', _id)
  const [playing, setPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [data, setData] = useState([])
  const [movie, setMovie] = useState([])
  const [index, setIndex] = useState(0)
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  useEffect(() => {
    async function initDataVideo() {
      await getMovieById(_id).then(res => {
        setMovie(res?.items)
        console.log('0909 data movie video ', res);
      }).catch(err => console.log('0909 err movie video ', err))

      await getVideoByMovie(_id).then(res => {
        console.log('0909 data video', res)
        setData(res?.items)
      }).catch(err => console.log('0909 err api video ', err))
    }
    // BackHandler.addEventListener("hardwareBackPress", outVideo());
    initDataVideo()
    return () => {
      Orientation.lockToPortrait();
      // BackHandler.removeEventListener("hardwareBackPress", outVideo());
    }
  }, [])

  const onScrollViewPager = useCallback((state) => {
    console.log('9999', state);
  })

  async function outVideo(type) {
    console.log('0808 data', data);
    const newHistory = {
      movie_id: _id,
      video_id: data[index]?._id,
      user_id: userRedux?.userInfo?._id,
      duration: 0
    }
    console.log('0808 history ', newHistory);
    if (type === 'playing') {
      await addHistoryByMovieId(newHistory).then(res => console.log(res)).catch(err => console.log(err))
    }

  }



  return (
    <ViewPager style={{ flex: 1, overflow: 'hidden', backgroundColor: null }} initialPage={0} orientation={'horizontal'}
      showPageIndicator={true}
      ref={viewPagerRef}

    >
      <View key={1} style={{ flex: 1 }}>
        <View style={{ borderBottomLeftRadius: 10 * WIDTH_SCALE, borderBottomRightRadius: 10 * WIDTH_SCALE, margin: 0 }}>
          <YoutubePlayer
            height={isFullScreen ? HEIGHT : 240 * WIDTH_SCALE}
            width={WIDTH}
            play={playing}
            onReady={(e) => console.log('0808 e', e)}
            onPlaybackRateChange={(e) => console.log('0808 play e', e)}
            onPlaybackQualityChange={(e) => console.log('0808 play change ', e)}
            videoId={data[index]?.link}
            onChangeState={onStateChange}
            showClosedCaptions={false}
            preventFullScreen={false}
            onReady={(e) => console.log('0808 onReady', e)}
            onChangeState={(e) => outVideo(e)}
            onError={() => Alert.alert('Cảnh Báo', 'Tập phim hiện tại đã bị xóa hoặc hiện tại không thể xem !')}
            onFullScreenChange={(e) => {
              console.log('1001 fullscreen ', e);
              if (e) {
                setIsFullScreen(e)
                Orientation.lockToLandscape()

              } else {
                setIsFullScreen(e)
                Orientation.lockToPortrait()
              }

            }}
          />
        </View>

        {isFullScreen ?
          null
          :
          <ScrollView style={{ marginTop: 0 }}>
            <View style={{ margin: 10 * WIDTH_SCALE, backgroundColor: 'white', padding: 10 * WIDTH_SCALE }}>
              <Text
                style={{
                  ...pFonts.text,
                  fontSize: 20 * WIDTH_SCALE
                }}
              >{movie?.name + '\n'}Tập {data[index]?.position}</Text>
              <Text style={{ ...pFonts.contentText }}>
                Thời gian : {movie?.duration} phút
              </Text>
              <Text>
                Ngôn ngữ : {movie.language ? movie.language : 'không'}
              </Text>
              {/* <Text
                ellipsizeMode={'head'}
                style={{ ...pFonts.desText, marginBottom: 10 * WIDTH_SCALE, marginTop: 5 * WIDTH_SCALE }}>
                {movie?.introduction}
              </Text> */}
            </View>
            <View style={{ margin: 10 * WIDTH_SCALE, marginTop: 5 * WIDTH_SCALE, backgroundColor: 'white', padding: 10 * WIDTH_SCALE }}>
              <Text
                style={{
                  ...pFonts.text,
                  fontSize: 20 * WIDTH_SCALE
                }}
              >
                Danh Sách Tập
              </Text>
              <ScrollView style={{}}>
                <View style={{ flexDirection: 'row', marginBottom: HEIGHT * 0.1 }} >
                  <FlatList
                    data={data}
                    renderItem={(item, i) => {
                      console.log('0909 item', item);
                      return (
                        <MyHighLightButton
                          onPress={() => {
                            MySpinner.show()
                            setIndex(item.index)
                            setTimeout(() => {
                              MySpinner.hide()
                            }, 1000 * 0.5)
                          }
                          }
                          style={{ width: itemWidth, height: itemWidth, backgroundColor: item.index === index ? '#3b91f3' : ptColor.appColorHover, margin: 5 * WIDTH_SCALE, alignContent: 'center', justifyContent: 'center' }}>
                          <Text style={{ textAlign: 'center', color: item.index === index ? ptColor.white : ptColor.appColor }}>
                            {item.item?.position}
                          </Text>
                        </MyHighLightButton>
                      )
                    }
                    }
                    keyExtractor={item => item._id}
                    numColumns={7}
                  />
                </View>

              </ScrollView>
            </View>
          </ScrollView>
        }

      </View>
      <View key={2} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>chức năng bổ sung (comment)</Text>
      </View>

    </ViewPager >
  );
}