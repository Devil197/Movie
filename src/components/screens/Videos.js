import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  BackHandler,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Animated, ToastAndroid
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
import { _getAllChat, _addOneMessage, _getAllChatSortByLike } from '../../Redux/actions/chatAction'
import Icons from 'react-native-vector-icons/Feather'
import StarRating from 'react-native-star-rating';
import { SkypeIndicator } from 'react-native-indicators';
import moment from 'moment';
import { Icon as IconElement } from 'react-native-elements'
import { _setMovieViewsAPI } from '../../Redux/actions/countViews'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

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
  const [inputHeight, setInputHeight] = useState(0)
  const [isLikeList, setIsLikeList] = useState()
  const [isRefreshData, setIsRefreshData] = useState(false)
  const setMenuRef = useRef();
  const [menuTrigger, setMenuTrigger] = useState(0)
  const [isLoading, setLoading] = useState(true);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, [])

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
    handleLikeAPI_isLikeComment()
  }, [isRefreshData])

  const handleChatAPI_getAll = async () => {
    if (menuTrigger !== 0) {
      await _getAllChat(_id, menuTrigger).then(res => {
        if (res?.status) {
          setChatData(res?.data);
          setIsRefreshData(false)
        }
      }).catch(err => { console.log("ERROR GET COMMENT: ", menuTrigger + " => " + err) })
    } else {
      await _getAllChatSortByLike(_id).then(res => {
        console.log("API: ", menuTrigger + " => " + res?.data);
        if (res?.status) {
          setChatData(res?.data);
          setIsRefreshData(false)
        }
      }).catch(err => { console.log("ERROR GET COMMENT: ", menuTrigger + " => " + err) })
    }
    setIsRefreshData(false)
  }

  const handleLikeAPI_isLikeComment = async () => {
    await _checkLikeComment(userRedux?.userInfo?._id).then(res => {
      console.log("LIKE DATA: ", res?.data);
      if (res?.status === 1) {
        setIsLikeList(res?.data);
        // dispatch({
        //   type: REDUX.LIKE_LIST_SET,
        //   payload: res.data
        // })
      }
    })
  }

  const handleChatAPI_addComment = () => {
    setIsRefreshData(true);
    _addOneMessage(_id, userRedux?.userInfo?._id, chat).then(res => {
      console.log("IS LIKE: ", res?.data);
      if (res?.data !== [] || res?.data != undefined) {
        //setIsRefreshData(false)
        setChat('');
      }
    })
  }

  const toastAndroid = (text) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100
    );
  }

  const handleLikeAPI_likeCommentOnPress = (chat_id) => {
    if (isRefreshData) {
      toastAndroid("Bạn thao tác quá dữ dội,\nVui lòng đợi trong giây lát.")
    } else {
      setIsRefreshData(true)
      _likeComment(userRedux?.userInfo?._id, chat_id).then(res => {
        if (res?.status === 1) {

        }
      }).catch(err => {
        console.log("LIKE and UNLIKE: ", err);
      })
    }
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
      await addHistoryByMovieId(newHistory).then(res => console.log(res)).catch(err => console.log(err));
      await _setMovieViewsAPI(_id).then(res => console.log(res)).catch(err => console.log(err))
    }

  }

  const getProfileImage = (_id) => {
    return `https://graph.facebook.com/v9.0/${_id}/picture`
  }

  const showReplyComment = () => {

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
                  {val?.userInfo?.facebook_photo || val?.userInfo?.google_photo ?
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
                  {val?.rating > 0
                    ? <View
                      style={{
                        width: WIDTH * 0.25,
                        marginTop: 5 * WIDTH_SCALE
                      }}>
                      <StarRating
                        activeOpacity={val?.rating}
                        starStyle={{
                        }}
                        starSize={18}
                        fullStarColor={'green'}
                        disabled={false}
                        maxStars={5}
                        rating={val?.rating}
                        emptyStarColor={'#f1c40f'}
                      />
                    </View>
                    : <Text style={{ fontSize: 12 * WIDTH_SCALE }}>Người dùng chưa đánh giá!</Text>
                  }
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
                {val?.sumLike > 0
                  ? <View
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
                    >{val?.sumLike}</Text>
                  </View> : null
                }

              </View>

              <View
                style={{
                  width: '100%',
                  marginBottom: 15 * WIDTH_SCALE,
                  flexDirection: 'row'
                }}>

                {chatIdExists(val?.chat_id) ?
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

                < TouchableWithoutFeedback
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
        : <Text style={{ width: '100%', textAlign: 'center', color: ptColor.gray2 }}> Chưa có bình luận nào!</Text>
    )
  }

  const showMenu = () => setMenuRef.current.show()
  const hideMenu = () => setMenuRef.current.hide()

  return (
    <View style={{ flex: 1 }}>
      {isLoading ?
        <View style={{
          height: HEIGHT,
          width: WIDTH,
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          top: 0,
          left: 0,
        }}>
          <View style={{ width: 60, height: 60, borderRadius: 20, }}>
            <SkypeIndicator
              color={ptColor.appColor}
              style={{
                padding: 20 * WIDTH_SCALE,
                backgroundColor: 'rgba(166, 164, 164, 0.4)',
                borderRadius: 30,
              }}
              size={30 * WIDTH_SCALE}
            />
          </View>
        </View>
        : null
      }
      <ViewPager
        style={{ flex: 1, overflow: 'hidden', backgroundColor: null }} initialPage={0} orientation={'horizontal'}
        showPageIndicator={true}
        ref={viewPagerRef}>

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
              onReady={(e) => {
                console.log('0808 onReady', e)
                setLoading(false)
              }}
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
                <View style={{}} >
                  {data !== undefined
                    ? data.map((item, ind) => {

                      return (
                        <MyHighLightButton
                          key={item?._id}
                          onPress={() => {
                            setLoading(true)
                            setIndex(ind)
                            setTimeout(() => {
                              setLoading(false)
                            }, 1000 * 0.5)
                          }}
                          style={{
                            width: '100%',
                            height: 40 * WIDTH_SCALE,
                            alignContent: 'center',
                            justifyContent: 'center',
                            marginBottom: 5 * WIDTH_SCALE,
                            borderWidth: 0.75,
                            borderRadius: 8 * WIDTH_SCALE,
                            borderColor: ind === index ? ptColor.appColor : ptColor.black
                          }}>
                          <Text style={{
                            fontSize: 16 * WIDTH_SCALE,
                            textAlign: 'center',
                            color: ind === index ? ptColor.appColor : ptColor.black
                          }}>
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
                  marginHorizontal: 10 * WIDTH_SCALE,
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
                    // onContentSizeChange={e => {
                    //   setInputHeight(e.nativeEvent.contentSize.height)
                    // }}
                    multiline={true}
                    placeholder={'Bạn muốn nói gì?'}
                    style={{
                      borderColor: ptColor.gray2,
                      borderWidth: 0.5,
                      borderRadius: 20 * WIDTH_SCALE,
                      paddingLeft: 10 * WIDTH_SCALE,
                      width: '90%',
                      marginRight: '3%',
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
                    marginTop: 10 * WIDTH_SCALE,
                  }}>

                  {isRefreshData
                    ? <View
                      style={{
                        height: 40 * WIDTH_SCALE,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ width: 30, height: 30, borderRadius: 15, }}>
                        <SkypeIndicator
                          color={ptColor.appColor}
                          style={{
                            padding: 20 * WIDTH_SCALE,
                            backgroundColor: 'rgba(166, 164, 164, 0.4)',
                            borderRadius: 30,
                          }}
                          size={15 * WIDTH_SCALE}
                        />
                      </View>
                    </View>
                    : null
                  }

                  <View
                    style={{
                      alignItems: 'center',
                      position: 'absolute',
                      right: 0,
                      width: WIDTH * 0.3,
                      zIndex: 9999,
                      height: 40 * WIDTH_SCALE,
                      top: 0,
                    }}>
                    <Menu>
                      <MenuTrigger
                        style={{
                          padding: 20 * WIDTH_SCALE,
                          flexDirection: 'row',
                        }}
                      >
                        <Text style={{ marginRight: 10 * WIDTH_SCALE }}>{menuTrigger === 1 ? "Cũ nhất"
                          : menuTrigger === -1 ? "Mới nhất"
                            : "Nổi bật"
                        }</Text>
                        <IconElement name="chevron-down" type="feather" color={ptColor.black} size={24 * WIDTH_SCALE} />
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption
                          style={{
                            height: 40 * WIDTH_SCALE,
                            justifyContent: 'center',
                            padding: 10,
                            alignItems: 'flex-end',
                            borderBottomColor: ptColor.gray,
                            borderBottomWidth: 0.5
                          }}
                          onSelect={() => { setMenuTrigger(1); setIsRefreshData(true) }}>
                          <Text>Cũ nhất</Text>
                        </MenuOption>
                        <MenuOption
                          style={{
                            height: 40 * WIDTH_SCALE,
                            justifyContent: 'center',
                            padding: 10,
                            alignItems: 'flex-end',
                            borderBottomColor: ptColor.gray,
                            borderBottomWidth: 0.5
                          }}
                          onSelect={() => { setMenuTrigger(-1); setIsRefreshData(true) }}>
                          <Text>Mới nhất</Text>
                        </MenuOption>
                        <MenuOption
                          style={{
                            height: 40 * WIDTH_SCALE,
                            justifyContent: 'center',
                            padding: 10,
                            alignItems: 'flex-end',
                            borderBottomColor: ptColor.gray,
                            borderBottomWidth: 0.5
                          }}
                          onSelect={() => { setMenuTrigger(0); setIsRefreshData(true) }}>
                          <Text>Nổi bật</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>

                  </View>

                  <View style={{ height: 50 * WIDTH_SCALE, width: '100%' }} />

                  <ChatData />

                </View>


              </View>
            </View>
          }
        </ScrollView>
      </ViewPager >

    </View>
  );
}