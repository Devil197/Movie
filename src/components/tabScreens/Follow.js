import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { FilmFollowItem } from '../views/index';
import { getItemsFollowByUserId } from '../../Redux/actions/followAction';
import { Fonts } from '../../utils/Fonts';
import { MySpinner } from '../views';
import { useSelector, useDispatch } from 'react-redux';
import { REDUX } from '../../Redux/store/types';


const Follow = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const user = useSelector((state) => state.userReducer);
  const followReducer = useSelector((state) => state.followReducer)
  console.log('1001 ', followReducer);
  const userId = user?.userInfo?._id;

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = async () => {
    MySpinner.show();
    let json = await getItemsFollowByUserId(userId).then((json) => {
      return json;
    });

    let temp = [];
    json?.items.map((key, value) => {
      temp.push(key?.movie_id);
    });
    console.log('DATA in Follow: ', temp);
    setData(temp);
    if (!followReducer?.first) {
      console.log('1001 chay redux');
      dispatch({
        type: REDUX.SET_FOLLOW,
        payload: temp
      })
      dispatch({
        type: REDUX.FIRST_FOLLOW
      })
      MySpinner.hide();
    }
    MySpinner.hide();

  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" />
      <View style={styles.topContainer}>
        <Text style={styles.pageTitle}>Follow</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={true}
        numColumns={3}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={(item) => (
          <FilmFollowItem navigation={navigation} params={item} />
        )}
      />
    </View>
  );
};
export default Follow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: Fonts.SansMedium,
    textAlign: 'center',
  },
});
