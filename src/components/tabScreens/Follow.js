import React, {useState, useEffect} from 'react';
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
import {FilmFollowItem} from '../views/index';
import {getItemsFollowByUserId} from '../../Redux/actions/followAction';
import {Fonts} from '../../utils/Fonts';
import {MySpinner} from '../views';
import {useSelector} from 'react-redux';

const Follow = ({navigation}) => {
  const [data, setData] = useState();
  let user = useSelector((state) => state.userReducer);
  let userId = user?.userInfo?._id;

  useEffect(() => {
    getDataFromAPI();
  }, [userId]);

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
