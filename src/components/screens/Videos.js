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
  Modal,
  Animated
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Fonts } from '../../utils/Fonts';
import { getVideoByMovie, getFullMovie } from '../../Redux/actions/movieAction';
import { Play, Player } from '../views';
import Orientation from 'react-native-orientation';
import moment from 'moment';
import { MySpinner, MyHighLightButton } from '../views';
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants';
import { onChange } from 'react-native-reanimated';
import { ptColor } from '../../constants/styles';
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

const Videos = ({ navigation, params, route }) => {

  const _id = route.params?._id;
  const [fullScreen, setFullScreen] = useState(false);
  const [dataVideo, setDataVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [dataFullMovie, setDataFullMovie] = useState();
  const [idx, setIndex] = useState(0);
  const [title, setTitle] = useState();
  const initial = Orientation.getInitialOrientation();
  const [url, setUrl] = useState('r_G69vVBaww');
  //NguyenHai editted here
  const userInfo = useSelector((state) => state.userReducer?.userInfo);

  const [videoId, setVideoId] = useState('');
  const [watchedVideoAt, setTimeWatchedVideo] = useState(new Date());
  const [page, setPage] = useState(0);
  const videoRef = useRef(videoId)

  const [visible, setVisible] = useState(true);

  //Animation
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    //Animation 
    if (visible) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [visible])

  //=====

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

  //componet unMount
  useEffect(() => {
    return () => {
      handleAddHistoryAPI()
      Orientation.lockToPortrait();
    }
  }, [])

  //=====================//

  //console.log('1001 type play video screen ', fullScreen);

  useEffect(() => {
    getVideoByMovie(_id)
      .then(video => {
        setDataVideo(video);
        setLoading(false);
        console.log("EPISODES VIDEO: ", video);
      })
      .catch((err) => console.log('Failed', err));

    getFullMovie(_id)
      .then((fullmovie) => {
        setDataFullMovie(fullmovie);
        setLoading(false);
      })
      .catch((err) => console.log('Failed', err));

    onFullScreen();

    autoHiddenModal();

  }, []);

  const autoHiddenModal = () => {
    setTimeout(() => {
      setVisible(false);
    }, 5000)
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

  const backToDetail = () => {
    setVisible(false);
    Orientation.lockToPortrait();
    navigation.goBack()
  }

  const day = renderDays(
    moment(dataFullMovie?.movie[0]?.update_at, 'YYYY-MM-DDTHH:mm:ss').day(),
  );
  const time = moment(dataFullMovie?.movie[0]?.update_at).format('HH:mm');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} barStyle={'dark-content'} translucent={true} backgroundColor="transparent" />

      <View style={{ flex: 1, zIndex: 1 }}>
        <Player url={url} fullScreen={onFullScreen} height={HEIGHT} />
      </View>

      <View
        style={{
          left: 0,
          height: WIDTH,
          width: WIDTH * 0.05,
          backgroundColor: 'transparent',
          position: 'absolute',
          zIndex: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <Animated.View
          style={{
            opacity: fadeAnim
          }}
        >
          <View
            style={{
              borderTopRightRadius: 5,
              backgroundColor: ptColor.white,
              borderBottomRightRadius: 5,
              justifyContent: 'center', alignItems: 'center'
            }}>
            <MyHighLightButton onPress={() => showModal()} >
              <Icon name="chevron-up" size={18} color={ptColor.black} />
            </MyHighLightButton>
          </View>

        </Animated.View>
      </View>

      <Modal visible={visible} animationType={'slide'} transparent={true} >
        <View style={{
          backgroundColor: 'transparent',
          height: WIDTH * 0.15,
          width: HEIGHT,
        }} />
        <View
          style={{
            backgroundColor: '#fff',
            height: WIDTH * 0.85,
            width: HEIGHT * 0.97,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            marginLeft: 8,
            paddingRight: 8,
            paddingLeft: 8,
            paddingTop: 5
          }}>
          {/* Modal Header */}
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <MyHighLightButton onPress={() => backToDetail()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="arrow-left" size={22} color={ptColor.black} />
                  <Text style={{ color: ptColor.black, fontFamily: Fonts.SansMedium }}> Back</Text>
                </View>
              </MyHighLightButton>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <MyHighLightButton onPress={() => hideModal()}>
                <Icon name="x" size={22} color={ptColor.black} />
              </MyHighLightButton>
            </View>
          </View>

          {/* Modal Body */}
          <View style={{ marginTop: 10, width: '100%', height: '100%' }}>
            <View style={styles.card}>
              <Text style={styles.header}>Chọn tập phim:</Text>
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
                  numColumns={10}
                />
              </View>
            </View>
          </View>

        </View>
      </Modal>

    </View >
  );

};
export default Videos;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingLeft: 3,
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
    fontSize: 16 * WIDTH_SCALE,
    fontFamily: Fonts.SansMedium,
    color: ptColor.gray2,
    height: WIDTH * 0.06
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
  },
  containerStyle: {
    zIndex: 101,
    height: HEIGHT * 0.9,
    width: WIDTH * 1.9,
    backgroundColor: '#fff',
    marginTop: - HEIGHT * 0.9,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }
});


// return (
//   <ScrollView>

//     <StatusBar backgroundColor="#000" barStyle="dark-content" />
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: '#F2F5FB',
//       }}>
//       <View
//         style={{
//           margin: 0,
//           overflow: 'hidden',
//           backgroundColor: ptColor.divider,
//         }}>
//         <Player url={url} fullScreen={onFullScreen} />
//       </View>
//       {!fullScreen ? (
//         <View style={{ marginTop: 0, flex: 1 }}>
//           {/* Videos of Movie */}
//           <View style={styles.card}>
//             <Text style={styles.header}>
//               {/* [{dataFullMovie?.movie[0]?.language}] -{' '} */}
//               {dataFullMovie?.movie[0]?.name}{' '}
//               {/* {title ? title : dataVideo?.items[0]?.title} */}
//             </Text>

//             <View style={{ width: WIDTH * 0.2, flexDirection: 'row', marginTop: 10 }} >
//               <Text style={{
//                 marginRight: 10,
//                 color: "#e056fd",
//                 fontFamily: Fonts.SansMedium,
//                 fontSize: 18
//               }}>{sqrtStar}</Text>
//               <StarRating
//                 activeOpacity={1}
//                 starStyle={{ width: 23 }}
//                 starSize={20}
//                 fullStarColor={'#f1c40f'}
//                 disabled={false}
//                 maxStars={5}
//                 rating={sqrtStar}
//                 emptyStarColor={'#f1c40f'}
//               />
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
//               <Text style={{
//                 fontFamily: Fonts.SansLight,
//                 fontSize: 12,
//                 color: ptColor.gray2,
//                 marginTop: 8,
//               }}>{starCount} người đã đánh giá</Text>
//               <Text style={{
//                 color: "#e056fd",
//                 fontFamily: Fonts.SansMedium,
//                 fontSize: 12,
//                 marginTop: 8,
//                 marginLeft: 8,
//               }}>
//                 Tôi muốn đánh giá!
//               </Text>
//             </View>
//             <View style={styles.detailsContainer}>
//               <Text style={styles.details}>
//                 {dataFullMovie?.movie[0]?.years}
//               </Text>
//               <View style={styles.divider} />
//               <Text style={styles.details}>
//                 {dataFullMovie?.movie[0]?.country}
//               </Text>
//               <View style={styles.divider} />
//               <Text style={styles.details}>
//                 {dataFullMovie?.movie[0]?.language}
//               </Text>
//               <View style={styles.divider} />
//             </View>

//             <View style={{ marginTop: 10 * WIDTH_SCALE }}>
//               <Text
//                 style={styles.details}
//                 numberOfLines={numOfLine}
//                 ellipsizeMode={'tail'}>
//                 {dataFullMovie?.movie[0]?.introduction}
//               </Text>
//               <Text style={{
//                 fontFamily: Fonts.SansLight,
//                 fontSize: 12,
//                 color: '#e056fd',
//                 marginTop: 8,
//               }}
//                 onPress={() => seeMoreOnPress()}
//               >
//                 Xem thêm
//             </Text>
//             </View>
//           </View>

//           {/* Episode of Move */}
          // <View style={styles.card}>
          //   <Text style={styles.header}>Chọn tập</Text>
          //   <Text
          //     style={{
          //       fontSize: 14 * WIDTH_SCALE,
          //       fontFamily: Fonts.Sans,
          //       marginBottom: 16,
          //       color: ptColor.gray2,
          //     }}>
          //     Cập nhật vào {day} hàng tuần vào lúc {time}
          //   </Text>
          //   <View style={{ flex: 1 }}>
          //     <FlatList
          //       keyExtractor={(item) => {
          //         return item._id;
          //       }}
          //       data={dataVideo?.items}
          //       renderItem={({ item, index }) => (
          //         <View
          //           style={styles.itemEp}
          //           onPress={() => {
          //             setIndex(index);
          //             setTitle(item.title);
          //           }}>
          //           <Text style={{
          //             color: idx === index ? '#0984e3' : 'black',
          //           }}>
          //             {index + 1}
          //           </Text>
          //         </View>
          //       )}
          //       numColumns={6}
          //     />
          //   </View>
          // </View>
//         </View>
//       ) : null
//       }
//     </View >
//   </ScrollView>
// );