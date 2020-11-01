import React from 'react';
import {Dimensions, Image, Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Fonts} from '../../utils/Fonts';
import {
  HEIGHT,
  WIDTH,
  STATUS_BAR_CURRENT_HEIGHT,
  HEADER_HEIGHT,
  WIDTH_SCALE,
} from '../../constants/constants';
import {ptColor} from '../../constants/styles';
import CastItem from './CastItem';

const {width} = Dimensions.get('window');

const FilmItem = (params) => {
  const {item} = params.item;

  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <Image source={{uri: item.cover_img}} style={styles.itemImg} />
        <View style={styles.infoContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.itemYear}>
            Năm sản xuất: {item.years}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.itemYear}>
            Phụ đề: {item.language}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.itemYear}>
            Quốc gia: {item.country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FilmItem;

const styles = StyleSheet.create({
  item: {
    width: width,
    height: width / 3,
    margin: 8,
    flexDirection: 'row',
  },

  itemImg: {
    width: width / 4.5,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemTitle: {
    fontFamily: Fonts.SansMedium,
    fontSize: 18 * WIDTH_SCALE,
    color: ptColor.black,
    marginBottom: 10,
    marginTop: 10,
  },
  itemYear: {
    fontSize: 14 * WIDTH_SCALE,
    color: ptColor.gray2,
    fontFamily: Fonts.SansLight,
    marginTop: 2,
  },
});
