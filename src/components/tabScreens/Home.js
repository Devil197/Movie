import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image, StatusBar, Dimensions
} from 'react-native';
import { Play, Player } from '../views';
import { set } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import {
  height,
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../../constants/constants';
import Container from '../../constants/style/Container';
import GroupA from '../../constants/style/Group';
import ImageA from '../../constants/style/image';
import MyTouchableOpacity from '../../constants/style/MyTouchableOpacity';
import MyView from '../../constants/style/MyView';
import TextC from '../../constants/style/Text';
import {
  getAllMovie,
  getCartoon,
  getCast,
  getMovieByCreatAt,
  getMovieByScore,
} from '../../Redux/actions/movieAction';
import {
  getCategory
} from '../../Redux/actions/categoryAction'
import { MySpinner, MyHighLightButton } from '../views';
import { ROUTE_KEY } from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import Orientation from 'react-native-orientation';
import colors from '../../constants/style/colors';
import { Fonts } from '../../utils/Fonts';
// import YouTube from 'react-native-youtube';

//Fake data 
const menu = ["Nổi bật", "Phim bộ", "Điện Ảnh", "TV Show", "Thiếu Nhi", "Nổi bật 2", "Phim bộ 2", "Điện Ảnh 2", "TV Show 2", "Thiếu Nhi 2"]


export default function Home({ navigation }) {
  const userReducer = useSelector((state) => state.userReducer);
  // console.log('1001 image,: ', userReducer);
  const [loading, setLoading] = useState(true);
  const [dataCast, setDataCast] = useState();
  const [dataMovie, setDataMovie] = useState();
  const [dataCartoon, setDataCartoon] = useState();
  const [dataCate, setDataCate] = useState();

  const [dataMovieByCreat, setDataMovieByCreat] = useState();
  const [dataMovieByScore, setDataMovieByScore] = useState();
  const [height, setHeight] = useState();
  const [page, setPage] = useState(1);
  const [scrollY, setScrollY] = useState(0)
  const [fullScreen, setFullScreen] = useState(false);
  const url = 'aF8U_uSsXSA';
  const initial = Orientation.getInitialOrientation();

  // const navigation = useNavigation();
  // console.log(dataMovie.length);

  // for(var i=0; i<creat; i++){
  //   console.log("7777777: ", creat[i]);
  // }

  useEffect(() => {

    //get cate
    getCategory()
      .then((category) => {
        setLoading(false), setDataCate(category);
      })
      .catch((err) => console.log('Failed'));

    // xet data cho cartoon
    getCartoon()
      .then((cartoon) => {
        setLoading(false), setDataCartoon(cartoon);
      })
      .catch((err) => console.log('Failed'));

    getAllMovie()
      .then((movie) => {
        console.log('movie', movie.items[0].trailer),
          // console.log('==========', movie.items[1].create_at),
          setLoading(false),
          setDataMovie(movie);

        // setDataTrailer();
      })
      .catch((err) => console.log('Failed'));

    getCast()
      .then((cast) => {
        // console.log('movie', movie),
        setLoading(false), setDataCast(cast);
      })
      .catch((err) => console.log('failed'));

    getMovieByCreatAt()
      .then((movieByCreat) => {
        // console.log('==========', movie.items[1].create_at),
        setLoading(false), setDataMovieByCreat(movieByCreat);

        // setDataTrailer();
      })
      .catch((err) => console.log('Failed'));

    getMovieByScore()
      .then((movieScore) => {
        // console.log('movie', movie),
        setLoading(false), setDataMovieByScore(movieScore);
      })
      .catch((err) => console.log('failed'));
  }, []);

  //   const creat =  dataMovie?.items.map((c, i) => ({

  //     create_at: c.create_at

  // }));

  // console.log("---------------",creat);

  // console.log('map ', dataMovie);

  // loading
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

  const onScroll = (event) => {
    let posY = event.nativeEvent.contentOffset.y
    //console.log(posY);
    setScrollY(posY)
  }



  return (
    <View style={styles.container} >
      <StatusBar translucent={false} backgroundColor="#fff" />
      <View style={styles.topNav} >
        <View style={styles.topNavTop} >
          <View style={{ flex: 1 }}>
            <Image
              style={styles.topNavAvt}
              source={{
                uri:
                  userReducer.facebookInfo?.photo !== undefined
                    ? userReducer?.facebookInfo?.photo
                    : userReducer?.googleInfo?.photo,
              }}
            />
          </View>

          <View style={styles.topNavIcon}>
            <TouchableOpacity onPress={() => navigation.push(ROUTE_KEY.Search)}>
              <Icon name="search" size={24} color="#000" />
            </TouchableOpacity>

            <View style={{ width: 16 }} />

            <TouchableOpacity>
              <Icon name="bell" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView

          style={styles.bottomNav}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {dataCate?.items.map((c, i) => {
            return (
              <TouchableOpacity style={styles.cate}>
                <Text style={{ fontFamily: Fonts.SansMedium }}>{c.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.container}
        onScroll={onScroll}
      >
        {/* Continue Watching */}
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Continue Watching</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonB}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageB} source={{ uri: c.cover_img }} />

                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View> */}

        {/* Trending */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Trending</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonC}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageC} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        {/* New */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >New</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonC}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageC} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        {/* Recommend */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Recommend</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonD}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageD} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        {/* Trailer */}
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Trailer</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton style={styles.buttonF}>
                  <Player url={c.trailer} fullScreen={onFullScreen} />
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View> */}

        {/* Cast */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Cast</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonA}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageA} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>


        {/* Action Film */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Action</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonC}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageC} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        {/* Romance Film */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Romance</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonC}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageC} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        {/* Science Film */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Science</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonC}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageC} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        {/* Cartoon Film */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { flex: 1 }]} >Cartoon</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonC}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageC} source={{ uri: c.cover_img }} />
                  <Text
                    style={{ fontFamily: Fonts.Sans }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{c.name}</Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        {/* <View style={styles.containerA}>
        <View style={[styles.groupA,]}>
          <Image
            style={styles.imageA}
            source={{
              uri:
                userReducer.facebookInfo?.photo !== undefined
                  ? userReducer?.facebookInfo?.photo
                  : userReducer?.googleInfo?.photo,
            }}
          />
        </View>  
        <View style={styles.groupA1}>
          <TextC
            color="#333"
            medium
            heavy
            numberOfLines={1}
            ellipsizeMode="tail">
            {userReducer.facebookInfo?.name !== undefined
              ? userReducer.facebookInfo?.name
              : userReducer.googleInfo.name}
          </TextC>
          <TextC
            a
            color="#333"
            medium
            light
            numberOfLines={1}
            ellipsizeMode="tail">
            ID:{' '}
            {userReducer.facebookInfo?.id !== undefined
              ? userReducer.facebookInfo?.id
              : userReducer.googleInfo.id}
          </TextC>
        </View>  
     >
      </View> */}

        {/* <View style={styles.groupB}>
          <Text style={styles.textB}>Continue Watching</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonB}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageB} source={{ uri: c.cover_img }} />
                  <View style={styles.myViewB}>
                    <Icon name={'play'} size={20} color="#fff" />
                  </View>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View> */}
        {/* 
        <View style={styles.groupB}>
          <Text style={styles.textContent}>New</Text>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovieByCreat?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonB}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageB} source={{ uri: c.cover_img }} />
                  <Text
                    style={styles.textC}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {c.name}
                  </Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.groupB}>
          <Text style={styles.textContent}>Recommed</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovieByCreat?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonB}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageB} source={{ uri: c.cover_img }} />
                  <Text
                    style={styles.textC}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {c.name}
                  </Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.groupB}>
          <Text style={styles.textContent}>Trending</Text>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovieByScore?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  style={styles.buttonB}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c._id })
                  }>
                  <Image style={styles.imageB} source={{ uri: c.cover_img }} />
                  <Text
                    style={styles.textC}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {c.name}
                  </Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.groupA1}>
          <Text style={styles.textD}>Cartoon</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}>
            {dataCartoon?.items.map((c, i) => {
              return (
                <MyHighLightButton
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: c.movie_id._id })
                  }>
                  <View style={styles.containerD}>
                    <View style={styles.groupA}>
                      <Image
                        style={styles.imageD}
                        source={{ uri: c.movie_id.cover_img }}
                      />
                    </View>
                    <View style={[styles.groupA1, styles.mT]}>
                      <Text
                        style={styles.textCartoon}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {c.movie_id.name}
                      </Text>
                      <Text
                        style={styles.textCartoon}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {c.movie_id.episode} Tập
                    </Text>
                    </View>
                    <View style={styles.mT}>
                      <MyHighLightButton>
                        <Feather
                          name={'more-horizontal'}
                          size={30}
                          color="#be2edd"
                        />
                      </MyHighLightButton>
                    </View>
                  </View>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ alignItems: 'center' }}>
          <MyHighLightButton style={styles.buttonD}>
            <Text style={[styles.textF, styles.c]}>View more</Text>
          </MyHighLightButton>
        </View>

        <View style={styles.groupB}>
          <Text style={styles.textContent}>Trailer</Text>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataMovie?.items.map((c, i) => {
              //console.log('00006 -> trailer', c.trailer);
              return (
                <MyHighLightButton style={styles.buttonF}>
                  <Player url={c.trailer} fullScreen={onFullScreen} />
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.groupB}> */}
        {/* <Text style={styles.textContent}>Cast</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataCast?.cast.map((c, i) => {
              return (
                <MyHighLightButton style={styles.buttonE}>
                  <Image style={styles.imageD} source={{ uri: c.cover_image }} />
                  <Text
                    style={styles.textE}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {c.name}
                  </Text>
                </MyHighLightButton>
              );
            })}
          </ScrollView>
        </View> */}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2
  },
  topNav: {
    flexDirection: "column",
    padding: 16,
    zIndex: 1,
    backgroundColor: "#fff"
  },

  topNavTop: {
    flexDirection: "row",
    marginBottom: 8
  },
  topNavAvt: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  topNavIcon: {
    flexDirection: "row"
  }
  ,
  bottomNav: {

  },
  cate: {
    marginRight: 12
  },
  cateText: {
    color: colors.black,
    fontFamily: Fonts.SansMedium
  }
  ,
  cateTextActive: {
    color: "#fff"
  },
  section: {
    flexDirection: "column",
    padding: 4,

    marginBottom: 16
  },

  sectionTitle: {
    fontFamily: Fonts.SansMedium,
    fontSize: 22,

  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8
  },
  //A
  buttonA: {
    alignItems: "center",
    padding: 4
  },

  imageA: {
    flex: 1,
    width: WIDTH / 5,
    height: WIDTH / 5,
    borderRadius: WIDTH / 3

  },
  //B


  //C
  buttonC: {
    width: WIDTH / 3,
    height: HEIGHT / 4.5,
    padding: 4
  },
  imageC: {
    flex: 1,
    borderRadius: 4
  },
  textC: {
    fontFamily: Fonts.Sans
  },
  //D,
  buttonD: {
    width: WIDTH / 2,
    height: HEIGHT / 4.5,
    padding: 4
  },
  imageD: {
    flex: 1,
    borderRadius: 4
  },
  textD: {
    fontFamily: Fonts.Sans
  },
  //E

  textE: {
    color: '#333',
    fontSize: 13 * WIDTH_SCALE,
    fontFamily: 'ProductSans-Bold',
  },
  buttonE: {
    width: 0.2 * WIDTH,
    height: 0.12 * HEIGHT,
    margin: 5 * WIDTH_SCALE,
  },
  //F
  textF: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 16 * WIDTH_SCALE,
  },
  buttonF: {
    width: WIDTH,
    height: WIDTH / 2
  },
  //-----------**------------//
  mR: {
    marginRight: 10 * WIDTH_SCALE,
  },
  mL: {
    marginLeft: 10 * WIDTH_SCALE,
  },
  mT: {
    marginTop: 15 * WIDTH_SCALE,
  },
  m: {
    margin: 5 * WIDTH_SCALE,
  },
  aI: {
    alignItems: 'center',
  },
  jC: {
    justifyContent: 'flex-start',
  },
  c: {
    color: '#be2edd',
  },
});
