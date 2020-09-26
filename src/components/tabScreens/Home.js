import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity, StatusBar
} from 'react-native';
import { styles } from '../../constants/style/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { dataMovie } from '../../constants/datatest';
import styled from 'styled-components';
import TextC from '../../constants/style/Text';
import GroupA from '../../constants/style/Group';
import ImageA from '../../constants/style/image';
import { useNavigation } from '@react-navigation/native';
export default function Home({ }) {

  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor ="#fff" translucent={false} barStyle = "dark-content" />
      
      
    </ScrollView>
  );
}
 
const Container = styled.View`
  justifyContent: space-between;
  flexDirection: row;
  padding: 16px;
`;
const ContainerA = styled.View`
  justifyContent: space-between;
  flexDirection: row;
  padding: 10px 20px;
`;
const CategoryName = styled(TextC)`
  color: ${(props) => (props.selected ? '#819ee5' : '#9a9a9a')};
  font-weight: ${(props) => (props.selected ? '700' : '500')};
`;
const TouchableOpacityA = styled.TouchableOpacity`
  width: 280px;
  height: 200px;
  margin: 16px;
`;
const TouchableOpacityB = styled.TouchableOpacity`
  width: 80px;
  height: 110px;
  margin: 16px;
`;
const TouchableOpacityC = styled.TouchableOpacity`
  borderRadius: 5px;
  borderWidth: 1px;
  borderColor: #be2edd;
  width: 25%;
  height: 4%;
  margin: auto;
  justifyContent: center;
  alignItems: center;
`;
const TouchableOpacityD = styled.TouchableOpacity`
  width: 30%;
  height: 30%;
  margin: 20px;
`;
const ViewA = styled.View`
  position: absolute;
  backgroundColor: #7158e2;
  right: -7%;
  bottom: 0%;
  width: 65%;
  height: 50%;
  borderRadius: 10px;
  justifyContent: center;
  zIndex: 1;
`;
const ViewB = styled.View`
  position: absolute;
  backgroundColor: #e056fd;
  right: 0%;
  bottom: -10%;
  width: 50px;
  height: 50px;
  borderRadius: 25px;
  justifyContent: center;
  alignItems: center;
  zIndex: 2;
`;
const ViewC = styled.View`
  position: absolute;
  backgroundColor: #e056fd;
  top: 40%;
  left: 45%;
  width: 50px;
  height: 50px;
  borderRadius: 15px;
  justifyContent: center;
  alignItems: center;
  zIndex: 2;
`;
