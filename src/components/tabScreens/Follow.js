import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { FilmFollowItem, MyHighLightButton } from '../views/index';
import { getItemsFollowByUserId, deleteFollowAPI } from '../../Redux/actions/followAction';
import { Fonts } from '../../utils/Fonts';
import { MySpinner } from '../views';
import { useSelector, useDispatch } from 'react-redux';
import { REDUX } from '../../Redux/store/types';
import { WIDTH_SCALE, WIDTH } from '../../constants/constants'
import { Appbar, useTheme } from 'react-native-paper';

const Follow = ({ navigation }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState();
  const [selectAll, setSelectAll] = useState(false)
  const [isUpdate, setUpdate] = useState(false)
  const [dataUpdate, setDataUpdate] = useState([])
  const user = useSelector((state) => state.userReducer);
  const followReducer = useSelector((state) => state.followReducer)
  console.log('1000 ', followReducer);
  const userId = user?.userInfo?._id;
  useEffect(() => {
    getDataFromAPI();
  }, [userId]);

  function deleteFollow() {
    let dataItem;
    if (dataUpdate.length > 0) {
      MySpinner.show()
      followReducer?.list?.map((e, i) => {
        dataItem = dataUpdate.find((e1) => e.movie_id._id === e1._id)
      })
      dataUpdate.map((e) => {
        deleteFollowAPI(userId, e.movie_id._id).then(res => {
          ToastAndroid.show(
            'Xóa thành công ' + e.movie_id.name,
            ToastAndroid.SHORT,
          );
          dispatch({
            type: REDUX.DELETE_FOLLOW,
            payload: e
          })
          getDataFromAPI()
          setDataUpdate([])
          setSelectAll(false)
          setUpdate(false)

        }).catch(err => {
          ToastAndroid.show(
            'Xóa thất bại ' + e.movie_id.name + ' : ' + err,
            ToastAndroid.SHORT,
          );
          console.log('1000 err delete follow ', err);
        })
      })
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

  function selectAllFollow() {
    setDataUpdate(data)
    setSelectAll(true)
    console.log('1000 data update', dataUpdate);
  }

  function unSelectedAllFollow() {
    setDataUpdate([])
    setSelectAll(false)
  }

  const getDataFromAPI = async () => {
    MySpinner.show();
    let json = await getItemsFollowByUserId(userId).then((json) => {
      return json;
    });
    console.log('0103 json', json);
    setData(json.items);
    console.log('0103 data', data);
    if (followReducer?.first) {
      console.log('1001 chay redux');
      dispatch({
        type: REDUX.SET_FOLLOW,
        payload: data.items
      })
      dispatch({
        type: REDUX.FIRST_FOLLOW
      })
      MySpinner.hide();
    }
    MySpinner.hide();
  };

  function Header() {
    const _goBack = () => navigation.goBack();
    return (
      <Appbar.Header
        style={{ backgroundColor: 'white', elevation: 0, justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={styles.pageTitle}></Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={styles.pageTitle}>Follow</Text>
        </View>
        <MyHighLightButton
          onPress={() => {
            setUpdate(!isUpdate)
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
      </Appbar.Header >
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" />
      <Header />

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
        <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', height: 40 * WIDTH_SCALE, borderWidth: 0.5 }}>
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
  },
});
