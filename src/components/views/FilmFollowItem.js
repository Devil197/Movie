import React, { useState } from 'react';
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Fonts } from '../../utils/Fonts';
import { ROUTE_KEY, WIDTH_SCALE } from '../../constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import { REDUX } from '../../Redux/store/types'
import { ptColor } from '../../constants/styles';

const { width } = Dimensions.get('window');

const FilmFollowItem = React.memo(({ navigation, params, update, followReducer, checkedItemUpdate, selectAll, dispatch }) => {
  // console.log('1000 parmars ', params);
  const item = params.item.movie_id;
  const [checked, setChecked] = useState(selectAll ? selectAll : false)
  const movie = followReducer.find((e) => e.movie_id._id === item._id)
  const clickItemFollow = () => {
    navigation.push(ROUTE_KEY.Details, { _id: item?._id })
    console.log('1000 params.item', params.item);
    dispatch({
      type: REDUX.UPDATE_FOLLOW,
      payload: params.item
    })
  }

  return (
    <TouchableWithoutFeedback
      key={selectAll}
      onPress={() => {
        update ? setChecked(!checked) : clickItemFollow()
        update ? checkedItemUpdate(params.item, !checked) : null
      }}
    >
      {checked ?
        <View
          style={{
            width: width / 3,
            height: (width / 3) * 1.7,
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 8,
            marginBottom: 8,
            backgroundColor: ptColor.appColor,
            opacity: 0.2
          }}
        />
        :
        null
      }

      <View style={{
        ...styles.item,
      }}>
        <Image source={{ uri: item?.cover_img }} style={styles.itemImg} />
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.itemTitle}>
          {item.name}
        </Text>
        <View style={[styles.row]}>
          {item.status - movie?.movie_id?.status > 0 ?
            <Text style={styles.newEp}>{item?.status - movie?.movie_id?.status} tập phim mới</Text>
            :
            <Text style={{ ...styles.newEp, backgroundColor: null }}></Text>
          }
        </View>

        {update ?
          <View style={{ position: 'absolute', top: 5, left: 5 }}>
            <RadioButton
              uncheckedColor={'white'}
              color={'#e91946'}
              theme={'red'}
              value="first"
              status={checked === true ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked)
                checkedItemUpdate(params.item, !checked)
              }}

            />
          </View>
          :
          null
        }
      </View>
    </TouchableWithoutFeedback >
  );
})

export default FilmFollowItem;

const styles = StyleSheet.create({
  item: {
    width: width / 3,
    height: (width / 3) * 1.7,
    padding: 8,
    marginBottom: 8,
    borderWidth: 0.2,
    borderColor: '#e9e7e7',
    borderRadius: 5 * WIDTH_SCALE
  },

  itemImg: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },

  itemTitle: {
    fontFamily: Fonts.SansMedium,
    fontSize: 13,
    color: '#000',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newEp: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    //borderBottomEndRadius:8
    borderRadius: 99,
  },
  lastEp: {
    color: '#e74c3c',
    fontSize: 12,
  },
});
