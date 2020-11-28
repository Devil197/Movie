import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WIDTH, HEIGHT, WIDTH_SCALE } from '../../constants/constants'

export default function RenderCategory({ data, navigation }) {
    console.log("DATA CAT: ", data);
    const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const renderCategory = data.forEach(element => {
        if (element < 5) {
            return (
                <View
                    style={{
                        width: WIDTH * 0.3,
                        height: WIDTH * 0.2,
                        backgroundColor: getRandomColor()
                    }}
                >
                    <Text
                        style={{
                            width: '100%',
                            height: '100%',
                            color: '#fff',

                        }}
                    >{item.name}</Text>
                </View>
            )
        }
    });

    return (
        <View>
            {renderCategory}
        </View>
    )
}

const styles = StyleSheet.create({

})
