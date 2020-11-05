import React, {useEffect, useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import App from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  WIDTH,
  HEIGHT,
  STATUS_BAR_CURRENT_HEIGHT,
  WIDTH_SCALE,
} from '../../constants/constants';
import {ROUTE_KEY} from '../../constants/constants';
import {storeValueIsShowIntroduceOrNot} from '../../utils/IsShowIntroduce';

const slides = [
  {
    key: '1a',
    image: {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/kevin-mueller-0ytwNH74s3A-unsplash.jpg?alt=media&token=14251aed-7d13-44af-a015-929e4d0d4144',
    },
  },
  {
    key: '2b',
    image: {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/kevin-mueller-0ytwNH74s3A-unsplash.jpg?alt=media&token=14251aed-7d13-44af-a015-929e4d0d4144',
    },
  },
  {
    key: '3c',
    image: {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/kevin-mueller-0ytwNH74s3A-unsplash.jpg?alt=media&token=14251aed-7d13-44af-a015-929e4d0d4144',
    },
  },
];

export default function Introduce({turnOffIntroduce}) {
  const _onDone = () => {
    storeValueIsShowIntroduceOrNot();
    turnOffIntroduce();
  };

  const _renderItem = ({item}) => {
    return (
      <View style={styles.slide} key={item.key}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={item.image} style={styles.image}>
          <Text style={{color: '#fff', fontSize: 40}}>{item.key}</Text>
        </ImageBackground>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-forward-sharp"
          color="rgba(255, 255, 255, .9)"
          size={24 * WIDTH_SCALE}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="checkmark-sharp"
          color="rgba(255, 255, 255, .9)"
          size={24 * WIDTH_SCALE}
        />
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      dotStyle={{backgroundColor: '#6b6a69'}}
      onDone={_onDone}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    //marginTop: STATUS_BAR_CURRENT_HEIGHT,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: WIDTH,
    alignItems: 'center',
  },
  buttonCircle: {
    width: WIDTH * 0.1,
    height: WIDTH * 0.1,
    //backgroundColor: 'rgba(0, 0, 0, .2)',
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
