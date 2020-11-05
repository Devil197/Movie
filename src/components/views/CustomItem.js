import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import styled from 'styled-components';

import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

const CustomItem = (props) => {
  console.log(props);
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <ItemTitle>{item.title}</ItemTitle>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>Custom FlatList</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        paddingHorizontal={8}
        data={props.item.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => renderItem(item)}
      />
      {/* <View style={styles.view}>
        <Text>aaaaaaaa</Text>
      </View> */}
    </View>
  );
};

const Container = styled.View`
  flex: 1;
  margin: 24px 0;
`;

const Title = styled(Text)`
  margin: 16px;
`;

const ItemTitle = styled(Text)`
  margin: 8px 0;
`;
const ItemImg = styled.Image`
  width: 100px;
  border-radius: 8px;
  height: 100px;
`;

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  //   view: {
  //     position: 'absolute',
  //     top: 10,
  //     left: 200,
  //     width: 100,
  //     height: 100,
  //     backgroundColor: 'rgba(52, 52, 52,0.0)',
  //     fontSize: 15,
  //   },
});

export default CustomItem;
