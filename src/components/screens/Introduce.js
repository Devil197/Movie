import React, { useEffect, useState, useMemo } from 'react';
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
import { ROUTE_KEY } from '../../constants/constants';
import { storeValueIsShowIntroduceOrNot } from '../../utils/IsShowIntroduce';

const slides = [
  {
    key: '1a',
    image: {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/Splash%2Fslide_01.png?alt=media&token=88b2b647-b798-4e3f-a16a-ab0a9cd8be94',
    },
  },
  {
    key: '2b',
    image: {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/Splash%2Fslide_02.png?alt=media&token=82c4bad0-3fad-4195-97d0-37693d8ffebd',
    },
  },
  {
    key: '3c',
    image: {
      uri:
        "https://firebasestorage.googleapis.com/v0/b/geapp-d5a80.appspot.com/o/Splash%2Fslide_03.png?alt=media&token=cf59ad46-01e6-4b60-a2a9-8bb8e72b92a1",
    },
  },
];

export default function Introduce({ turnOffIntroduce }) {
  const _onDone = () => {
    storeValueIsShowIntroduceOrNot();
    turnOffIntroduce();
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide} key={item.key}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={item.image} style={styles.image} resizeMode={'cover'} />
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
      dotStyle={{ backgroundColor: '#6b6a69' }}
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
    justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT,
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
