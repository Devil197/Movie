import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  FlatList,
  Image,
  StatusBar,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
  ToastAndroid
} from 'react-native';
import { useSelector } from 'react-redux';
import { getFullMovie } from '../../Redux/actions/movieAction';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { MySpinner, MyHighLightButton } from '../views';
import { ROUTE_KEY, STATUS_BAR_CURRENT_HEIGHT } from '../../constants/constants';
import { Play, Player } from '../views';
import { ptColor } from '../../constants/styles';
import Orientation from 'react-native-orientation';
import Header from '../views/HeaderMovie';
import Icons from 'react-native-vector-icons/Feather'
import { Fonts } from '../../utils/Fonts'
import starData from './childScreens/data';
import StarRating from 'react-native-star-rating';
import { SkypeIndicator } from 'react-native-indicators';
import { followMovie } from '../../Redux/actions/followAction';

const HEADER_BAR_HEIGHT = 20;

export default function Details({ navigation, route }) {
  // video ====
  const [height, setHeight] = useState();
  const [trailer, setTrailer] = useState('');
  const userInfo = useSelector((state) => state.userReducer?.userInfo);

  //=====
  const _id = route.params._id;
  const [dataMovie, setDataMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const url = 'aF8U_uSsXSA';
  const initial = Orientation.getInitialOrientation();

  //==== Exam cal star and rate
  const [starCount, setStarCount] = useState();
  const [sumStar, setSumStar] = useState();
  const [sqrtStar, setSqrtStar] = useState();
  //==============

  //=== Animation
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_BAR_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_BAR_HEIGHT],
    outputRange: [0, 0.1],
  });

  useEffect(() => {
    Animated.timing(scrollY, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  })

  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_BAR_HEIGHT * 2],
    outputRange: [1, 0],
  });
  const iconOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_BAR_HEIGHT * 2],
    outputRange: [0, 1],
  });

  useEffect(() => {
    calSumStar();
  }, []);

  const calSumStar = () => {
    let sumStar = 0;
    let countUserVote = 0;

    starData.map((star) => {
      sumStar = sumStar + star.detail.length * star.starNum;
      countUserVote = countUserVote + star.detail.length;
    });
    setSumStar(sumStar);
    setStarCount(countUserVote);

    setSqrtStar(Math.round(sumStar / countUserVote * 10) / 10);
  };

  useEffect(() => {
    getFullMovie(_id)
      .then((fullMovie) => {
        setDataMovie(fullMovie);
        setTrailer(fullMovie?.movie[0]?.trailer);
        console.log(fullMovie);
        setLoading(false);
      })
      .catch((err) => console.log('Failed', err));
  }, []);

  const handleFollowAPI = () => {
    setLoading(true);
    let userId = userInfo?._id;
    followMovie(_id, userId).then((data) => {
      console.log("RESULT", data?.data?.position)
      if (data?.data?.result) {
        ToastAndroid.showWithGravityAndOffset(
          "Follow successfully!",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50
        );
        setLoading(false);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          "Oops! This movie has been followed.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50
        );
        setLoading(false);
      }
    });
  }

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
  //   );
  // } else {
  //   MySpinner.hide();
  // }

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

    <View style={{ flex: 1 }}>

      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />

        <ImageBackground
          source={{ uri: dataMovie?.movie[0]?.cover_img }}
          style={{
            height: HEIGHT * 0.4,
            width: WIDTH,
            resizeMode: 'cover',
            zIndex: 0,
          }}
        >
          <View style={styles.shapeCustom} />
        </ImageBackground>

        <View
          style={{
            zIndex: 101,
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            alignItems: 'center',
            width: WIDTH,
          }}>

          <View style={{ height: STATUS_BAR_CURRENT_HEIGHT, width: WIDTH }} />

          <View
            style={{
              width: WIDTH * 0.9,
              flexDirection: 'row',
              alignItems: 'center',
              height: HEIGHT * 0.05,
            }}>
            <MyHighLightButton onPress={() => navigation.goBack()} style={{ flex: 1, }}>
              <Icons name="arrow-left" color={ptColor.white} size={22} />
            </MyHighLightButton>

            <Animated.View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }, { opacity: iconOpacity }
              }>
              <Icons
                onPress={() => navigation.push(ROUTE_KEY.Videos, { _id: dataMovie?.movie[0]?._id })}
                name="play-circle"
                color={ptColor.white}
                size={22} />
            </Animated.View>
          </View>

          <Animated.ScrollView
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            showsVerticalScrollIndicator={false}
            style={{ height: HEIGHT }}>

            {/* Featured Part */}
            <View
              style={{
                backgroundColor: 'transparent',
                width: WIDTH * 0.9,
                paddingBottom: HEIGHT * 0.085,
              }}>

              <Animated.View
                style={[{
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: HEIGHT * 0.2,
                  justifyContent: 'center'
                }, { opacity: opacity }]}
              >
                <MyHighLightButton
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => navigation.push(ROUTE_KEY.Videos, { _id: dataMovie?.movie[0]?._id })}>
                  <View style={{ padding: 3, borderRadius: 30, borderWidth: 1.5, borderColor: '#fff' }}>
                    <View style={{ padding: 8, borderRadius: 25, borderWidth: 1.5, borderColor: '#fff' }}>
                      <Icons name="play" size={22 * WIDTH_SCALE} color={'#fff'} />
                    </View>
                  </View>
                </MyHighLightButton>
              </Animated.View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4
                }}>
                <Image
                  source={{ uri: dataMovie?.movie[0]?.cover_img }}
                  style={{
                    width: WIDTH * 0.28,
                    height: HEIGHT * 0.22,
                    marginLeft: WIDTH * 0.03,
                    marginTop: -WIDTH * 0.09,
                    resizeMode: 'contain',
                    borderWidth: 0.5,
                    borderColor: '#fff',
                  }}
                />

                <View style={{ paddingTop: 5, paddingLeft: 8 }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily:
                          Fonts.SansMedium,
                        fontSize: 18 * WIDTH_SCALE,
                      }}
                      numberOfLines={1}
                      ellipsizeMode={"clip"}
                    >{dataMovie?.movie[0]?.name}</Text>
                  </View>

                  <View
                    style={{
                      width: WIDTH * 0.2,
                      flexDirection: 'row',
                      marginTop: 7,
                    }} >
                    <StarRating
                      activeOpacity={1}
                      starStyle={{ width: 15 }}
                      starSize={14}
                      fullStarColor={'#f1c40f'}
                      disabled={false}
                      maxStars={5}
                      rating={sqrtStar}
                      emptyStarColor={'#f1c40f'}
                    />
                    <Text style={{
                      marginRight: 10,
                      color: "#e056fd",
                      fontFamily: Fonts.SansMedium,
                      fontSize: 14
                    }}> {sqrtStar}</Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: Fonts.SansMedium,
                      marginTop: 7,
                    }}
                  >No APIs / Drama / Action</Text>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                      fontSize: 12,
                      fontFamily: Fonts.SansMedium,
                      color: ptColor.gray2,
                    }}>
                      by
                  </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: Fonts.SansMedium,
                      }}
                    > {dataMovie?.movie[0]?.directer}</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                      fontSize: 12,
                      fontFamily: Fonts.SansMedium,
                      color: ptColor.gray2,
                    }}>
                      release
                  </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: Fonts.SansMedium,
                      }}
                    > {dataMovie?.movie[0]?.years}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: ptColor.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: HEIGHT * 0.03,
                }}>
                <MyHighLightButton
                  style={styles.iconContainer}
                  onPress={() => ToastAndroid.showWithGravityAndOffset(
                    "Coming Soon!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    0,
                    50
                  )}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icons name="frown" size={22 * WIDTH_SCALE} color={ptColor.black} />
                    <Text style={styles.iconTitle}>Report</Text>
                  </View>
                </MyHighLightButton>

                {/* FOLLOW MOVIE ON PRESS */}
                <MyHighLightButton
                  style={styles.iconContainer}
                  onPress={() => handleFollowAPI()}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icons name="heart" size={22 * WIDTH_SCALE} color={ptColor.black} />
                    <Text style={styles.iconTitle}>Follow</Text>
                  </View>
                </MyHighLightButton>

                <MyHighLightButton style={styles.iconContainer}
                  onPress={() => ToastAndroid.showWithGravityAndOffset(
                    "Coming Soon!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    0,
                    50
                  )}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icons name="thumbs-up" size={22 * WIDTH_SCALE} color={ptColor.black} />
                    <Text style={styles.iconTitle}>Rating</Text>
                  </View>
                </MyHighLightButton>
              </View>

              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  paddingTop: HEIGHT * 0.03,
                }}>

                {/* Trailer Component */}
                <View style={{}}>
                  <Text style={{
                    fontFamily: Fonts.SansMedium,
                    fontSize: 16,
                    color: ptColor.gray2,
                    marginLeft: WIDTH * 0.03,
                    marginBottom: 10,
                  }}>TRAILER</Text>
                  <Player url={url} fullScreen={onFullScreen} height={HEIGHT * 0.28} />
                </View>

                {/* Introduce */}
                <View style={{
                  marginLeft: WIDTH * 0.03,
                  paddingTop: HEIGHT * 0.03,
                }}>
                  <Text style={{
                    fontFamily: Fonts.SansMedium,
                    fontSize: 16,
                    color: ptColor.gray2,
                  }}>INTRODUCE</Text>

                  <Text
                    style={{ marginTop: 10, fontSize: 12, fontFamily: Fonts.SansLight }}
                  >{dataMovie?.movie[0]?.introduction}
                  </Text>
                </View>

                {/* Actors */}
                <View
                  style={{
                    marginLeft: WIDTH * 0.03,
                    paddingTop: HEIGHT * 0.03,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.SansMedium,
                      fontSize: 16,
                      color: ptColor.gray2,
                    }}>ACTORS</Text>

                  <Text style={{ fontSize: 36 }}>NEED AN API FOR GET ACTORS BY MOVIE ID. OLD API IS GET ACTOR BY KEYWORD.</Text>

                </View>

              </View>
            </View>
          </Animated.ScrollView>
        </View>
      </View >

      {
        loading ?
          <View style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            width: WIDTH,
            height: HEIGHT,
            justifyContent: 'center',
            alignItems: 'center'
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
    backgroundColor: '#fff',
    height: HEIGHT * 0.9
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTitle: {
    fontFamily: Fonts.SansLight,
    fontSize: 14 * WIDTH_SCALE,
  },
  shapeCustom: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: WIDTH,
    borderRightWidth: 0,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
  },
});
