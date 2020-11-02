import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Play, Player} from '../views';
import {set} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {
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
import {MySpinner, MyHighLightButton} from '../views';
import {ROUTE_KEY} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import Orientation from 'react-native-orientation';
// import YouTube from 'react-native-youtube';

export default function Home({navigation}) {
  const userReducer = useSelector((state) => state.userReducer);
  console.log('1001 image,: ', userReducer);
  const [loading, setLoading] = useState(true);
  const [dataCast, setDataCast] = useState();
  const [dataMovie, setDataMovie] = useState();
  const [dataCartoon, setDataCartoon] = useState();
  const [dataMovieByCreat, setDataMovieByCreat] = useState();
  const [dataMovieByScore, setDataMovieByScore] = useState();
  const [height, setHeight] = useState();
  const [page, setPage] = useState(1);

  const [fullScreen, setFullScreen] = useState(false);
  const url = 'aF8U_uSsXSA';
  const initial = Orientation.getInitialOrientation();

  // const navigation = useNavigation();
  // console.log(dataMovie.length);

  // for(var i=0; i<creat; i++){
  //   console.log("7777777: ", creat[i]);
  // }

  useEffect(() => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerA}>
        <View style={[styles.groupA, styles.mL]}>
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
        <View style={[styles.groupA, styles.mR, styles.aI]}>
          <TouchableOpacity
            style={{marginRight: 10 * WIDTH_SCALE}}
            onPress={() => navigation.push(ROUTE_KEY.Search)}>
            <FontAwesome5 name={'search'} size={0.06 * WIDTH} color="#be2edd" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={'notifications'} size={0.06 * WIDTH} color="#be2edd" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.groupB}>
        <Text style={styles.textB}>Continue Watching</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie?.items.map((c, i) => {
            return (
              <MyHighLightButton
                style={styles.buttonB}
                onPress={() =>
                  navigation.push(ROUTE_KEY.Details, {_id: c._id})
                }>
                <Image style={styles.imageB} source={{uri: c.cover_img}} />
                <View style={styles.myViewB}>
                  <Icon name={'play'} size={20} color="#fff" />
                </View>
              </MyHighLightButton>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.groupB}>
        <Text style={styles.textContent}>New</Text>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovieByCreat?.items.map((c, i) => {
            return (
              <MyHighLightButton
                style={styles.buttonB}
                onPress={() =>
                  navigation.push(ROUTE_KEY.Details, {_id: c._id})
                }>
                <Image style={styles.imageB} source={{uri: c.cover_img}} />
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
                  navigation.push(ROUTE_KEY.Details, {_id: c._id})
                }>
                <Image style={styles.imageB} source={{uri: c.cover_img}} />
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
                  navigation.push(ROUTE_KEY.Details, {_id: c._id})
                }>
                <Image style={styles.imageB} source={{uri: c.cover_img}} />
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
                  navigation.push(ROUTE_KEY.Details, {_id: c.movie_id._id})
                }>
                <View style={styles.containerD}>
                  <View style={styles.groupA}>
                    <Image
                      style={styles.imageD}
                      source={{uri: c.movie_id.cover_img}}
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

      <View style={{alignItems: 'center'}}>
        <MyHighLightButton style={styles.buttonD}>
          <Text style={[styles.textF, styles.c]}>View more</Text>
        </MyHighLightButton>
      </View>

      <View style={styles.groupB}>
        <Text style={styles.textContent}>Trailer</Text>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie?.items.map((c, i) => {
            console.log('00006 -> trailer', c.trailer);
            return (
              <MyHighLightButton style={styles.buttonF}>
                <Player url={c.trailer} fullScreen={onFullScreen} />
              </MyHighLightButton>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.groupB}>
        <Text style={styles.textContent}>Cast</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataCast?.cast.map((c, i) => {
            return (
              <MyHighLightButton style={styles.buttonE}>
                <Image style={styles.imageD} source={{uri: c.cover_image}} />
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  //A
  containerA: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 40 * WIDTH_SCALE,
    paddingLeft: 10 * WIDTH_SCALE,
  },
  groupA: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  groupA1: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageA: {
    width: 0.15 * WIDTH,
    height: 0.07 * HEIGHT,
    borderRadius: 10 * WIDTH_SCALE,
  },
  //B
  groupB: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5 * WIDTH_SCALE,
  },
  textB: {
    fontSize: 20 * WIDTH_SCALE,
    fontFamily: 'ProductSans-Bold',
    color: '#000',
    paddingLeft: 10 * WIDTH_SCALE,
  },
  buttonB: {
    width: 0.48 * WIDTH,
    height: 0.37 * HEIGHT,
    margin: 5 * WIDTH_SCALE,
    marginBottom: 20 * WIDTH_SCALE,
  },
  imageB: {
    width: 0.48 * WIDTH,
    height: 0.34 * HEIGHT,
    borderRadius: 10 * WIDTH_SCALE,
  },
  myViewB: {
    width: 0.1 * WIDTH,
    height: 0.05 * HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 2,
    alignItems: 'center',
    backgroundColor: '#e056fd',
    borderRadius: 25 * WIDTH_SCALE,
    right: 20 * WIDTH_SCALE,
    bottom: 5 * WIDTH_SCALE,
  },
  //C
  textC: {
    color: '#333',
    fontSize: 16 * WIDTH_SCALE,
    fontFamily: 'ProductSans-Bold',
  },
  textContent: {
    color: '#000',
    fontFamily: 'ProductSans-Regular',
    fontSize: 16 * WIDTH_SCALE,
    paddingLeft: 10 * WIDTH_SCALE,
  },
  //D
  textD: {
    color: '#000',
    fontFamily: 'ProductSans-Regular',
    fontSize: 20 * WIDTH_SCALE,
    paddingLeft: 10 * WIDTH_SCALE,
  },
  containerD: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10 * WIDTH_SCALE,
  },
  textCartoon: {
    color: '#000',
    fontFamily: 'ProductSans-Regular',
    fontSize: 16 * WIDTH_SCALE,
  },
  buttonD: {
    width: 0.26 * WIDTH,
    height: 0.06 * HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#be2edd',
    borderRadius: 5 * WIDTH_SCALE,
    margin: 30 * WIDTH_SCALE,
  },
  imageD: {
    width: 0.2 * WIDTH,
    height: 0.095 * HEIGHT,
    borderRadius: 10 * WIDTH_SCALE,
  },
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
  textF: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 16 * WIDTH_SCALE,
  },
  buttonF: {
    width: 0.97 * WIDTH,
    height: 0.33 * HEIGHT,
    paddingHorizontal: 5 * WIDTH_SCALE,
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
