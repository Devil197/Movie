import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  BackHandler,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from 'react-native-orientation'
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants'
import ViewPager from '@react-native-community/viewpager';
import { Card } from "react-native-paper";
import { getVideoByMovie, getMovieById } from '../../Redux/actions/movieAction'
import { _likeComment, _countLike, _checkLikeComment } from '../../Redux/actions/likeAction'
import { pFonts, ptColor } from '../../constants/styles'
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { MyHighLightButton, MySpinner } from "../views";
import { addHistoryByMovieId } from '../../Redux/actions/historyAction'
import { useDispatch, useSelector } from 'react-redux';
import { REDUX } from "../../Redux/store/types";
import { TextInput } from "react-native";
import { _getAllChat, _addOneMessage } from '../../Redux/actions/chatAction'
import Icons from 'react-native-vector-icons/Feather'
import StarRating from 'react-native-star-rating';
import { SkypeIndicator } from 'react-native-indicators';
import moment from 'moment';
const itemWidth = 40 * WIDTH_SCALE

export default function Video({ navigation, route }) {
  const dispatch = useDispatch()
  const userRedux = useSelector((state) => state.userReducer)
  //console.log("USER videos: ", userRedux);
  const viewPagerRef = useRef()
  const _id = route.params?._id
  const [playing, setPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [data, setData] = useState([])
  const [movie, setMovie] = useState([])
  const [index, setIndex] = useState(0)
  const [chat, setChat] = useState()
  const [chatData, setChatData] = useState()
  const [ratingData, setRatingData] = useState()
  const [likeData, setLikeData] = useState()
  const [inputHeight, setInputHeight] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [selectedValue, setSelectedValue] = useState(1)
  const [isLikeList, setIsLikeList] = useState()
  const [isRefreshData, setIsRefreshData] = useState(false)
  const setMenuRef = useRef();

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
        setLoading(false)
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
    handleChatAPI_getAll();
  }, [isLoading])

  useEffect(() => {
    handleChatAPI_getAll();
    handleLikeAPI_isLikeComment()
  }, [isRefreshData])

  const handleChatAPI_getAll = async () => {
    await _getAllChat(_id).then(res => {
      setChatData(res?.data);
      setRatingData(res?.ratings);
      setLikeData(res?.countLike);
      setLoading(false)
    })
  }

  const handleLikeAPI_isLikeComment = async () => {
    await _checkLikeComment(userRedux?.userInfo?._id).then(res => {
      console.log("LIKE DATA: ", res?.data);
      if (res?.status === 1) {
        setIsLikeList(res?.data);
      }
    })
  }

  const handleChatAPI_addComment = () => {
    _addOneMessage(_id, userRedux?.userInfo?._id, chat).then(res => {
      console.log("IS LIKE: ", res?.data);
      if (res?.data !== [] || res?.data != undefined) {
        setChat('');
      }
    })
  }

  const handleLikeAPI_likeCommentOnPress = (chat_id) => {
    setIsRefreshData(true)
    _likeComment(userRedux?.userInfo?._id, chat_id).then(res => {
      if (res?.status === 1) {
        setIsRefreshData(false);
      }
    }).catch(err => {
      console.log("LIKE and UNLIKE: ", err);
    })
  }

  //====================== END API HANDLE ========================

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

  const showReplyComment = () => {

  }

  const getUserRatingThisMovie = (_userId) => {
    let rating;
    if (ratingData !== undefined) {
      ratingData.map((val, ind) => {
        if (val?.user_id === _userId) {
          rating = val?.score;
        }
      })
    }
    return (
      <View
        style={{
          width: WIDTH * 0.25,
          marginTop: 5 * WIDTH_SCALE
        }}>
        <StarRating
          activeOpacity={rating}
          starStyle={{
          }}
          starSize={18}
          fullStarColor={'green'}
          disabled={false}
          maxStars={5}
          rating={rating}
          emptyStarColor={'#f1c40f'}
        />
      </View>
    )
  }

  function chatIdExists(chat_id) {
    if (isLikeList !== undefined) {
      return isLikeList.some(function (el) {
        return el.chat_id === chat_id;
      });
    }
  }

  const ChatData = () => {
    return (
      chatData !== undefined
        ? chatData.map((val, ind) => {
          return (
            <View
              key={ind}
              style={{
                marginBottom: 10 * WIDTH_SCALE,
              }}>

              <View
                style={{
                  flexDirection: 'row',
                }}>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  {val?.userInfo?.facebook_photo ?
                    <Image
                      style={{
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                      }}
                      source={{
                        uri: val?.userInfo?.facebook_photo ? val?.userInfo?.facebook_photo
                          : val?.userInfo?.google_photo
                      }}
                    />
                    : <Image
                      style={{
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        borderWidth: 0.5,
                        borderColor: ptColor.gray
                      }}
                      source={require('../../assets/icons/default_avatar.png')}
                    />
                  }
                </View>

                <View
                  style={{
                    flex: 5,
                  }}>

                  <Text
                    style={{
                      ...pFonts.text
                    }}>
                    {val?.userInfo?.facebook_name
                      ? val?.userInfo?.facebook_name
                      : val?.userInfo?.google_name}
                  </Text>
                  {getUserRatingThisMovie(val?.userInfo?._id)}
                </View>

              </View>

              <View
                style={{
                  marginVertical: 5 * WIDTH_SCALE,
                }}>
                <Text
                  style={{
                    ...pFonts.contentText,
                    padding: 8 * WIDTH_SCALE,
                    borderWidth: 0.75,
                    borderRadius: 16 * WIDTH_SCALE,
                    backgroundColor: ptColor.gray,
                    borderColor: ptColor.gray,
                    color: ptColor.black,
                  }}
                >
                  {val?.content}
                </Text>
                {likeData !== undefined
                  ? likeData.map((like, indexLike) => {
                    if (like?.chat_id === val?.chat_id) {
                      return (
                        <View
                          key={indexLike}
                          style={{
                            position: 'absolute',
                            zIndex: 1,
                            right: 0,
                            bottom: -10,
                            backgroundColor: ptColor.gray2,
                            borderRadius: 15,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Icons
                            name={'heart'}
                            size={14}
                            color={'#fff'}
                            style={{
                              padding: 2,
                              backgroundColor: 'red',
                              borderRadius: 10,
                            }} />
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#fff',
                              marginLeft: 5,
                              marginRight: 5,
                              ...pFonts.contentText
                            }}
                          >{like?.count}</Text>
                        </View>
                      )
                    }
                  }) : null
                }

              </View>

              <View
                style={{
                  width: '100%',
                  marginBottom: 15 * WIDTH_SCALE,
                  flexDirection: 'row'
                }}>

                {chatIdExists(val?.chat_id)
                  ?
                  <TouchableWithoutFeedback
                    onPress={() => handleLikeAPI_likeCommentOnPress(val?.chat_id)}
                  >
                    <Text
                      style={{
                        ...pFonts.text,
                        color: 'red',
                        paddingRight: 15 * WIDTH_SCALE
                      }}>Thích</Text>
                  </TouchableWithoutFeedback>
                  :
                  <TouchableWithoutFeedback
                    onPress={() => handleLikeAPI_likeCommentOnPress(val?.chat_id)}
                  >
                    <Text
                      style={{
                        ...pFonts.text,
                        color: ptColor.gray2,
                        paddingRight: 15 * WIDTH_SCALE
                      }}>Thích</Text>

                  </TouchableWithoutFeedback>
                }

                <TouchableWithoutFeedback
                  onPress={() => showReplyComment()}
                >
                  <Text
                    style={{
                      ...pFonts.text,
                      color: ptColor.gray2,
                      paddingRight: 15 * WIDTH_SCALE
                    }}>Trả lời</Text>
                </TouchableWithoutFeedback>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 15
                  }}
                >
                  <Text
                    style={{
                      ...pFonts.contentText,
                      color: ptColor.gray2,
                      fontSize: 14 * WIDTH_SCALE,
                    }}>{moment(val?.create_at).fromNow()}</Text>
                </View>

                {/* INPUT REP COMMENT */}
                <View>

                </View>

              </View>

            </View >
          )
        })
        : <Text>Chưa có bình luận nào!</Text>
    )
  }

  const showMenu = () => setMenuRef.current.show()
  const hideMenu = () => setMenuRef.current.hide()

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
        <View style={{ width: 60, height: 60, borderRadius: 20 }}>
          <SkypeIndicator
            color={ptColor.appColor}
            style={{
              padding: 20 * WIDTH_SCALE,
              backgroundColor: 'rgba(166, 164, 164, 0.4)',
              borderRadius: 10,
            }}
            size={40 * WIDTH_SCALE}
          />
        </View>
      </View>
    )
  }

  return (
    <ViewPager
      style={{ flex: 1, overflow: 'hidden', backgroundColor: null }} initialPage={0} orientation={'horizontal'}
      showPageIndicator={true}
      ref={viewPagerRef}

    >

      <ScrollView showsVerticalScrollIndicator={false} key={1} style={{ flex: 1 }}>
        <View style={{ borderBottomLeftRadius: 10 * WIDTH_SCALE, borderBottomRightRadius: 10 * WIDTH_SCALE, margin: 0 }}>
          <YoutubePlayer
            height={isFullScreen ? HEIGHT : 240 * WIDTH_SCALE}
            width={WIDTH}
            play={playing}
            //onPlaybackRateChange={(e) => console.log('0808 play e', e)}
            onPlaybackQualityChange={(e) => console.log('0808 play change ', e)}
            videoId={data[index]?.link}
            onChangeState={onStateChange}
            showClosedCaptions={false}
            preventFullScreen={false}
            //onReady={(e) => console.log('0808 onReady', e)}
            onChangeState={(e) => outVideo(e)}
            onError={() => Alert.alert('Cảnh Báo', 'Tập phim hiện tại đã bị xóa hoặc hiện tại không thể xem !')}
            onFullScreenChange={(e) => {
              //console.log('1001 fullscreen ', e);
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
          <View style={{ marginTop: 0 }}>
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
                DANH SÁCH TẬP PHIM
              </Text>
              <View style={{ flexDirection: 'row' }} >
                {data !== undefined
                  ? data.map((item, index) => {
                    return (
                      <MyHighLightButton
                        key={item?._id}
                        onPress={() => {
                          MySpinner.show()
                          setIndex(item.index)
                          setTimeout(() => {
                            MySpinner.hide()
                          }, 1000 * 0.5)
                        }}
                        style={{
                          width: '100%',
                          height: 40 * WIDTH_SCALE,
                          alignContent: 'center',
                          justifyContent: 'center',
                          marginBottom: 5 * WIDTH_SCALE,
                          borderWidth: 0.5,
                          borderRadius: 8 * WIDTH_SCALE
                        }}>
                        <Text style={{ textAlign: 'center', color: item.index === index ? ptColor.white : ptColor.appColor }}>
                          {item?.title}
                        </Text>
                      </MyHighLightButton>
                    )
                  })
                  : null
                }
              </View>
            </View>
            <View
              style={{
                margin: 10 * WIDTH_SCALE,
                marginTop: 5 * WIDTH_SCALE,
                backgroundColor: 'white',
                padding: 10 * WIDTH_SCALE,
                minHeight: HEIGHT * 0.49
              }}>
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
                  onChangeText={(txt) => setChat(txt)}
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
                />

                <Icons
                  onPress={() => handleChatAPI_addComment()}
                  name='send' size={20 * WIDTH_SCALE}
                  color={'red'} />

              </View>

              <View
                style={{
                  width: '100%',
                  marginTop: 15 * WIDTH_SCALE,
                }}
              >

                <View style={{
                  alignSelf: 'center',
                  width: '100%',
                  height: 0.2,
                  backgroundColor: ptColor.gray2,
                  marginBottom: 15 * WIDTH_SCALE
                }} />

                <View
                  style={{
                    width: '100%',
                    height: 30 * WIDTH_SCALE,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 20 * WIDTH_SCALE,
                  }}>

                  {/* HERE IS GET COMMENT BY CREATE DATE */}

                </View>

                <ChatData />

              </View>


            </View>
          </View>
        }

      </ScrollView>
    </ViewPager >

  );
}