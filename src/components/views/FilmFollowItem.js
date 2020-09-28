import React from 'react';
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../../utils/Fonts';

const { width } = Dimensions.get("window")

const FilmFollowItem = (params) => {
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
                <View style={[styles.row]}>
                    <Text style={styles.newEp}>1000</Text>
                    <Text style={{ marginHorizontal: 8, color: "#a5a5a5" }}>/</Text>
                    <Text style={styles.lastEp}> 1001</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default FilmFollowItem

const styles = StyleSheet.create({
    item: {
        width: width / 3,
        height: width / 3 * 1.7   ,
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
        fontFamily: Fonts.SansMedium,
        fontSize: 13,
        color: "#000",
        marginBottom: 8
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    newEp: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        fontSize: 12,
        paddingHorizontal: 8,
        //borderBottomEndRadius:8     
        borderRadius: 99,

    }
    , lastEp: {
        color: "#e74c3c",
        fontSize: 12,
    }
});