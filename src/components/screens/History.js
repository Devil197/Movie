import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  TouchableHighlight,
  Alert
} from 'react-native'
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY } from '../../constants/constants'
import { ptColor } from '../../constants/styles'
import { films, menu } from '../../constants/data/fakeData'
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryByIdUser, deleteHistoryByInvite_ID, deleteHistoryByID } from '../../Redux/actions/historyAction';
import { Appbar, useTheme } from 'react-native-paper';
import { Icon as IconElement } from 'react-native-elements'
import { MyHighLightButton, Divider, MySpinner } from '../views'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';


export default function History({ navigation }) {

  const userReducer = useSelector((state) => state.userReducer)
  // console.log('image,: ', userReducer);
  const [dataHistory, setDataHistory] = useState();

  useEffect(() => {
    getHistoryByIdUser("5f8a891887f5ef0004f46619").then((history) => {
      console.log('1001 -> history', history);
      setDataHistory(history);
    }).catch((err) => console.log("Failed", err));
    console.log('da ', dataHistory?.items);

  }, [dataHistory])

  const removeAll = (invite_id) => {
    MySpinner.show()
    deleteHistoryByInvite_ID(invite_id).then(res => {
      MySpinner.hide()
    }).catch(e => {
      console.log(e)
      MySpinner.hide()
    })
  }

  const remove = (id) => {
    MySpinner.show()
    deleteHistoryByID(id).then(res => {
      console.log(res);
      MySpinner.hide()
    }).catch(e => {
      console.log(e);
      MySpinner.hide()
    })
  }


  function Header() {
    const _goBack = () => navigation.goBack();
    return (
      <Appbar.Header
        style={{ backgroundColor: '#fafafa', elevation: 0, justifyContent: 'space-between' }}>
        <Appbar.Action
          onPress={_goBack}
          icon={() => (
            <IconElement name="chevron-left" type="feather" color={ptColor.black} size={18 * WIDTH_SCALE} />
          )}
          color={ptColor.black}
          size={24}
        />
        <Text style={{ fontSize: 18 * WIDTH_SCALE }}>History</Text>
        <View style={{ width: '10%' }} />
      </Appbar.Header>
    )
  }


  return (
    <View style={styles.container}>
      <Header />
      {dataHistory ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'gray' }}>Bạn chưa có history</Text>
        </View>
        :
        <>
          {dataHistory?.items.map((e, i) => {
            return (
              <Card style={{ marginBottom: 10 * WIDTH_SCALE, marginTop: i === 0 ? 10 * WIDTH_SCALE : 0 }}>
                <View style={{ flexDirection: 'row', margin: 10 * WIDTH_SCALE }} >
                  <MyHighLightButton onPress={() => navigation.navigate(ROUTE_KEY.Details, { _id: e?.movie_id?._id })}>
                    <Image source={{ uri: e?.movie_id?.cover_img }} style={{ width: WIDTH * 0.4, height: 100 * WIDTH_SCALE }} resizeMode={'cover'} />
                  </MyHighLightButton>

                  <MyHighLightButton
                    onPress={() => navigation.navigate(ROUTE_KEY.Details, { _id: e?.movie_id?._id })}
                    style={{ margin: 5 * WIDTH_SCALE, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text>{e?.movie_id?.name}</Text>
                    <Text>Đã Xem : {e?.duration} s</Text>

                    <Text>{e?.movie_id?.score} lượt xem</Text>

                  </MyHighLightButton>
                  <View style={{ alignItems: 'center', position: 'absolute', right: 0, width: 30 * WIDTH_SCALE, zIndex: 9999, height: 30 * WIDTH_SCALE }}>
                    <Menu>
                      <MenuTrigger >
                        <IconElement name="dots-three-vertical" type="entypo" color={ptColor.black} size={18 * WIDTH_SCALE} />
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center', margin: 0 }} onSelect={() => remove(e?._id)}>
                          <Text>Xóa Khỏi Lịch Sử Xem</Text>
                        </MenuOption>
                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }} onSelect={() => removeAll('5f8a891887f5ef0004f46619')}>
                          <Text>Xóa Tất Cả Lịch Sử Xem </Text>
                        </MenuOption>
                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center', margin: 0 }}>
                          <Text>Share</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
                <Divider />
              </Card>
            )
          })}
        </>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})