import React from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import { Fonts } from '../../utils/Fonts'
export default function Profile() {
    return (
        <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}
            showsVerticalScrollIndicator={false}
        
        >
            <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />

            <Text style={styles.pageTitle}>Me</Text>
            <View style={[styles.row, styles.box]}>
                <Image style={styles.image} source={{ uri: 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-9/39751540_2129413227303442_5439706793418686464_n.jpg?_nc_cat=109&_nc_sid=174925&_nc_ohc=0BAB5y3vJaQAX_ZylvE&_nc_ht=scontent.fhan5-1.fna&oh=fec1b6f0202632de562f220e72aea601&oe=5F93E342' }} />
                <Text style={styles.name}>Hi !, Phung Tran</Text>
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
             

                
                <TouchableOpacity>
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
        fontFamily: Fonts.Sans
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
        fontFamily: Fonts.Sans  
    }
})