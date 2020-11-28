import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { MySpinner, MyHighLightButton, Play, Player } from '../views';
import { ROUTE_KEY } from '../../constants/constants';

import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
  STATUS_BAR_CURRENT_HEIGHT,
  HEADER_HEIGHT,
} from '../../constants/constants';
import ViewPager from '@react-native-community/viewpager';
import PageMusic from '../views/PageMusic';
import { useDispatch, useSelector } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { ptColor } from '../../constants/styles';
import { Fonts } from '../../utils/Fonts';
import {
  searchAPI,
  addKeywordActionRedux,
  hotContentsAPI,
} from '../../Redux/actions/keywordAction';
import {
  getMovieByCategories,
} from '../../Redux/actions/movieAction';

import { films } from '../../constants/data/fakeData';
var { height, width } = Dimensions.get('window');
const TRACKS = [
  {
    title: 'Top 100 bài hát nhạc trẻ hay nhất',
    artist: 'Various Artists',
    albumArtUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FPh%C3%ADa%20Sau%20M%E1%BB%99t%20C%C3%B4%20G%C3%A1i_Soobin%20Ho%C3%A0ng%20S%C6%A1n_-1075771528.mp3?alt=media&token=34e80d45-6af9-47b1-b347-1ca180493163',
  },
  {
    title: 'Top 100 nhạc Electronic/Dance Âu Mỹ hay nhất',
    artist: 'Various Artists',
    albumArtUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Finyoureyes.png?alt=media&token=5893b4b9-d4fc-4636-82a9-f3eee0fb36b5',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FIn_Your_Eyes_-_DG812_-_v_2%5B1%5D.mp3?alt=media&token=e16c90d4-4df3-4b87-937c-1dcbbf04733b',
  },
  {
    title: 'Top 100 Pop Âu Mỹ hay nhất',
    artist: 'Various Artists',
    albumArtUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fintheend.png?alt=media&token=5e1e60a2-46d6-4394-b116-851c735ce89d',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FLinkin_Park_-_In_The_End_(Mellen_Gi_%26_Tommee_Profitt_Remix)_v2%5B1%5D.mp3?alt=media&token=34597cf8-fa16-4959-9513-7bea40576efe',
  },
  {
    title: 'Top 100 bài hát nhạc trẻ hay nhất',
    artist: 'Various Artists',
    albumArtUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FPh%C3%ADa%20Sau%20M%E1%BB%99t%20C%C3%B4%20G%C3%A1i_Soobin%20Ho%C3%A0ng%20S%C6%A1n_-1075771528.mp3?alt=media&token=34e80d45-6af9-47b1-b347-1ca180493163',
  },
];

const Music = () => {


  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const dispatch = useDispatch();

  const inputRef = useRef(keyword);

  const [keyword, setKeyword] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const url = 'mP3fGkpmVM0'
  const handleSearchOnPress = () => {
    setVisible(true);
    addKeywordActionRedux(dispatch, keyword);
    handleGetDataByKeyword(keyword);
  };

  const closeIconOnPress = () => {
    setKeyword('');
    setVisible(false);
  };

  const handleGetDataByKeyword = async (keyword) => {
    console.log('Search API Called');
    setLoading(true);
    if (keyword === '') {
      return;
    }
    await searchAPI(keyword)
      .then((json) => {
        setdataAfterSearch([...json?.cast, ...json?.movie]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <MyCarousel /> */}
      {/* <Text>Music</Text> */}
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          zIndex: 10,
          backgroundColor: 'white',
          borderRadius: 40 * WIDTH_SCALE,
          margin: 20 * WIDTH_SCALE,
        }}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <View style={styles.searchInputContainer}>
              <EvilIcon
                name="search"
                size={22 * WIDTH_SCALE}
                color={ptColor.gray2}
              />
              <TextInput
                autoFocus={false}
                value={keyword}
                onChangeText={(txt) => {
                  setKeyword(txt);
                  setVisible(false);
                }}
                style={styles.searchInput}
                //placeholder={'Search on GEA'}
                placeholderTextColor={ptColor.gray2}
                onSubmitEditing={handleSearchOnPress}
                returnKeyType="search"
              />
              {keyword !== '' ? (
                <EvilIcon
                  onPress={() => closeIconOnPress()}
                  style={styles.closeIcon}
                  name="close"
                  size={22 * WIDTH_SCALE}
                  color={ptColor.gray2}
                />
              ) : null}
            </View>
          </View>
        </View>
      </Animated.View>
      <ViewPager style={styles.viewPager} initialPage={0}>
        <View key="0">
          <PageMusic channel_Id={"5fbfa6c2e35dcd09f0563e80"} />
        </View>
        <View key="1">
          <PageMusic channel_Id={"5fc1fe661bacf67a403aef10"} />
        </View>
        <View key="2">
          <PageMusic channel_Id={"5fc1ff101bacf67a403aef11"} />
        </View>
      </ViewPager>
      {/* <View style={{ height: 0.3 * HEIGHT, marginHorizontal: 10 * WIDTH_SCALE, backgroundColor: 'white' }}>
    
      </View> */}
    </View >
  );
};
export default Music;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
  viewPager: {
    flex: 1,
  },
  searchBarContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(166, 164, 164, 0.1)',
    alignItems: 'center',
  },
  searchBar: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: HEIGHT * 0.06,
    paddingLeft: WIDTH * 0.06,
    marginRight: WIDTH * 0.03,
    borderRadius: 20,
  },
  searchInput: {
    width: WIDTH * 0.6,
    color: ptColor.gray2,
    fontSize: 16 * WIDTH_SCALE,
    height: HEIGHT * 0.06,
    paddingLeft: WIDTH * 0.015,
  },
});
