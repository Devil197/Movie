import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CustomItem from './CustomItem';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY, dataCarousel } from '../../constants/constants'
import {
  getAllMovie,
  getCartoon,
  getCast,
  getMovieByCreatAt,
  getMovieByScore,
} from '../../Redux/actions/movieAction';

const ENTRIES1 = [
  {
    data: [
      {
        id: 5,
        title: 'Deca-Dence',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 6,
        title: 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 7,
        title: 'The God of High School',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 2,
        title: 'Peter Grill to Kenja no Jikan',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 3,
        title: 'Dokyuu Hentai HxEros',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 4,
        title: 'Kanojo, Okarishimasu',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 5,
        title: 'Deca-Dence',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 6,
        title: 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 7,
        title: 'The God of High School',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
    ],
  },

  {
    data: [

      {
        id: 7,
        title: 'The God of High School',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 2,
        title: 'Peter Grill to Kenja no Jikan',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 3,
        title: 'Dokyuu Hentai HxEros',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 5,
        title: 'Deca-Dence',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 6,
        title: 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 4,
        title: 'Kanojo, Okarishimasu',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 5,
        title: 'Deca-Dence',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 6,
        title: 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 7,
        title: 'The God of High School',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
    ],
  },

  {
    data: [
      {
        id: 2,
        title: 'Peter Grill to Kenja no Jikan',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 3,
        title: 'Dokyuu Hentai HxEros',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 4,
        title: 'Kanojo, Okarishimasu',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 5,
        title: 'Deca-Dence',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 6,
        title: 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
      {
        id: 7,
        title: 'The God of High School 2',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
      },
    ],
  },
];

const topics = [{
  id: "TP1",
  title: "Nhac Han",
  cover: ""
},
{
  id: "TP2",
  title: "Nhac Han 2",
  cover: ""
},

{
  id: "TP3",
  title: "Nhac Han 3",
  cover: ""
},

{
  id: "TP4",
  title: "Nhac Han 4",
  cover: ""
},

]

const musics = [

  {
    id: 2,
    title: 'Peter Grill to Kenja no Jikan',
    thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
  },
  {
    id: 3,
    title: 'Dokyuu Hentai HxEros',
    thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
  },
  {
    id: 4,
    title: 'Kanojo, Okarishimasu',
    thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
  },
  {
    id: 5,
    title: 'Deca-Dence',
    thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
  },
  {
    id: 6,
    title: 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season',
    thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
  },
  {
    id: 7,
    title: 'The God of High School 2',
    thumb: 'https://firebasestorage.googleapis.com/v0/b/rn-firebase-7c3c7.appspot.com/o/product-01.jpg?alt=media&token=2196d403-d4c1-4189-a585-65a1e5d8ea6b',
  },


]


const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  // const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);

    //getMusicGroupBy/TopicId
  }, []);

  // useEffect(() => {
  //   setEntries(ENTRIES1);
  // }, []);
  function onToScroll(event, offsetx, offsety) {
    console.log('000888', offsetx, offsety);

  }

  const renderItem = ({ item, index }, parallaxProps) => {

    return (
      <View style={styles.item}>
        {/* <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        /> */}
        {/* <Categories data={item.data} title={item.title} /> */}
        <View><Text>id topics: {item.id}</Text></View>
        <CustomItem musics={musics} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel

        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth - 80}
        itemWidth={screenWidth - 10}
        data={topics}
        renderItem={renderItem}
        hasParallaxImages={true}
      // onScroll={onToScroll}
      // onScroll={e => console.log('9999', e.nativeEvent)}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 20,
    height: HEIGHT,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
