import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { HEIGHT, WIDTH, WIDTH_SCALE, ROUTE_KEY } from '../../constants/constants'
import { ptColor } from '../../constants/styles';
import { MyHighLightButton } from '../views';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../../utils/Fonts';
const initialList = [{
    _id: 0,
    name: "Nổi Bật",
}]

export default function HomeHeader({ data, navigation, onItemSelected }) {

    const [selected, setSelected] = useState(0);
    const [categoriesList, setCategoriesList] = useState(initialList);

    useEffect(() => {
        if (data !== undefined) {
            handleArray(data)
        }
    }, [data])

    const handleArray = async (data) => {
        await data.forEach(element => {
            setCategoriesList(categoriesList => [...categoriesList, element]);
        })
        //console.log("NEW LIST: ", categoriesList);
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
                <Text style={{ flex: 1 }}>Brand</Text>
                <TouchableOpacity style={{ backgroundColor: "#eee", borderRadius: 4, width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
                    <Icons name="search" color="#000" size={24} />
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
