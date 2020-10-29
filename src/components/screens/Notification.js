import React from 'react'
import { StyleSheet, Text, View,Image,ScrollView,FlatList} from 'react-native'
import { Appbar, Card} from 'react-native-paper';
import { ptColor } from '../../constants/styles';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY } from '../../constants/constants';
import { Icon as IconElement } from 'react-native-elements';
import {films} from '../../constants/data/fakeData';
import { Fonts } from '../../utils/Fonts';
import {NotificationItem} from '../views/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
export default function Notification({navigation}) {

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
            <Text style={{ fontSize: 18 * WIDTH_SCALE }}>Notification</Text>
            <View style={{ width: '10%' }} />
          </Appbar.Header>
        )
      }
    return (
        <View style = {styles.container}>
            <Header/>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}>
                {films.map((c, i) => {
                     return (
                        <View style={styles.group}>
                            <View style={[styles.row, styles.groupItem]}>
                                <Image style = {{width: 0.4 * WIDTH, height: 0.15 * HEIGHT, borderRadius: 10 *WIDTH_SCALE}} source={{ uri: c.thumb }} />
                                <Text style={styles.groupItemText} numberOfLines={3} ellipsizeMode ='tail' >{c.title}</Text>
                                <View style={styles.myViewB}>
                                    <Text style = {styles.textContent}>New</Text>
                                </View>
                                <Menu>
                                    <MenuTrigger >
                                        <IconElement name="dots-three-vertical" type="entypo" color={ptColor.black} size={18 * WIDTH_SCALE} />
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center', margin: 0 }} onSelect={() => remove(e?._id)}>
                                            <Text>Xóa Thông Báo Này</Text>
                                        </MenuOption>
                                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }} onSelect={() => removeAll('5f8a891887f5ef0004f46619')}>
                                            <Text>Xóa Tất Cả Thông Báo</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </View>
                        </View>
                );
            })}
            </ScrollView>
            {/* <FlatList
            showsVerticalScrollIndicator={true}
            numColumns={3}
            data={films}
            keyExtractor={(item) => String(item.id)}
            renderItem={item => <NotificationItem item={item} />}
         /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
     groupTitle: {
        fontSize: 13 * WIDTH_SCALE,
        color: "#B1B9C0",
        fontFamily: Fonts.SansBold
    },
    groupItem: {
        paddingVertical: 16 * WIDTH_SCALE,
        borderBottomWidth: 1,
        borderBottomColor: "#E9ECEF",
        alignItems: "center", 
        padding: 16 * WIDTH_SCALE,
    },
    row: {
        alignItems: "center",
        flexDirection: 'row',

    },
    myViewB: {
        width: 0.08 * WIDTH,
        height: 0.04 * HEIGHT,
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 2,
        alignItems: 'center',
        backgroundColor: '#EA2027',
        borderRadius: 25 * WIDTH_SCALE,
        top: 20 * WIDTH_SCALE,
        left: 135 * WIDTH_SCALE,
      },
      textContent: {
        color: '#000',
        fontFamily: 'ProductSans-Regular',
        fontSize: 8 * WIDTH_SCALE,
        color: '#FFF',
      },
      groupItemText: {
        flex: 1,
        marginHorizontal: 16 * WIDTH_SCALE,
        fontSize: 14 * WIDTH_SCALE,
        fontFamily: Fonts.SansMedium,
    }
})
 