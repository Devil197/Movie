import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { HEIGHT, WIDTH, WIDTH_SCALE, ROUTE_KEY } from '../../constants/constants'
import { ptColor } from '../../constants/styles';
import { MyHighLightButton } from '../views';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../../utils/Fonts';
import { useDispatch, useSelector } from 'react-redux';

const initialList = [{
    _id: 0,
    name: "Nổi Bật",
}]

export default function HomeHeader({ data, navigation, onItemSelected }) {
    const userInfo = useSelector((state) => state.userReducer.userInfo)
    const [selected, setSelected] = useState(0);
    const [categoriesList, setCategoriesList] = useState(initialList);
    console.log("HOME HEADER: ", userInfo);

    useEffect(() => {
        if (data !== undefined) {
            handleArray(data)
        }
    }, [data])

    const handleArray = () => {
        data.forEach(element => {
            setCategoriesList(categoriesList => [...categoriesList, element]);
        })
    }

    const renderItem = ({ item, index }) => {
        return (
            <MyHighLightButton
                onPress={() => {
                    setSelected(index)
                    onItemSelected(item._id)
                }}
                style={styles.defaultStyles}
            >
                <Text
                    style={{
                        color: '#000',
                        fontSize: 14,
                        // marginLeft: index === 0 ? 20 : 0,
                        fontFamily: Fonts.SansMedium,
                        marginHorizontal: 8
                    }}

                >{item.name}</Text>


                {index === selected ?
                    <View style={styles.selectedStyles}>

                    </View>
                    : null}



            </MyHighLightButton>
        )
    }

    return (
        <View style={{ flexDirection: "column" }}>

            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12 }}>
                <Text
                    style={{
                        flex: 1.5,
                        fontSize: 30 * WIDTH_SCALE,
                        fontFamily: Fonts.SansBold,
                        borderWidth: 1,
                        borderColor: 'black',
                        paddingHorizontal: 5 * WIDTH_SCALE,
                        textAlign: 'center',

                    }}>REVIEW</Text>

                <View style={{ flex: 0.5, marginHorizontal: 10 * WIDTH_SCALE }} />

                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTE_KEY.Search)}
                    style={{
                        backgroundColor: "#eee",
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Icons name="search" color="#000" size={24} />
                </TouchableOpacity>

                <View style={{ height: 1, width: WIDTH * 0.025 }} />

                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTE_KEY.Profile)}>
                    {userInfo?.facebook_photo || userInfo?.google_photo ?
                        <Image
                            style={{
                                borderRadius: 20,
                                height: 40,
                                width: 40,
                            }}
                            source={{
                                uri: userInfo?.facebook_photo ? userInfo?.facebook_photo
                                    : userInfo?.google_photo
                            }}
                        />
                        : <Image
                            style={{
                                borderRadius: 20,
                                height: 40,
                                width: 40,
                                borderWidth: 0.5,
                                borderColor: ptColor.gray
                            }}
                            source={require('../../assets/icons/default_avatar.png')}
                        />
                    }
                </TouchableOpacity>

            </View>


            <FlatList
                data={categoriesList}
                keyExtractor={item => (item._id + item.name)}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    selectedStyles: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: 4,
        borderRadius: 8,
        backgroundColor: "#3498db"
    },
    defaultStyles: {
        paddingVertical: 8,
        paddingBottom: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemName: {

    }
})
