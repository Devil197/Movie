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
  Alert
} from 'react-native';
import { getFullMovie, getMovieByCategories, getAllMovie } from '../../Redux/actions/movieAction';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
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
import { getEvalByMovieId, ratingAPI } from '../../Redux/actions/evalAction';
import { SkypeIndicator } from 'react-native-indicators';
import { useSelector, useDispatch } from 'react-redux';
import { getItemsFollowByUserId, followMovie, deleteFollowAPI } from '../../Redux/actions/followAction';
const HEADER_BAR_HEIGHT = 55 * WIDTH_SCALE;
import { REDUX } from '../../Redux/store/types'
import { Appbar, useTheme, Card } from 'react-native-paper';

export default function Details({ navigation, route }) {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userReducer?.userInfo);
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
  console.log('0909 _id deltals ', _id);

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
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImageFilled = require('../../assets/icons/star_filled.png');
  const starImageCorner = require('../../assets/icons/star_corner.png');
  const [isShowDayUpdateMovie, setIsShowDayUpdateMovie] = useState(true);

  console.log('1001 datamovie ', dataMovie?.movie);

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
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
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
    hideModal();
    await ratingAPI(userInfo?._id, _id, defaultRating).then((response) => {
      if (response?.data?.result) {
        setReload(true);

        toastAndroid("Cảm ơn bạn đã đánh giá!")
      } else {
        toastAndroid("Lỗi sự cố trong khi xử lý!\nVui lòng thử lại sau.")
      }
    })
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

    handleEvalAPI();
    handleGetAllMovieAPI();
    handleCheckFollowAPI();
  }, [reloadScreen]);

  const handleEvalAPI = async () => {
    await getEvalByMovieId(_id).then(result => {
      if (result?.number === null || result?.number === undefined) {
        setEval(0)
      } else {
        setEval(result?.number)
      }
    })
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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View
      style={{ backgroundColor: '#fff', flex: 1 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
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
            color={ptColor.white} />
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
            color={ptColor.white} />
        </MyHighLightButton>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ zIndex: 1, paddingBottom: 60 * WIDTH_SCALE }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}>
        <Card style={{ height: HEIGHT * 0.3 }}>
          <ImageBackground
            source={{ uri: dataMovie?.movie[0]?.cover_img }}
            style={{
              height: '100%',
              width: WIDTH,
              resizeMode: 'cover',
              zIndex: 0,
              justifyContent: 'flex-end'
            }}>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row'
                }}>

                {dataMovie?.category.map((val, ind) => {
                  return (
                    <Text
                      key={val?._id}
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        padding: 4 * WIDTH_SCALE,
                        color: ptColor.white,
                        fontFamily: Fonts.SansItalic,
                        marginLeft: 10 * WIDTH_SCALE,
                        marginBottom: 5 * WIDTH_SCALE,
                        marginTop: 5 * WIDTH_SCALE,
                        fontSize: 12 * WIDTH_SCALE,
                      }}>
                      {val?.name}
                    </Text>
                  )
                })}
              </View>


              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  paddingLeft: 7 * WIDTH_SCALE,
                  paddingVertical: 3.5 * WIDTH_SCALE,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }} >
                <StarRating
                  activeOpacity={1}
                  starStyle={{ width: 22 * WIDTH_SCALE }}
                  starSize={18}
                  fullStarColor={'red'}
                  disabled={false}
                  maxStars={1}
                  rating={sqrtEvalMovie}
                  emptyStarColor={'#f1c40f'}
                />
                <Text
                  style={{
                    marginRight: 10,
                    color: ptColor.white,
                    fontFamily: Fonts.SansMedium,
                    fontSize: 18 * WIDTH_SCALE
                  }}> {sqrtEvalMovie}</Text>
              </View>

            </View>
          </ImageBackground>
        </Card>

        <Card
          style={{
            padding: 15 * WIDTH_SCALE,
          }}>

          <Text
            style={{
              fontFamily: Fonts.SansBold,
              color: ptColor.black,
              fontSize: 20 * WIDTH_SCALE,
              marginVertical: 15 * WIDTH_SCALE,
            }}>
            {dataMovie?.movie[0]?.name}
          </Text>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {isShowDayUpdateMovie ?
              <Text
                style={{
                  color: ptColor.gray2,
                  fontSize: 14 * WIDTH_SCALE,
                  fontFamily: Fonts.SansLight,
                }}>
                Cập nhật vào {dayOfUpdate} hàng tuần!
              </Text> : null
            }

          </View> */}

          <View
            style={styles.detailChildContainer}>
            <Text
              style={styles.detailName}>Công chiếu: </Text>
            <Text
              style={styles.detailData}>{releaseDate}</Text>
          </View>

          <View
            style={styles.detailChildContainer}>
            <Text
              style={styles.detailName}>NSX: </Text>
            <Text
              style={styles.detailData}>{dataMovie?.movie[0]?.directer}</Text>
          </View>

          <View
            style={styles.detailChildContainer}>
            <Text
              style={styles.detailName}>Quốc gia: </Text>
            <Text
              style={styles.detailData}>{dataMovie?.movie[0]?.country}</Text>
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

        </Card>

        {/* Movie gợi ý */}
        <View
          style={{
            padding: 10 * WIDTH_SCALE,
            width: WIDTH
          }}>
          <Text
            style={{
              color: ptColor.black,
              fontFamily: Fonts.SansMedium,
              fontSize: 18 * WIDTH_SCALE
            }}>Có thể bạn sẽ thích</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}>
          {allMovie?.items.map((c, i) => {
            return (
              <MyHighLightButton
                key={c._id}
                style={{
                  width: WIDTH / 3,
                  height: HEIGHT / 4,
                  padding: 4,
                }}
                onPress={() =>
                  navigation.push(ROUTE_KEY.Details, { _id: c._id })
                }>
                <Image
                  style={{
                    flex: 1,
                    borderRadius: 4,
                    resizeMode: 'cover',
                    marginBottom: 5 * WIDTH_SCALE,
                  }} source={{ uri: c.cover_img }} />
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.SansLight,
                      fontSize: 12 * WIDTH_SCALE,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </View>
              </MyHighLightButton>
            );
          })}
        </ScrollView>

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
              setVisible(!isVisible)
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
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent'
          }}>

          <MyHighLightButton
            onPress={() => hideModal()}
            style={{ flex: 2, backgroundColor: 'transparent' }} />

          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderTopLeftRadius: 10 * WIDTH_SCALE,
              borderTopRightRadius: 10 * WIDTH_SCALE,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={{ color: ptColor.white }}>Hãy đánh giá bộ phim này!</Text>
            <CustomRatingBar />
            <MyHighLightButton
              style={{
                backgroundColor: 'red',
                borderRadius: 4 * WIDTH_SCALE,
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
                height: '20%',
                marginTop: 30 * WIDTH_SCALE
              }}
              onPress={() => {
                _onDoneRating()
              }}>
              <Text style={{ color: ptColor.white }}>Đánh giá</Text>
            </MyHighLightButton>

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
    paddingHorizontal: 8 * WIDTH_SCALE,
  },
  detailChildContainer: {
    flexDirection: 'row',
    marginTop: 10 * WIDTH_SCALE,
    alignItems: 'center'
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
    marginTop: 20,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});
