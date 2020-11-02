import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {WIDTH, HEIGHT} from '../../constants/constants';
import {Fonts} from '../../utils/Fonts';

const CastItem = (params) => {
  //const cover_image = (item.cover_image === null) ? userAvatar : item.avatar;
  const {item} = params.item;
  return (
    <View style={styles.cardView} key={item.id}>
      <Image style={styles.image} source={{uri: item.cover_image}} />
      <View style={styles.textView}>
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode={'tail'}>
          {item.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: WIDTH / 5,
    height: HEIGHT / 6.5,
    marginRight: 15,
    marginTop: 10,
    borderRadius: HEIGHT,
    paddingBottom: 15,
    paddingLeft: 8,
  },
  image: {
    width: WIDTH / 5,
    height: HEIGHT / 9,
    borderRadius: HEIGHT,
    resizeMode: 'cover',
  },
  itemTitle: {
    color: '#000',
    fontSize: 13,
    fontFamily: Fonts.SansMedium,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default CastItem;
