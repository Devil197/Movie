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
import { Fonts } from '../../utils/Fonts';
import {
    WIDTH_SCALE,
    HEIGHT_SCALE,
    WIDTH,
    HEIGHT,
    STATUS_BAR_CURRENT_HEIGHT,
    HEADER_HEIGHT,
} from '../../constants/constants';
const { width: screenWidth } = Dimensions.get('window');
import MyHighLightButton from '../views/MyHighLightButton';
import { ROUTE_KEY } from '../../constants/constants';

const MyCarousel = ({ movieData, navigation }) => {
    //console.log("CAROUSEL: ", movieData);
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        if (movieData !== undefined) {
            handleArrayMovie(movieData);
        }
    }, [movieData]);

    const handleArrayMovie = async (movieData) => {
        await movieData.forEach(element => {
            if (element.score >= 7) {
                setEntries(movieData => [...movieData, element]);
            }
        })
        //console.log("ENTR: ", entries);
    }

    const handleMovieName = (name) => {
        let lastCharSplitIndex = name.indexOf(']');
        let mainName = name.slice(lastCharSplitIndex + 1, name.length);
        if (mainName.indexOf(' ') === 0) {
            return mainName.slice(1, mainName.length);
        }
        return mainName
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        if (item.score >= 7) {
            return (
                <MyHighLightButton
                    onPress={() => navigation.push(ROUTE_KEY.Details, { _id: item._id })}
                    style={styles.item}>
                    <ParallaxImage
                        source={{ uri: item.cover_img }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0}
                        {...parallaxProps}
                    />
                    <Text
                        style={{
                            position: 'absolute',
                            width: '20%',
                            height: '10%',
                            paddingVertical: 3 * WIDTH_SCALE,
                            paddingHorizontal: 5 * WIDTH_SCALE,
                            top: 0,
                            right: 0,
                            borderTopRightRadius: 8 * WIDTH_SCALE,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: '#fff',
                            textAlign: 'center',
                            fontFamily: Fonts.SansLight,
                            fontSize: 16 * WIDTH_SCALE
                        }}
                    >
                        {item.score.toFixed(1)}
                    </Text>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            width: '100%',
                            borderBottomRightRadius: 8 * WIDTH_SCALE,
                            borderBottomLeftRadius: 8 * WIDTH_SCALE,
                            height: '10%',
                            justifyContent: 'center',
                            paddingLeft: 10,
                        }}>
                        <Text
                            style={{
                                fontFamily: Fonts.SansMedium,
                                fontSize: 16 * WIDTH_SCALE,
                                color: '#fff'
                            }}
                            numberOfLines={2}>
                            {handleMovieName(item.name)} ({item.years})</Text>
                    </View>

                </MyHighLightButton>
            );
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 40}
                data={entries}
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
        width: screenWidth - 40,
        height: WIDTH / 1.5,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});