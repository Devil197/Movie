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
import KeyWords from '../views/searchComponent';
import {MyHighLightButton} from '../views';
import {searchAPI, addKeywordActionRedux} from '../../Redux/actions/keywordAction';
import {FilmItem, CastItem, MySpinner} from '../views';
import {SkypeIndicator} from 'react-native-indicators'; //Cái MySpinner ko show đc. Loay hoay tốn đống time nên t xài cái nãy đã

import {useDispatch, useSelector} from 'react-redux';

const STATUS_BAR_CURRENT_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = 50;

export default function Search({navigation}) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState();
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    handleGetDataByKeyword();
  }, [keyword]);
  console.log('a')
  const handleGetDataByKeyword = async () => {
    setLoading(true);
    if (keyword === '') {
      return;
      console.log('a')
    }
    await searchAPI(keyword)
      .then((json) => {
        setData(json);
        data?.cast.map((c, i) => {
          console.log(c?.name);
        });
        setLoading(false);
        console.log('a')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchOnPress = () => {
    setVisible(true);
    addKeywordActionRedux(dispatch, keyword);
  };

  const searchSuggestionsOnPress = (_id) => {
    console.log(_id);
  };

  const closeIconOnPress = () => {
    setKeyword('');
    setVisible(false);
  };

  const renderCastItemAfterHandleSearchAPI = data?.cast.map((c, i) => {
    return (
      <TouchableWithoutFeedback
        key={c._id}
        onPress={() => searchSuggestionsOnPress(c._id)}>
        <View style={styles.searchSuggestionsContainer} key={c?._id}>
          <EvilIcon name="search" size={22} color={'gray'} />
          <Text style={styles.searchSuggestions}>{c?.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  const renderMovieItemAfterHandleSearchAPI = data?.movie.map((c, i) => {
    return (
      <TouchableWithoutFeedback
        key={c._id}
        onPress={() => searchSuggestionsOnPress(c._id)}>
        <View style={styles.searchSuggestionsContainer} key={c?._id}>
          <EvilIcon name="search" size={22} color={'gray'} />
          <Text style={styles.searchSuggestions}>{c?.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  });

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
            <MyHighLightButton
              style={styles.backIcon}
              onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={18} color={'black'} />
            </MyHighLightButton>
            <View style={styles.searchInputContainer}>
              <EvilIcon name="search" size={22} color={'gray'} />
              <TextInput
                autoFocus={true}
                value={keyword}
                onChangeText={(txt) => {
                  setKeyword(txt);
                  setVisible(false);
                }}
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
        </View>
      </Animated.View>

      {keyword != '' ? (
        isLoading ? (
          <SkypeIndicator color="#2FA29C" size={20} style={{marginTop: 20}} />
        ) : !isVisible ? (
          <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
            {renderCastItemAfterHandleSearchAPI}
            {renderMovieItemAfterHandleSearchAPI}
          </ScrollView>
        ) : null
      ) : (
        <ScrollView contentContainerStyle={styles.keyWordContainer}>
          <KeyWords />
        </ScrollView>
      )}

      {/* 
        <View style={styles.contentContainer}> */}

      {isVisible ? (
        <View style={styles.listALLContainer}>
          <View style={styles.list}>
            <FlatList
              horizontal
              scrollEnabled
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              data={data?.cast}
              keyExtractor={(item) => String(item._id)}
              renderItem={(item) => <CastItem item={item} />}
            />
          </View>
          <View style={styles.list}>
            <FlatList
              showsVerticalScrollIndicator={true}
              numColumns={3}
              data={data?.movie}
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
  searchSuggestionsContainer: {
    height: 35,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  searchSuggestions: {
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
