import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Fonts} from '../../utils/Fonts';
import {getVideoByMovie, getFullMovie} from '../../Redux/actions/movieAction';
import {Play, Player} from '../views';
import Orientation from 'react-native-orientation';
import moment from 'moment';

import {MySpinner} from '../views';
import {HEIGHT, WIDTH, WIDTH_SCALE} from '../../constants/constants';
import {onChange} from 'react-native-reanimated';
import {ptColor} from '../../constants/styles';

function renderDays(idx) {
  if (idx === 7) {
    return 'Chủ Nhật';
  } else {
    return 'Thứ ' + (idx + 1);
  }
}

const url = 'r_G69vVBaww';

const Videos = ({navigation, params, route}) => {
  const _id = route.params?._id;
  const [fullScreen, setFullScreen] = useState(false);
  const [dataVideo, setDataVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [dataFullMovie, setDataFullMovie] = useState();
  const [idx, setIndex] = useState(0);
  const [title, setTitle] = useState();
  const initial = Orientation.getInitialOrientation();

  console.log('1001 type play video screen ', fullScreen);
  useEffect(() => {
    MySpinner.show();
    getVideoByMovie(_id)
      .then((video) => {
        console.log('00001 ', video);
        setDataVideo(video);
        setLoading(false);
        MySpinner.hide();
      })
      .catch((err) => console.log('Failed', err));

    getFullMovie(_id)
      .then((fullmovie) => {
        setDataFullMovie(fullmovie);
        setLoading(false);
        MySpinner.hide();
      })
      .catch((err) => console.log('Failed', err));
  }, []);

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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F2F5FB',
        marginTop: 35 * WIDTH_SCALE,
      }}>
      <StatusBar backgroundColor="#000" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          margin: 0,
          overflow: 'hidden',
          backgroundColor: ptColor.divider,
        }}>
        <Player url={url} fullScreen={onFullScreen} />
      </View>
      {!fullScreen ? (
        <View style={{marginTop: 0, flex: 3}}>
          {/* Videos of Movie */}
          <View>
            <View style={styles.card}>
              <Text style={styles.header}>
                [{dataFullMovie?.movie[0]?.language}] -{' '}
                {dataFullMovie?.movie[0]?.name} Tập{' '}
                {title ? title : dataVideo?.items[0]?.title}
              </Text>
              <View style={[styles.rowRating, styles.mr]}>
                <Text>0.0 </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="star" size={20} color="#a5a5a5" />
                  <Icon name="star" size={20} color="#a5a5a5" />
                  <Icon name="star" size={20} color="#a5a5a5" />
                  <Icon name="star" size={20} color="#a5a5a5" />
                  <Icon name="star" size={20} color="#a5a5a5" />
                </View>
              </View>
              <Text style={styles.mr}>
                Thể loại: {dataFullMovie?.category[0]?.name}
              </Text>
              <Text style={[styles.mr, {color: '#555'}]}>
                {dataFullMovie?.movie[0]?.introduction}.{' '}
              </Text>
            </View>
          </View>

          {/* Episode of Move */}
          <View style={styles.card}>
            <Text style={styles.header}>Chọn tập</Text>
            <Text
              style={{fontFamily: Fonts.Sans, marginBottom: 16, color: '#555'}}>
              Cập nhật vào {day} hàng tuần vào lúc {time}
            </Text>
            <FlatList
              keyExtractor={(item) => {
                return item._id;
              }}
              data={dataVideo?.items}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index);
                    console.log(item._id);
                    console.log(index);
                    setTitle(item.title);
                  }}
                  style={{
                    ...styles.itemEp,
                    backgroundColor: idx === index ? '#F2F5FB' : '#F2F5FB',
                  }}>
                  <Text style={{color: idx === index ? '#0984e3' : 'black'}}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              //Setting the number of column
              numColumns={6}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};
export default Videos;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
  },
  rowRating: {flexDirection: 'row', alignItems: 'center', marginVertical: 4},
  mr: {
    marginVertical: 4,
  },
  header: {
    fontSize: 22,
    fontFamily: Fonts.SansBold,
    marginVertical: 4,
  },
  itemEp: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#F2F5FB',
    marginRight: 16,
    marginBottom: 16,
  },
});
