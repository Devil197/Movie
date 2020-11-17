import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native'
import { ptColor } from '../../constants/styles'
import { WIDTH, HEIGHT, STATUS_BAR_CURRENT_HEIGHT, WIDTH_SCALE } from '../../constants/constants'
import Icons from 'react-native-vector-icons/Feather';
import { Fonts } from '../../utils/Fonts'
import { getActorById } from '../../Redux/actions/actorAction'
import { MyHighLightButton } from '../views';
import { SkypeIndicator } from 'react-native-indicators';

export default function Actor({ navigation, route }) {

    const _actorId = route.params._id;
    console.log('1003 ', _actorId);
    const [actorDataAPI, setActorData] = useState();
    const [birthdayFormated, setBirthday] = useState();
    const [zodiac, setZodiac] = useState('Zodiac');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleActorAPI();
    }, []);

    const handleActorAPI = async () => {
        await getActorById(_actorId).then(data => {
            // console.log(data?.cast[0]);
            setActorData(data?.cast[0]);
            handleZodiacByActorBirthday(data?.cast[0]?.birthday);
        });
    }

    const handleZodiacByActorBirthday = (birthday) => {
        let birth = new Date(birthday);

        let birthFormat = birth.getDate() + "/" + (birth.getMonth() + 1) + "/" + birth.getFullYear()

        setBirthday(birthFormat);

        switch (birth.getMonth() + 1) {

            case 1:
                setZodiac('Aries')
                break;

            case 2:
                setZodiac('Taurus')
                break;

            case 3:
                setZodiac('Gemini')
                break;

            case 4:
                setZodiac('Cancer')
                break;

            case 5:
                setZodiac('Leo')
                break;

            case 6:
                setZodiac('Virgo')
                break;

            case 7:
                setZodiac('Libra')
                break;

            case 8:
                setZodiac('Scorpius')
                break;

            case 9:
                setZodiac('Sagittarius')
                break;

            case 10:
                setZodiac('Capricorn')
                break;

            case 11:
                setZodiac('Aquarius')
                break;

            case 12:
                setZodiac('Pisces')
                break;

            default:
                break;

        }

        setLoading(false);
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#e1e2e3' }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{
                    width: HEIGHT,
                    height: HEIGHT,
                    borderRadius: HEIGHT / 2,
                    backgroundColor: ptColor.white,
                    position: 'absolute',
                    alignItems: 'flex-end',
                    zIndex: 1,
                    top: - HEIGHT * 0.8,
                }} />

                <View
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        backgroundColor: 'transparent',
                        height: HEIGHT * 0.04,
                        width: WIDTH,
                        marginTop: STATUS_BAR_CURRENT_HEIGHT,
                        paddingLeft: 10 * WIDTH_SCALE,
                    }}>
                    <MyHighLightButton onPress={() => navigation.goBack()} style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                        <Icons name="chevron-left" color={ptColor.black} size={22 * WIDTH_SCALE} />
                        <Text
                            style={{
                                color: ptColor.black,
                                fontFamily: Fonts.SansLight,
                            }}> Back</Text>
                    </MyHighLightButton>
                </View>

                <View
                    style={{
                        width: WIDTH,
                        height: HEIGHT * 0.15,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        zIndex: 2,
                        marginTop: HEIGHT * 0.125,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{ uri: actorDataAPI?.cover_image }}
                        style={{
                            height: HEIGHT * 0.18,
                            width: HEIGHT * 0.18,
                            borderRadius: HEIGHT * 0.18 / 2,
                            borderWidth: 5,
                            borderColor: '#e1e2e3',
                        }}
                        resizeMode={'cover'}
                    />
                </View>

                <View
                    style={{
                        width: WIDTH,
                        backgroundColor: 'transparent',
                        zIndex: 2,
                        marginTop: HEIGHT * 0.29,
                        alignItems: 'center',
                        padding: 8 * WIDTH_SCALE,
                    }}>

                    <Text
                        style={{
                            fontFamily: Fonts.SansBold,
                            color: '#000',
                            fontSize: 22 * WIDTH_SCALE
                        }}>{actorDataAPI?.name}</Text>

                    <Text
                        style={{
                            fontSize: 16 * WIDTH_SCALE,
                            fontFamily: Fonts.SansLight,
                            color: ptColor.black,
                        }}>{zodiac}</Text>
                </View>

                <View style={styles.card}>
                    <Text
                        style={styles.cardTitle}>
                        PERSONAL INFORMATION
                    </Text>

                    <View style={styles.txtContainer}>
                        <Text style={styles.title}>Real name: </Text>
                        <Text style={styles.information}> {actorDataAPI?.name}</Text>
                    </View>

                    <View style={styles.txtContainer}>
                        <Text style={styles.title}>Birthday: </Text>
                        <Text style={styles.information}> {birthdayFormated}</Text>
                    </View>

                    <View style={styles.txtContainer}>
                        <Text style={styles.title}>Country: </Text>
                        <Text style={styles.information}> {actorDataAPI?.nation}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        CAREER PATH
                    </Text>
                    <View style={styles.txtContainer}>
                        <Text style={styles.title}>{actorDataAPI?.story}</Text>
                    </View>
                </View>

                <View
                    style={{
                        width: WIDTH,
                        backgroundColor: ptColor.white,
                        marginTop: 20 * WIDTH_SCALE,
                        padding: 8 * WIDTH_SCALE
                    }}>
                    <Text style={styles.cardTitle}>
                        MOVIE LIST
                    </Text>
                    <Text>TẠM NGHỈ ĐI ĂN</Text>
                </View>
            </ScrollView>

            {
                loading ?
                    <View style={{
                        flex: 1,
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        width: WIDTH,
                        height: HEIGHT,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{ width: 60, height: 60, borderRadius: 20 }}>
                            <SkypeIndicator
                                color={ptColor.appColor}
                                style={{
                                    padding: 20 * WIDTH_SCALE,
                                    backgroundColor: 'rgba(166, 164, 164, 0.4)',
                                    borderRadius: 10,
                                }}
                                size={40 * WIDTH_SCALE}
                            />
                        </View>
                    </View>
                    : null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e2e3',
        alignItems: 'center',
        paddingBottom: 10 * WIDTH_SCALE,
    },
    card: {
        width: WIDTH * 0.91,
        backgroundColor: ptColor.white,
        zIndex: 2,
        padding: 8 * WIDTH_SCALE,
        borderRadius: 8,
        marginTop: 20 * WIDTH_SCALE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16 * WIDTH_SCALE,
        fontFamily: Fonts.SansLight,
        color: ptColor.gray2,
        marginBottom: 10 * WIDTH_SCALE,
    },
    txtContainer: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    title: {
        fontFamily: Fonts.SansLight,
        color: ptColor.gray2,
        fontSize: 15 * WIDTH_SCALE,
    },
    information: {
        fontFamily: Fonts.SansMedium,
        color: ptColor.black,
        fontSize: 15 * WIDTH_SCALE,
    },

})
