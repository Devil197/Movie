import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View,Text ,StyleSheet} from 'react-native';
import { set } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import { HEIGHT, WIDTH, WIDTH_SCALE } from '../../constants/constants';
import Container from '../../constants/style/Container';
import GroupA from '../../constants/style/Group';
import ImageA from '../../constants/style/image';
import MyTouchableOpacity from '../../constants/style/MyTouchableOpacity';
import MyView from '../../constants/style/MyView';
import { styles } from '../../constants/style/styles';
import TextC from '../../constants/style/Text';
import { getAllMovie, getCartoon, getCast } from '../../Redux/actions/movieAction';
import { MySpinner } from '../views';
import { ROUTE_KEY } from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
// import YouTube from 'react-native-youtube';

export default function Home({ navigation }) {
  const userReducer = useSelector((state) => state.userReducer)
  console.log('image,: ', userReducer);
  const [loading, setLoading] = useState(true);
  const [dataCast, setDataCast] = useState();
  const [dataMovie, setDataMovie] = useState();
  const [dataCartoon, setDataCartoon] = useState();
  const [height, setHeight] = useState();
  const [page, setPage] = useState(1);
  // const navigation = useNavigation();
  // console.log(dataMovie.length);

  useEffect(() => {
    // xet data cho cartoon
    getCartoon()
      .then((cartoon) => {
        setLoading(false),
          setDataCartoon(cartoon);
      })
      .catch((err) => console.log('Failed'));

    getAllMovie()
      .then((movie) => {
        console.log('movie', movie.items[0].trailer), 
        setLoading(false),
          setDataMovie(movie);
      
        // setDataTrailer();
      })
      .catch((err) => console.log('Failed'));

    getCast().then((cast) => {
      // console.log('movie', movie), 
      setLoading(false),
        setDataCast(cast);
    }).catch((err) => console.log('failed'));

  }, []);

  // console.log('map ', dataMovie);

  // loading
  if (loading) {
    MySpinner.show();
    return (
      <View style={{ flex: 1, width: WIDTH, height: HEIGHT, position: 'absolute', zIndex: 9999 }} />
    )
  } else {
    MySpinner.hide()
  }
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

      <Container xxl>
        <GroupA row ss>
          <ImageA
            little
            s
            medium
            source={{
              uri: userReducer.facebookInfo !== {} ? userReducer?.facebookInfo?.photo : userReducer?.googleInfo?.user?.photo,
            }}
          />
        </GroupA>
        <GroupA col s l p>
          <TextC color="#333" medium heavy>
            {userReducer.facebookInfo !== {} ? userReducer.facebookInfo?.name : userReducer.googleInfo.user.name}
          </TextC>
          <TextC a color="#333" medium light>
            ID: {userReducer.facebookInfo !== {} ? userReducer.facebookInfo?.id : userReducer.googleInfo.user.id}
          </TextC>
        </GroupA>
        <GroupA row>
          <TouchableOpacity onPress={() => navigation.navigate('Videos')}>
            <FontAwesome5 name={'search'} size={15} color="#be2edd" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={'notifications'} size={15} color="#be2edd" />
          </TouchableOpacity>
        </GroupA>
      </Container>

      <GroupA col s>
        <TextC large bold color="#000" p>
          Continue Watching
        </TextC>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie?.items.map((c, i) => {
            return (
              <MyTouchableOpacity max s long onPress={() => navigation.push(ROUTE_KEY.Details, { _id: c._id })}>
                <ImageA max xxl little source={{ uri: c.cover_img }} />
                <MyView
                  rightm
                  bottoms
                  large
                  xxl
                  backgroundColor="#7158e2"
                  alignItems="flex-start">
                  <TextC large heavy p>
                    Title
                  </TextC>
                </MyView>
                <MyView more rights bottomm z2>
                  <Icon name={'play'} size={25} color="#fff" />
                </MyView>
              </MyTouchableOpacity>
            );
          })}
        </ScrollView>
      </GroupA>


      {/* <GroupA col>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {data.items.map((c, i) => {
            return (
              <MyTouchableOpacity small m little key={i}>
                <TextC color="#333" medium heavy>
                 {c.name}
                </TextC>
              </MyTouchableOpacity>
            );
          })}
        </ScrollView>
      </GroupA> */}

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
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie?.items.map((c, i) => {
            return (
              <MyTouchableOpacity max s long>
                <ImageA max xxl little source={{ uri: c.cover_img }} />
                <TextC color="#333" medium bold>
                  {c.name}
                </TextC>
              </MyTouchableOpacity>
            );
          })}
        </ScrollView>
      </GroupA>

      <GroupA col s b>
        <TextC large heavy color="#000" p>
          Cartoon
        </TextC>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}>
          {dataCartoon?.items.map((c, i) => {
            return (
              <TouchableOpacity>
                <Container m>
                  <GroupA row ss>
                    <ImageA little s medium source={{ uri: c.movie_id.cover_img }} />
                  </GroupA>
                  <GroupA col s p>
                    <TextC color="#333" medium heavy>
                      {c.movie_id.name}
                    </TextC>
                    <TextC a color="#333" medium light>
                      {c.movie_id.episode} Tập
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
                </Container>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </GroupA>

      <MyTouchableOpacityA selected={true} smaller n>
        <TextC small light color="#be2edd">
          View more
        </TextC>
      </MyTouchableOpacityA>

      <GroupA col s t>
        <TextC medium heavy color="#000" p t>
          Trailer
        </TextC>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataMovie?.items.map((c, i) => {
            console.log('00006 -> trailer', c.trailer);
            return (
              <MyTouchableOpacity max s long>
                {/* <ImageA max xxl little source={{ uri: c.cover_img }} /> */}
               {/* <Text>{c.name}</Text> */}
                {/* <YouTube
                  apiKey="AIzaSyCpU2RlaMjkFN0461dZRv2zfnQEXzUuz6U"
                  videoId={c.trailer}
                  controls={2}
                  play={false}
                  style={{ alignSelf: 'stretch', height: 250 * WIDTH_SCALE }}
                  onReady={() => {
                    setHeight(221);
                  }}
                /> */}
                {/* <MyView tops leftm light>
                  <Icon name={'play'} size={25} color="#fff" />
                </MyView> */}
              </MyTouchableOpacity>
            
            );
          })}
        </ScrollView>
      </GroupA>

      <GroupA col s t>
        <TextC medium heavy color="#000" p t>
          Cast
        </TextC>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {dataCast?.cast.map((c, i) => {
           
            return (
              <MyTouchableOpacity small m little>
                <ImageA large xl little source={{ uri: c.cover_image }} />
                <TextC color="#333" small bold numberOfLines={1} ellipsizeMode="tail">
                  {c.name}
                </TextC>
              </MyTouchableOpacity>
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
const CategoryName = styled(TextC)`
  color: ${(props) => (props.selected ? '#819ee5' : '#9a9a9a')};
  font-weight: ${(props) => (props.selected ? '700' : '500')};
`;

const MyTouchableOpacityA = styled(MyTouchableOpacity)`
  justifyContent: ${(props) => (props.selected ? 'center' : 'flex-start')};
  alignItems: ${(props) => (props.selected ? 'center' : 'flex-start')};
  borderWidth: ${(props) => (props.selected ? '1px' : '0px')};
  borderRadius: ${(props) => (props.selected ? '5px' : '0px')};
  borderColor: ${(props) => (props.selected ? '#be2edd' : '#000')};
`;
