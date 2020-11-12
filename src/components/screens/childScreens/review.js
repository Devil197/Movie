import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import { Fonts } from '../../../utils/Fonts';
import StarRating from 'react-native-star-rating';
import { WIDTH, HEIGHT } from '../../../constants/constants';
import starData from './data';

StatusBar.setHidden(true);
export default function review(params, navigation) {
  const [starCount, setStarCount] = useState();
  const [sumStar, setSumStar] = useState();
  const [sqrtStar, setSqrtStar] = useState();

  useEffect(() => {
    calSumStar();
  }, []);

  const calSumStar = () => {
    let sumStar = 0;
    let countUserVote = 0;

    starData.map((star) => {
      sumStar = sumStar + star.detail.length * star.starNum;
      countUserVote = countUserVote + star.detail.length;
    });
    setSumStar(sumStar);
    setStarCount(countUserVote);
    setSqrtStar(Math.floor(sumStar / countUserVote));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIconContainer}>
          <Icons name="close" size={26} color={'#000'} />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>All Reviews</Text>
        </View>
      </View>
      <View style={styles.sumStarContainer}>
        <View style={styles.rounderSumStar}>
          <Text style={styles.sumStarTitle}>{sqrtStar}</Text>
        </View>
      </View>
      <View style={styles.starsIconContainer}>
        <View style={styles.starTitleContainer}>
          <Text style={styles.starTitle}>based on {starCount} reviews</Text>
        </View>
        <View style={styles.starsIcon}>
          <StarRating
            activeOpacity={1}
            starStyle={{ paddingRight: 2.5, paddingLeft: 2.5 }}
            starSize={20}
            fullStarColor={'#f1c40f'}
            disabled={false}
            maxStars={5}
            rating={sqrtStar}
            emptyStarColor={'#f1c40f'}
          />
        </View>
      </View>
      <View style={styles.starDetailContainer}>
        {starData.map((star) => {
          return (
            <View style={styles.groupStarContainer} key={star.starNum}>
              <View style={styles.starNameContainer}>
                <Text style={styles.starName}>{star.starNum} star</Text>
              </View>
              <View style={styles.starSliderContainer}>
                <View
                  style={{
                    backgroundColor: '#333332',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    height: 10,
                    width:
                      ((star.detail.length * star.starNum) / sumStar) * 100 +
                      '%',
                  }}
                />
              </View>
              <Text style={styles.numberStar}>{star.detail.length}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.commentContainer}>
        {starData.map((star) => {
          return (
            <View style={styles.groupComment}>
              <View style={styles.aboveLayout}>
                <Image
                  style={styles.userImage}
                  source={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/picture%2Fpsmcg.png?alt=media&token=795fbbdc-2612-4a14-a248-b9b4259fb5b4',
                  }}
                />
                <View style={styles.userDetail}>
                  <Text style={styles.userName}>Username</Text>
                  <View style={styles.starsIcon}>
                    <StarRating
                      activeOpacity={1}
                      starStyle={{ paddingRight: 2.5 }}
                      starSize={16}
                      fullStarColor={'#f1c40f'}
                      disabled={false}
                      maxStars={5}
                      rating={sqrtStar}
                      emptyStarColor={'#f1c40f'}
                    />
                  </View>
                </View>
                <View style={styles.dateCmtContainer}>
                  <Text style={styles.dateCmt}>hồi nãy</Text>
                </View>
              </View>
              <View style={styles.belowLayout}>
                <Text style={styles.userName}>
                  237 actionable tasks: 8 executed, 229 up-to-date info
                  Connecting to the development server... info Starting the app
                  on "4200210ae41d44b7"... Starting: Intent
                </Text>
              </View>
              <View
                style={{ height: 1, width: WIDTH, backgroundColor: '#cfd0d1' }}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
  },
  headerIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.SansBold,
    marginRight: WIDTH / 3.1,
  },
  sumStarContainer: {
    width: WIDTH,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounderSumStar: {
    borderRadius: 70 / 2,
    borderColor: '#000',
    borderWidth: 1.5,
    height: 70,
    width: WIDTH / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sumStarTitle: {
    color: 'red',
    fontSize: 24,
  },
  starsIconContainer: {
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starTitleContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  starTitle: {
    color: '#babab8',
  },
  starDetailContainer: {
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
  },
  groupStarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starNameContainer: {
    flex: 1,
  },
  starName: {
    color: '#c2c2c0',
  },
  starSliderContainer: {
    flex: 6,
    height: 10,
    backgroundColor: '#c2c2c0',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  numberStar: {
    flex: 1,
    color: '#c2c2c0',
    textAlign: 'center',
  },
  commentContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c0',
    width: WIDTH,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  groupComment: {
    width: WIDTH,
    paddingTop: 10,
  },
  aboveLayout: {
    flex: 2,
    width: WIDTH,
    flexDirection: 'row',
  },
  userImage: {
    height: 55,
    width: 55,
    borderRadius: 55,
    width: '15%'
  },
  userDetail: {
    paddingLeft: 10,
    width: '50%',
    alignItems: 'flex-start',
  },
  dateCmtContainer: {
    width: '30%',
    alignItems: 'flex-end',

  },
  dateCmt: {
    color: '#babab8',
  },
  belowLayout: {
    flex: 1,
    width: WIDTH,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 15,
  },
});
