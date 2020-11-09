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

export default function Search({ navigation }) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const dispatch = useDispatch();

  const inputRef = useRef(keyword);
  const [keyword, setKeyword] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [dataAfterSearch, setdataAfterSearch] = useState();
  const [hotContentsData, setHotContentsData] = useState([]);

  useEffect(() => {
    inputRef.current = keyword;
    handleHotMovieAPI();
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
      <StatusBar backgroundColor={ptColor.white} />
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
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
              <EvilIcon
                name="search"
                size={22 * WIDTH_SCALE}
                color={ptColor.gray2}
              />
              <TextInput
                autoFocus={true}
                value={keyword}
                onChangeText={(txt) => {
                  setKeyword(txt);
                  setVisible(false);
                }}
                style={styles.searchInput}
                //placeholder={'Search on GEA'}
                placeholderTextColor={ptColor.gray2}
                onSubmitEditing={handleSearchOnPress}
                returnKeyType="search"
              />
              {keyword !== '' ? (
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

      {!isVisible ? (
        <ScrollView contentContainerStyle={styles.hotKeyWordContainer}>
          <Text
            style={{
              color: ptColor.gray2,
              fontFamily: Fonts.SansMedium,
              fontSize: 14 * WIDTH_SCALE,
            }}>
            POPULAR KEYWORD
          </Text>
          <View style={{ padding: WIDTH * 0.02, flexDirection: 'row' }}>
            {hotContentsData.map((value, index) => {
              return (
                <MyHighLightButton
                  key={value?._id}
                  onPress={() =>
                    navigation.push(ROUTE_KEY.Details, { _id: value?._id })
                  }>
                  <Text
                    numberOfLines={1}
                    style={{
                      backgroundColor: ptColor.white,
                      padding: 10 * WIDTH_SCALE,
                      // borderRadius: 20 * WIDTH_SCALE,
                      // borderColor: '#e056fd',
                      // borderWidth: 0.5,
                      fontFamily: Fonts.SansMedium,
                      marginRight: WIDTH * 0.02,
                      color: '#e056fd',
                    }}
                    ellipsizeMode="middle">
                    {value?.name}
                  </Text>
                </MyHighLightButton>
              );
            })}
          </View>
        </ScrollView>
      ) : null}

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

// không nên chia style như vậy viết trên thẻ lun để tới lúc chỉnh cho dễ chó mò xuống đây lại rối
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
    backgroundColor: '#fff',
    height: HEIGHT * 0.06,
    paddingLeft: WIDTH * 0.06,
    marginRight: WIDTH * 0.03,
    borderRadius: 20,
  },
  searchInput: {
    width: WIDTH * 0.6,
    color: ptColor.gray2,
    fontSize: 16 * WIDTH_SCALE,
    height: HEIGHT * 0.06,
    paddingLeft: WIDTH * 0.015,
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
