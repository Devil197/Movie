import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Animated,
  ScrollView,
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {HEIGHT, WIDTH} from '../../constants/constants';
import {Fonts} from '../../utils/Fonts';
import {SkypeIndicator} from 'react-native-indicators';
import KeyWords from '../views/searchComponent';
import {films} from '../../constants/data/fakeData';
import AsyncStorage from '@react-native-community/async-storage';
import {getDataByKeyword} from '../../Redux/actions/movieAction';

const STATUS_BAR_CURRENT_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = 50;
const KEYWORDS = 'keywords';

export default function Search({navigation}) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const [keyword, setKeyword] = useState('');
  const [listKey, setListKey] = useState([]);
  const [castList, setCastList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getKey();
  }, []);

  const getKey = async () => {
    //await AsyncStorage.removeItem(KEYWORDS)
    try {
      let string = await AsyncStorage.getItem(KEYWORDS);
      let obj = JSON.parse(string);
      console.log('OBJ ', obj);

      setListKey(obj);
      console.log('LIST KEY Search.js ', listKey);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDataByKeyword = async () => {
    await getDataByKeyword(keyword).then((data) => {
      if (data.cast != null) {
        setCastList(data.cast);
      }

      if (data.movie != null) {
        setMovieList(data.movie);
      }
    }).catch((err) => {
      console.log(err);
    })

    console.log('CAST LIST ', castList);
    console.log('MOVIE LIST ', movieList);
  };

  const handleAddNewKeyword = async () => {
    if (listKey != null) {
      let index = listKey.indexOf(keyword);
      console.log('IndexOf ' + keyword + ' = ' + index);

      if (index > -1) {
        listKey.splice(index, 1);
        setListKey([...listKey], keyword);
        try {
          await AsyncStorage.removeItem(KEYWORDS).then(() => {
            console.log('Keyword removed');
          });
          await AsyncStorage.setItem(KEYWORDS, JSON.stringify(listKey)).then(
            () => {
              console.log('KEYWORDS updated.');
            },
          );
        } catch (error) {
          console.log(error);
        }
      }
    }

    try {
      let keywords = (await AsyncStorage.getItem(KEYWORDS)) || '[]';
      keywords = JSON.parse(keywords);
      keywords.push(keyword);
      await AsyncStorage.setItem(KEYWORDS, JSON.stringify(keywords)).then(
        () => {
          console.log('KEYWORDS added.');
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="rgba(0, 0, 0, 0.20)" /> */}
      <Animated.View
        style={{
          transform: [{translateY: translateY}],
          zIndex: 10,
        }}>
        <View style={styles.searchBar}>
          <View style={styles.backIcon}>
            <FontAwesome5 name="arrow-left" size={18} color={'black'} />
          </View>
          <View style={styles.searchInputContainer}>
            <EvilIcon name="search" size={22} color={'gray'} />
            <TextInput
              autoFocus={true}
              value={keyword}
              onChangeText={(txt) => setKeyword(txt)}
              style={styles.searchInput}
              placeholder={'Tìm kiếm với GEA'}
              placeholderTextColor={'gray'}
              onSubmitEditing={handleGetDataByKeyword}
              returnKeyType="search"
            />
          </View>
        </View>
      </Animated.View>

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.keyWordContainer}>
          <KeyWords />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: STATUS_BAR_CURRENT_HEIGHT,
    flex: 1,
  },
  searchBar: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    borderBottomWidth: 0.1,
    borderBottomColor: 'rgba(166, 164, 164, 0.1)',
    alignItems: 'center',
  },
  backIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(166, 164, 164, 0.3)',
    height: 40,
    paddingLeft: 25,
    marginRight: 10,
    borderRadius: 20,
  },
  searchInput: {
    width: '85%',
    color: 'gray',
    fontSize: 16,
    height: 41,
    paddingLeft: 5,
  },
  contentContainer: {
    height: '100%',
    backgroundColor: '#fff',
    //backgroundColor: 'rgba(166, 164, 164, 0.3)',
  },
  keyWordContainer: {
    flex: 1,
  },
  // actorContainer: {
  //   height: HEIGHT * 0.25,
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  // },
  // title: {
  //   fontFamily: Fonts.SansMedium,
  //   fontSize: 18,
  //   paddingLeft: 10,
  //   paddingTop: 10,
  //   color: 'rgba(0, 0, 0, 0.40)',
  // },
  // movieContainer: {
  //   marginTop: 10,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  // },
});
