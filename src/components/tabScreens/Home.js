import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
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
  
      <Container>
        <GroupA row ss>
          <ImageA
            little
            s
            medium
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4',
            }}
          />
        </GroupA>
        <GroupA col s p>
          <TextC color="#333" medium heavy >
            Thanh Phụng
          </TextC>
          <TextC a color="#333" medium light>
            Basic
          </TextC>
        </GroupA>
        <GroupA row>
          <TouchableOpacity
            onPress={() => navigation.navigate("Details")}
          >
            <FontAwesome5 name={'search'} size={15} color="#be2edd" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={'notifications'} size={15} color="#be2edd" />
          </TouchableOpacity>
        </GroupA>
      </Container>

      <GroupA col s>
        <TextC large bold color="#000" p  >
          Continue Watching
        </TextC>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityA

                onPress={() => alert("f")}

              >
                <ImageA max xxl little source={{ uri: c.albumArtUrl }} />
                <ViewA>
                  <TextC large heavy p>
                    Title
                  </TextC>
                </ViewA>
                <ViewB>
                  <Icon name={'play'} size={25} color="#fff" />
                </ViewB>
              </TouchableOpacityA>
            );
          })}
        </ScrollView>
      </GroupA>

      <GroupA col>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityB>
                <ImageA large xl little source={{ uri: c.albumArtUrl }} />
                <TextC color="#333" medium heavy>
                  Cast
                </TextC>
              </TouchableOpacityB>
            );
          })}
        </ScrollView>
      </GroupA>

      <GroupA row ss>
        <TextC medium bold color="#000" p>
          New
        </TextC>
        <TextC medium heavy color="#000" p>
          Recommed
        </TextC>
        <TextC medium heavy color="#000" p>
          Trending
        </TextC>
      </GroupA>

      <GroupA col s b>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityA>
                <ImageA max xxl little source={{ uri: c.albumArtUrl }} />
                <TextC color="#333" medium bold>
                  {c.title}
                </TextC>
              </TouchableOpacityA>
            );
          })}
        </ScrollView>
      </GroupA>

      <GroupA col s b>
        <TextC large heavy color="#000" p>
          Cartoon
        </TextC>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacity>
                <ContainerA>
                  <GroupA row ss>
                    <ImageA little s medium source={{ uri: c.albumArtUrl }} />
                  </GroupA>
                  <GroupA col s p>
                    <TextC color="#333" medium heavy>
                      Thanh Phụng
                    </TextC>
                    <TextC a color="#333" medium light>
                      Basic
                    </TextC>
                  </GroupA>
                  <GroupA row>
                    <TouchableOpacity>
                      <Feather
                        name={'more-horizontal'}
                        size={30}
                        color="#be2edd"
                      />
                    </TouchableOpacity>
                  </GroupA>
                </ContainerA>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </GroupA>

      <TouchableOpacityC>
        <TextC small light color="#be2edd">
          View more
        </TextC>
      </TouchableOpacityC>

      <GroupA col s t>
        <TextC medium heavy color="#000" p t>
          Trailer
        </TextC>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityA>
                <ImageA max xxl little source={{ uri: c.albumArtUrl }} />
                <ViewC>
                  <Icon name={'play'} size={25} color="#fff" />
                </ViewC>
              </TouchableOpacityA>
            );
          })}
        </ScrollView>
      </GroupA>

      <GroupA col s t>
        <TextC medium heavy color="#000" p t>
          Cast
        </TextC>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityB>
                <ImageA large xl little source={{ uri: c.albumArtUrl }} />
              </TouchableOpacityB>
            );
          })}
        </ScrollView>
      </GroupA>
    </ScrollView>
  );
}
const Title = styled.Text`
  color: #000;
`;
const Container = styled.View`
  justifyContent: space-between;
  flexDirection: row;
  padding: 40px 20px;
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
  margin: 20px;
`;
const TouchableOpacityB = styled.TouchableOpacity`
  width: 80px;
  height: 110px;
  margin: 10px;
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
