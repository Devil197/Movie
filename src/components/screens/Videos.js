import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, StyleSheet, FlatList, BackHandler } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fonts } from '../../utils/Fonts';
import { getVideoByMovie, getFullMovie } from '../../Redux/actions/movieAction';
import { Play } from '../views'

import moment from 'moment';


import { MySpinner } from '../views'
import { HEIGHT, WIDTH } from '../../constants/constants'
import { onChange } from 'react-native-reanimated';


function renderDays(idx) {
  if (idx === 7) {
    return 'Chủ Nhật'
  } else {
    return 'Thứ ' + (idx + 1)
  }
}

const Videos = ({ navigation, params, route }) => {
  const _id = route.params?._id;
  const [typePlayVideo, setTypePlayVideo] = useState(false)
  const [dataVideo, setDataVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [dataFullMovie, setDataFullMovie] = useState();
  const [idx, setIndex] = useState(0);
  const [title, setTitle] = useState()

  console.log('1001 type play video screen ', typePlayVideo);
  useEffect(() => {
    MySpinner.show()
    getVideoByMovie(_id).then((video) => {
      console.log('00001 ', video);
      setDataVideo(video);
      setLoading(false);
      MySpinner.hide()
    }).catch((err) => console.log("Failed", err));

    getFullMovie(_id).then((fullmovie) => {
      setDataFullMovie(fullmovie);
      setLoading(false);
      MySpinner.hide();
    }).catch((err) => console.log("Failed", err))
  }, [])


  // console.log('1120 -> ',moment('5-10-2020', 'YYYY-MM-DDTHH:mm:ss').day());
  // console.log('10002 ', moment(dataFullMovie?.movie[0]?.update_at).format('HH:mm:ss'));
  // console.log("hhh",_id);
  const day = renderDays(moment(dataFullMovie?.movie[0]?.update_at, 'YYYY-MM-DDTHH:mm:ss').day())
  const time = moment(dataFullMovie?.movie[0]?.update_at).format('HH:mm');
  //   console.log("time ", time);
  //   console.log('1001-> day', day);
  // console.log('ngay -> ', dataFullMovie?.movie[0]?.update_at);
  // console.log("dataaaaa ", dataV.ideo.items);
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F5FB' }}>
      <StatusBar backgroundColor="#000" barStyle="dark-content" />
      {/* Thay cái này = Youtube là đc */}
      <View
        style={{
          position: typePlayVideo ? 'absolute' : 'relative',
          height: typePlayVideo ? HEIGHT : HEIGHT * 0.4,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Play onChange={(val) => {
         setTypePlayVideo(val)
          console.log(val)
        }} />
      </View>
      {typePlayVideo == false ? <ScrollView>
        {/* Videos of Movie */}
        <View>
          <View style={styles.card}>
            <Text style={styles.header}>
              [{dataFullMovie?.movie[0]?.language}] - {dataFullMovie?.movie[0]?.name} Tập {title ? title : dataVideo?.items[0]?.title}
            </Text>
            <View style={[styles.rowRating, styles.mr]}>
              <Text>0.0 </Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={20} color="#a5a5a5" />
                <Icon name="star" size={20} color="#a5a5a5" />
                <Icon name="star" size={20} color="#a5a5a5" />
                <Icon name="star" size={20} color="#a5a5a5" />
                <Icon name="star" size={20} color="#a5a5a5" />
              </View>
            </View>
            <Text style={styles.mr}>Thể loại: {dataFullMovie?.category[0]?.name}</Text>
            <Text style={[styles.mr, { color: '#555' }]}>
              {dataFullMovie?.movie[0]?.introduction}.{' '}
            </Text>
          </View>
        </View>

        {/* Episode of Move */}
        <View style={styles.card}>
          <Text style={styles.header}>Chọn tập</Text>
          <Text style={{ fontFamily: Fonts.Sans, marginBottom: 16, color: '#555' }}>
            Cập nhật vào {day} hàng tuần vào lúc {time}
          </Text>
          <FlatList
            keyExtractor={(item) => {
              return item._id;
            }}
            data={dataVideo?.items}
            renderItem={({ item, index }) =>
              <TouchableOpacity

                onPress={() => {
                  setIndex(index)
                  console.log(item._id);
                  console.log(index);
                  setTitle(item.title)
                }}
                style={{ ...styles.itemEp, backgroundColor: idx === index ? '#F2F5FB' : '#F2F5FB' }}>
                <Text style={{ color: idx === index ? '#0984e3' : 'black' }}>{item.title}</Text>
              </TouchableOpacity>
            }
            //Setting the number of column
            numColumns={6}
          />
        </View>

        {/* <Episodes episodes={dataVideo} day= {day} time ={time} clickHandler={(id)=>{console.log('id',id);}} /> */}
      </ScrollView>
        :
        null}

    </View>
  )
}
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
  rowRating: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
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
