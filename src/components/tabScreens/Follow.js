import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  Alert,
  StatusBar,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { FilmFollowItem, MyHighLightButton, CastFollowItem } from '../views';
import { getItemsFollowByUserId, deleteFollowAPI } from '../../Redux/actions/followAction';
import { Fonts } from '../../utils/Fonts';
import { MySpinner } from '../views';
import { useSelector, useDispatch } from 'react-redux';
import { REDUX } from '../../Redux/store/types';
import { WIDTH_SCALE, WIDTH, followType } from '../../constants/constants'
import { Appbar, useTheme } from 'react-native-paper';
import ViewPager from '@react-native-community/viewpager';
import update from 'react-addons-update';
import { useIsFocused } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather'

const Follow = ({ navigation }) => {
  const isFocused = useIsFocused();
  const viewPagerRef = useRef()
  const dispatch = useDispatch()
  const [data, setData] = useState();
  const [dataCast, setDataCast] = useState()
  const [scrollViewPager, setScrollViewPager] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [isUpdate, setUpdate] = useState(false)
  const [dataUpdate, setDataUpdate] = useState([])
  const [dataUpdateCast, setDataUpdateCast] = useState([])
  const user = useSelector((state) => state.userReducer);
  const followReducer = useSelector((state) => state.followReducer)
  console.log('1000 follow redux', followReducer);
  const userId = user?.userInfo?._id;
  console.log('1000 userId', userId);

  useEffect(() => {
    getDataFromAPIMovieFollow();
    getDataFromAPICastFollow()
  }, [isFocused]);

  function deleteFollow() {
    let dataItem;
    if (dataUpdate.length > 0) {
      MySpinner.show()
      followReducer?.list?.map((e, i) => {
        dataItem = dataUpdate.find((e1) => e._id === e1._id)
      })
      dataUpdate.map((e) => {
        deleteFollowAPI(userId, e.movie_id._id, followType.movie).then(res => {
          ToastAndroid.show(
            'Xóa thành công ' + e.movie_id.name,
            ToastAndroid.SHORT,
          );
          dispatch({
            type: REDUX.DELETE_FOLLOW,
            payload: e
          })


        }).catch(err => {
          ToastAndroid.show(
            'Xóa thất bại ' + e.movie_id.name + ' : ' + err,
            ToastAndroid.SHORT,
          );
          console.log('1000 err delete follow ', err);
        })
      })
      getDataFromAPIMovieFollow()
      setDataUpdate([])
      setSelectAll(false)
      setUpdate(false)
      setTimeout(() => {
        MySpinner.hide()
      }, 1000 * 3)
    } else {
      ToastAndroid.show(
        'Bạn chưa chọn movie nào !',
        ToastAndroid.SHORT,
      );
      MySpinner.hide()
    }
  }
  function deleteFollowCast() {
    console.log('0909 dataCast ', dataCast);
    console.log('0909 dataUpdateCast', dataUpdateCast);
    let dataItem;
    if (dataUpdateCast.length > 0) {

      MySpinner.show()
      // dataCast.map((e, i) => {
      //   dataItem = dataUpdateCast.find((e1) => e.cast_id._id === e1._id)
      // })
      dataUpdateCast.map((e) => {
        // console.log('0909 e',e);
        deleteFollowAPI(userId, e.cast_id._id, followType.cast).then(res => {
          ToastAndroid.show(
            'Xóa thành công ' + e?.name,
            ToastAndroid.SHORT,
          );
          dispatch({
            type: REDUX.DELETE_FOLLOW_CATS,
            payload: e
          })
        }).catch(err => {
          ToastAndroid.show(
            'Xóa thất bại ' + e.cast_id.name + ' : ' + err,
            ToastAndroid.SHORT,
          );
          console.log('1000 err delete follow ', err);
        })
      })
      getDataFromAPICastFollow()
      setDataUpdateCast([])
      setSelectAll(false)
      setUpdate(false)

      setTimeout(() => {
        MySpinner.hide()
      }, 1000 * 3)
    } else {
      ToastAndroid.show(
        'Bạn chưa chọn movie nào !',
        ToastAndroid.SHORT,
      );
      MySpinner.hide()
    }
  }

  const checkedItemUpdate = (item, check) => {
    if (check) {
      setDataUpdate((e) => [...e, item])
    } else {
      setDataUpdate(dataUpdate.filter((e) => e._id !== item._id))
    }
  }

  const checkedItemUpdateCast = (item, check) => {
    if (check) {
      setDataUpdateCast((e) => [...e, item])
    } else {
      setDataUpdateCast(dataUpdateCast.filter((e) => e._id !== item._id))
    }
  }

  function selectAllFollow() {
    setDataUpdate(data)
    setSelectAll(true)
    console.log('1000 data update', dataUpdate);
  }

  function unSelectedAllFollow() {
    setDataUpdate([])
    setSelectAll(false)
  }

  function selectedAllFollowCast() {
    setDataUpdateCast(dataCast)
    setSelectAll(true)
  }
  function unSelectedAllFollowCast() {
    setDataUpdateCast([])
    setSelectAll(false)
  }


  const getDataFromAPIMovieFollow = async () => {
    MySpinner.show();
    let json = await getItemsFollowByUserId(followType.movie, userId).then((json) => {
      return json;
    }).catch((e) => {
      console.log('1000 fail api', e);
    })
    console.log('0103 json', json);
    setData(json?.items);
    console.log('0103 data', data);
    if (!followReducer?.first) {
      console.log('1001 chay redux');
      dispatch({
        type: REDUX.SET_FOLLOW,
        payload: json.items
      })
      dispatch({
        type: REDUX.FIRST_FOLLOW
      })
      MySpinner.hide();
    }
    MySpinner.hide();
  };

  const getDataFromAPICastFollow = async () => {
    MySpinner.show();
    let json = await getItemsFollowByUserId(followType.cast, userId).then((json) => {
      return json;
    }).catch((e) => {
      console.log('1000 fail api', e);
    })
    console.log('0103 json cast', json.items);
    setDataCast(json?.items);
    console.log('0103 data', dataCast);
    if (!followReducer?.first) {
      console.log('1001 chay redux');
      dispatch({
        type: REDUX.SET_FOLLOW_CAST,
        payload: json.items
      })
      dispatch({
        type: REDUX.FIRST_FOLLOW
      })
      MySpinner.hide();
    }
    MySpinner.hide();
  };


  const scrollViewPagerAction = () => {
    if (scrollViewPager) {
      viewPagerRef.current?.setPage(0)
      setScrollViewPager(false)
      setDataUpdateCast([])
    } else {
      viewPagerRef.current?.setPage(1)
      setScrollViewPager(true)
      setDataUpdate([])
    }
    setUpdate(false)
  }

  function Header() {
    const _goBack = () => navigation.goBack();
    return (
      <Appbar.Header
        statusBarHeight={0}
        style={{ backgroundColor: 'white', elevation: 0, justifyContent: 'space-between', margin: 0, padding: 0, height: 40 * WIDTH_SCALE }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={styles.pageTitle}></Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: WIDTH,
            flexDirection: "row",
            paddingTop: 5 * WIDTH_SCALE
          }}>
          <Icons
            onPress={() => navigation.goBack()}
            name={'chevron-left'}
            size={20 * WIDTH_SCALE}
            color={'#000'}
            style={{ marginLeft: 10 * WIDTH_SCALE }}
          />
          <Text style={styles.pageTitle}>Đã theo dõi</Text>
          <MyHighLightButton
            onPress={() => {
              setUpdate(true)
              if (isUpdate === true) {
                setDataUpdate((e) => [])
                setSelectAll(false)
              }
            }}
            style={{
              justifyContent: 'center', alignItems: 'flex-end', flex: 1, height: '50%'
            }}>
            < Text style={{ marginRight: 20 * WIDTH_SCALE, fontSize: 16 * WIDTH_SCALE }}>
              {isUpdate ? 'Hủy' : 'Sửa'}
            </Text>
          </MyHighLightButton >
        </View>

      </Appbar.Header >
    );
  }


  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" />
      <Header />
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: 0,
          padding: 0
        }}>
        <TouchableOpacity
          onPress={() => scrollViewPagerAction()}
          style={{
            backgroundColor: scrollViewPager ? null : '#e2d7d7',
            width: WIDTH * 0.48,
            margin: WIDTH * 0.04,
            height: 25 * WIDTH_SCALE,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15 * WIDTH_SCALE
          }}>
          <Text>Movie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollViewPagerAction()}
          style={{
            backgroundColor: scrollViewPager ? '#e2d7d7' : null,
            width: WIDTH * 0.48,
            margin: WIDTH * 0.04,
            height: 25 * WIDTH_SCALE,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15 * WIDTH_SCALE
          }}>
          <Text>Cast</Text>
        </TouchableOpacity>
      </View> */}

      <ViewPager style={{ flex: 1 }} initialPage={scrollViewPager ? 1 : 0} orientation={'horizontal'}
        showPageIndicator={true}
        ref={viewPagerRef}
        onPageScroll={(e) => console.log(e)}
        scrollEnabled={false}
      >
        <View key="1" style={{ flex: 1 }}>
          <FlatList
            key={selectAll}
            showsVerticalScrollIndicator={true}
            numColumns={3}
            data={data}
            keyExtractor={(item) => String(item.id)}
            extraData={dataUpdate}
            renderItem={(item) => (
              <FilmFollowItem
                navigation={navigation}
                params={item}
                update={isUpdate}
                followReducer={followReducer?.list}
                checkedItemUpdate={checkedItemUpdate}
                selectAll={selectAll}
                dispatch={dispatch}
              />
            )}
          />
          {isUpdate ?
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                height: 40 * WIDTH_SCALE,
                borderWidth: 0.5
              }}>
              <TouchableOpacity
                onPress={() => selectAll ? unSelectedAllFollow() : selectAllFollow()}
                style={{ flex: 1, width: WIDTH * 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b77e7' }}>
                <Text style={{ fontSize: 15 * WIDTH_SCALE, color: 'white' }}>{selectAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteFollow()}
                style={{ flex: 1, width: WIDTH * 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15 * WIDTH_SCALE, color: 'red' }}> Xóa  {dataUpdate.length > 0 ? dataUpdate.length : null}</Text>
              </TouchableOpacity>
            </View>
            : null
          }
        </View>
        <View key="2" style={{ flex: 1 }}>

          <FlatList
            key={selectAll}
            showsVerticalScrollIndicator={true}
            numColumns={3}
            data={dataCast}
            keyExtractor={(item) => String(item.id)}
            extraData={dataUpdateCast}
            renderItem={(item) => (
              <CastFollowItem
                item={item}
                update={isUpdate}
                selectAll={selectAll}
                navigation={navigation}
                dispatch={dispatch}
                checkedItemUpdateCast={checkedItemUpdateCast}
              />
            )}
          />
          {isUpdate ?
            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', height: 40 * WIDTH_SCALE, borderWidth: 0.5 }}>
              <TouchableOpacity
                onPress={() => selectAll ? unSelectedAllFollowCast() : selectedAllFollowCast()}
                style={{ flex: 1, width: WIDTH * 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b77e7' }}>
                <Text style={{ fontSize: 15 * WIDTH_SCALE, color: 'white' }}>{selectAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteFollowCast()}
                style={{ flex: 1, width: WIDTH * 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15 * WIDTH_SCALE, color: 'red' }}> Xóa  {dataUpdateCast.length > 0 ? dataUpdateCast.length : null}</Text>
              </TouchableOpacity>
            </View>
            : null
          }
        </View>
      </ViewPager>

    </View >
  );
};
export default Follow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: Fonts.SansMedium,
    textAlign: 'center',
    flex: 6
  },
});
