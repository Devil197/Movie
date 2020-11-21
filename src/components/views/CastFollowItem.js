import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, RadioButton, Card } from 'react-native-paper';
import { WIDTH_SCALE, WIDTH, HEIGHT } from '../../constants/constants';
import { ptColor } from '../../constants/styles';
import MyHighLightButton from './MyHighLightButton';

const CastFollowItem = React.memo(({ item, update, selectAll, navigation, dispatch, checkedItemUpdateCast }) => {
    console.log('0103 cast item ,', item);
    const [checked, setChecked] = useState(selectAll ? selectAll : false)
    return (
        <TouchableOpacity
            onPress={() => {
                if (update) {
                    setChecked(!checked)
                    checkedItemUpdateCast(item.item.cast_id, !checked)
                }
            }}
            style={{ alignItems: 'center', justifyContent: 'center', width: WIDTH / 3 - 5 * WIDTH_SCALE, padding: 5 * WIDTH_SCALE, margin: 5 * WIDTH_SCALE }}>
            <Avatar.Image size={80 * WIDTH_SCALE} source={{ uri: item?.item?.cast_id?.cover_image }} />
            <Text>{item?.item?.cast_id?.name}</Text>
            {update ?
                <View style={{}}>
                    <RadioButton
                        uncheckedColor={'white'}
                        color={'#e91946'}
                        theme={'red'}
                        value="first"
                        status={checked === true ? 'checked' : 'unchecked'}
                    />
                </View>
                :
                null
            }

            {checked && update ?
                <View
                    style={{
                        width: WIDTH / 3,
                        height: (HEIGHT / 3),
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        padding: 8,
                        marginBottom: 8,
                        backgroundColor: ptColor.appColor,
                        opacity: 0.2
                    }}
                />
                :
                null
            }
        </TouchableOpacity>
    )
})


export default CastFollowItem;
