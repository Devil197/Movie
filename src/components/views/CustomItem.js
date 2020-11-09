import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import styled from 'styled-components';
import { MyHighLightButton } from '../views'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY } from '../../constants/constants'
import { Icon as IconElement } from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { ptColor } from '../../constants/styles'
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
const CustomItem = (props) => {


  const { musics } = props

  const renderItem = (item) => {
    return (
      // <View
      //   style={styles.buttonC}>
      //   <Image style={styles.imageC} source={{ uri: item.thumb }} />
      //   <View style={{ justifyContent: 'center', width: WIDTH - 200, marginRight: 20 * WIDTH_SCALE }}>
      //     <Text
      //       style={{ fontFamily: Fonts.Sans }}
      //       numberOfLines={1}
      //       ellipsizeMode="tail"
      //     >{item.title}</Text>
      //     <Text
      //       style={{ fontFamily: Fonts.Sans }}
      //       numberOfLines={1}
      //       ellipsizeMode="tail"
      //     >{item.title}</Text>
      //   </View>
      //   <View style={{ alignItems: 'flex-end', justifyContent: 'center', width: WIDTH - 400, }}>
      //     <Menu>
      //       <MenuTrigger >
      //         <IconElement name="dots-three-vertical" type="entypo" color={ptColor.black} size={18 * WIDTH_SCALE} />
      //       </MenuTrigger>
      //       <MenuOptions>
      //         <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center', margin: 0 }} onSelect={() => remove(e?._id)}>
      //           <Text>Xóa Khỏi Lịch Sử Xem</Text>
      //         </MenuOption>
      //         <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center' }} onSelect={() => removeAll('5f8a891887f5ef0004f46619')}>
      //           <Text>Xóa Tất Cả Lịch Sử Xem </Text>
      //         </MenuOption>
      //         <MenuOption style={{ height: 40 * WIDTH_SCALE, justifyContent: 'center', margin: 0 }}>
      //           <Text>Share</Text>
      //         </MenuOption>
      //       </MenuOptions>
      //     </Menu>
      //   </View>
      // </View>
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#ccc" }}>
        {/* <ImageBackground style={{ width: WIDTH, height: WIDTH / 2, }} source={{ uri: props.item.data[1].thumb }} >
          <View style={{ flex: 1 }} ></View>
          <LinearGradient
            style={{ width: WIDTH, padding: 10 }}
            colors={['transparent', 'rgba(0,0,0,0.8)',]}
          >

            <View style={{ flexDirection: "row", padding: 16 }}>
              <Text style={{ color: "#fff", flex: 1, fontFamily: Fonts.SansMedium, fontSize: 24 * WIDTH_SCALE }}>{props.item.data[0].title}</Text>
              <View style={styles.myViewB}>
                <Icon name="play" color="#fff" size={24} />
              </View>
            </View>
          </LinearGradient>
        </ImageBackground> */}
      </View>
      {/* <View style={styles.header}>
         <View style={styles.myViewB}>
          <Icon name={'play'} size={20} color="#fff" zIndex={10} />
        </View>
        <View style={styles.view}>
          <Text style={{ fontFamily: Fonts.SansMedium, color: '#fff', fontSize: 30 * WIDTH_SCALE }} numberOfLines={2}>{props.item.data[0].title}</Text>
        </View> 

        <View style={{ justifyContent: 'space-around', flexDirection: 'row', padding: 10 * WIDTH_SCALE, alignItems: 'center', backgroundColor: 'rgba(52, 52, 52,0.0)', position: 'absolute', zIndex: 9 }}>
          <Text style={{ fontFamily: Fonts.SansMedium, color: '#fff', fontSize: 18 * WIDTH_SCALE }} numberOfLines={2}>{props.item.data[0].title}</Text>
          <Icon name={'play'} size={20} color="#fff" zIndex={10} />
        </View>
        <Image source={{ uri: props.item.data[1].thumb }} style={{ flex: 1, opacity: 0.5, resizeMode: 'cover' }} />
      </View> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        paddingHorizontal={8}
        data={musics}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderItem(item)}
      />

      {/* <View style={styles.view}>
        <Text>aaaaaaaa</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  buttonC: {
    width: WIDTH - 10,
    // height: HEIGHT / 10.5,
    padding: 4,
    flexDirection: 'row',
    padding: 6 * WIDTH_SCALE,
  },
  imageC: {
    width: WIDTH - 340,
    height: HEIGHT / 12,
    borderRadius: 4,
    marginRight: 30 * WIDTH_SCALE,
  },
  header: {
    width: WIDTH - 10,
    height: HEIGHT / 5,
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: 'rgba(52, 52, 52,0.0)',
    position: 'absolute',
    zIndex: 9,
    top: 50 * WIDTH_SCALE,
    left: 50 * WIDTH_SCALE,
    width: 0.6 * WIDTH
  },
  myViewB: {
    backgroundColor: '#ff9ff3',
    // backgroundColor: 'rgba(255, 255, 255,0.5)',
    borderRadius: 20 * WIDTH_SCALE,
    width: 0.1 * WIDTH,
    height: 0.05 * HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CustomItem;
