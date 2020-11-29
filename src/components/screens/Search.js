import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  Easing,
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  HEIGHT,
  WIDTH,
  STATUS_BAR_CURRENT_HEIGHT,
  HEADER_HEIGHT,
  WIDTH_SCALE,
} from '../../constants/constants';
import { ptColor } from '../../constants/styles';
import { Fonts } from '../../utils/Fonts';
//import KeyWords from '../views/searchComponent';
import { MyHighLightButton } from '../views';
import {
  searchAPI,
  addKeywordActionRedux,
  hotContentsAPI,
} from '../../Redux/actions/keywordAction';
import { FilmItem, CastItem, MySpinner } from '../views';
import { SkypeIndicator } from 'react-native-indicators';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_KEY } from '../../constants/constants';

export default function Search({ navigation, route }) {
  const __keyword = route.params._keyword;
  const animValue = new Animated.Value(0);

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 10],
  });

  const animStart = () => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true
    }).start();
  }

  const dispatch = useDispatch();

  const inputRef = useRef(keyword);
  const [keyword, setKeyword] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [dataAfterSearch, setdataAfterSearch] = useState();
  const [hotContentsData, setHotContentsData] = useState([]);

  useEffect(() => {
    animStart();
    inputRef.current = keyword;
    handleHotMovieAPI();
    if (__keyword !== '') {
      handleGetDataByKeyword(__keyword);
    }
  }, []);

  const handleGetDataByKeyword = async (keyword) => {
    console.log('Search API Called');
    setLoading(true);
    if (keyword === '') {
      return;
    }
    await searchAPI(keyword)
      .then((json) => {
        setdataAfterSearch([...json?.cast, ...json?.movie]);
        setVisible(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHotMovieAPI = async () => {
    //Get hot contents
    let hotContents = await hotContentsAPI().then((data) => {
      return data?.items;
    });
    setHotContentsData(hotContents);
  };

  const handleSearchOnPress = () => {
    setVisible(true);
    addKeywordActionRedux(dispatch, keyword);
    handleGetDataByKeyword(keyword);
  };

  const closeIconOnPress = () => {
    setKeyword('');
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={ptColor.white} barStyle="dark-content" />
      <View
        style={{
          top: 0,
          position: 'absolute',
          width: WIDTH,
          height: 50 * WIDTH_SCALE,
          zIndex: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.50,
          shadowRadius: 12.35,
          elevation: 10,
        }}>
        <Animated.View style={[styles.searchBarContainer, { transform: [{ translateX: translateX }], }]}>
          <View style={styles.searchBar}>
            <MyHighLightButton
              style={styles.backIcon}
              onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={18} color={'rgba(0,0,0,0.5)'} />
            </MyHighLightButton>
            <View style={styles.searchInputContainer}>
              <TextInput
                autoFocus={true}
                value={keyword}
                onChangeText={(txt) => {
                  setKeyword(txt);
                  setVisible(false);
                }}
                style={styles.searchInput}
                placeholder={'Nhập từ khóa'}
                placeholderTextColor={ptColor.white}
                onSubmitEditing={handleSearchOnPress}
                returnKeyType="search"
              />
              {keyword !== '' ? (
                <EvilIcon
                  onPress={() => closeIconOnPress()}
                  style={styles.closeIcon}
                  name="close"
                  size={22 * WIDTH_SCALE}
                  color={ptColor.white}
                />
              ) : null}
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={{ height: 65 * WIDTH_SCALE, width: WIDTH }} />

      {/* {!isVisible ? (
        <ScrollView contentContainerStyle={styles.hotKeyWordContainer}>
          <Text
            style={{
              color: ptColor.gray2,
              fontFamily: Fonts.SansMedium,
              fontSize: 14 * WIDTH_SCALE,
            }}>
            POPULAR KEYWORD
          </Text>
          <View
            style={{
              marginVertical: 15 * WIDTH_SCALE,
              alignSelf: 'flex-start'
            }}>
            {hotContentsData.map((value, index) => {
              return (
                <Chip
                  style={{
                    backgroundColor: 'transparent',
                    borderRadius: 20 * WIDTH_SCALE,
                    borderColor: '#f0ab0a',
                    marginVertical: 5 * WIDTH_SCALE,
                  }}
                  key={value?._id}
                  icon="movie"
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: value?._id })
                  }>{value?.name}</Chip>
              );
            })}
          </View>
        </ScrollView>
      ) : null} */}

      {isVisible ? (
        !isLoading ? (
          <View style={styles.listALLContainer}>
            <View style={styles.list}>
              <Text
                style={{
                  color: ptColor.gray2,
                  fontFamily: Fonts.SansMedium,
                  fontSize: 14 * WIDTH_SCALE,
                }}>
                FOUND {dataAfterSearch.length} RESULTS
              </Text>
              {dataAfterSearch.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={true}
                  data={dataAfterSearch}
                  keyExtractor={(item) => String(item._id)}
                  renderItem={(item) =>
                    'birthday' in item.item ? (
                      <CastItem item={item} />
                    ) : (
                        <FilmItem params={item} navigation={navigation} />
                      )
                  }
                />
              ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: HEIGHT * 0.6,
                    }}>
                    <Text
                      style={{
                        color: ptColor.gray2,
                        fontSize: 16 * WIDTH_SCALE,
                        fontFamily: Fonts.SansMedium,
                      }}>
                      Oop! No result were found
                  </Text>
                  </View>
                )}
            </View>
          </View>
        ) : (
            <SkypeIndicator
              color={ptColor.appColor}
              size={20 * WIDTH_SCALE}
              style={{ marginTop: 20 }}
            />
          )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: '70%',
    paddingLeft: WIDTH * 0.06,
    marginRight: WIDTH * 0.03,
    borderRadius: 20,
  },
  searchInput: {
    width: WIDTH * 0.6,
    color: ptColor.white,
    fontSize: 18 * WIDTH_SCALE,
    paddingLeft: WIDTH * 0.015,
    fontFamily: Fonts.SansLight,
    paddingBottom: 8 * WIDTH_SCALE,
  },
  contentContainer: {
    height: HEIGHT,
    backgroundColor: ptColor.white,
  },
  hotKeyWordContainer: {
    flex: 1,
    paddingLeft: WIDTH * 0.02,
  },
  searchSuggestionsContainer: {
    height: HEIGHT * 0.055,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: WIDTH * 0.0175,
  },
  searchSuggestions: {
    color: ptColor.black,
    paddingLeft: WIDTH * 0.03,
  },
  listALLContainer: {
    flex: 1,
    borderRadius: 10,
    marginRight: WIDTH * 0.028,
    marginLeft: WIDTH * 0.028,
  },
  list: {
    borderRadius: 3,
    marginTop: HEIGHT * 0.015,
  },
});
