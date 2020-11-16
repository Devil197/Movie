import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { WIDTH, HEIGHT, WIDTH_SCALE, ROUTE_KEY } from '../../constants/constants';
import { Fonts } from '../../utils/Fonts';
import { ptColor } from '../../constants/styles';
import { MyHighLightButton } from '../views'


const CastItem = ({ navigation, item }) => {
  //const cover_image = (item.cover_image === null) ? userAvatar : item.avatar;
  console.log("CAST ITEM: ", item);

  return (
    <MyHighLightButton
      onPress={() => navigation.push(ROUTE_KEY.Actor, { _id: item?._id })}
    >
      <View style={styles.cardView} key={item?._id}>
        <Image style={styles.image} source={{ uri: item?.cover_img }} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode={'tail'}>
            {item?.name}
          </Text>
        </View>
      </View>
    </MyHighLightButton>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: WIDTH * 0.275,
    height: 80,
    marginRight: 15,
    marginTop: HEIGHT * 0.02,
  },
  image: {
    width: '100%',
    height: '85%',
    resizeMode: 'cover',
    borderRadius: 3
  },
  itemTitle: {
    fontFamily: Fonts.SansLight,
    fontSize: 14 * WIDTH_SCALE,
    color: ptColor.black,
    marginBottom: HEIGHT * 0.01,
    marginTop: HEIGHT * 0.01,
  },
});

export default CastItem;
