import React, { useState } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import { Fonts } from '../../utils/Fonts'
import { useDispatch, useSelector } from 'react-redux';
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants';
import { ROUTE_KEY, ASYNC_TYPE } from '../../constants/constants'
import { Divider, MyHighLightButton } from '../views'
import { Icon as IconElement } from 'react-native-elements'
import { ptColor } from '../../constants/styles'
import { Modal } from 'react-native-paper';
import { asyncUser } from '../../Redux/actions/userAction'
import { LoginGoogle, LoginFacebook, _addApiLoginFacebook, _addApiLoginGoogle, _asyncUser } from '../../Redux/actions/userAction';
import { REDUX } from '../../Redux/store/types'

export default function Profile({ navigation }) {
    const dispatch = useDispatch();
    const WIDTH_MODAL = WIDTH - 24 * WIDTH_SCALE
    const userReducer = useSelector((state) => state.userReducer)
    const [isModal, setIsModal] = useState(false);
    const [isShowUserType, setIsShowUserType] = useState(false)
    const asyncAccount = (type) => {
        console.log('1002 => type ', type);
        if (type == ASYNC_TYPE.GOOGLE) {
            LoginGoogle().then(res => {
                console.log('1002 res ', res);
                asyncUser(ASYNC_TYPE.GOOGLE, userReducer.userInfo?._id, res?.id)
                dispatch({
                    type: REDUX.GOOGLE_LOGGED_IN,
                    payload: res
                })
                dispatch({
                    type: REDUX.ADD_USER_INFO,
                    payload: userInfo
                })
            })
        } else if (type == ASYNC_TYPE.FACEBOOK) {
            LoginFacebook().then(res => {
                console.log('1002 res ', res);
                asyncUser(ASYNC_TYPE.FACEBOOK, userReducer.userInfo?._id, res.id)
                dispatch({
                    type: REDUX.FACEBOOK_LOGGED_IN,
                    payload: res
                })
                dispatch({
                    type: REDUX.ADD_USER_INFO,
                    payload: userInfo
                })
            })
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />

                <Text style={styles.pageTitle}>Me</Text>
                <View style={[styles.row, styles.box]}>
                    <Image style={styles.image} source={{ uri: !isShowUserType && userReducer.facebookInfo.photo !== undefined ? userReducer?.facebookInfo?.photo : userReducer?.googleInfo?.photo }} />
                    <Text style={styles.name}>Hi !,   {!isShowUserType && userReducer.facebookInfo.name !== undefined ? userReducer.facebookInfo?.name : userReducer.googleInfo?.name}</Text>
                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'flex-end' }}>
                        {
                            !isShowUserType && userReducer.facebookInfo?.name !== undefined ?
                                <Icon style={{ marginLeft: WIDTH * 0.02 }} name={'facebook'} color={ptColor.appColor} size={18 * WIDTH_SCALE} />
                                :
                                <IconElement style={{ marginLeft: WIDTH * 0.02 }} name="google--with-circle" type="entypo" color={ptColor.appColor} size={18 * WIDTH_SCALE} />
                        }
                    </TouchableOpacity>
                    {userReducer.googleInfo?.name !== undefined && userReducer.facebookInfo?.name !== undefined ?
                        <MyHighLightButton
                            onPress={() => setIsShowUserType(!isShowUserType)}
                            style={{ marginLeft: WIDTH * 0.3 }}>
                            <IconElement name="swap-vert" type="MaterialIcons" color={ptColor.black} size={30 * WIDTH_SCALE} />
                        </MyHighLightButton>
                        :
                        null
                    }

                </View>

                <View style={styles.group}>
                    <Text style={styles.groupTitle}>Information</Text>

                    <MyHighLightButton onPress={() => setIsModal(true)}>
                        <View style={[styles.row, styles.groupItem]}>
                            <Icon name="user" color="#999999" size={16} />
                            <Text style={styles.groupItemText} >My Account</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </MyHighLightButton>


                    <TouchableOpacity onPress={() => navigation.push(ROUTE_KEY.History)}>
                        <View style={[styles.row, styles.groupItem]}>
                            <Icon name="bookmark" color="#999999" size={16} />
                            <Text style={styles.groupItemText} >History</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View style={[styles.row, styles.groupItem]}>
                            <Icon name="heart" color="#999999" size={16} />
                            <Text style={styles.groupItemText} >Follows</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.group}>
                    <Text style={styles.groupTitle}>Settings</Text>

                    <TouchableOpacity>
                        <View style={[styles.row, styles.groupItem]}>
                            <Icon name="settings" color="#999999" size={16} />
                            <Text style={styles.groupItemText} >App settings</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </TouchableOpacity>




                    <TouchableOpacity>
                        <View style={[styles.row, styles.groupItem]}>
                            <Icon name="alert-circle" color="#999999" size={16} />
                            <Text style={styles.groupItemText} >Help & info</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View style={[styles.row, styles.groupItem]}>
                            <Icon name="phone-call" color="#999999" size={16} />
                            <Text style={styles.groupItemText} >Hotline</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[styles.row, styles.groupItem]}>
                            <Icon name="log-out" color="#999999" size={16} />
                            <Text style={styles.groupItemText} >Sign out</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                deviceWidth={'100%'}
                animationIn="fadeIn" // or without prop
                animationOut="fadeOut" // or without prop
                backdropTransitionOutTiming={0}
                onDismiss={() => setIsModal(false)}
                visible={isModal}
                contentContainerStyle={{
                    margin: 0,
                    padding: 0,
                    flex: 1,
                    zIndex: 9999,
                    elevation: 9999,
                    position: 'absolute',

                }}>
                <View style={{
                    width: WIDTH_MODAL,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    margin: 12 * WIDTH_SCALE,
                    overflow: 'hidden',
                    borderRadius: 30 * WIDTH_SCALE

                }}>
                    <View style={{ alignItems: 'center', width: WIDTH_MODAL, margin: 10 * WIDTH_SCALE }}>
                        <Text style={{ color: ptColor.black, justifyContent: 'flex-start', fontSize: 18 * WIDTH_SCALE, marginBottom: 10 * WIDTH_SCALE, fontWeight: 'bold' }}>Thông Tin</Text>


                        {userReducer.facebookInfo.name !== undefined && userReducer.googleInfo.name !== undefined ?
                            <>
                                {/* facebook  */}
                                <View style={{ marginTop: 10 * WIDTH_SCALE, alignItems: 'center' }}>
                                    <Image style={{ width: WIDTH * 0.12, height: HEIGHT * 0.06, borderRadius: WIDTH * 0.1 }} source={{ uri: userReducer.facebookInfo.photo !== undefined ? userReducer?.facebookInfo?.photo : userReducer?.googleInfo?.photo }} />

                                    <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                        <Text>{userReducer.facebookInfo.gmail}</Text>

                                    </View>

                                    <Divider dash />
                                    <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                        <Text>{userReducer.facebookInfo.name}</Text>

                                    </View>
                                    <Divider dash />
                                    <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                        <Text>ID : {userReducer.facebookInfo.id}</Text>

                                    </View>
                                    <Divider dash />
                                    <View style={{ marginTop: 10 * WIDTH_SCALE }} />


                                </View>

                                {/* google  */}
                                <View style={{ marginTop: 10 * WIDTH_SCALE, alignItems: 'center' }}>
                                    <Image style={{ width: WIDTH * 0.12, height: HEIGHT * 0.06, borderRadius: WIDTH * 0.1 }} source={{ uri: userReducer?.googleInfo?.photo }} />
                                    <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                        <Text>{userReducer.googleInfo.gmail}</Text>
                                    </View>

                                    <Divider dash />
                                    <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                        <Text>{userReducer.googleInfo.name}</Text>

                                    </View>
                                    <Divider dash />
                                    <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                        <Text>ID : {userReducer.googleInfo.id}</Text>

                                    </View>
                                    <Divider dash />
                                    <View style={{ marginTop: 10 * WIDTH_SCALE }} />
                                </View>
                                <Text style={{ color: ptColor.appColor }}>
                                    Tài khoản của bạn đã đc liên kết với
                                      <Icon style={{ marginLeft: WIDTH * 0.02 }} name={'facebook'} color={ptColor.appColor} size={18 * WIDTH_SCALE} />
                                    <IconElement style={{ marginLeft: WIDTH * 0.02 }} name="google--with-circle" type="entypo" color={ptColor.appColor} size={18 * WIDTH_SCALE} />
                                </Text>
                            </>
                            :
                            <View style={{ marginTop: 20 * WIDTH_SCALE, alignItems: 'center' }}>
                                <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                    <Text>{userReducer.facebookInfo.gmail ? userReducer.facebookInfo.gmail : userReducer.googleInfo.gmail}</Text>

                                </View>

                                <Divider dash />
                                <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                    <Text>{userReducer.facebookInfo.name ? userReducer.facebookInfo.name : userReducer.googleInfo.name}</Text>

                                </View>
                                <Divider dash />
                                <View style={{ width: WIDTH_MODAL, justifyContent: 'center', alignItems: 'center', height: 30 * WIDTH_SCALE }}>
                                    <Text>ID : {userReducer.facebookInfo.id ? userReducer.facebookInfo.id : userReducer.googleInfo.id}</Text>

                                </View>
                                <Divider dash />
                                <View style={{ marginTop: 10 * WIDTH_SCALE }} />

                                <TouchableOpacity onPress={() => _asyncUser(userReducer.facebookInfo?.name !== undefined ? ASYNC_TYPE.GOOGLE : ASYNC_TYPE.FACEBOOK, userReducer.userInfo?._id, dispatch)}>
                                    <Text style={{ color: ptColor.appColor }}>Bạn có muốn liên kết tài khoản với {userReducer.googleInfo.name !== undefined ? 'Facebook' : 'Google'}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    <MyHighLightButton
                        onPress={() => setIsModal(false)}
                        style={{ borderRadius: 30 * WIDTH_SCALE, marginBottom: 20 * WIDTH_SCALE, marginTop: 20 * WIDTH_SCALE, width: WIDTH_MODAL * 0.5, height: 40 * WIDTH_SCALE, backgroundColor: ptColor.appColorHover, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Đóng</Text>
                    </MyHighLightButton>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#fff", flex: 1 },
    pageTitle: {
        fontSize: 20 * WIDTH_SCALE,
        padding: 16 * WIDTH_SCALE,
        textAlign: "center",
        fontFamily: Fonts.SansMedium
    },
    row: {
        alignItems: "center",
        flexDirection: 'row',
        overflow: 'hidden'
    },
    box: { flex: 3, backgroundColor: "#F4F4F4", padding: 16 * WIDTH_SCALE, borderRadius: 8 * WIDTH_SCALE, margin: 16 * WIDTH_SCALE },
    image: {
        width: WIDTH * 0.1,
        height: HEIGHT * 0.05,
        borderRadius: HEIGHT * 0.05,
        marginRight: 16 * WIDTH_SCALE,
    },
    name: {
        fontFamily: Fonts.SansMedium,
    },
    group: {
        padding: 16 * WIDTH_SCALE
    },
    groupTitle: {
        fontSize: 13 * WIDTH_SCALE,
        color: "#B1B9C0",
        fontFamily: Fonts.SansBold
    }, groupItem: {
        paddingVertical: 16 * WIDTH_SCALE,
        borderBottomWidth: 1,
        borderBottomColor: "#E9ECEF",
        alignItems: "center"
    },
    groupItemText: {
        flex: 1,
        marginHorizontal: 16 * WIDTH_SCALE,
        fontSize: 14 * WIDTH_SCALE,
        fontFamily: Fonts.SansMedium,
    }
})