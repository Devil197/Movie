import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import App from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  WIDTH,
  HEIGHT,
  STATUS_BAR_CURRENT_HEIGHT,
} from '../../constants/constants';
import AsyncStorage from '@react-native-community/async-storage';
import {MySpinner} from '../views/MySpinner';

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

export default function Introduce() {
  const [letGetIt, setLetGetIt] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('@isShow', (err, value) => {
        if (err) {
          console.log(err);
        } else {
          if (value !== null) {
            setLetGetIt(JSON.parse(value));
            console.log(letGetIt);
          } else {
            setLetGetIt(false);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const _onDone = () => {
    setLetGetIt(true);
    storeData();
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@isShow', JSON.stringify(true));
    } catch (e) {
      console.log(e);
    }
  };

  const _renderItem = ({item}) => {
    return (
      <View style={styles.slide} key={item.key}>
        <StatusBar barStyle="light-content" />
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-forward-sharp"
          color="rgba(255, 255, 255, .9)"
          size={24}
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
          size={24}
        />
      </View>
    );
  };

  if (letGetIt) {
    return <App />;
  } else {
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
    width: '100%',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
