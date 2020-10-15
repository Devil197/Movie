import React from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import { Fonts } from '../../utils/Fonts'
import { useDispatch, useSelector } from 'react-redux';
import {WIDTH_SCALE} from '../../constants/constants'
export default function Profile() {
    const userReducer = useSelector((state) => state.userReducer)
    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}

        >
            <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />

            <Text style={styles.pageTitle}>Me</Text>
            <View style={[styles.row, styles.box]}>
                <Image style={styles.image} source={{ uri: userReducer.facebookInfo !== {} ? userReducer?.facebookInfo?.photo : userReducer?.googleInfo?.user?.photo }} />
                <Text style={styles.name}>Hi !,   {userReducer.facebookInfo !== {} ? userReducer.facebookInfo?.name : userReducer.googleInfo.user.name}</Text>
                <TouchableOpacity style={{alignItems:'center',alignSelf:'flex-end'}}>
                    {
                        userReducer.googleInfo ? 
                        <Icon name={'facebook'} size={30*WIDTH_SCALE}/>
                        :
                        <Icon name={'google'} size={30*WIDTH_SCALE}/>
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Information</Text>

                <TouchableOpacity>
                    <View style={[styles.row, styles.groupItem]}>
                        <Icon name="user" color="#999999" size={16} />
                        <Text style={styles.groupItemText} >My Account</Text>
                        <Icon name="chevron-right" />
                    </View>
                </TouchableOpacity>

                
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
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#fff", flex: 1 },
    pageTitle: {
        fontSize: 20,
        padding: 16,
        textAlign: "center",
        fontFamily: Fonts.SansMedium
    },
    row: {
        alignItems: "center",
        flexDirection: 'row'
    },
    box: { backgroundColor: "#F4F4F4", padding: 16, borderRadius: 8, margin: 16 },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginRight: 16
    },
    name: {
        fontFamily: Fonts.SansMedium,
    },
    group: {
        padding: 16
    },
    groupTitle: {
        fontSize: 13,
        color: "#B1B9C0",
        fontFamily: Fonts.SansBold
    }, groupItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E9ECEF",
        alignItems: "center"
    },
    groupItemText: {
        flex: 1,
        marginHorizontal: 16,
        fontSize: 14,
        fontFamily: Fonts.SansMedium,
    }
})