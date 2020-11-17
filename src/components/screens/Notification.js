import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import { Appbar, Card } from 'react-native-paper';
import { ptColor } from '../../constants/styles';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY } from '../../constants/constants';
import { Icon as IconElement } from 'react-native-elements';
import { films } from '../../constants/data/fakeData';
import { Fonts } from '../../utils/Fonts';
import { MyHighLightButton, NotificationItem } from '../views/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
export default function Notification({ navigation }) {

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
                <MyHighLightButton onPress={() => navigation.push(ROUTE_KEY.Search)}>
                    <Icon name="search" color="#999999" size={0.07 * WIDTH} />
                </MyHighLightButton>

                <Menu style={{ paddingRight: 10 * WIDTH_SCALE }}>
                    <MenuTrigger >
                        <IconElement name="dots-three-vertical" type="entypo" color={ptColor.black} size={18 * WIDTH_SCALE} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }} onSelect={() => removeAll('5f8a891887f5ef0004f46619')}>
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
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}>
                {films.map((c, i) => {
                    return (
                        <View style={styles.group}>
                            <View style={[styles.row, styles.groupItem]}>
                                <View style={{ flexDirection: 'column', width: 0.53 * WIDTH }}>
                                    <Text style={styles.groupItemText} numberOfLines={3} ellipsizeMode='tail' >{c.title}</Text>
                                    <Text style={styles.textContent}>15/05/2000</Text>
                                </View>
                                <View style={{ width: 0.35 * WIDTH, height: 0.12 * HEIGHT, }}>
                                    <Image style={{ flex: 1, resizeMode: 'cover', borderRadius: 5 * WIDTH_SCALE, }} source={{ uri: c.thumb }} />
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
                                            <Text>Ẩn Thông Báo Này</Text>
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

const HEIGHT_BLOG_ITEM = HEIGHT * 0.08
const ItemNotification = React.memo(({ item, index, dispatch, navigation }) => {
    // console.log('1001 item', item);
    return (
        <MyHighLightButton
            onPress={() => {
                const itemClick = {
                    ...item.item,
                    userInteraction: true
                }
                console.log('1001 item.item', itemClick);
                if (item.item.type === typeNotification.MOVIE) {
                    dispatch({
                        type: REDUX.UPDATE_NOTIFICATION_MOVIE,
                        payload: itemClick
                    })
                    navigation.navigate(ROUTE_KEY.Details, { _id: itemClick.movie_id })
                } else if (item.item.type === typeNotification.VIDEO) {
                    Alert.alert('Qua screen Video ne` !')
                    dispatch({
                        type: REDUX.UPDATE_NOTIFICATION_VIDEO,
                        payload: itemClick
                    })
                } else if (item.item.type === typeNotification.CAST) {
                    console.log('1001 cast id ', item.item);
                    dispatch({
                        type: REDUX.UPDATE_NOTIFICATION_CAST,
                        payload: itemClick
                    })
                    navigation.navigate(ROUTE_KEY.Actor, { _id: item.item.cast_id })
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
        fontSize: 12 * WIDTH_SCALE,
        padding: 16 * WIDTH_SCALE,
    },
    groupItemText: {
        flex: 1,
        marginHorizontal: 16 * WIDTH_SCALE,
        fontSize: 14 * WIDTH_SCALE,
        fontFamily: Fonts.SansMedium,
    }
})
