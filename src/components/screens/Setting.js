import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { Appbar, Card, RadioButton, Modal, Portal, Provider } from 'react-native-paper';
import { ptColor } from '../../constants/styles';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY } from '../../constants/constants';
import { Icon as IconElement } from 'react-native-elements';
import { Fonts } from '../../utils/Fonts'
import { MyHighLightButton, } from '../views'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
export default function Setting({ navigation }) {

    const WIDTH_MODAL = WIDTH - 24 * WIDTH_SCALE
    const [enableNotifi, setEnableNotifi] = useState(false);
    const [enableDark, setEnableDark] = useState(false);
    const [enableMusic, setEnableMusic] = useState(false);
    const [enableStatus, setEnableStatus] = useState(false)
    const [value, setValue] = React.useState('English');
    const [warning, setWarning] = React.useState('9:00');
    const [isModal, setIsModal] = useState(false);



    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);
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
                <Text style={{ fontSize: 18 * WIDTH_SCALE }}>Setting</Text>
                <View style={{ width: '10%' }} />
            </Appbar.Header>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Header />
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Profile</Text>

                <View style={styles.groupCard}>
                    <View style={[styles.row, styles.groupItem]}>
                        <IconElement name="person-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                        <Text style={styles.groupItemText}>
                            Personal Information</Text>
                        <Icon name="chevron-right" />
                    </View>
                    <View style={[styles.row, styles.groupItem]}>
                        <IconElement name="happy-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                        <Text style={styles.groupItemText}>Status</Text>
                        <Switch
                            thumbColor={enableStatus ? "#be2edd" : '#747d8c'}
                            onValueChange={(value) => setEnableStatus(value)}
                            value={enableStatus}
                            trackColor={{ false: "#bdc3c7", true: '#D980FA' }} />
                    </View>
                </View>
                <Text style={styles.groupTitle}>General Settings</Text>
                <View style={styles.groupCard}>
                    <View style={[styles.row, styles.groupItem]}>
                        <Icon name="bell" color="#999999" size={16 * WIDTH_SCALE} />
                        <Text style={styles.groupItemText}>Notification</Text>
                        <Switch
                            thumbColor={enableNotifi ? "#be2edd" : '#747d8c'}
                            onValueChange={(value) => setEnableNotifi(value)}
                            value={enableNotifi}
                            trackColor={{ false: "#bdc3c7", true: '#D980FA' }} />
                    </View>
                    <View style={[styles.row, styles.groupItem]}>

                        <IconElement name="musical-notes-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                        <Text style={styles.groupItemText}>Music Bubbles</Text>
                        <Switch
                            thumbColor={enableMusic ? "#be2edd" : '#747d8c'}
                            onValueChange={(value) => setEnableMusic(value)}
                            value={enableMusic}
                            trackColor={{ false: "#bdc3c7", true: '#D980FA' }} />
                    </View>
                    <View style={[styles.row, styles.groupItem]}>
                        <IconElement name="contrast-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                        <Text style={styles.groupItemText} >Darkmode</Text>
                        <Switch
                            thumbColor={enableDark ? "#be2edd" : '#747d8c'}
                            onValueChange={(value) => setEnableDark(value)}
                            value={enableDark}
                            trackColor={{ false: "#bdc3c7", true: '#D980FA' }} />
                    </View>

                    <View style={[styles.row, styles.groupItem]}>
                        <IconElement name="language-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                        <Text style={styles.groupItemText}>Language</Text>
                        <Text style={{ color: '#54a0ff' }}>{value}</Text>
                        <Menu>
                            <MenuTrigger >
                                <IconElement name="chevron-down-outline" type="ionicon" color={ptColor.black} size={18 * WIDTH_SCALE} />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }} onSelect={() => setValue('English')}>
                                    <Text>English</Text>
                                </MenuOption>
                                <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center', margin: 0 }} onSelect={() => setValue('Viet Nam')} >
                                    <Text>Viet Nam</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>


                </View>

                <Text style={styles.groupTitle}>Other Settings</Text>
                <View style={styles.groupCard}>

                    <View style={[styles.row, styles.groupItem]}>
                        <IconElement name="alarm-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                        <Text style={styles.groupItemText}>
                            Warning</Text>
                        <Text style={{ color: '#54a0ff' }}>{warning}</Text>

                        <Menu>
                            <MenuTrigger >
                                <IconElement name="chevron-down-outline" type="ionicon" color={ptColor.black} size={18 * WIDTH_SCALE} />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }} onSelect={() => setWarning('9:00')}>
                                    <Text>9:00</Text>
                                </MenuOption>
                                <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center', margin: 0 }} onSelect={() => setWarning('10:00')} >
                                    <Text>10:00</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                    <MyHighLightButton>
                        <View style={[styles.row, styles.groupItem]}>
                            <IconElement name="phone-portrait-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                            <Text style={styles.groupItemText} >Setting in your phone</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </MyHighLightButton>
                    <MyHighLightButton>
                        <View style={[styles.row, styles.groupItem]}>
                            <IconElement name="help-circle-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                            <Text style={styles.groupItemText} >Tutorial</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </MyHighLightButton>
                    <MyHighLightButton>
                        <View style={[styles.row, styles.groupItem]}>
                            <IconElement name="chatbubbles-outline" type='ionicon' color="#999999" size={16 * WIDTH_SCALE} />
                            <Text style={styles.groupItemText} >
                                Feedback</Text>
                            <Icon name="chevron-right" />
                        </View>
                    </MyHighLightButton>
                </View>

            </View>
            {/* <Text>{toggled? "ON":"OFF"}</Text> */}
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    group: {

        padding: 16 * WIDTH_SCALE,
    },
    groupTitle: {
        fontSize: 13 * WIDTH_SCALE,
        color: "#B1B9C0",
        fontFamily: Fonts.SansBold,
        marginVertical: 10 * WIDTH_SCALE
    },
    groupItem: {
        paddingVertical: 16 * WIDTH_SCALE,
        borderBottomWidth: 0.5,
        borderBottomColor: "#E9ECEF",
        alignItems: "center",
    },
    row: {
        alignItems: "center",
        flexDirection: 'row',
        overflow: 'hidden'
    },
    groupItemText: {
        flex: 1,
        marginHorizontal: 16 * WIDTH_SCALE,
        fontSize: 14 * WIDTH_SCALE,
        fontFamily: Fonts.SansMedium,
    },
    pt: {
        paddingTop: 10 * WIDTH_SCALE
    },
    groupCard: {
        borderRadius: 15 * WIDTH_SCALE,
        backgroundColor: '#fff',
        padding: 10 * WIDTH_SCALE,
    }
})
