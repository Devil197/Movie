import React from 'react';
import {StatusBar, Text, View, StyleSheet, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Fonts} from '../../utils/Fonts';
const episodesData = [
  {
    id: 0,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 1,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 2,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 3,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 4,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 5,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 6,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 7,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 8,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 9,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 10,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 11,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 12,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 13,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 14,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 15,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 16,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 17,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 18,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 19,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 20,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 21,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 22,
    title: 'Tập 1 - Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
  {
    id: 23,
    title: 'Tập 2- Thứ ở trong tôi',
    thumb:
      'https://i.vdicdn.com/vg/2020/08/14/f8aba3d9640ae5bf_7e0be89bebc2370c_2204615974162954580120.jpg',
    time: '22 mins',
  },
];
const Videos = ({params}) => (
  <View style={{flex: 1, backgroundColor: '#F2F5FB'}}>
    <StatusBar backgroundColor="#000" barStyle="dark-content" />
    {/* Thay cái này = Youtube là đc */}
    <View
      style={{
        width: '100%',
        height: 240,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#fff'}}>{`1. Thay cái này bằng Youtube`}</Text>
      <Text style={{color: '#fff'}}>
        {' '}
        2. Nhúng lại fonts đi, fonts Product Sans t đã để ở assets/font rồi
      </Text>
      <Text style={{color: '#fff'}}>
        {' '}
        3.T có tạo react-native-config.js rồi
      </Text>
    </View>

    <ScrollView>
      {/* Videos of Movie */}
      <View>
        <View style={styles.card}>
          <Text style={styles.header}>
            [LỒNG TIẾNG] GLEIPNIR - SỢI XÍCH THẦN TẬP 1
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
          <Text style={styles.mr}>Thể loại: Hành động, Siêu Nhiên</Text>
          <Text style={[styles.mr, {color: '#555'}]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.{' '}
          </Text>
        </View>
      </View>

      {/* Episode of Move */}
      <Episodes episodes={episodesData} />
    </ScrollView>
  </View>
);

const Episodes = (props) => {
  const {episodes} = props;
  const renderEp = (item, index) => {
    return (
      <TouchableOpacity style={styles.itemEp}>
        <Text style={{color: '#0984e3'}}>{index + 1}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Chọn tập</Text>
      <Text style={{fontFamily: Fonts.Sans, marginBottom: 16, color: '#555'}}>
        Cập nhật vào thứ 3 hàng tuần vào lúc 12:00:22
      </Text>
      <FlatList
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        data={episodes}
        renderItem={({item, index}) => renderEp(item, index)}
        //Setting the number of column
        numColumns={6}
      />
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
