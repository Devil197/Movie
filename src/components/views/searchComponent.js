import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Fonts } from '../../utils/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteKeywordRedux } from '../../Redux/actions/keywordAction';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { MyHighLightButton } from '../views';
import {
  HEIGHT,
  WIDTH,
  STATUS_BAR_CURRENT_HEIGHT,
  HEADER_HEIGHT,
  WIDTH_SCALE,
} from '../../constants/constants';
import { ptColor } from '../../constants/styles';

export default function searchComponent({ setKeywordOnPress }) {
  const keywordInRedux = useSelector((state) => state.keywordReducer?.keyword);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(keywordInRedux);
  }, [keywordInRedux]);

  const closeIconOnPress = (index) => {
    deleteKeywordRedux(dispatch, index);
  };

  const mapKeyword = keywordInRedux.map((val, index) => {
    return (
      <View style={styles.keyWordContainer} key={index}>
        <EvilIcon
          style={styles.icons}
          name="search"
          size={22 * WIDTH_SCALE}
          color={ptColor.gray2}
        />
        <MyHighLightButton
          style={{ flex: 9 }}
          onPress={() => setKeywordOnPress(val)}>
          <Text style={styles.txtKeyword}>{val}</Text>
        </MyHighLightButton>

        <MyHighLightButton
          style={styles.icons}
          onPress={() => closeIconOnPress(index)}>
          <EvilIcon
            name="close"
            size={22 * WIDTH_SCALE}
            color={ptColor.gray2}
          />
        </MyHighLightButton>
      </View>
    );
  });

  if (keywordInRedux == '') {
    return (
      <View style={styles.withoutKeywords}>
        <FontAwesome5
          name="search"
          size={40 * WIDTH_SCALE}
          color={'rgba(166, 164, 164, 0.8)'}
        />
        <Text style={styles.txtWithoutKeywords}>
          Enter your keyword to search!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.oldKeyTitleContainer}>
        <Text style={styles.oldKeyTitle}>Từ khóa đã tìm kiếm</Text>
      </View>
      <ScrollView contentContainerStyle={{ flex: 1 }}>{mapKeyword}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  oldKeyTitleContainer: {
    height: 30,
    borderBottomColor: 'rgba(0, 0, 0, 0.2 )',
    borderBottomWidth: 0.5,
    width: '100%',
    justifyContent: 'center',
  },
  oldKeyTitle: {
    fontFamily: Fonts.SansMedium,
    fontSize: 15 * WIDTH_SCALE,
    paddingLeft: 10,
  },
  withoutKeywords: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '50%',
    marginBottom: 20,
  },
  txtWithoutKeywords: {
    fontFamily: Fonts.SansLight,
    color: 'rgba(166, 164, 164, 0.8)',
    fontSize: 16 * WIDTH_SCALE,
    marginTop: 10,
  },
  keyWordContainer: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    flex: 1,
    paddingLeft: 20,
  },
  txtKeyword: { color: ptColor.black, paddingLeft: 7 },
});
