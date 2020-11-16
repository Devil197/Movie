import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, Alert } from 'react-native'
import { Appbar, Card, Avatar } from 'react-native-paper';
import { ptColor } from '../../constants/styles';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY, typeNotification } from '../../constants/constants';
import { Icon as IconElement } from 'react-native-elements';
import { films } from '../../constants/data/fakeData';
import { Fonts } from '../../utils/Fonts';
import { MyHighLightButton, NotificationItem } from '../views/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment'
import { REDUX } from '../../Redux/store/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

function compareFirstNames(a, b) {
    if (moment(a.create_at).isAfter(b.create_at)) {
        return -1;
    }
    if (moment(b.create_at).isAfter(a.create_at)) {
        return 1;
    }
    return 0;
}


export default function Notification({ navigation }) {
    const data = useSelector(state => state.notificationReducer)
    const dispatch = useDispatch()
    const dataMomentDay = data?.list.filter((e) => moment(e.create_at).format('YYYY-MM-DD').toString() === moment().format('YYYY-MM-DD').toString())
    dataMomentDay.sort(compareFirstNames)
    const dataMomentNoDay = data?.list.filter((e) => moment(e.create_at).format('YYYY-MM-DD').toString() !== moment().format('YYYY-MM-DD').toString())
    dataMomentNoDay.sort(compareFirstNames)

    function Header() {
        const _goBack = () => navigation.goBack();
        return (
            <Appbar.Header
                style={{ backgroundColor: 'white', elevation: 0, justifyContent: 'space-between' }}>
                <Appbar.Action
                    onPress={_goBack}
                    icon={() => (
                        <IconElement name="chevron-left" type="feather" color={ptColor.black} size={18 * WIDTH_SCALE} />
                    )}
                    color={ptColor.black}
                    size={24 * WIDTH_SCALE}
                />
                <Appbar.Content
                    title={'Notification'}
                    titleStyle={[{ margin: 0, fontSize: 18 * WIDTH_SCALE, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }]}
                />

                <View style={{ width: '10%' }} />
                {/* <MyHighLightButton onPress={() => navigation.push(ROUTE_KEY.Search)}>
                    <Icon name="search" color="#999999" size={0.07 * WIDTH} />
                </MyHighLightButton> */}

                <Menu style={{ paddingRight: 10 * WIDTH_SCALE }}>
                    <MenuTrigger >
                        <IconElement name="dots-three-vertical" type="entypo" color={ptColor.black} size={18 * WIDTH_SCALE} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }}
                            onSelect={() => {
                                const viewAllNotification = data.list.map((e1) => ({
                                    ...e1,
                                    userInteraction: true,
                                }));
                                dispatch({
                                    type: REDUX.VIEW_ALL_NOTIFICATION,
                                    payload: viewAllNotification
                                })
                            }}>
                            <Text>Đánh dấu tất cả là đã xem</Text>
                        </MenuOption>
                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }}
                            onSelect={() => dispatch({ type: REDUX.CLEAR_NOTIFICATION, })}
                        >
                            <Text>Xóa Tất Cả Thông Báo</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </Appbar.Header>
        )
    }
    return (
        <View style={styles.container}>
            <Header />
            {dataMomentDay.length > 0 || dataMomentNoDay > 0 ?
                <ScrollView>
                    {dataMomentDay.length > 0 ?
                        <View>
                            <Text style={{ fontSize: 18 * WIDTH_SCALE }}>Hôm nay</Text>
                            <FlatList
                                data={dataMomentDay}
                                renderItem={(item, index) => <ItemNotification item={item} index={index} dispatch={dispatch} navigation={navigation} />}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        :
                        null
                    }
                    {dataMomentNoDay.length > 0 ?
                        <View style={{ marginTop: 20 * WIDTH_SCALE }}>
                            <Text style={{ fontSize: 18 * WIDTH_SCALE }}>Trước đó</Text>
                            <FlatList
                                data={dataMomentNoDay}
                                renderItem={(item, index) => <ItemNotification item={item} index={index} dispatch={dispatch} navigation={navigation} />}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        :
                        null
                    }

                </ScrollView>
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'gray' }}>Bạn chưa có bất kì thông báo nào </Text>
                </View>
            }

        </View>
    )
}

const HEIGHT_BLOG_ITEM = HEIGHT * 0.08
const ItemNotification = React.memo(({ item, index, dispatch, navigation }) => {
    console.log('1001 item', item);
    return (
        <MyHighLightButton
            onPress={() => {
                const itemClick = {
                    name: item.item.name,
                    userInteraction: item.item.userInteraction ? true : true,
                    cover_image: item.item.cover_image,
                    movie_id: item.item.movie_id,
                    des: item.item.des,
                    create_at: item.item.create_at,
                    type: item.item.type
                }
                dispatch({
                    type: REDUX.UPDATE_NOTIFICATION,
                    payload: itemClick
                })
                if (item.item.type === typeNotification.MOVIE) {
                    navigation.navigate(ROUTE_KEY.Details, { _id: itemClick.movie_id })
                } else if (item.item.type === typeNotification.VIDEO) {
                    Alert.alert('Qua screen Video ne` !')
                } else if (item.item.type === typeNotification.CAST) {
                    Alert.alert('Qua screen cast ne` !')
                }

            }}
            style={{ paddingTop: 10 * WIDTH_SCALE, backgroundColor: item?.item?.userInteraction ? 'white' : '#A9F5F2' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {item.item.type === typeNotification.CAST ?
                    <View style={{ alignItems: 'center', flex: 1, margin: 5 * WIDTH_SCALE, }}>
                        <Avatar.Image size={60 * WIDTH_SCALE} source={{ uri: item?.item?.cover_image }} style={{ marginLeft: 5 * WIDTH_SCALE, }} />
                    </View>
                    : null
                }
                {item.item.type === typeNotification.MOVIE ?
                    <Image source={{ uri: item.item.cover_image }} style={{ width: 120 * WIDTH_SCALE, height: 80 * WIDTH_SCALE, margin: 10 * WIDTH_SCALE }} />
                    : null
                }
                {item.item.type === typeNotification.VIDEO ?
                    <Image source={{ uri: item.item.cover_image }} style={{ width: 120 * WIDTH_SCALE, height: 80 * WIDTH_SCALE, margin: 10 * WIDTH_SCALE }} />
                    : null
                }
                <View style={{ flex: 2 }}>
                    <Text style={{ fontSize: 15 * WIDTH_SCALE }}>{item?.item?.name}</Text>
                    {item.item.type === typeNotification.CAST ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 * WIDTH_SCALE }}>
                            {item.item.isFollow ?
                                <TouchableOpacity
                                    disabled={true}
                                    style={{
                                        backgroundColor: '#3f5b92',
                                        width: WIDTH * 0.56,
                                        alignItems: 'center',
                                        height: 30 * WIDTH_SCALE,
                                        justifyContent: 'center',
                                        borderRadius: 5 * WIDTH_SCALE,
                                        marginRight: 10 * WIDTH_SCALE,
                                    }}
                                >
                                    <Text style={{ color: ptColor.white }}>Đã follow</Text>
                                </TouchableOpacity>
                                :
                                <>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#4A80EA',
                                            width: WIDTH * 0.28,
                                            alignItems: 'center',
                                            height: 30 * WIDTH_SCALE,
                                            justifyContent: 'center',
                                            borderRadius: 5 * WIDTH_SCALE,
                                            marginRight: 10 * WIDTH_SCALE,
                                        }}
                                    >
                                        <Text style={{ color: ptColor.white }}>Follow</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#d6dbdb',
                                            width: WIDTH * 0.28,
                                            alignItems: 'center',
                                            height: 30 * WIDTH_SCALE,
                                            justifyContent: 'center',
                                            borderRadius: 5 * WIDTH_SCALE,
                                            marginRight: 10 * WIDTH_SCALE,
                                        }}
                                    >
                                        <Text style={{ color: 'red' }}>Xóa</Text>
                                    </TouchableOpacity>
                                </>
                            }

                        </View>
                        :
                        <Text style={{ fontStyle: 'italic', color: 'gray', width: WIDTH * 0.5 }}>{item?.item?.des}</Text>
                    }
                </View>
            </View>
            {item.item.type === typeNotification.MOVIE ?
                <View style={{ position: 'absolute', bottom: 5 * WIDTH_SCALE, right: 5 * WIDTH_SCALE }}>
                    <Text style={{ fontStyle: 'italic', color: 'grey' }}>{moment(item.item.create_at).format('HH:mm')}</Text>
                </View>
                :
                null
            }
        </MyHighLightButton>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})
