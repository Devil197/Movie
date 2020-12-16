import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, BackHandler, Picker } from "react-native";
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
import { TextInput } from "react-native";
import { _getAllChat } from '../../Redux/actions/chatAction'
import Icons from 'react-native-vector-icons/Feather'
import { Image } from "react-native";

const itemWidth = 40 * WIDTH_SCALE

export default function Video({ navigation, route }) {
  const dispatch = useDispatch()
  const userRedux = useSelector((state) => state.userReducer)
  const viewPagerRef = useRef()
  const _id = route.params?._id
  const [playing, setPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [data, setData] = useState([])
  const [movie, setMovie] = useState([])
  const [index, setIndex] = useState(0)
  const [chat, setChat] = useState()
  const [chatData, setChatData] = useState()
  const [inputHeight, setInputHeight] = useState(0)
  const [selectedValue, setSelectedValue] = useState(1)

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
      }).catch(err => console.log('0909 err movie video ', err))

      await getVideoByMovie(_id).then(res => {
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

  useEffect(() => {
    //API
    handleChatAPI_getAll();
  }, [])

  const handleChatAPI_getAll = async () => {
    await _getAllChat(_id).then(res => {
      setChatData(res?.data);
    })
  }

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

  const getProfileImage = (_id) => {
    return `https://graph.facebook.com/v9.0/${_id}/picture`
  }

  const ChatData = () => {
    return (
      chatData !== undefined
        ? chatData.map((val, ind) => {
          console.log(val);
          return (
            <View
              key={ind}
              style={{
                width: '100%',
              }}>

              <View
                style={{
                  flexDirection: 'row',
                }}>

                <View
                  style={{
                    flex: 1.2,
                  }}>
                  <Image
                    style={{
                      borderRadius: 25,
                      height: 50,
                      width: 50,
                    }}
                    source={{
                      uri: val?.userinfo?.fb_id
                        ? getProfileImage(val?.userinfo?.fb_id)
                        : val?.userinfo?.gg_img
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 2.8,
                  }}>

                  <Text>
                    {val?.userinfo?.fb_name
                      ? val?.userinfo?.fb_name
                      : val?.userinfo?.gg_name}
                  </Text>

                </View>

              </View>

            </View>
          )
        })
        : <Text>Chưa có bình luận nào!</Text>
    )
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
            <View
              style={{
                margin: 10 * WIDTH_SCALE,
                backgroundColor: 'white',
                padding: 10 * WIDTH_SCALE
              }}>
              <Text
                style={{
                  ...pFonts.text,
                  fontSize: 20 * WIDTH_SCALE,
                  marginBottom: 15 * WIDTH_SCALE,
                }}
              >
                TẬP PHIM
              </Text>
              <View style={{ flexDirection: 'row', marginBottom: HEIGHT * 0.1 }} >
                <FlatList
                  data={data}
                  renderItem={(item, i) => {
                    return (
                      <MyHighLightButton
                        onPress={() => {
                          MySpinner.show()
                          setIndex(item.index)
                          setTimeout(() => {
                            MySpinner.hide()
                          }, 1000 * 0.5)
                        }}
                        style={{
                          width: itemWidth,
                          height: itemWidth,
                          backgroundColor: item.index === index ? '#3b91f3' : ptColor.appColorHover,
                          margin: 5 * WIDTH_SCALE,
                          alignContent: 'center',
                          justifyContent: 'center'
                        }}>
                        <Text style={{ textAlign: 'center', color: item.index === index ? ptColor.white : ptColor.appColor }}>
                          {item.item?.position}
                        </Text>
                      </MyHighLightButton>
                    )
                  }}
                  keyExtractor={item => item._id}
                  numColumns={7}
                />
              </View>
            </View>
            <View style={{ margin: 10 * WIDTH_SCALE, marginTop: 5 * WIDTH_SCALE, backgroundColor: 'white', padding: 10 * WIDTH_SCALE }}>
              <Text
                style={{
                  ...pFonts.text,
                  fontSize: 20 * WIDTH_SCALE,
                  marginBottom: 25 * WIDTH_SCALE,
                  borderBottomWidth: 0.5,
                  borderBottomColor: ptColor.gray2,
                  paddingBottom: 10 * WIDTH_SCALE,
                }}
              >
                BÌNH LUẬN
              </Text>

              {/* TEXT INPUT CHATTING */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  value={chat}
                  onChange={(event) => {
                    setChat(event.nativeEvent.text)
                  }}
                  onContentSizeChange={e => {
                    setInputHeight(e.nativeEvent.contentSize.height)
                  }}
                  multiline={true}
                  placeholder={'Bạn muốn nói gì?'}
                  style={{
                    borderColor: ptColor.gray2,
                    borderWidth: 0.5,
                    borderRadius: 20 * WIDTH_SCALE,
                    paddingLeft: 10 * WIDTH_SCALE,
                    height: inputHeight,
                    width: '90%',
                    marginRight: '3%'
                  }}
                  returnKeyType={'done'}
                  onSubmitEditing={() => console.log(chat)}
                />

                <Icons
                  onPress={() => console.log('SEND ON PRESS')}
                  name='send' size={20 * WIDTH_SCALE}
                  color={'red'} />

              </View>

              <View
                style={{
                  width: '100%',
                  marginTop: 20 * WIDTH_SCALE,
                }}
              >

                <View style={{
                  alignSelf: 'center',
                  width: '100%',
                  height: 0.2,
                  backgroundColor: ptColor.gray2,
                  marginBottom: 20 * WIDTH_SCALE
                }} />

                <View
                  style={{
                    width: '100%',
                    height: 30 * WIDTH_SCALE,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 20 * WIDTH_SCALE,
                  }}>
                  <MyHighLightButton
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}>
                    <Picker
                      selectedValue={selectedValue}
                      style={{ height: 50, width: 130 }}
                      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                      <Picker.Item label="Cũ nhất" value={0} />
                      <Picker.Item label="Mới nhất" value={1} />
                    </Picker>
                  </MyHighLightButton>
                </View>

                <ChatData />

              </View>


            </View>
          </ScrollView>
        }

      </View>

    </ViewPager >
  );
}