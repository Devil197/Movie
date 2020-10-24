import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  TouchableHighlight,
  Alert
} from 'react-native'
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT } from '../../constants/constants'
import { films, menu } from '../../constants/data/fakeData'
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryByIdUser, getMovieById, getFullMovie } from '../../Redux/actions/movieAction';
export default function History({ navigation }) {

  const userReducer = useSelector((state) => state.userReducer)
  // console.log('image,: ', userReducer);
  const [dataHistory, setDataHistory] = useState();
  const [dataMovie, setDataMovie] = useState();

  const [id, setId] = useState("");
  console.log('00009 -> user', userReducer);
  useEffect(() => {

    getHistoryByIdUser("5f8a891887f5ef0004f46619").then((history) =>{
      console.log('000003 -> history', history);
      setDataHistory(history);
      setId(history.items[0]._id);
    }).catch((err) => console.log("Failed", err));

  

    // getMovieById(dataHistory?.items[0]?.movie_id).then((movie) =>{
    //   console.log('0005 -> movie', movie);
    //   setDataMovie(movie);
    // }).catch((err) => console.log("Failed", err));

    // getFullMovie(dataHistory?.items[0]?.movie_id).then((moviebyId) => {
    //   console.log('0005 -> movie', moviebyId);
    //   setDataMovie(moviebyId);
    // }).catch((err) => console.log("Failed", err));
    // console.log('0002 -> movie_id', dataHistory?.items[0]?.movie_id);

    getFullMovie(id).then((fullmovie) => {
      setDataMovie(fullmovie);
    }).catch((err) => console.log("Failed: ", err))

  }, [])
  

  const [listData, setListData] = useState(
    dataMovie?.movie.map((c, index) => ({
      key: `${index}`,
      title: c.name,
      thumb: c.thumb,
    }))
  );
  const closeRow = (rowMap, rowKey) => {

  }
  const deleteRow = (rowMap, rowKey) => {

  }
  const VisibleItem = props => {
    const { data } = props;

    return (
      <View style={styles.rowFront}>
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View>
            <Text style={styles.title} numberOfLines={1}>{data.item.title}</Text>
          </View>

        </TouchableHighlight>
      </View>
      // <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
      //   {dataMovie?.movie.map(c,i)=>}
      // </ScrollView>
    );
  }
  const renderItem = (data, rowMap) => {
    return (
      <VisibleItem data={data} />
    )
  };
  const HiddenItemWithAction = props => {
    const { onClose, onDelete } = props;

    return (
      <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
          <Text>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );

  }
  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithAction
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  }
  return (
    <View style={styles.container}>
      <SwipeListView
        data={dataMovie}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff"
  },
  topContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pageTitle: {
    fontSize: 20,
    fontFamily: Fonts.SansMedium,

  },

  box: {
    flexDirection: 'row',
    padding: 10 * WIDTH_SCALE,
    // backgroundColor: '#fff'
  },
  image: {
    width: WIDTH_SCALE * 180,
    height: HEIGHT_SCALE * 100,

  },

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
})