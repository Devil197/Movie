import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { MySpinner, MyHighLightButton } from '../views';
import { ROUTE_KEY } from '../../constants/constants';

import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import MyCarousel from '../views/MyCarousel';

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
  return (
    <View style={{ flex: 1 }}>
      <MyCarousel />
    </View>
  );
};
export default Music;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },

});
