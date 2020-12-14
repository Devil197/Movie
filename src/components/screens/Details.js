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
  Image,
  ImageBackground,
  Animated,
  Modal,
  StatusBar,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { getFullMovie, getMovieByCategories, getAllMovie } from '../../Redux/actions/movieAction';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
  width,
} from '../../constants/constants';
import { Fonts } from '../../utils/Fonts'
import { MySpinner, MyHighLightButton } from '../views';
import { ROUTE_KEY, followType } from '../../constants/constants';
import { Play, Player } from '../views';
import { ptColor } from '../../constants/styles';
import Orientation from 'react-native-orientation';
import Header from '../views/HeaderMovie';
import Icons from 'react-native-vector-icons/Feather'
import FollowIcons from 'react-native-vector-icons/Entypo'
import StarRating from 'react-native-star-rating';
import { getEvalByMovieId, ratingAPI, newComment, getOneEval, getOneComment, getAllComment, getAllEval } from '../../Redux/actions/evalAction';
import { SkypeIndicator } from 'react-native-indicators';
import { useSelector, useDispatch } from 'react-redux';
import { getItemsFollowByUserId, followMovie, deleteFollowAPI } from '../../Redux/actions/followAction';
const HEADER_BAR_HEIGHT = 55 * WIDTH_SCALE;
import { REDUX } from '../../Redux/store/types'
import { Appbar, useTheme, Card } from 'react-native-paper';
import { TextInput } from 'react-native';

export default function Details({ navigation, route }) {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userReducer?.userInfo);
  const userReducer = useSelector((state) => state.userReducer)
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_BAR_HEIGHT);
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: ['transparent', 'rgba(0,0,0,0.6)'],
  });
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_BAR_HEIGHT],
    outputRange: [0, -HEADER_BAR_HEIGHT],
  })
  // video ====
  const [height, setHeight] = useState();
  const [trailer, setTrailer] = useState('');
  const [isFollow, setFollow] = useState(false);
  //=====
  const _id = route.params._id;
  //console.log('0909 _id deltals ', _id);

  const [dataMovie, setDataMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [dayOfUpdate, setDayUpdate] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [numberOfLines, setNumberOfLines] = useState(4);
  const [tabOfTheDescription, setTabs] = useState("Xem thêm");
  const [sqrtEvalMovie, setEval] = useState();
  const [reloadScreen, setReload] = useState(false);
  //Modal rating
  const [isVisible, setVisible] = useState(false);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImageFilled = require('../../assets/icons/star_filled.png');
  const starImageCorner = require('../../assets/icons/star_corner.png');
  const [isShowDayUpdateMovie, setIsShowDayUpdateMovie] = useState(true);
  const [comment, setComment] = useState()
  const [userRating, setUserRating] = useState(0);
  const [commentData, setCommentData] = useState();
  const [ratingData, setRatingData] = useState();
  //console.log('1001 datamovie ', dataMovie?.movie);

  const toastAndroid = (text) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100
    );
  }

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setUserRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= userRating
                    ? starImageFilled
                    : starImageCorner
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _onDoneRating = async () => {
    setLoading(true);
    hideModal()
    if (userRating > 0) {
      await ratingAPI(userInfo?._id, _id, userRating).then((response) => {
        if (response?.data?.result) {
          setReload(true);
          toastAndroid("Cảm ơn bạn đã đánh giá!")
          setLoading(false);
        } else {
          toastAndroid("Lỗi sự cố trong khi xử lý!\nVui lòng thử lại sau.")
        }
      })

      if (comment !== undefined || comment !== '') {
        await newComment(userInfo?._id, _id, comment).then(res => {

        })
      }
      setLoading(false);
    } else {
      toastAndroid("Vui lòng chọn số lượng sao!")
    }
  }

  // useState ALL MOVIE tạm thời 
  const [allMovie, setAllMovie] = useState();

  const initial = Orientation.getInitialOrientation();
  useEffect(() => {
    getFullMovie(_id)
      .then((fullMovie) => {
        setDataMovie(fullMovie);
        setTrailer(fullMovie?.movie[0]?.trailer);
        getDayUpdateMovie(fullMovie?.movie[0]?.create_at)
        setLoading(false);
        setReload(false);
        handleShowDayUpdate(fullMovie);
      })
      .catch((err) => console.log('Failed', err));

    handleEvalAPI_getAllEval()
    handleEvalAPI_getAllComment()
    handleEvalAPI_getOneComment()
    handleEvalAPI_getOneEval();
    handleEvalAPI_getAverageEval();
    handleGetAllMovieAPI();
    handleCheckFollowAPI();
  }, [reloadScreen]);

  const handleEvalAPI_getAllEval = async () => {
    if (_id !== undefined) {
      await getAllEval(_id).then(res => {
        setRatingData(res?.items);
      })
    }
  }

  const handleEvalAPI_getAllComment = async () => {
    if (_id !== undefined) {
      await getAllComment(_id).then(res => {
        setCommentData(res?.items);
      })
    }
  }

  const handleEvalAPI_getAverageEval = async () => {
    await getEvalByMovieId(_id).then(result => {
      if (result?.number === null || result?.number === undefined) {
        setEval(0)
      } else {
        setEval(result?.number)
      }
    })
  }

  const handleEvalAPI_getOneEval = async () => {
    if (userInfo?._id !== undefined && _id !== undefined) {
      await getOneEval(userInfo?._id, _id).then(res => {
        if (res?.items === null) {
          setUserRating(0)
        }
        setUserRating(res?.items?.score);
      })
    }
  }

  const handleEvalAPI_getOneComment = async () => {
    if (userInfo?._id !== undefined && _id !== undefined) {
      await getOneComment(userInfo?._id, _id).then(res => {
        setComment(res?.items[0]?.message);
      })
    }
  }

  const handleCheckFollowAPI = async () => {
    await getItemsFollowByUserId(followType.movie, userInfo?._id).then(res => {
      res?.items.map((c, i) => {
        if (c?.movie_id?._id === _id) {
          setFollow(true);
        }
      })
    })
  }

  // tạm thời.
  const handleGetAllMovieAPI = async () => {
    await getAllMovie().then(result => {
      setAllMovie(result);
    })
  }
  //============

  const getDayUpdateMovie = (data) => {
    let getDate = new Date(data);
    let day = getDate.getDay();
    let date = getDate.getDate();
    let month = getDate.getMonth();
    let year = getDate.getFullYear();
    let releaseDateMovie = date + "/" + month + "/" + year;
    setReleaseDate(releaseDateMovie);
    switch (day) {
      case 0:
        setDayUpdate("Chủ nhật");
        break;
      case 1:
        setDayUpdate("Thứ 2");
        break;
      case 2:
        setDayUpdate("Thứ 3");
        break;
      case 3:
        setDayUpdate("Thứ 4");
        break;
      case 4:
        setDayUpdate("Thứ 5");
        break;
      case 5:
        setDayUpdate("Thứ 6");
        break;
      case 6:
        setDayUpdate("Thứ 7");
        break;
    }
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

  const handleReadMore = () => {
    if (numberOfLines === 4) {
      setTabs('Thu gọn');
      setNumberOfLines(10);
    } else {
      setTabs('Xem thêm');
      setNumberOfLines(4);
    }
  }

  const handleCancelFollowMovie = async () => {

    await deleteFollowAPI(userInfo?._id, _id, followType.movie).then(res => {
      toastAndroid("Bạn đã hủy theo dõi nội dung!")
      setFollow(false);
      dispatch({
        type: REDUX.DELETE_FOLLOW,
        payload: followMovie?.movie
      })
    })
  }

  const handleFollowOnPress = async () => {

    if (isFollow) {
      Alert.alert(
        "Hủy theo dõi",
        "Bạn muốn hủy theo dõi nội dung này?",
        [
          {
            text: "Không",
            //onPress: () => console.log("Bỏ qua"),
            style: "cancel"
          },
          {
            text: "Có",
            onPress: () => { handleCancelFollowMovie() }
          }
        ],
        { cancelable: false }
      );
    } else {
      await followMovie(followType.movie, _id, userInfo?._id).then(response => {
        if (response?.position === 200) {
          toastAndroid("Cảm ơn bạn đã theo dõi!")
          setFollow(true);
          dispatch({
            type: REDUX.ADD_FOLLOW,
            payload: dataMovie?.movie
          })
        } else {
          console.log("THEO DOIX: ", response);
          toastAndroid("Có sự cố khi xử lý.\nVui lòng thử lại sau!")
        }
      })
    }
  }

  const handleShowDayUpdate = (fullMovie) => {
    let string = fullMovie?.movie[0]?.name;
    let lastChar = string.indexOf(']');
    let finalString = string.slice(1, lastChar);
    console.log(string + lastChar + finalString);
    if (finalString === '10Min') {
      setIsShowDayUpdateMovie(false);
    }
  }

  const showModal = () =>
    setVisible(true);
  const hideModal = () =>
    setVisible(false);

  const getProfileImage = (_id) => {
    return `https://graph.facebook.com/v9.0/${_id}/picture`
  }

  return (
    <View
      style={{ backgroundColor: '#fff', flex: 1 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}>

      <StatusBar showHideTransition="slide" />
      {/* HEADER */}
      <Animated.View
        style={[styles.headerStyle, { backgroundColor: backgroundColor, transform: [{ translateY: translateY }] }
        ]}>
        <MyHighLightButton
          style={{
            height: '100%',
            width: WIDTH * 0.1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex: 1,
          }}
          onPress={() => navigation.goBack()}>
          <Icons
            name={'arrow-left'}
            size={21 * WIDTH_SCALE}
            color={ptColor.gray2} />
        </MyHighLightButton>
        <View style={{ flex: 8 }} />
        <MyHighLightButton
          style={{
            height: '100%',
            width: WIDTH * 0.1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
            paddingRight: 15 * WIDTH_SCALE,
          }}
          onPress={() => navigation.navigate(ROUTE_KEY.Search)}>
          <Icons
            name={'search'}
            size={21 * WIDTH_SCALE}
            color={ptColor.gray2} />
        </MyHighLightButton>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ zIndex: 1, paddingBottom: 60 * WIDTH_SCALE }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}>
        <Card style={{ height: HEIGHT * 0.4 }}>
          <View style={{ height: HEADER_BAR_HEIGHT, width: WIDTH, backgroundColor: '#faf9f1' }} />
          <View
            style={{
              height: HEIGHT * 0.4 - HEADER_BAR_HEIGHT,
              width: WIDTH,
              backgroundColor: '#faf9f1',
              flexDirection: 'row',
            }}>

            <View
              style={{
                height: HEIGHT * 0.4 - HEADER_BAR_HEIGHT,
                width: WIDTH * 0.425,
                padding: 15 * WIDTH_SCALE,
              }}>

              <View
                style={{
                  height: '90%',
                  width: WIDTH * 0.325,
                  backgroundColor: '#000',
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,

                  elevation: 24,
                }}
              >
                <Image
                  source={{ uri: dataMovie?.movie[0]?.cover_img }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }}
                />
              </View>

            </View>

            <View
              style={{
                height: HEIGHT * 0.4 - HEADER_BAR_HEIGHT,
                width: WIDTH * 0.575,
                paddingVertical: 15 * WIDTH_SCALE,

              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.SansBold,
                  color: ptColor.black,
                  fontSize: 18 * WIDTH_SCALE,
                }}>
                {dataMovie?.movie[0]?.name}
              </Text>

              <View
                style={styles.detailChildContainer}>
                <Text
                  style={styles.detailName}>Đạo diễn </Text>
                <Text
                  style={styles.detailData}>{dataMovie?.movie[0]?.directer}</Text>
              </View>

              <View
                style={{
                  width: 110,
                  marginTop: 15 * WIDTH_SCALE,
                }}>
                <StarRating
                  activeOpacity={1}
                  starStyle={{ width: 22 * WIDTH_SCALE }}
                  starSize={18}
                  fullStarColor={'red'}
                  disabled={false}
                  maxStars={5}
                  rating={sqrtEvalMovie}
                  emptyStarColor={'#f1c40f'}
                />
              </View>

              <View
                style={styles.detailChildContainer}>
                <Text
                  style={styles.detailName}>Công chiếu: </Text>
                <Text
                  style={styles.detailData}>{releaseDate}</Text>
              </View>

              <View
                style={styles.detailChildContainer}>
                {dataMovie?.category.map((val, ind) => {
                  return (
                    <Text
                      style={styles.detailData}>{val?.name}</Text>
                  )
                })}
              </View>

              <View
                style={{
                  padding: 4 * WIDTH_SCALE,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  marginVertical: 15 * WIDTH_SCALE,
                  alignSelf: 'flex-start'
                }}>
                <Text
                  style={{
                    color: ptColor.white,
                  }}>
                  #{dataMovie?.movie[0]?.language}
                </Text>
              </View>

            </View>

          </View>
        </Card>

        <Card
          style={{
            padding: 15 * WIDTH_SCALE,
          }}>

          {/* Trailer Component */}
          <View style={{}}>
            <Player url={dataMovie?.movie[0]?.trailer} fullScreen={onFullScreen} height={HEIGHT * 0.32} />
          </View>

          <View>
            <Text
              style={{
                color: ptColor.black,
                fontFamily: Fonts.SansMedium,
                fontSize: 20 * WIDTH_SCALE,
                marginVertical: 15 * WIDTH_SCALE,
              }}>NỘI DUNG</Text>
            <Text
              numberOfLines={numberOfLines}
              ellipsizeMode={'tail'}
              style={{
                color: ptColor.gray2,
                fontFamily: Fonts.SansLight,
              }}>{dataMovie?.movie[0]?.introduction}</Text>
            <MyHighLightButton onPress={() => handleReadMore()} >
              <Text
                style={{
                  color: '#e056fd',
                  fontSize: 12 * WIDTH_SCALE,
                  alignSelf: 'flex-end',
                }}>
                {tabOfTheDescription}
              </Text>
            </MyHighLightButton>
          </View>

          <View style={{ marginVertical: 15 * WIDTH_SCALE }}>
            <Text
              style={{
                color: ptColor.black,
                fontFamily: Fonts.SansMedium,
                fontSize: 20 * WIDTH_SCALE,
                marginVertical: 15 * WIDTH_SCALE,
              }}>ĐÁNH GIÁ CỦA BẠN</Text>

            <View style={{ marginTop: 15 * WIDTH_SCALE, width: '100%', flexDirection: 'row' }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                }}
                source={{
                  uri: userReducer.facebookInfo.photo !== undefined
                    ? userReducer?.facebookInfo?.photo
                    : userReducer?.googleInfo?.photo
                }} />

              <View style={{ height: '100%', marginLeft: 20 * WIDTH_SCALE }}>
                <Text
                  style={{ fontFamily: Fonts.SansMedium, fontSize: 14 * WIDTH_SCALE, marginBottom: 5 * WIDTH_SCALE }}>
                  {userReducer.facebookInfo.name !== undefined ? userReducer.facebookInfo?.name : userReducer.googleInfo?.name}
                </Text>
                <StarRating
                  activeOpacity={userRating}
                  starStyle={{ width: 22 * WIDTH_SCALE }}
                  starSize={18}
                  fullStarColor={'green'}
                  disabled={false}
                  maxStars={5}
                  rating={userRating}
                  emptyStarColor={'#f1c40f'}
                />

              </View>

            </View>

            {comment !== undefined ?
              <Text
                style={{
                  marginVertical: 15 * WIDTH_SCALE,
                  fontFamily: Fonts.SansLight,
                  fontSize: 16 * WIDTH_SCALE,
                }}
              >{comment}</Text> : <Text
                style={{
                  marginVertical: 15 * WIDTH_SCALE,
                  fontFamily: Fonts.SansLight,
                  fontSize: 16 * WIDTH_SCALE,
                }}
              >bạn chưa nhận xét nội dung này!</Text>
            }

          </View>

        </Card>

      </Animated.ScrollView>

      {/* BOTTOM TAB */}
      <View
        style={{
          height: 60 * WIDTH_SCALE,
          width: WIDTH,
          backgroundColor: ptColor.white,
          position: 'absolute',
          bottom: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
          zIndex: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4 * WIDTH_SCALE,
        }}>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <MyHighLightButton
            onPress={() => {
              showModal()
            }}
            style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icons name={'edit'} size={18 * WIDTH_SCALE} color={'red'} />

            <Text style={{ color: ptColor.black, fontFamily: Fonts.SansLight, fontSize: 14 * WIDTH_SCALE, marginTop: 3 * WIDTH_SCALE }}>Đánh giá</Text>
          </MyHighLightButton>
          <MyHighLightButton
            onPress={() => {
              handleFollowOnPress();
            }}
            style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isFollow ?
              <FollowIcons
                name={'heart'}
                size={22 * WIDTH_SCALE}
                color={'red'} />
              :
              <FollowIcons
                name={'heart-outlined'}
                size={22 * WIDTH_SCALE}
                color={'red'} />}
            {isFollow ?
              <Text
                style={{
                  color: ptColor.black,
                  fontFamily: Fonts.SansLight,
                  fontSize: 14 * WIDTH_SCALE,
                  marginTop: 3 * WIDTH_SCALE
                }}>Bỏ theo dõi</Text> :
              <Text
                style={{
                  color: ptColor.black,
                  fontFamily: Fonts.SansLight,
                  fontSize: 14 * WIDTH_SCALE,
                  marginTop: 3 * WIDTH_SCALE
                }}>Theo dõi</Text>}
          </MyHighLightButton>
        </View>

        <MyHighLightButton
          style={{
            backgroundColor: 'red',
            flex: 1,
            borderRadius: 20 * WIDTH_SCALE,
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
            marginRight: 8 * WIDTH_SCALE
          }}
          onPress={() => dataMovie?.movie[0]?.status !== 0 ? navigation.push(ROUTE_KEY.Videos, { _id: _id }) : null}>
          <Text style={{ color: ptColor.white, fontFamily: Fonts.SansLight }}>{dataMovie?.movie[0]?.status !== 0 ? 'Play' : 'Updating'}</Text>
        </MyHighLightButton>

      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          hideModal()
        }}>
        <StatusBar hidden={true} />
        <View
          style={{ flex: 1, backgroundColor: '#fff' }}
        >

          <View
            style={{ flex: 1, backgroundColor: '#fff' }}>

            <View
              style={{
                paddingVertical: 14 * WIDTH_SCALE,
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <MyHighLightButton
                  onPress={() => hideModal()}
                  style={{
                    flex: 1,
                    height: 40,
                    width: WIDTH,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Icons name="x" size={18 * WIDTH_SCALE} color={ptColor.black} />
                  <Text style={{ marginLeft: 10 * WIDTH_SCALE, fontFamily: Fonts.SansLight }}>Hủy</Text>
                </MyHighLightButton>
                <View style={{ flex: 3 }} />
                <MyHighLightButton
                  style={{
                    borderRadius: 4 * WIDTH_SCALE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}
                  onPress={() => {
                    _onDoneRating()
                  }}>
                  <Text style={{ color: ptColor.black, fontFamily: Fonts.SansBold }}>Gửi</Text>
                </MyHighLightButton>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 2,
                }}
              >
                <CustomRatingBar />
                <TextInput
                  value={comment}
                  onChangeText={(txt) => {
                    setComment(txt)
                  }}
                  style={{
                    marginTop: 20 * WIDTH_SCALE,
                    width: WIDTH * 0.8,
                    height: 40,
                    backgroundColor: ptColor.gray2,
                    borderRadius: 30 * WIDTH_SCALE,
                    paddingLeft: 20 * WIDTH_SCALE,
                  }}
                  placeholder={'Mô tả trải nghiệm của bạn (có thể trống)'}
                  placeholderTextColor={ptColor.white}
                />

              </View>

            </View>

            <View style={{ height: 1, width: WIDTH, backgroundColor: ptColor.gray }} />

            <View
              style={{
                flex: 4,
              }}>
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                }}>

                {commentData != undefined ?
                  commentData.map((value, index) => {
                    return (
                      <View
                        style={{
                          width: WIDTH,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 10 * WIDTH_SCALE,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: WIDTH,
                            padding: 15 * WIDTH_SCALE,
                          }}>
                          <View style={{ flex: 1 }}>
                            <Image
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                              }}
                              source={{
                                uri: value.user_id.facebook_id !== "not null"
                                  ? getProfileImage(value.user_id.facebook_id)
                                  : value?.user_id?.google_photo
                              }}

                            />
                          </View>
                          <View
                            style={{
                              flex: 5,
                            }}>
                            <Text
                              style={{
                                fontFamily: Fonts.SansMedium,
                                fontSize: 16 * WIDTH_SCALE,
                              }}
                            >{value.user_id.facebook_name}</Text>

                            {ratingData !== undefined
                              ?
                              ratingData.map((val, ind) => {
                                if (val?.user_id === value?.user_id?._id) {
                                  return (
                                    <View style={{ width: WIDTH * 0.25, marginTop: 5 * WIDTH_SCALE }}>
                                      <StarRating
                                        activeOpacity={val?.score}
                                        starStyle={{
                                        }}
                                        starSize={18}
                                        fullStarColor={'green'}
                                        disabled={false}
                                        maxStars={5}
                                        rating={val?.score}
                                        emptyStarColor={'#f1c40f'}
                                      />
                                    </View>
                                  )
                                }
                              })
                              : null
                            }


                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignContent: 'flex-start',
                            width: '100%',
                            flexDirection: 'row',
                            paddingHorizontal: 15 * WIDTH_SCALE
                          }}>
                          <Text
                            style={{
                              fontFamily: Fonts.SansLight,
                              fontSize: 14 * WIDTH_SCALE,
                              width: '100%',
                            }}
                          >{value.message}</Text>
                        </View>
                      </View>
                    )
                  }) : null
                }

              </ScrollView>
            </View>

          </View>

        </View>
      </Modal>

      {
        loading ?
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
          : null
      }

    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ptColor.white,
  },
  headerStyle: {
    zIndex: 99,
    position: 'absolute',
    top: 0,
    zIndex: 10,
    height: HEADER_BAR_HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10 * WIDTH_SCALE,
  },
  detailChildContainer: {
    flexDirection: 'row',
    marginTop: 15 * WIDTH_SCALE,
    alignItems: 'center',
    width: '100%',
  },
  detailName: {
    color: ptColor.gray2,
    fontFamily: Fonts.SansLight,
    fontSize: 14 * WIDTH_SCALE
  },
  detailData: {
    color: ptColor.black,
    fontSize: 14 * WIDTH_SCALE,
    fontFamily: Fonts.SansLight,
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    marginRight: 5 * WIDTH_SCALE,
  },
});
