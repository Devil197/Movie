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
  Animated
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
import { ROUTE_KEY } from '../../constants/constants';
import { Play, Player } from '../views';
import { ptColor } from '../../constants/styles';
import Orientation from 'react-native-orientation';
import Header from '../views/HeaderMovie';
import Icons from 'react-native-vector-icons/Feather'
import StarRating from 'react-native-star-rating';
import { getEvalByMovieId } from '../../Redux/actions/evalAction';
const HEADER_BAR_HEIGHT = 45 * WIDTH_SCALE;

export default function Details({ navigation, route }) {

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_BAR_HEIGHT);
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: ['transparent', 'rgba(0,0,0,0.4)'],
  });
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_BAR_HEIGHT],
    outputRange: [0, -HEADER_BAR_HEIGHT],
  })
  // video ====
  const [height, setHeight] = useState();
  const [trailer, setTrailer] = useState('');

  //=====
  const _id = route.params._id;
  const [dataMovie, setDataMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [dayOfUpdate, setDayUpdate] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [numberOfLines, setNumberOfLines] = useState(4);
  const [tabOfTheDescription, setTabs] = useState("Xem thêm");
  const [sqrtEvalMovie, setEval] = useState();
  const url = 'aF8U_uSsXSA';

  // useState ALL MOVIE tạm thời 
  const [allMovie, setAllMovie] = useState();

  const initial = Orientation.getInitialOrientation();
  useEffect(() => {
    MySpinner.show();
    getFullMovie(_id)
      .then((fullMovie) => {
        console.log("===: ", fullMovie);
        setDataMovie(fullMovie);
        setTrailer(fullMovie?.movie[0]?.trailer);
        setLoading(false);
        getDayUpdateMovie(fullMovie?.movie[0]?.create_at)
      })
      .catch((err) => console.log('Failed', err));

    handleEvalAPI();

    //handleMovieWithCategoryAPI();

    handleGetAllMovieAPI();
  }, []);

  const handleEvalAPI = async () => {
    await getEvalByMovieId(_id).then(result => {
      setEval(result?.number)
    })
  }

  const handleMovieWithCategoryAPI = async () => {
    await getMovieByCategories(_id).then(result => {
      console.log("MOVIE API: ", result);
    })
  }

  // tạm thời.
  const handleGetAllMovieAPI = async () => {
    await getAllMovie().then(result => {
      setAllMovie(result);
    })
  }

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

  if (loading) {
    MySpinner.show();
    return (
      <View
        style={{
          flex: 1,
          width: WIDTH,
          height: HEIGHT,
          position: 'absolute',
          zIndex: 9999,
        }}
      />
    );
  } else {
    MySpinner.hide();
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

  return (
    <View
      style={{ backgroundColor: '#fff', flex: 1 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}>

      {/* HEADER */}
      <Animated.View
        style={[styles.headerStyle, { backgroundColor: backgroundColor, transform: [{ translateY: translateY }] }
        ]}>
        <Icons
          onPress={() => navigation.goBack()}
          name={'arrow-left'}
          size={18 * WIDTH_SCALE}
          color={ptColor.white} />
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ zIndex: 1, paddingBottom: 60 * WIDTH_SCALE }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        )}>

        <View style={{ height: HEIGHT * 0.3 }}>
          <ImageBackground
            source={{ uri: dataMovie?.movie[0]?.cover_img }}
            style={{
              height: '100%',
              width: WIDTH,
              resizeMode: 'cover',
              zIndex: 0,
              justifyContent: 'flex-end'
            }}>

            <Text
              style={{
                fontFamily: Fonts.SansBold,
                color: ptColor.white,
                fontSize: 20 * WIDTH_SCALE,
                marginLeft: 10 * WIDTH_SCALE,
              }}>
              {dataMovie?.movie[0]?.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
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
          </ImageBackground>
        </View>

        <View
          style={{
            padding: 15 * WIDTH_SCALE,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: WIDTH,
            }} >
            <StarRating
              activeOpacity={1}
              starStyle={{ width: 22 * WIDTH_SCALE }}
              starSize={18}
              fullStarColor={'#f1c40f'}
              disabled={false}
              maxStars={5}
              rating={sqrtEvalMovie}
              emptyStarColor={'#f1c40f'}
            />
            <Text
              style={{
                marginRight: 10,
                color: "#e056fd",
                fontFamily: Fonts.SansMedium,
                fontSize: 18 * WIDTH_SCALE
              }}> {sqrtEvalMovie}</Text>

            {/* <Icons name={'edit-3'} size={18 * WIDTH_SCALE} color={ptColor.gray2} /> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                color: ptColor.gray2,
                fontSize: 14 * WIDTH_SCALE,
                fontFamily: Fonts.SansLight,
              }}>
              Cập nhật vào {dayOfUpdate} hàng tuần!
          </Text>
          </View>

          <View
            style={styles.detailChildContainer}>
            <Text
              style={styles.detailName}>Phát hành: </Text>
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

          <View>
            <Text
              numberOfLines={numberOfLines}
              ellipsizeMode={'tail'}
              style={{
                color: ptColor.gray2,
                fontFamily: Fonts.SansLight,
              }}>{dataMovie?.movie[0]?.introduction}, {dataMovie?.movie[0]?.introduction}, {dataMovie?.movie[0]?.introduction}</Text>
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

        </View>

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
          height: 50 * WIDTH_SCALE,
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
          alignItems: 'center'
        }}>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <MyHighLightButton
            onPress={() => {
              console.log("Danh gia clicked");
            }}
            style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icons name={'edit'} size={18 * WIDTH_SCALE} color={ptColor.black} />

            <Text style={{ color: ptColor.black, fontFamily: Fonts.SansLight, fontSize: 14 * WIDTH_SCALE, marginTop: 3 * WIDTH_SCALE }}>Đánh giá</Text>
          </MyHighLightButton>
          <MyHighLightButton
            onPress={() => {
              console.log("Theo doi clicked");
            }}
            style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icons name={'heart'} size={18 * WIDTH_SCALE} color={ptColor.black} />
            <Text style={{ color: ptColor.black, fontFamily: Fonts.SansLight, fontSize: 14 * WIDTH_SCALE, marginTop: 3 * WIDTH_SCALE }}>Theo dõi</Text>
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
          onPress={() => navigation.push(ROUTE_KEY.Videos, { _id: _id })}>
          <Text style={{ color: ptColor.white, fontFamily: Fonts.SansLight }}>Xem phim</Text>
        </MyHighLightButton>

      </View>

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
    paddingLeft: 10 * WIDTH_SCALE,
    flexDirection: 'row',
  },
  detailChildContainer: {
    flexDirection: 'row',
    marginTop: 5 * WIDTH_SCALE,
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
  }
});
