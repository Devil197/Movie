import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProgressCircle from 'react-native-progress-circle';
import common from '../../constants/style/common';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Header({
  backdrop,
  poster,
  title,
  genres,
  release_date,
  runtime,
  status,
  vote_average,
  directer,
  // navigation,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* backdrop */}
      <View style={{height: 220, position: 'relative'}}>
        <FastImage
          source={{
            uri: `${backdrop}`,
          }}
          style={styles.backdrop}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={{backgroundColor: 'black', height: 200, opacity: 0.5}} />

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 40,
            left: 10,
          }}
          onPress={() => navigation.goBack()}>
          <View style={common.row}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/ic_back.png')}
            />
            <Text style={styles.backButton}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          height: 140,
        }}>
        <FastImage
          source={{
            uri: `${poster}`,
          }}
          style={styles.poster}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{paddingHorizontal: 10, marginTop: -25}}>
          {/* title */}
          <Text style={common.title}>{title}</Text>
          {/* genres */}
          <View style={common.row}>
            <Text style={[common.subtitle, {fontFamily: 'Roboto-LightItalic'}]}>
              {genres}
            </Text>
          </View>
          <View style={common.row}>
            {/* release_date */}
            <View style={[common.row, {marginRight: 30}]}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/ic_calendar.png')}
              />
              <Text style={common.subtitle}>{release_date}</Text>
            </View>

            {/* runtime */}
            <View style={common.row}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/ic_clock.png')}
              />
              <Text style={common.subtitle}>{runtime} Tập</Text>
            </View>
          </View>
          {/* directer */}
          <View style={[common.row, {marginBottom: 5}]}>
            <Text style={common.subtitle}>{directer}</Text>
          </View>
          {/* status */}
          <View style={[common.row, {marginBottom: 5}]}>
            <Text style={common.subtitle}>{status}</Text>
          </View>
        
          {/* <ProgressCircle
            percent={vote_average}
            radius={18}
            borderWidth={3}
            color="#E54028"
            shadowColor="#D8D8D8"
            bgColor="#fff">
            <Text style={[common.subtitle, {fontSize: 12}]}>
              {vote_average}%
            </Text>
          </ProgressCircle> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  backdrop: {
    position: 'absolute',
    height: 200,
    width: '100%',
  },
  poster: {
    marginTop: -60,
    height: 170,
    width: width * 0.31,
  },
  backButton: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  icon: {
    marginRight: 5,
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    height: 15,
    width: 15,
  },
});
