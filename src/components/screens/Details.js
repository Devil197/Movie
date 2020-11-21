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
import { getFullMovie, getMovieByCategories } from '../../Redux/actions/movieAction';
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

export default function Details({ navigation, route }) {
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
  const [numberOfLines, setNumberOfLines] = useState(24);
  const [tabOfTheDescription, setTabs] = useState("Xem thêm");
  const [sqrtEvalMovie, setEval] = useState();
  const url = 'aF8U_uSsXSA';

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

      <ScrollView style={{ flex: 1, zIndex: 1 }}>

        {/* HEADER */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 10,
            backgroundColor: 'transparent',
            height: 45,
            width: WIDTH,
          }}>

          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 * WIDTH_SCALE }}>
            <MyHighLightButton onPress={() => navigation.goBack()}>
              <Icons name={'arrow-left'} size={18 * WIDTH_SCALE} color={ptColor.white} />
            </MyHighLightButton>
          </View>

          {/* <View style={{flex: 1}}>
            <Icons name={'arrow-left'} size={18 * WIDTH_SCALE} color={ptColor.white}/>
          </View> */}

        </View>

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

      </ScrollView>

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

        <View style={{ flex: 2 }}>

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
