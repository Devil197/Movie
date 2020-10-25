import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Fonts} from '../../utils/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {deleteKeywordRedux} from '../../Redux/actions/keywordAction';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {MyHighLightButton} from '../views';

export default function searchComponent() {
  const keywordInRedux = useSelector((state) => state.keywordReducer?.keyword);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(keywordInRedux);
  }, [keywordInRedux]);

  const closeIconOnPress = (keyword) => {
    console.log(keyword);
    deleteKeywordRedux(dispatch, keyword);
  };

  const mapKeyword = keywordInRedux.map((val) => {
    return (
      <View style={styles.keyWordContainer}>
        <EvilIcon style={styles.icons} name="search" size={22} color={'gray'} />
        <Text style={styles.txtKeyword}>{val}</Text>
        <MyHighLightButton
          style={styles.icons}
          onPress={() => closeIconOnPress(val)}>
          <EvilIcon name="close" size={22} color={'gray'} />
        </MyHighLightButton>
      </View>
    );
  });

  if (keywordInRedux == null) {
    return (
      <View style={styles.withoutKeywords}>
        <FontAwesome5
          name="search"
          size={40}
          color={'rgba(166, 164, 164, 0.8)'}
        />
        <Text style={styles.txtWithoutKeywords}>
          Nhập từ khóa để tìm kiếm với GEA
        </Text>
      </View>
    );
  }

  // if (isLoading) {
  //   return (
  //     <View>
  //       <SkypeIndicator color="#2FA29C" size={30} style={{marginTop: 40}} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.oldKeyTitleContainer}>
        <Text style={styles.oldKeyTitle}>Từ khóa đã tìm kiếm</Text>
      </View>
      <ScrollView contentContainerStyle={{flex: 1}}>{mapKeyword}</ScrollView>
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
    fontSize: 15,
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
    fontSize: 16,
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
  txtKeyword: {color: '#000', flex: 9, paddingLeft: 7},
});
