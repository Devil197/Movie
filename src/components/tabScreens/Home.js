import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image, StatusBar, Dimensions, Animated, Easing, ScrollView, TextInput, FlatList, ImageBackground
} from 'react-native';
import { Play, Player, RenderCategory } from '../views';
import { set } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Feather';
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
import { ptColor } from '../../constants/styles'
import ViewPager from '@react-native-community/viewpager';

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
import { MySpinner, MyHighLightButton, HomeHeader, FeaturesContents, RenderContentsByCategory } from '../views';
import { ROUTE_KEY, STATUS_BAR_CURRENT_HEIGHT } from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import Orientation from 'react-native-orientation';
import colors from '../../constants/style/colors';
import { Fonts } from '../../utils/Fonts';
import { getEvalByMovieId } from '../../Redux/actions/evalAction';
import { SkypeIndicator } from 'react-native-indicators';

const IMAGE_SIZE = 45 * WIDTH_SCALE;
const HEADER_HEIGHT = 110 * WIDTH_SCALE;
const AnimatedIcon = Animated.createAnimatedComponent(Icons);

export default function Home({ navigation }) {

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState()
  const [categoryItemSelected, setCategoryItemSelected] = useState(0)
  const [dataMovieByScore, setDataMovieByScore] = useState();

  useEffect(() => {
    handleAPI_getMovieByIMDbScore();
    handleAPI_getAllCategory();
  }, [])

  const handleAPI_getMovieByIMDbScore = async () => {
    await getMovieByScore()
      .then((result) => {
        //console.log("MOVIE BY SCORE: ", result?.items);
        setDataMovieByScore(result?.items);
      })
      .catch((err) => console.log('MOVIE SCORE: ', err));
  }

  const handleAPI_getAllCategory = async () => {
    await getCategory().then(result => {
      //console.log("CATEGORY: ", result?.items);
      setCategories(result?.items);
    })
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar translucent={false} backgroundColor='rgba(0, 0, 0, 0.3)' barStyle="light-content" />

      <HomeHeader
        data={categories}
        navigation={navigation}
        onItemSelected={_id => {
          setCategoryItemSelected(_id);
        }}
      />

      {/* MAIN CONTENTS */}
      {
        categoryItemSelected === 0
          ?
          <FeaturesContents
            highScoreMovies={dataMovieByScore}
            navigation={navigation}
          />
          :
          <RenderContentsByCategory />
      }


      {/* LOADING SƯƠNG SƯƠNG */}
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

    </View>
  )
}

const styles = StyleSheet.create({

})


//======================================================//


// export default function Home({ navigation }) {
//   const userReducer = useSelector((state) => state.userReducer);
//   //console.log('1001 USER INFO:', userReducer);
//   const [loading, setLoading] = useState(true);
//   const [dataCast, setDataCast] = useState();
//   //const [movie10Min, setMovie10Min] = useState([]);
//   const [dataCartoon, setDataCartoon] = useState();
//   const [dataCate, setDataCate] = useState();
//   const [dataMovieByCreat, setDataMovieByCreat] = useState();
//   const [dataMovieByScore, setDataMovieByScore] = useState();
//   const [ratingDataMovieScore, setRatingDataMovieScore] = useState();

//   const [txtValue, setTxtValue] = useState('');
//   const offset = new Animated.Value(0);
//   var movie10Min = [];
//   useEffect(() => {


//     // // xet data cho cartoon
//     // getCartoon()
//     //   .then((cartoon) => {
//     //     setLoading(false), setDataCartoon(cartoon);
//     //   })
//     //   .catch((err) => console.log('Failed'));

//     // getAllMovie()
//     //   .then((movie) => {
//     //     //console.log('movie', movie.items[0].trailer),
//     //     // console.log('==========', movie.items[1].create_at),
//     //     setLoading(false),
//     //       setDataMovie(movie);

//     //     // setDataTrailer();
//     //   })
//     //   .catch((err) => console.log('Failed'));

//     // getCast()
//     //   .then((cast) => {
//     //     // console.log('movie', movie),
//     //     setLoading(false), setDataCast(cast);
//     //   })
//     //   .catch((err) => console.log('failed'));

//     handleGetAllCategoryAPI();
//     //handleGetAllMovieAPI();
//     handleGetMovieScoreAPI();
//   }, []);

//   const handleGetAllCategoryAPI = async () => {
//     await getCategory()
//       .then((category) => {
//         console.log("CATEGORY: ", category);
//         setDataCate(category);
//       })
//       .catch((err) => console.log('Category API: ', err));
//   }

//   const handleGetAllMovieAPI = async () => {
//     await getAllMovie()
//       .then((result) => {
//         //console.log("MOVIE ALL: ", result?.items);
//         result?.items.forEach(element => {
//           //console.log("ELE: ", element);
//           if (element?.duration === 10) {
//             if (handleDateOfMovie(element?.create_at) === true) {
//               //setMovie10Min(old => [...old, element]);
//               movie10Min.push(element);
//               //console.log("MOVIE 10 MIN: ", movie10Min);
//             }
//           }
//         })
//       })
//       .catch((err) => console.log('Failed'));
//   }

//   const handleGetMovieScoreAPI = async () => {
//     await getMovieByScore()
//       .then((result) => {
//         //console.log("MOVIE BY SCORE: ", result?.items);
//         setDataMovieByScore(result?.items);
//       })
//       .catch((err) => console.log('MOVIE SCORE: ', err));

//     setLoading(false);
//   }

//   const handleDateOfMovie = (date) => {
//     let dateData = new Date(date);
//     let now = new Date();
//     if (dateData.getFullYear() === now.getFullYear() && dateData.getMonth() === now.getMonth()) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   if (loading) {
//     MySpinner.show();
//     return (
//       <View
//         style={{
//           flex: 1,
//           width: WIDTH,
//           height: HEIGHT,
//           position: 'absolute',
//           zIndex: 9999,
//         }}
//       />
//     );
//   } else {
//     MySpinner.hide();
//   }


//   //ANIMATION ============================
//   //artist profile image position from left
//   const _getImageRightPosition = offset.interpolate({
//     inputRange: [0, 50],
//     outputRange: [15, 10],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   });

//   //artist profile image position from top
//   const _getImageTopPosition = offset.interpolate({
//     inputRange: [0, 50],
//     outputRange: [8, 6],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   });

//   //artist profile image height
//   const _getImageSize = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5],
//     outputRange: [IMAGE_SIZE, IMAGE_SIZE - 5],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   });

//   //artist profile image border width
//   const _getImageBorderWidth = offset.interpolate({
//     inputRange: [0, 50],
//     outputRange: [2, 1],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   });

//   //top title opacity 
//   const _getTopTitleOpacity = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.2, HEADER_HEIGHT * 0.6],
//     outputRange: [1, 0.1, 0],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   //get header backgroundColor
//   const backgroundColor = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5],
//     outputRange: ['rgba(254, 254, 254, 0)', 'rgba(254, 254, 254, 1)'],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   });

//   const _getHeaderHeight = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5],
//     outputRange: [HEADER_HEIGHT, HEADER_HEIGHT * 0.5],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getTextInputWidth = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.25, HEADER_HEIGHT * 0.5],
//     outputRange: [WIDTH * 0.92, WIDTH * 0.5, WIDTH * 0.075],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getTextInputHeight = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.25, HEADER_HEIGHT * 0.5],
//     outputRange: [HEADER_HEIGHT * 0.4, HEADER_HEIGHT * 0.3, HEADER_HEIGHT * 0.2],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getTextInputTopPosition = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5],
//     outputRange: [50, 25],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   });

//   const _getTextInputRightPosition = offset.interpolate({
//     inputRange: [0, 50],
//     outputRange: [15, WIDTH - 50],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   });

//   const _getIconOpacity = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5, HEADER_HEIGHT * 0.75, HEADER_HEIGHT],
//     outputRange: [0, 0, 0.5, 1],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getSearchIconTopPosition = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5, HEADER_HEIGHT * 0.75, HEADER_HEIGHT],
//     outputRange: [25, 17, 15, 10],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getSearchIconRightPosition = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5, HEADER_HEIGHT * 0.75, HEADER_HEIGHT],
//     outputRange: [WIDTH - 60, WIDTH - 50, WIDTH - 45, WIDTH - 40],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getHeightHeaderBar = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5],
//     outputRange: [HEADER_HEIGHT * 0.5, HEADER_HEIGHT * 0.5],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getTextPadding = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5],
//     outputRange: [5 * WIDTH_SCALE, 3 * WIDTH_SCALE],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getTextPaddingE = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.5],
//     outputRange: [7 * WIDTH_SCALE, 5 * WIDTH_SCALE],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   const _getOpacityTextInput = offset.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.25, HEADER_HEIGHT * 0.5],
//     outputRange: [1, 0.5, 1],
//     extrapolate: 'clamp',
//     useNativeDriver: true
//   })

//   //ANIMATION ============================

//   const handleSearchOnPress = () => {
//     navigation.push(ROUTE_KEY.Search, { _keyword: txtValue })
//   };

//   const handleMovieName = (name) => {
//     let lastCharSplitIndex = name.indexOf(']');
//     let mainName = name.slice(lastCharSplitIndex + 1, name.length);
//     if (mainName.indexOf(' ') === 0) {
//       return mainName.slice(1, mainName.length);
//     }
//     return mainName
//   }

//   const handleMainCatOfMovie = (name) => {
//     let firtChar = name.indexOf('[');
//     let lastCharSplitIndex = name.indexOf(']');
//     if (firtChar === -1 || lastCharSplitIndex === -1) {
//       return 'Movie';
//     }
//     return name.slice(firtChar + 1, lastCharSplitIndex)
//   }


//   return (
//     <View style={{ flex: 1, backgroundColor: ptColor.white }}>

//       <StatusBar translucent={false} backgroundColor={'#fff'} />

//       {/* HEADER */}
//       <Animated.View
//         style={{
//           position: 'absolute',
//           zIndex: 100,
//           height: _getHeaderHeight,
//           width: WIDTH,
//           backgroundColor: backgroundColor,
//         }}>

//         {/* Top title */}
//         <Animated.View
//           style={[{
//             flexDirection: 'row',
//             width: '100%',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: _getHeightHeaderBar,
//           }]}>
//           <Animated.Text
//             style={{
//               fontFamily: Fonts.SansBold,
//               fontSize: 25 * WIDTH_SCALE,
//               color: ptColor.white,
//               backgroundColor: 'black',
//               paddingLeft: _getTextPadding,
//               paddingRight: _getTextPadding,
//               borderRadius: 5 * WIDTH_SCALE,
//             }}>G</Animated.Text>
//           <View style={{ height: '100%', width: 3 * WIDTH_SCALE }} />
//           <Animated.Text
//             style={{
//               fontFamily: Fonts.SansBold,
//               fontSize: 25 * WIDTH_SCALE,
//               color: ptColor.white,
//               backgroundColor: '#f0ab0a',
//               paddingLeft: _getTextPaddingE,
//               paddingRight: _getTextPaddingE,
//               borderRadius: 5 * WIDTH_SCALE,
//             }}>E</Animated.Text>
//           <View style={{ height: '100%', width: 3 * WIDTH_SCALE }} />
//           <Animated.Text
//             style={{
//               fontFamily: Fonts.SansBold,
//               fontSize: 25 * WIDTH_SCALE,
//               color: ptColor.white,
//               backgroundColor: 'black',
//               paddingLeft: _getTextPadding,
//               paddingRight: _getTextPadding,
//               borderRadius: 5 * WIDTH_SCALE,
//             }}>A</Animated.Text>
//         </Animated.View>

//         {/* SEARCH */}
//         <Animated.View
//           style={[{
//             flexDirection: 'row',
//             position: 'absolute',
//             zIndex: 11,
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 40 * WIDTH_SCALE,
//             borderWidth: 1,
//             borderColor: '#f0ab0a',
//             width: _getTextInputWidth,
//             height: _getTextInputHeight,
//             opacity: _getTopTitleOpacity,
//             transform: [
//               { translateY: _getTextInputTopPosition },
//               { translateX: _getTextInputRightPosition }
//             ]
//           }]}>
//           <TextInput
//             caretHidden={true}
//             value={txtValue}
//             onChangeText={(txt) => {
//               setTxtValue(txt);
//             }}
//             placeholder={'Tìm kiếm thế giới của bạn!'}
//             placeholderTextColor={ptColor.gray2}
//             onSubmitEditing={handleSearchOnPress}
//             returnKeyType="search"
//             style={[{
//               textAlign: 'center',
//               width: '90%',
//               fontSize: 14 * WIDTH_SCALE,
//             }]}
//           />
//           {txtValue !== '' ? (
//             <Icons
//               onPress={() => setTxtValue('')}
//               name="x"
//               size={20 * WIDTH_SCALE}
//               color={ptColor.gray2}
//               style={{ position: 'absolute', right: 10 }}
//             />
//           ) : null}
//         </Animated.View>

//         <AnimatedIcon
//           onPress={() => navigation.push(ROUTE_KEY.Search, { _keyword: '' })}
//           name={'search'}
//           size={32 * WIDTH_SCALE}
//           color={'#f0ab0a'}
//           style={[{
//             position: 'absolute',
//             zIndex: 12,
//             opacity: _getIconOpacity,
//             transform: [
//               { translateY: _getSearchIconTopPosition },
//               { translateX: _getSearchIconRightPosition }
//             ]
//           }]}
//         />

//       </Animated.View>

//       {/* Top User Image */}
//       <Animated.Image
//         style={[{
//           position: 'absolute',
//           zIndex: 101,
//           borderWidth: _getImageBorderWidth,
//           borderColor: '#ceddf5',
//           borderRadius: 50 / 2,
//           height: _getImageSize,
//           width: _getImageSize,
//           transform: [
//             { translateY: _getImageTopPosition },
//             { translateX: _getImageRightPosition }
//           ]
//         }]}
//         source={{
//           uri:
//             userReducer.facebookInfo?.photo !== undefined
//               ? userReducer?.facebookInfo?.photo
//               : userReducer?.googleInfo?.photo,
//         }}
//         resizeMode={'cover'}
//       />

//       <Animated.ScrollView
//         contentContainerStyle={{
//           marginTop: 15 + HEADER_HEIGHT,
//           paddingBottom: HEIGHT * 0.46 / 1.5,
//         }}
//         showsVerticalScrollIndicator={false}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{
//             nativeEvent:
//             {
//               contentOffset:
//                 { y: offset }
//             }
//           }],
//           { useNativeDriver: false }
//         )}
//       >

//         {/* TOP 5 HOT MOVIE GET BY SCORE  */}
//         <View
//           style={{
//             marginTop: 10 * WIDTH_SCALE,
//             marginBottom: 25 * WIDTH_SCALE,
//           }}>
//           <Text
//             style={{
//               fontFamily: Fonts.SansBold,
//               fontSize: 18 * WIDTH_SCALE,
//               paddingLeft: 17 * WIDTH_SCALE,
//               marginBottom: 10 * WIDTH_SCALE,
//               color: ptColor.black
//             }}>
//             PHỔ BIẾN
//           </Text>
//           <MyCarousel movieData={dataMovieByScore} navigation={navigation} />
//         </View>

//         {/* Category */}
//         <View
//           style={{
//             marginTop: 10 * WIDTH_SCALE,
//             marginBottom: 25 * WIDTH_SCALE,
//             height: HEIGHT * 0.3,
//           }}>
//           <Text
//             style={{
//               fontFamily: Fonts.SansBold,
//               fontSize: 18 * WIDTH_SCALE,
//               paddingLeft: 17 * WIDTH_SCALE,
//               marginBottom: 10 * WIDTH_SCALE,
//               color: ptColor.black,
//             }}>
//             THỂ LOẠI
//           </Text>
//           {/* <RenderCategory
//             data={dataCate?.items}
//             navigation={navigation} /> */}
//         </View>

//         {/* PHIM XỊN TRONG NĂM */}
//         <View
//           style={{
//             height: HEIGHT * 0.46,
//             width: WIDTH,
//           }}>

//           <Text
//             style={{
//               fontFamily: Fonts.SansBold,
//               fontSize: 18 * WIDTH_SCALE,
//               paddingLeft: 17 * WIDTH_SCALE,
//               marginBottom: 10 * WIDTH_SCALE,
//               color: ptColor.black
//             }}>
//             TOP XỊN XÒ TRONG NĂM
//           </Text>

//           <FlatList
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={3}
//             keyExtractor={(item) => String(item._id)}
//             data={dataMovieByScore}
//             renderItem={({ item, index }) => {
//               return (
//                 <MyHighLightButton
//                   onPress={() => navigation.push(ROUTE_KEY.Details, { _id: item._id })}
//                   style={{
//                     height: HEIGHT * 0.45,
//                     width: WIDTH * 0.42,
//                     paddingLeft: 17 * WIDTH_SCALE,
//                   }}>

//                   <ImageBackground
//                     source={{ uri: item.cover_img }}
//                     style={{
//                       height: HEIGHT * 0.35,
//                       width: WIDTH * 0.39,
//                     }}
//                     imageStyle={{
//                       borderRadius: 10 * WIDTH_SCALE,
//                       marginBottom: 5 * WIDTH_SCALE,
//                     }}
//                     resizeMode={'cover'}
//                   >
//                     <Text
//                       style={{
//                         paddingHorizontal: 5 * WIDTH_SCALE,
//                         paddingVertical: 5 * WIDTH_SCALE,
//                         backgroundColor: 'rgba(0,0,0, 0.5)',
//                         position: 'absolute',
//                         zIndex: 12,
//                         bottom: 0,
//                         right: 0,
//                         color: '#fff',
//                         width: '100%',
//                         borderBottomLeftRadius: 10 * WIDTH_SCALE,
//                         borderBottomRightRadius: 10 * WIDTH_SCALE,
//                         fontFamily: Fonts.SansLight,
//                         fontSize: 14 * WIDTH_SCALE
//                       }}>{item.language}</Text>

//                     <Text
//                       style={{
//                         backgroundColor: 'rgba(0,0,0, 0.5)',
//                         position: 'absolute',
//                         zIndex: 12,
//                         top: 0,
//                         right: 0,
//                         color: '#fff',
//                         width: '100%',
//                         borderTopLeftRadius: 10 * WIDTH_SCALE,
//                         borderTopRightRadius: 10 * WIDTH_SCALE,
//                         fontFamily: Fonts.SansMedium,
//                         fontSize: 14 * WIDTH_SCALE,
//                         paddingHorizontal: 5 * WIDTH_SCALE,
//                         paddingVertical: 5 * WIDTH_SCALE,
//                         textAlign: 'center'
//                       }}
//                     >
//                       {handleMainCatOfMovie(item.name)} Of Year
//                   </Text>
//                   </ImageBackground>

//                   <Text
//                     style={{
//                       fontFamily: Fonts.SansMedium,
//                       fontSize: 14 * WIDTH_SCALE,
//                       paddingHorizontal: 5 * WIDTH_SCALE,
//                       marginTop: 5 * WIDTH_SCALE,
//                     }}
//                     numberOfLines={1}
//                     ellipsizeMode='tail'
//                   >
//                     {handleMovieName(item.name)}
//                   </Text>

//                   <View style={{ flexDirection: 'row', paddingHorizontal: 5 * WIDTH_SCALE, marginTop: 5 * WIDTH_SCALE }}>
//                     <Text style={{ fontSize: 13 * WIDTH_SCALE, fontFamily: Fonts.SansLight }}>
//                       IMDb: {item.score.toFixed(1)}
//                     </Text>
//                   </View>

//                 </MyHighLightButton>
//               )
//             }}
//             horizontal={true}
//           />
//         </View>

//         {/* New movies */}
//         <View style={{ marginTop: 25 * WIDTH_SCALE, marginHorizontal: 15 * WIDTH_SCALE }}>
//           <View style={{
//             marginBottom: 10 * WIDTH_SCALE,
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}>
//             <Text
//               style={{
//                 fontFamily: Fonts.SansBold,
//                 fontSize: 18 * WIDTH_SCALE,
//                 color: ptColor.black,
//                 flex: 7,
//               }}>PHIM MỚI CẬP NHẬT</Text>

//             <Text
//               style={{
//                 fontFamily: Fonts.SansLight,
//                 fontSize: 14 * WIDTH_SCALE,
//               }}
//             >Xem thêm..</Text>
//           </View>
//           <View>
//             {dataMovieByScore.map((val, ind) => {
//               if (ind < 5) {
//                 return (
//                   <View
//                     key={val?._id}
//                     style={{
//                       flexDirection: 'row',
//                       marginVertical: 10 * WIDTH_SCALE,
//                     }}>
//                     <Image
//                       source={{ uri: val?.cover_img }}
//                       style={{
//                         flex: 1.2,
//                         height: WIDTH * 0.42,
//                         width: WIDTH * 0.4,
//                       }} />
//                     <Text
//                       style={{
//                         position: 'absolute',
//                         left: WIDTH * 0.34,
//                         bottom: 0,
//                         paddingHorizontal: 5 * WIDTH_SCALE,
//                         paddingVertical: 5 * WIDTH_SCALE,
//                         backgroundColor: '#f0ab0a',
//                         fontFamily: Fonts.SansMedium,
//                         color: '#fff',
//                       }}>
//                       IMDB: {val?.score.toFixed(1)}/10
//                         </Text>

//                     <View style={{ flex: 0.2 }} />

//                     <View
//                       style={{
//                         flex: 1.6,
//                         paddingTop: 10 * WIDTH_SCALE,
//                       }}>

//                       <Text
//                         style={{
//                           fontFamily: Fonts.SansBold,
//                           fontSize: 17 * WIDTH_SCALE,
//                           marginBottom: 10 * WIDTH_SCALE,
//                         }}>{handleMovieName(val?.name)}</Text>

//                       {val?.duration < 60 ?
//                         <Text style={styles.timeStyles}>
//                           {val?.duration} phút
//                         </Text> :
//                         <Text style={styles.timeStyles}>
//                           {Math.floor(val?.duration / 60)} giờ {(val?.duration % 60)} phút
//                         </Text>}

//                       <Text
//                         style={{
//                           position: 'absolute',
//                           bottom: 0,
//                           right: 0,
//                           marginTop: 10 * WIDTH_SCALE,
//                           fontFamily: Fonts.SansLight,
//                           fontSize: 16 * WIDTH_SCALE,
//                           color: '#fff',
//                           paddingHorizontal: 5 * WIDTH_SCALE,
//                           paddingVertical: 5 * WIDTH_SCALE,
//                           backgroundColor: 'rgba(0,0,0, 0.8)',
//                           alignSelf: 'flex-start'
//                         }}>{handleMainCatOfMovie(val?.name)}</Text>

//                       <Text
//                         style={styles.timeStyles}
//                       >Năm: {val?.years}</Text>

//                       <Text
//                         style={styles.timeStyles}
//                       >Quốc gia: {val?.country}</Text>

//                     </View>
//                   </View>)
//               }
//             })}
//           </View>
//         </View>

//         {/* Phim 10 Phút */}
//         <View style={{ marginTop: 25 * WIDTH_SCALE }}>
//           <View style={{
//             marginBottom: 10 * WIDTH_SCALE,
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingRight: 15 * WIDTH_SCALE,
//           }}>
//             <Text
//               style={{
//                 fontFamily: Fonts.SansBold,
//                 fontSize: 18 * WIDTH_SCALE,
//                 color: ptColor.black,
//                 flex: 7,
//                 paddingLeft: 15 * WIDTH_SCALE,
//               }}>PHIM 10 PHÚT</Text>

//             <Text
//               style={{
//                 fontFamily: Fonts.SansLight,
//                 fontSize: 14 * WIDTH_SCALE,
//               }}
//             >Xem thêm..</Text>
//           </View>

//           <View
//             style={{
//               width: WIDTH,
//             }}
//           >

//             {movie10Min.forEach((val, ind) => {
//               console.log("test: ", val + "==" + ind);
//               return (
//                 <View
//                   style={{
//                     width: '100%',
//                     height: HEIGHT * 0.25,
//                   }}
//                 >
//                   <ImageBackground
//                     source={{ uri: val.cover_img }}
//                     imageStyle={{
//                       height: '100%',
//                       width: '100%',
//                     }}
//                     style={{
//                       flex: 1,
//                       resizeMode: "cover",
//                       justifyContent: "center"
//                     }}
//                   >
//                     <View
//                       style={{
//                         width: '80%',
//                         height: '80%',
//                         backgroundColor: 'rgba(0,0,0,0.5)'
//                       }}>
//                       <Text>{val.name}</Text>
//                     </View>
//                   </ImageBackground>
//                 </View>
//               )
//             })}

//           </View>

//         </View>

//       </Animated.ScrollView>

//     </View>

//   );
// }

// const styles = StyleSheet.create({
//   timeStyles: {
//     fontFamily: Fonts.SansLight,
//     fontSize: 16 * WIDTH_SCALE,
//     marginTop: 5 * WIDTH_SCALE,
//   }
// });
