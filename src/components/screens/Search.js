import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Animated,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {HEIGHT, WIDTH} from '../../constants/constants';
import {Fonts} from '../../utils/Fonts';
import {SkypeIndicator} from 'react-native-indicators'; //<==== không sử dụng cái này import MySpinner trong '../views' ra sài nhá chỉ cần set giá trị là MySpinner.hide() và MySpinner.show()
import KeyWords from '../views/searchComponent';
import {MyHighLightButton} from '../views';
import AsyncStorage from '@react-native-community/async-storage'; //<==== sử dụng redux
import {getDataByKeyword} from '../../Redux/actions/movieAction'; //<==== api của thằng nào thì viết trong reduxAction của thằng đó nhá

const STATUS_BAR_CURRENT_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = 50;
const KEYWORDS = 'keywords';

const tabLabel = [
  {
    _id: '01',
    lable: 'Tất cả',
  },
  {
    _id: '02',
    lable: 'Phim',
  },
  {
    _id: '03',
    lable: 'Nhạc',
  },
  {
    _id: '04',
    lable: 'Nghệ sĩ',
  },
];

export default function Search({navigation}) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  //<====
  // hạn chế việc sử dụng nhiều ustate
  // các giá trị gọi từ json ra thì nên sử dụng ?. => ex : data?.movie
  // cái cast vs movie tao trả về là json nên lưu 1 cái thôi  => ex: lưu json là data đi thì lấy cái thằng cast trong json mình gọi data?.cast là đc

  // xem cại cách đặt tên biến => ex: nếu mà callback đó mình muốn chạy api tìm kiếm thì đặt là searchByAPI

  // các hàm đọc api thì đều viết trong folder '../../Redux/actions'

  //====>

  const [keyword, setKeyword] = useState('');
  const [listKey, setListKey] = useState([]);
  const [castList, setCastList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [data, setData] = useState([]);
  const [isVisible, setVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  useEffect(() => {
    getKey();
  }, []);

  useEffect(() => {
    handleGetDataByKeyword();
  }, [keyword]);

  const getKey = async () => {
    //await AsyncStorage.removeItem(KEYWORDS)
    try {
      let string = await AsyncStorage.getItem(KEYWORDS);
      let obj = JSON.parse(string);
      //console.log('OBJ ', obj);

      setListKey(obj);
      //console.log('LIST KEY Search.js ', listKey);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDataByKeyword = async () => {
    if (keyword === '') {
      return;
    }

    let data = await getDataByKeyword(keyword)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    setData([...data.cast, ...data.movie]);
    setCastList(data.cast);
    setMovieList(data.movie);
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

  // <==== nếu chỉ thay đổi cái ustate thì viết setState ở trong luôn cần chi tạo thêm callback này nữa
  const handleSearchOnPress = () => {
    setVisible(false);
  };

  const renderSearchDataWithKeyword = data.map((data) => {
    return (
      <View style={styles.castContainer} key={data._id}>
        <EvilIcon name="search" size={22} color={'gray'} />
        <Text style={styles.castName}>{data.name}</Text>
      </View>
    );
  });

  const closeIconOnPress = () => {
    setKeyword('');
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" />
      <Animated.View
        style={{
          transform: [{translateY: translateY}],
          zIndex: 10,
        }}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <View style={styles.backIcon}>
              <MyHighLightButton onPress={() => navigation.goBack()}>
                <FontAwesome5 name="arrow-left" size={18} color={'black'} />
              </MyHighLightButton>
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
                onSubmitEditing={handleSearchOnPress}
                returnKeyType="search"
              />
              {keyword.length > 0 ? (
                <EvilIcon
                  onPress={() => closeIconOnPress()}
                  style={styles.closeIcon}
                  name="close"
                  size={22} ///<==== cái này ko sử dụng giá trị cụ thể đc đâu nhá
                  color={'gray'} // <==== cái màu này mình lấy trong contants hết nhá => sửa mấy cái trên luôn
                />
              ) : null}
            </View>
          </View>
          <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
            {keyword && isVisible ? renderSearchDataWithKeyword : null}
          </ScrollView>
        </View>
      </Animated.View>

      {keyword != '' ? null : (
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.keyWordContainer}>
            <KeyWords />
          </ScrollView>
        </View>
      )}

      {!isVisible ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{flexGrow: 0}}>
          {tabLabel.map((data) => {
            return (
              <TouchableWithoutFeedback
                key={data._id}
                onPress={() => setSelectedCategory(data.lable)}>
                <View style={styles.topTabs}>
                  <Text style={styles.txtLableContainer}>{data.lable}</Text>
                  {selectedCategory === data.lable ? (
                    <View style={styles.topTabsBar} />
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      ) : null}

      {selectedCategory === 'Tất cả' && !isVisible ? (
        <View style={styles.listALLContainer}>
          <View style={styles.list}>
            <FlatList
              horizontal
              scrollEnabled
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              data={castList}
              keyExtractor={(item) => String(item._id)}
              renderItem={(item) => <CastItem item={item} />}
            />
          </View>
          <View style={styles.list}>
            <FlatList
              showsVerticalScrollIndicator={true}
              numColumns={3}
              data={movieList}
              keyExtractor={(item) => String(item._id)}
              renderItem={(item) => <FilmItem item={item} />}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

// hạn chế chia style ra đây quá nhiều chỉ khi nào mình muốn sử dụng cái đó cho nhiều thằng thì mới viết
// các giá trị ko nên để mạc định là 20 , 30 .... mà mình sẽ sử dụng 1 giá trị chung => ex: HEIGHT,WIDTH (cái này trong contants ) gọi nó ra để sài thì mình nhân vs 1 giá trọ nào đó
// còn mấy cái như fontsize hay size icon hoặc 1 giá trị nào đó nhỏ thì mình sử dụng WIDTH_SCALE và HEIGHT_SCALE trong contants
const styles = StyleSheet.create({
  container: {
    marginTop: STATUS_BAR_CURRENT_HEIGHT,
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(166, 164, 164, 0.1)',
    alignItems: 'center',
  },
  searchBar: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {},
  searchInputContainer: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(166, 164, 164, 0.3)',
    height: 40,
    paddingLeft: 20,
    marginRight: 10,
    borderRadius: 20,
  },
  searchInput: {
    width: '80%',
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
  castContainer: {
    height: 41,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  castName: {
    color: '#000',
    paddingLeft: 10,
  },
  topTabs: {
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabsBar: {
    backgroundColor: '#819ee5',
    width: '40%',
    borderRadius: 8,
    height: 2,
  },
  txtLableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    fontFamily: Fonts.SansMedium,
    fontSize: 16,
  },
  listALLContainer: {
    flex: 1,
    borderRadius: 10,
    marginRight: 8,
    marginLeft: 8,
  },
  list: {
    borderRadius: 3,
    marginTop: 5,
  },
});
