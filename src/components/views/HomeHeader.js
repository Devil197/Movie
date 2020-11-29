import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Fonts from '../../utils/Fonts'
import { HEIGHT, WIDTH, WIDTH_SCALE, ROUTE_KEY } from '../../constants/constants'
import { ptColor } from '../../constants/styles';
import { MyHighLightButton } from '../views';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Feather';
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
                        color: '#fff',
                        fontSize: 16 * WIDTH_SCALE,
                        paddingHorizontal: 8 * WIDTH_SCALE,
                    }}
                >
                    {item.name}
                </Text>
                {index === selected ?
                    <View style={styles.selectedStyles}>

                    </View>
                    : null}
            </MyHighLightButton>
        )
    }

    return (
        <View
            style={{
                height: HEIGHT * 0.065,
                width: WIDTH,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                flexDirection: 'row',
            }}
        >
            <FlatList
                data={categoriesList}
                keyExtractor={item => (item._id + item.name)}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 1)']}
                style={{
                    position: 'absolute',
                    right: 0,
                    width: WIDTH * 0.35,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingHorizontal: 20 * WIDTH_SCALE,
                }}>
                <Icons
                    onPress={() => navigation.push(ROUTE_KEY.Search, { _keyword: "" })}
                    name={'search'}
                    size={24 * WIDTH_SCALE}
                    color={ptColor.white} />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    selectedStyles: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '10%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    defaultStyles: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
