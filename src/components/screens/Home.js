import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../../contants/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {dataMovie} from '../../contants/datatest';
import styled from 'styled-components';
import TextC from '../../contants/Text';
import GroupA from '../../contants/Group';
import ImageA from '../../contants/image';
export default function Home({navigation}) {
  console.log(dataMovie.length);
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4' }} style={styles.image_header} />
        <View style={styles.box1_header}>
          <Text style={styles.name}>Thanh Phung</Text>
          <Text style={styles.basic}>Basic Subscription</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity>
            <FontAwesome5 style={styles.icon} name={'search'} size={15} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon style={styles.icon} name={'notifications'} size={15} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.boxWatching}>
        <Text style={styles.name}>Continue Wathching</Text>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
          {
            dataMovie.map((c, i) => {
              return (
                <TouchableOpacity style={styles.movie}>
                  <Image style={styles.image_movie} source={{ uri: c.albumArtUrl }} />
                  <View style={styles.boxTitle}>
                    <Text style={styles.name_boxtitle}>Title</Text>
                  </View>
                  <View style={styles.box_icon}>
                    <Icon name={'play'} size={15} style={{color: 'white'}} />
                  </View>
                </TouchableOpacity>

              )
            })
          }
        </ScrollView>
      </View> */}

      {/* <Title>fff</Title>
      <TextC color='#9239ff' title heavy >fasfsa</TextC>
      <CategoryName selected={true}>ffafasfasfasf</CategoryName>
      <CategoryName selected={false}>ffafasfasfasf</CategoryName> */}

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
          <TextC color="#333" medium heavy>
            Thanh Phụng
          </TextC>
          <TextC a color="#333" medium light>
            Basic
          </TextC>
        </GroupA>
        <GroupA row>
          <TouchableOpacity>
            <FontAwesome5 name={'search'} size={15} color="#be2edd" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={'notifications'} size={15} color="#be2edd" />
          </TouchableOpacity>
        </GroupA>
      </Container>

      <GroupA col s>
        <TextC large heavy color="#000" p>
          Continue Watching
        </TextC>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityA>
                <ImageA max xxl little source={{uri: c.albumArtUrl}} />
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
        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityB>
                <ImageA large xl little source={{uri: c.albumArtUrl}} />
                <TextC color="#333" medium heavy>
                  Cast
                </TextC>
              </TouchableOpacityB>
            );
          })}
        </ScrollView>
      </GroupA>

      <GroupA row ss>
        <TextC medium heavy color="#000" p>
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
        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityA>
                <ImageA max xxl little source={{uri: c.albumArtUrl}} />
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
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacity>
                <ContainerA>
                  <GroupA row ss>
                    <ImageA little s medium source={{uri: c.albumArtUrl}} />
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

        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityA>
                <ImageA max xxl little source={{uri: c.albumArtUrl}} />
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
        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
          {dataMovie.map((c, i) => {
            return (
              <TouchableOpacityB>
                <ImageA large xl little source={{uri: c.albumArtUrl}} />
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
  justifycontent: space-between;
  flexdirection: row;
  padding: 40px 20px;
`;
const ContainerA = styled.View`
  justifycontent: space-between;
  flexdirection: row;
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
  borderradius: 5px;
  borderwidth: 1px;
  bordercolor: #be2edd;
  width: 25%;
  height: 4%;
  margin: auto;
  justifycontent: center;
  alignitems: center;
`;
const TouchableOpacityD = styled.TouchableOpacity`
  width: 30%;
  height: 30%;
  margin: 20px;
`;
const ViewA = styled.View`
  position: absolute;
  backgroundcolor: #7158e2;
  right: -7%;
  bottom: 0%;
  width: 65%;
  height: 50%;
  borderradius: 10px;
  justifycontent: center;
  zindex: 1;
`;
const ViewB = styled.View`
  position: absolute;
  backgroundcolor: #e056fd;
  right: 0%;
  bottom: -10%;
  width: 50px;
  height: 50px;
  borderradius: 25px;
  justifycontent: center;
  alignitems: center;
  zindex: 2;
`;
const ViewC = styled.View`
  position: absolute;
  backgroundcolor: #e056fd;
  top: 40%;
  left: 45%;
  width: 50px;
  height: 50px;
  borderradius: 15px;
  justifycontent: center;
  alignitems: center;
  zindex: 2;
`;
