import React, { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  BackHandler,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fonts } from '../../utils/Fonts';
import { getVideoByMovie, getFullMovie } from '../../Redux/actions/movieAction';
import { Play, Player } from '../views';
import Orientation from 'react-native-orientation';
import moment from 'moment';

import { MySpinner } from '../views';
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants';
import { onChange } from 'react-native-reanimated';
import { ptColor } from '../../constants/styles';
import starData from './childScreens/data';
import StarRating from 'react-native-star-rating';

//NguyenHai editted from here
import { addHistoryByMovieId } from '../../Redux/actions/historyAction'
import { useSelector } from 'react-redux';

function renderDays(idx) {
  if (idx === 7) {
    return 'Chủ Nhật';
  } else {
    return 'Thứ ' + (idx + 1);
  }
}

const url = 'r_G69vVBaww';

const Videos = ({ navigation, params, route }) => {

  const _id = route.params?._id;
  const [fullScreen, setFullScreen] = useState(false);
  const [dataVideo, setDataVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [dataFullMovie, setDataFullMovie] = useState();
  const [idx, setIndex] = useState(0);
  const [title, setTitle] = useState();
  const initial = Orientation.getInitialOrientation();

  //NguyenHai editted here
  const userInfo = useSelector((state) => state.userReducer?.userInfo);

  const [videoId, setVideoId] = useState('');
  const [watchedVideoAt, setTimeWatchedVideo] = useState(new Date());
  const [starCount, setStarCount] = useState();
  const [sumStar, setSumStar] = useState();
  const [sqrtStar, setSqrtStar] = useState();
  const [numOfLine, setNumOfLine] = useState(1);
  const [seeMoreTitle, setSeeMoreTitle] = useState("Xem thêm");
  const [page, setPage] = useState(0);
  const videoRef = useRef(videoId)

  useEffect(() => {
    videoRef.current = dataVideo?.items[idx]?._id
    //console.log(videoRef.current)
  }, [idx])

  const handleAddHistoryAPI = () => {
    let userId = userInfo?._id;
    setTimeWatchedVideo(new Date());
    let date = watchedVideoAt.getTime();

    console.log("\n_idMovie: " + _id +
      "\nVideo: " + videoRef.current +
      "\nWatched At: " + date +
      "\nUserId: " + userId);

    addHistoryByMovieId(_id, videoRef.current, date, userId);
  }

  useEffect(() => {
    return () => {
      handleAddHistoryAPI()
    }
  }, [])

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

  //=====================//

  //console.log('1001 type play video screen ', fullScreen);

  useEffect(() => {
    getVideoByMovie(_id)
      .then(video => {
        setDataVideo(video);
        setLoading(false);
        console.log(video);
      })
      .catch((err) => console.log('Failed', err));

    getFullMovie(_id)
      .then((fullmovie) => {
        setDataFullMovie(fullmovie);
        setLoading(false);
      })
      .catch((err) => console.log('Failed', err));

  }, []);

  const seeMoreOnPress = () => {
    if (numOfLine === 1) {
      setNumOfLine(10)
      setSeeMoreTitle("Thu gọn")
    } else {
      setNumOfLine(1)
      setSeeMoreTitle("Xem thêm")
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

  const day = renderDays(
    moment(dataFullMovie?.movie[0]?.update_at, 'YYYY-MM-DDTHH:mm:ss').day(),
  );
  const time = moment(dataFullMovie?.movie[0]?.update_at).format('HH:mm');

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  const handleLoadMore = () => {
    if (!loading) {
      page = page + 1; // increase page by 1
      fetchUser(page); // method for API call 
    }
  };

  return (
    <ScrollView>

      <StatusBar backgroundColor="#000" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F2F5FB',
        }}>
        <View
          style={{
            margin: 0,
            overflow: 'hidden',
            backgroundColor: ptColor.divider,
          }}>
          <Player url={url} fullScreen={onFullScreen} />
        </View>
        {!fullScreen ? (
          <View style={{ marginTop: 0, flex: 1 }}>
            {/* Videos of Movie */}
            <View style={styles.card}>
              <Text style={styles.header}>
                {/* [{dataFullMovie?.movie[0]?.language}] -{' '} */}
                {dataFullMovie?.movie[0]?.name}{' '}
                {/* {title ? title : dataVideo?.items[0]?.title} */}
              </Text>

              <View style={{ width: WIDTH * 0.2, flexDirection: 'row', marginTop: 10 }} >
                <Text style={{
                  marginRight: 10,
                  color: "#e056fd",
                  fontFamily: Fonts.SansMedium,
                  fontSize: 18
                }}>{sqrtStar}</Text>
                <StarRating
                  activeOpacity={1}
                  starStyle={{ width: 23 }}
                  starSize={20}
                  fullStarColor={'#f1c40f'}
                  disabled={false}
                  maxStars={5}
                  rating={sqrtStar}
                  emptyStarColor={'#f1c40f'}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                  fontFamily: Fonts.SansLight,
                  fontSize: 12,
                  color: ptColor.gray2,
                  marginTop: 8,
                }}>{starCount} người đã đánh giá</Text>
                <Text style={{
                  color: "#e056fd",
                  fontFamily: Fonts.SansMedium,
                  fontSize: 12,
                  marginTop: 8,
                  marginLeft: 8,
                }}>
                  Tôi muốn đánh giá!
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.details}>
                  {dataFullMovie?.movie[0]?.years}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.details}>
                  {dataFullMovie?.movie[0]?.country}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.details}>
                  {dataFullMovie?.movie[0]?.language}
                </Text>
                <View style={styles.divider} />
              </View>

              <View style={{ marginTop: 10 * WIDTH_SCALE }}>
                <Text
                  style={styles.details}
                  numberOfLines={numOfLine}
                  ellipsizeMode={'tail'}>
                  {dataFullMovie?.movie[0]?.introduction}
                </Text>
                <Text style={{
                  fontFamily: Fonts.SansLight,
                  fontSize: 12,
                  color: '#e056fd',
                  marginTop: 8,
                }}
                  onPress={() => seeMoreOnPress()}
                >
                  Xem thêm
              </Text>
              </View>
            </View>

            {/* Episode of Move */}
            <View style={styles.card}>
              <Text style={styles.header}>Chọn tập</Text>
              <Text
                style={{
                  fontSize: 14 * WIDTH_SCALE,
                  fontFamily: Fonts.Sans,
                  marginBottom: 16,
                  color: ptColor.gray2,
                }}>
                Cập nhật vào {day} hàng tuần vào lúc {time}
              </Text>
              <View style={{ flex: 1 }}>
                <FlatList
                  keyExtractor={(item) => {
                    return item._id;
                  }}
                  data={dataVideo?.items}
                  renderItem={({ item, index }) => (
                    <View
                      style={styles.itemEp}
                      onPress={() => {
                        setIndex(index);
                        setTitle(item.title);
                      }}>
                      <Text style={{
                        color: idx === index ? '#0984e3' : 'black',
                      }}>
                        {index + 1}
                      </Text>
                    </View>
                  )}
                  numColumns={6}
                />
              </View>
            </View>
          </View>
        ) : null
        }
      </View >
    </ScrollView>
  );
};
export default Videos;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 8,
    borderRadius: 4,
    padding: 16,
    flex: 1,
  },
  rowRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  mr: {
    marginVertical: 4,
  },
  header: {
    fontSize: 18,
    fontFamily: Fonts.SansMedium,
    height: 30,
    color: '#000'
  },
  itemEp: {
    flex: 1,
    backgroundColor: "#F2F5FB",
    margin: 4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: ptColor.gray2,
    height: 13,
    width: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
  },
  details: {
    color: ptColor.gray2,
    fontSize: 12
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  }
});
