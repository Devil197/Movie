import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { WIDTH, HEIGHT, WIDTH_SCALE } from '../../constants/constants';
import { Fonts } from '../../utils/Fonts';
import { ptColor } from '../../constants/styles';

const CastItem = (params) => {
  //const cover_image = (item.cover_image === null) ? userAvatar : item.avatar;
  const { item } = params.item;
  console.log(item);
  let birthday = new Date(item.birthday);
  let year = birthday.getFullYear();
  let month = birthday.getMonth();
  let day = birthday.getDate();
  let dateOfBirthday = day + '/' + month + '/' + year;

  return (
    <View style={styles.cardView} key={item.id}>
      <Image style={styles.image} source={{ uri: item.cover_image }} />
      <View style={styles.textView}>
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode={'tail'}>
          {item.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.itemYear}>
          Country: {item.nation}
        </Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.itemYear}>
          Birthday: {dateOfBirthday}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    height: HEIGHT * 0.12,
    marginRight: 15,
    marginTop: HEIGHT * 0.02,
    borderRadius: HEIGHT,
    paddingLeft: WIDTH * 0.035,
    flexDirection: 'row',
  },
  image: {
    width: WIDTH / 5,
    height: HEIGHT / 9,
    borderRadius: HEIGHT,
    resizeMode: 'cover',
  },
  itemTitle: {
    fontFamily: Fonts.SansMedium,
    fontSize: 18 * WIDTH_SCALE,
    color: ptColor.black,
    marginBottom: HEIGHT * 0.01,
    marginTop: HEIGHT * 0.01,
  },
  textView: {
    fontFamily: Fonts.SansMedium,
    marginLeft: WIDTH * 0.03,
  },
  itemYear: {
    fontSize: 14 * WIDTH_SCALE,
    color: ptColor.gray2,
    fontFamily: Fonts.SansLight,
    marginTop: 2,
  },
});

export default CastItem;
