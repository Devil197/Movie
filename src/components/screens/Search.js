import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {HEIGHT, WIDTH, STATUS_BAR_CURRENT_HEIGHT, HEADER_HEIGHT, WIDTH_SCALE} from '../../constants/constants';
import {ptColor} from '../../constants/styles'
import {Fonts} from '../../utils/Fonts';
import KeyWords from '../views/searchComponent';
import {MyHighLightButton} from '../views';
import {searchAPI, addKeywordActionRedux} from '../../Redux/actions/keywordAction';
import {FilmItem, CastItem, MySpinner} from '../views';
import {SkypeIndicator} from 'react-native-indicators'; //Cái MySpinner ko show đc. Loay hoay tốn đống time nên t xài cái nãy đã

import {useDispatch, useSelector} from 'react-redux';

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
          <EvilIcon name="search" size={22} color={ptColor.gray2} />
          <Text style={styles.searchSuggestions}>{c?.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={ptColor.white} />
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
              <FontAwesome5 name="arrow-left" size={18} color={ptColor.black} />
            </MyHighLightButton>
            <View style={styles.searchInputContainer}>
              <EvilIcon name="search" size={22} color={ptColor.gray2} />
              <TextInput
                autoFocus={true}
                value={keyword}
                onChangeText={(txt) => {
                  setKeyword(txt);
                  setVisible(false);
                }}
                style={styles.searchInput}
                placeholder={'Tìm kiếm với GEA'}
                placeholderTextColor={ptColor.gray2}
                onSubmitEditing={handleSearchOnPress}
                returnKeyType="search"
              />
              {keyword.length > 0 ? (
                <EvilIcon
                  onPress={() => closeIconOnPress()}
                  style={styles.closeIcon}
                  name="close"
                  size={22 * WIDTH_SCALE}
                  color={ptColor.gray2}
                />
              ) : null}
            </View>
          </View>
        </View>
      </Animated.View>

      {keyword != '' ? (
        isLoading ? (
          <SkypeIndicator color={ptColor.appColor} size={20 * WIDTH_SCALE} style={{marginTop: 20}} />
        ) : !isVisible ? (
          <ScrollView style={{width: '100%', backgroundColor: ptColor.white}}>
            {renderCastItemAfterHandleSearchAPI}
            {renderMovieItemAfterHandleSearchAPI}
          </ScrollView>
        ) : null
      ) : (
        <ScrollView contentContainerStyle={styles.keyWordContainer}>
          <KeyWords setKeywordOnPress={val => setKeyword(val)}/>
        </ScrollView>
      )}

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

const styles = StyleSheet.create({
  container: {
    marginTop: STATUS_BAR_CURRENT_HEIGHT,
    flex: 1,
    backgroundColor: ptColor.white,
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
    color: ptColor.gray2,
    fontSize: 16 * WIDTH_SCALE,
    height: 41,
    paddingLeft: 5,
  },
  contentContainer: {
    height: '100%',
    backgroundColor: ptColor.white,
  },
  keyWordContainer: {
    flex: 1,
  },
  searchSuggestionsContainer: {
    height: 35,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  searchSuggestions: {
    color: ptColor.black,
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
    color: ptColor.gray2,
    fontFamily: Fonts.SansMedium,
    fontSize: 16 * WIDTH_SCALE,
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
