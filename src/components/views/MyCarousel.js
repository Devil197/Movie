import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CustomItem from './CustomItem';
const ENTRIES1 = [
  {
    data: [
      {
        id: 2,
        title: 'Peter Grill to Kenja no Jikan',
        thumb: 'https://img.anime47.com/imgur/6hhR2bl.jpg',
      },
      {
        id: 3,
        title: 'Dokyuu Hentai HxEros',
        thumb: 'https://img.anime47.com/imgur/gEfsKK8.jpg',
      },
      {
        id: 4,
        title: 'Kanojo, Okarishimasu',
        thumb: 'https://img.anime47.com/imgur/KKrknWT.jpg',
      },
    ],
  },

  {
    data: [
      {
        id: 5,
        title: 'Deca-Dence',
        thumb: 'https://img.anime47.com/imgur/4A8EO07.jpg',
      },
      {
        id: 6,
        title: 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season',
        thumb: 'https://img.anime47.com/imgur/9HpTWLd.jpg',
      },
      {
        id: 7,
        title: 'The God of High School',
        thumb: 'https://img.anime47.com/imgur/A9txARE.jpg',
      },
    ],
  },

  {
    data: [
      {
        id: 8,
        title: 'Sword Art Online: Alicization - Đại Chiến Underworld 2',
        thumb: 'https://img.anime47.com/imgur/dcfyjSL.png',
      },
      {
        id: 9,
        title: 'Lapis Re:LiGHTs',
        thumb: 'https://img.anime47.com/imgur/o6Ghr0q.jpg',
      },
      {
        id: 10,
        title: 'Ore wo Suki nano wa Omae dake ka yo: Oretachi no Game Set',
        thumb: 'https://img.anime47.com/imgur/DlO2bxC.jpg',
      },
    ],
  },
];

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  // const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  // useEffect(() => {
  //   setEntries(ENTRIES1);
  // }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        {/* <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        /> */}
        {/* <Categories data={item.data} title={item.title} /> */}
        <CustomItem item={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth - 80}
        itemWidth={screenWidth - 60}
        data={ENTRIES1}
        renderItem={renderItem}
        hasParallaxImages={true}
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
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
