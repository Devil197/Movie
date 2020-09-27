import React from 'react';
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../../utils/Fonts';

const { width } = Dimensions.get("window")

const FilmItem = (params) => {
    const { item } = params.item

    return (
        <TouchableOpacity >
            <View style={styles.item}>
                <Image source={{ uri: item.thumb }} style={styles.itemImg} />
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.itemTitle}
                >{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FilmItem

const styles = StyleSheet.create({
    item: {
        width: width / 3,
        height: width / 3 + 70,
        padding: 8,
        marginBottom: 8
    },

    itemImg: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 8,
        marginBottom: 8
    }

    , itemTitle: {
        fontFamily: Fonts.Sans,
        fontSize: 13,
        color: "#000",
        marginBottom: 8
    }
});