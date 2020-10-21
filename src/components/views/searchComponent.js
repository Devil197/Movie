import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Fonts} from '../../utils/Fonts';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const KEYWORDS = 'keywords';
export default function searchComponent() {
  const [listKey, setListKey] = useState([]);

  useEffect(() => {
    getKeyword();
    console.log('Keyword Searched! = ',listKey);
  }, []);

  const getKeyword = async () => {
    let stringify = await AsyncStorage.getItem(KEYWORDS);
    let obj = JSON.parse(stringify);
    await setListKey(obj);
    console.log('Keyword Searched! = ', listKey);
  };

  if (listKey == null) {
    return (
      <View style={styles.withoutKeywords}>
        <FontAwesome5
          name="search"
          size={30}
          color={'rgba(166, 164, 164, 0.8)'}
        />
        <Text style={styles.txtWithoutKeywords}>
          Hãy nhập từ khóa để tìm kiếm với GEA
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.oldKeyTitleContainer}>
        <Text style={styles.oldKeyTitle}>Từ khóa đã tìm kiếm</Text>
      </View>
      {listKey.map((value) => {
        <View style={{backgroundColor: 'green', width: '100%', height: 200}}>
          <Text style={{color: '#000'}}>{value}</Text>
        </View>;
      })}
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
    fontSize: 14,
    paddingLeft: 10,
  },
  withoutKeywords: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '50%',
  },
  txtWithoutKeywords: {
    fontFamily: Fonts.SansLight,
    color: 'rgba(166, 164, 164, 0.8)',
    fontSize: 16,
    marginTop: 10,
  },
});
